## Project Plan

### Goals
- Render a 3x3 infographic grid with the human centered (tile 5), using only constructor/prototype patterns (no ES6 classes).
- Populate dinosaur data from `dino.json`; human data comes from the form; pigeon always shows “All birds are dinosaurs.”
- Hide the form on generate; each dino shows species, image, and a randomized fact (mix of base fact, when/where, and human comparisons).

### Data Model (constructor functions)
- `Dino(data)`: species, weight (lbs), height (in), diet (lowercase), where, when, fact (override pigeon), image path derived from species slug.
- `Human(data)`: name, weight (lbs), height (ft + in combined to inches), diet (lowercase), image path fixed.
- Prototypes on `Dino`: `compareWeight(human)`, `compareHeight(human)`, `compareDiet(human)`, `randomFact(human)` that pulls from base fact/when/where + comparisons, but returns fixed pigeon fact.

### Flow
- Load dinos via `fetch("dino.json")` → map to `new Dino`.
- On button click: build `Human` from form values (IIFE helper), shuffle dinos, splice human into index 4, then render tiles to `#grid`.
- Each tile: heading (species or human name), image, fact paragraph only for dinos.
- After render, hide the form container.

### Edge Handling
- Gracefully handle missing human inputs by falling back to generic facts in comparisons.
- Keep random fact selection per dino at render time to diversify facts.

### Quality / Rubric Alignment
- Strip console logs and ensure no errors occur on click.
- Follow Udacity JS style: descriptive names, functions/constructors declared before use, brief comments for non-obvious logic.
- Verify exactly 9 objects are created (7 dinos + pigeon + human) and rendered as tiles with human centered and pigeon fact fixed.
- Manual verification: click “Compare Me!”, form hides, 9 tiles appear, random facts differ on refresh/new input.

### Open Items / Nice-to-haves
- Validate form inputs and show inline errors.
- Add a reset/regenerate control to re-run randomization.
- Unit toggle (metric/imperial) and corresponding comparison tweaks.
