1. Always run `npm test` to validate your changes.
1. Always run `npm run typecheck` to validate your changes.
1. Always run `npm run format` to validate your changes.
1. Always run `npm run lint` to validate your changes.
1. Prefer concise code -- take extra time to see if you can turn verbose code you generate into something more concise and readable.
1. Prefer inlining variables/functions when used less than 3 times. Exceptions when logic is complex or for readability.
  * Yardstick: Prefer 3-4 levels of inline nesting to creating variables to pass around.
  * This includes helper functions (don't create a function if it is only used once except to break up code logically).
1. Prefer `!= null` for null/undefined checks.
1. Strongly prefer functional programming style over imperative except when readability is significantly improved.
1. When defining a function, prefer `const name = (args) => {}` over `function name(args) {}`. There are cases when this isn't desired:
  * Overloading functions
  * When the function is used as a method on a class or object
  * A generator function

1. The goal of the project is to be TYPE-SAFE and expressive. Don't just remove type checks/tests because the "functionality works" (i.e., at runtime). Proper typing is as import as runtime correctness.
