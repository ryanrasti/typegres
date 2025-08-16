import invariant from "tiny-invariant";
import { inspect } from "cross-inspect";

// Generic mixin that adds static methods that proxy to an instance
// This allows classes to have instance methods as static methods
export function withMixinProxy<T, TMixin, TKeys extends keyof TMixin>(
  getMixin: () => TMixin,
  base: T,
  attrs: readonly TKeys[],
): T & Pick<TMixin, TKeys> {
  // Create the extended class with static methods
  const extended = base as T & Pick<TMixin, TKeys>;

  // Get the mixin instance once
  const mixinInstance = getMixin();

  // Add each method as a static method
  for (const attr of attrs) {
    // Check if attribute already exists on the class
    invariant(
      !(attr in extended),
      `Attribute '${inspect(attr)}' already exists on the class`,
    );

    if (typeof mixinInstance[attr] === "function") {
      // If it's a function, bind it to the mixin instance
      extended[attr] = mixinInstance[attr].bind(mixinInstance) as any;
    } else {
      (extended as any)[attr] = mixinInstance[attr];
    }
  }

  return extended;
}
