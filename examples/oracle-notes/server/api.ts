import { expose, Relation, typegres } from "typegres";
import { Varchar2 } from "typegres/oracle";
import { z } from "zod";
import { hashPassword, verifyPassword } from "./auth.js";

export const db = typegres();

export const zCredentials = z.object({
  username: z.string().regex(/^[\w-]{1,32}$/),
  password: z.string().min(1).max(128),
});
const zNoteInput = z.object({
  title: z.string().trim().min(1).max(120),
  body: z.string().max(3_500),
});

type Credentials = z.infer<typeof zCredentials>;
type NoteInput = z.infer<typeof zNoteInput>;

export class Users extends db.Table("users") {
  id = Varchar2.column({ nonNull: true });
  name = Varchar2.column({ nonNull: true });
  password_hash = Varchar2.column({ nonNull: true });

  @expose()
  notes() {
    return Relation.has(this, Notes, { user_id: this.id });
  }

  @expose(zNoteInput)
  async createNote(input: NoteInput) {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    await Notes.insert({
      id,
      user_id: this.id,
      title: input.title,
      body: input.body,
      created_at: now,
      updated_at: now,
    }).execute();
    const [note] = await this.notes()
      .where(({ notes }) => notes.id.eq(id))
      .hydrate();
    return note!;
  }
}

export class Notes extends db.Table("notes") {
  @expose() id = Varchar2.column({ nonNull: true });
  user_id = Varchar2.column({ nonNull: true });
  @expose() title = Varchar2.column({ nonNull: true });
  @expose() body = Varchar2.column();
  @expose() created_at = Varchar2.column({ nonNull: true });
  @expose() updated_at = Varchar2.column({ nonNull: true });

  @expose(zNoteInput)
  update(input: NoteInput) {
    return Notes.update()
      .where(({ notes }) => notes.id.eq(this.id))
      .set(() => ({ ...input, updated_at: new Date().toISOString() }));
  }

  @expose()
  delete() {
    return Notes.delete().where(({ notes }) => notes.id.eq(this.id));
  }
}

export class Api {
  @expose(zCredentials)
  async login({ username, password }: Credentials): Promise<Users> {
    let [existing] = await Users.from()
      .where(({ users }) => users.name.eq(username))
      .select(({ users }) => ({ id: users.id, name: users.name, hash: users.password_hash }))
      .execute();

    let id: string;
    if (!existing) {
      id = crypto.randomUUID();
      try {
        await Users.insert({
          id,
          name: username,
          password_hash: await hashPassword(password),
        }).execute();
      } catch {
        [existing] = await Users.from()
          .where(({ users }) => users.name.eq(username))
          .select(({ users }) => ({ id: users.id, name: users.name, hash: users.password_hash }))
          .execute();
        if (!existing) {
          throw new Error("Unable to create account");
        }
        if (!(await verifyPassword(password, existing.hash))) {
          throw new Error(`"${username}" is claimed and that isn't its password`);
        }
        id = existing.id;
      }
    } else {
      if (!(await verifyPassword(password, existing.hash))) {
        throw new Error(`"${username}" is claimed and that isn't its password`);
      }
      id = existing.id;
    }

    const [user] = await Users.from()
      .where(({ users }) => users.id.eq(id))
      .hydrate();
    if (!user) {
      throw new Error("Unable to hydrate account");
    }
    return user;
  }
}
