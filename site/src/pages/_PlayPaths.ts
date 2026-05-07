// Shared widget path constants. Lives in its own file (no imports
// of `client` / runtime / schemas) so the eager shell can read them
// without dragging the PGlite-bound dep chain into the synchronous
// bundle.
export const ORDERS_PATH = "widgets/orders.ts";
export const INVENTORY_PATH = "widgets/inventory.ts";
