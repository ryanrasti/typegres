import { Anyrange as Generated } from "../generated/anyrange";
import type { Any } from "../index";

// Pg range output format is non-trivial (quoting, `[]` vs `()` bound kinds,
// unbounded/infinity sides). We surface the raw literal; callers who need
// structured bounds can parse them with pg's documented rules.
export class Anyrange<T extends Any<any>, N extends number> extends Generated<T, N> {
  declare deserialize: (raw: string) => string;
}
