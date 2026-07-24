// The whole server: the schema IS the API. Row objects are capabilities,
// relations are the reachability edges, and amplification points are facets:
//
//   Users.login() ──► Users.forPrincipal row               (the principal)
//        │                 .memberships() ──► Memberships.forPrincipal rows
//        │                       .room() ──► Rooms.forMember(membership) row
//        │                                        .messages() / .post()
//        └─ directory: plain Rooms rows — no post (the attenuation floor)
//
// Base table classes carry data only; every amplifying member lives on a
// facet, minted only at explicit grant sites — so hydrating a base-class
// builder can never hand out authority. Facets are static methods returning
// a class inline (X.forY(...)); parameterized ones close over their proof.

import { z } from "zod";
import { Database, expose, Relation } from "typegres";
import { Integer, Text } from "typegres/sqlite";
import { hashPassword, verifyPassword } from "./auth";

// The Durable Object attaches its ctx.storage to this Database, and that
// single connection is the default for every .execute()/.hydrate()/.live().
export const db = new Database({ dialect: "sqlite" });

const zUsername = z.string().regex(/^[\w-]{1,24}$/);
const zPassword = z.string().min(1).max(128);
const zCreds = z.object({ username: zUsername, password: zPassword });
const zRoomName = z.string().regex(/^[\w-]{1,32}$/);
const zBody = z.string().min(1).max(2000);
const zId = z.int().positive();

export class Users extends db.Table("users") {
  @expose() id = Integer.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  password_hash = Text.column({ nonNull: true });

  // The principal facet: the logged-in user themselves, as opposed to a
  // view of another user (e.g. a row from members()).
  static forPrincipal() {
    return class Users_forPrincipal extends Users {
      @expose() memberships() {
        return Relation.has(this, Memberships.forPrincipal(), { user_id: this.id });
      }

      // Every room as listing data — base Rooms has no post/messages.
      @expose() directory() {
        return Rooms.from();
      }

      @expose(zRoomName)
      async createRoom(name: string) {
        const [room] = await Rooms.insert({ name, created_by_user_id: this.id })
          .returning(({ rooms }) => ({ id: rooms.id }))
          .execute();
        await Memberships.insert({ room_id: room!.id, user_id: this.id }).execute();
        return this.membershipFor(room!.id);
      }

      // Idempotent; returns the membership (the grant).
      @expose(zId)
      async joinRoom(roomId: number) {
        const existing = await Memberships.from()
          .where(({ room_members }) =>
            room_members.room_id.eq(roomId).and(room_members.user_id.eq(this.id)),
          )
          .select(({ room_members }) => ({ room_id: room_members.room_id }))
          .execute();
        if (existing.length === 0) {
          await Memberships.insert({ room_id: roomId, user_id: this.id }).execute();
        }
        return this.membershipFor(roomId);
      }

      // Not @expose'd — invisible over RPC.
      async membershipFor(roomId: number) {
        const [m] = await Memberships.forPrincipal()
          .from()
          .where(({ room_members }) =>
            room_members.room_id.eq(roomId).and(room_members.user_id.eq(this.id)),
          )
          .hydrate();
        return m!;
      }
    };
  }

  // The only nobody→principal amplification: find-or-create by username;
  // the password claims the name.
  @expose(zCreds)
  static async login({ username, password }: z.infer<typeof zCreds>) {
    const [existing] = await Users.from()
      .where(({ users }) => users.name.eq(username))
      .select(({ users }) => ({ id: users.id, hash: users.password_hash }))
      .execute();

    let id: number;
    if (!existing) {
      const [created] = await Users.insert({
        name: username,
        password_hash: await hashPassword(password),
      })
        .returning(({ users }) => ({ id: users.id }))
        .execute();
      id = created!.id;
    } else {
      if (!(await verifyPassword(password, existing.hash))) {
        throw new Error(`"${username}" is claimed and that isn't its password`);
      }
      id = existing.id;
    }

    const [user] = await Users.forPrincipal().from().where(({ users }) => users.id.eq(id)).hydrate();
    return user!;
  }
}

export class Rooms extends db.Table("rooms") {
  @expose() id = Integer.column({ nonNull: true, generated: true });
  @expose() name = Text.column({ nonNull: true });
  @expose() created_by_user_id = Integer.column({ nonNull: true });

  // The member facet — parameterized by its proof. post() stamps identity
  // from the membership row, not from anything the client sends.
  static forMember(membership: Memberships) {
    return class Rooms_forMember extends Rooms {
      @expose() messages() {
        return Messages.from()
          .join(Users, ({ messages, users }) => messages.user_id.eq(users.id))
          .where(({ messages }) => messages.room_id.eq(this.id));
      }

      @expose() members() {
        return Users.from()
          .join(Memberships, ({ users, room_members }) => users.id.eq(room_members.user_id))
          .where(({ room_members }) => room_members.room_id.eq(this.id));
      }

      @expose(zBody)
      post(body: string) {
        return Messages.insert({ room_id: membership.room_id, user_id: membership.user_id, body });
      }
    };
  }
}

// The grant table. Base rows are pure data; the amplifying edge lives on the
// forPrincipal facet, minted only by the self-scoped paths.
export class Memberships extends db.Table("room_members") {
  @expose() room_id = Integer.column({ nonNull: true });
  @expose() user_id = Integer.column({ nonNull: true });

  static forPrincipal() {
    return class Memberships_forPrincipal extends Memberships {
      @expose() room() {
        return Relation.belongsTo(this, Rooms.forMember(this), { id: this.room_id });
      }
    };
  }
}

export class Messages extends db.Table("messages", { live: true }) {
  @expose() id = Integer.column({ nonNull: true, generated: true });
  @expose() room_id = Integer.column({ nonNull: true });
  @expose() user_id = Integer.column({ nonNull: true });
  @expose() body = Text.column({ nonNull: true });
  @expose() created_at = Text.column({ nonNull: true, generated: true });
}

// The unauthenticated wire root — delegates to the schema's own login.
export class Chat {
  @expose(zCreds)
  login(creds: z.infer<typeof zCreds>) {
    return Users.login(creds);
  }
}
