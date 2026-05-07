import { client } from "../server/api";

const result = client.run(async (api) => {
  // Different widget, same backend. The Api class hasn't grown — this
  // composes against the existing schemas.

  const user = await api.currentUser();
  // Inventory pressure: stock at or below the threshold, joined to
  // each position's location for display.
  return user.inventory()
    .where(({ inventory_positions: p }) => p.on_hand["<="]("10"))
    .select(({ inventory_positions: p }) => ({
      sku: p.sku,
      on_hand: p.on_hand,
      reserved: p.reserved,
      location: p.location().select(({ locations }) => ({ name: locations.name })).scalar(),
    }))
    .orderBy(({ inventory_positions: p }) => p.on_hand)
    .debug()
    .live(api.db);
});

output(result);
