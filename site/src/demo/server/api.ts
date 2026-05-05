// Capability-rooted API surface.
//
// This is the wire-facing root. Visitor code (the editable widget
// file) calls api.operator(token) to get an OperatorRoot whose reads
// are pre-`where`'d to the operator's organization. Everything stays
// inside the cap-bounded scope by construction.

import { db } from "../runtime";
import { Operators } from "../schema/operators";
import { Organizations } from "../schema/organizations";

export type Role = "ops_lead" | "inventory_control" | "account_manager";

export class OperatorRoot {
  operatorId: string;
  organizationId: string;
  role: Role;
  name: string;
  orgName: string;

  constructor(opts: {
    operatorId: string;
    organizationId: string;
    role: Role;
    name: string;
    orgName: string;
  }) {
    this.operatorId = opts.operatorId;
    this.organizationId = opts.organizationId;
    this.role = opts.role;
    this.name = opts.name;
    this.orgName = opts.orgName;
  }
}

export const operatorFromToken = async (token: string): Promise<OperatorRoot> => {
  const [op] = await Operators.from()
    .where(({ operators }) => operators.token["="](token))
    .select(({ operators }) => ({
      id: operators.id,
      organization_id: operators.organization_id,
      name: operators.name,
      role: operators.role,
      org: Organizations.from()
        .where(({ organizations }) => organizations.id["="](operators.organization_id))
        .select(({ organizations }) => ({ name: organizations.name }))
        .cardinality("one")
        .scalar(),
    }))
    .execute(db);
  if (!op) {
    throw new Error(`No operator found for token "${token}"`);
  }
  return new OperatorRoot({
    operatorId: op.id,
    organizationId: op.organization_id,
    role: op.role as Role,
    name: op.name,
    orgName: (op.org as { name: string } | null)?.name ?? "?",
  });
};
