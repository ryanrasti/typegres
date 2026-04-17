// Watched equality values per table per column, serialized as canonical text.
// Example: { users: { id: Set(["5"]) }, dogs: { user_id: Set(["5"]) } }
export type PredicateSet = Map<string, Map<string, Set<string>>>;

export class LiveQueryError extends Error {
  name = "LiveQueryError";
}
