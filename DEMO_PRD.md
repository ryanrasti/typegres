# SMB Ops Demo PRD

## Goal

Build a small, credible SMB operations app that demonstrates Typegres's core value:

- clients compose new query shapes on demand
- those queries stay capability-bounded
- odd aggregates / layout-specific views don't require bespoke backend endpoints
- the same custom shapes can become live when needed
- optional: a widget can be vibe-coded from a prompt

This is **not** a full WMS. It is a thin "ops cockpit" for a fulfillment-style SMB.

## Product framing

**Pitch:** SMB software dies by a thousand custom screens, reports, and exception queues. Typegres keeps a shared system of record while letting clients compose the weird, screen-specific views they need directly.

## Scope

### In
- Orders / inventory / shipments flavored domain
- Multiple operator dashboards
- Configurable widgets with nontrivial query shapes
- One or two live operational queues
- One prompt-to-widget flow as a bonus demo

### Out
- Full warehouse workflows
- Real integrations
- Billing / tenancy / permissions depth
- Full low-code builder
- Theme / site editing

## Core data model

Keep it small and legible.

- `customers`
- `orders`
- `order_lines`
- `inventory_positions`
- `shipments`
- `locations`

Optional if needed:
- `inventory_adjustments`
- `tasks` or `exceptions`

## User roles in demo

Only use these as page/view framing; don't overbuild auth.

- Ops lead
- Inventory control
- Account manager

## Pages

## 1. Landing page

### Purpose
Explain the problem and show why the app exists.

### Functionality
- Headline: shared system of record + custom operational views
- Short before/after explanation:
  - normal stack: new widget => backend ticket
  - Typegres: client composes the shape it needs
- Static screenshot or short animation of dashboard widgets changing
- CTA into the demo app

### Typegres-specific points
- Must clearly say **"clients compose the query shape they need"**
- Must contrast against bespoke endpoints / resolvers
- Mention live queries briefly, but as a supporting point

## 2. Overview dashboard

### Purpose
Primary demo screen. Show several operational widgets at once.

### Functionality
- Top KPIs:
  - orders due today
  - unallocated orders
  - shipments missed cutoff
- Widget grid with 3-4 configurable widgets
- Widget controls:
  - scope
  - filter
  - group by
  - metric
  - sort
  - live on/off
- Save widget layout locally for demo polish

### Example widgets
- Orders at risk by customer
- Orders by carrier cutoff window
- Inventory pressure by location
- Unshipped high-priority orders with low stock

### Typegres-specific points
- This page is the main proof that **layout drives query shape**
- At least one widget should use:
  - relation traversal
  - aggregate
  - filter based on another table
- Controls should visibly alter the query shape, not just cosmetics

## 3. Orders page

### Purpose
Show that regular app screens also need odd, dynamic read shapes.

### Functionality
- Table of orders with filters:
  - customer
  - status
  - ship-by window
  - risk state
- Layout toggle:
  - plain table
  - grouped summary
  - exception-focused view
- Right sidebar widget area tied to current filter context
- Order detail drawer

### Example sidebar widgets
- Open orders at risk for current customer set
- Orders missing inventory by ship date bucket
- Orders with split inventory across locations

### Typegres-specific points
- Show a screen where a late product ask would normally require a new endpoint
- Layout toggle should produce visibly different selected/aggregated shapes
- Order detail drawer should include a context widget derived from current order

## 4. Inventory page

### Purpose
Show more relational / aggregate-heavy operational views.

### Functionality
- Inventory table with filters:
  - low stock
  - location
  - recent movement / recent adjustment
- Summary widgets above the table
- Hotspot list for SKUs likely to impact open orders
- Drill into one SKU/location combo

### Example widgets
- Low stock SKUs affecting open orders
- Inventory imbalance by location
- Recent adjustments on high-demand SKUs

### Typegres-specific points
- Good place for ugly but convincing queries:
  - inventory constrained **and** tied to open orders
  - grouped by location/customer/SKU
- This page should make it obvious that client-composed ops queries are more than CRUD

## 5. Shipments / cutoffs page

### Purpose
Best page for live operational views.

### Functionality
- Queue of shipments approaching carrier cutoff
- Group by carrier / warehouse / cutoff bucket
- Live toggle for one queue or widget
- Alert-style list of orders likely to miss ship SLAs

### Example live widgets
- Orders nearing cutoff with no shipment created
- Shipments by carrier cutoff bucket
- Live queue of delayed orders with all inventory allocated

### Typegres-specific points
- This is where **"random live query because the layout needs it"** lands
- Use one clearly custom live query, not a generic feed
- Show that live is applied to the same kind of custom shape used elsewhere

## 6. Widget builder page

### Purpose
Make the composition story explicit.

### Functionality
- Simple form to create a widget:
  - entity/scope
  - filter set
  - group by
  - metric
  - sort
  - live
- Preview panel rendering the widget
- Save to dashboard button

### Typegres-specific points
- This page should scream:
  - no backend endpoint was added
  - frontend invented a new view shape
- Keep the builder constrained and app-native, not BI-generic
- Avoid exposing raw SQL or schema internals

## 7. Prompt-to-widget page (bonus)

### Purpose
Show vibe-coding as a consequence of the composable query surface.

### Functionality
- Prompt box: "Show me high-risk orders grouped by customer"
- Generate a widget config + render result
- Let user edit generated controls after creation

### Typegres-specific points
- Must be framed as **bonus**, not the core story
- The interesting thing is not AI-generated UI; it's that the generated widget can ask for a novel query shape safely
- Reuse the same widget model as the manual builder page

## Demo flow

Keep the live demo short.

1. Landing page: explain the problem
2. Overview dashboard: show configurable widgets
3. Orders page: show a layout-specific weird query
4. Shipments page: toggle a custom widget to live
5. Widget builder: create a new operational widget on demand
6. Optional: prompt-to-widget as the closing wow moment

## Typegres-specific requirements

These are the non-negotiables.

### 1. Client-composed query shapes
Must be visible in the product, not just described.

### 2. Capability-bounded access
The app should feel app-native, not like arbitrary SQL over raw tables.

### 3. Layout-driven aggregates
At least 2-3 widgets should obviously exist because the screen wants them.

### 4. One clearly custom live query
Not a generic activity feed.

### 5. Reusable widget model
Manual builder and prompt builder should map to the same query-composition layer.

## Success criteria

The demo works if a viewer walks away thinking:

- "Those widgets are too custom for bespoke endpoints."
- "The client is clearly inventing query shapes on demand."
- "Live applies to custom queries, not just canned feeds."
- "This would be useful anywhere software gets crushed by customer-specific ops views."

## Anti-goals

Avoid making the demo feel like:

- a generic BI tool
- a low-code website builder
- a full WMS replacement
- an AI UI gimmick
- a CRUD admin app with charts on top

## Architecture

The app itself should be two main parts:
- Backend:
  * Typegres classes (tables), including:
    * relations
    * state transitions/mutations
- Frontend:
  * Simple React SPA (vite)
