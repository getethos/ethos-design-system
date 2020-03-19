/**
 * Blueprint for Q2 2020 Type transition to new font sizes and styles.
 *
 *
 * Name proposals
 * --------------------------
 * Type refers to the current soon to be "legacy" Type components.
 * We need something to differentiate from our current Type component while transitioning.
 *   - TypeTwo (working prototype in this doc & files)
 *   - Type2020 / TwentyType
 *   - TypeNew / NewType
 *   - TrendyType
 *   - ???
 *
 * Should we append the new name to the end of TypeTwo components like below?
 * TitleSmall vs TitleSmallTwo
 *
 * Should we rename Type to TypeLegacy or similar?
 *
 *
 * Problems to solve
 * --------------------------
 * Provide access for developers to the new Type styles while maintaining backwards compatability.
 *
 * Allow for a slow rollout to minimize the risk of things breaking.
 *
 * Make transitioning as seamless as possible, existing components should work without any developer
 * interference aside from setting a new import name for the component.
 * Ex: import TypeTwo.TitleXLarge as TitleXLarge
 *
 * Allow for easy deprecation of the legacy Type styles once all components are ready to 'upgrade'.
 *
 * Fix things we don't like about the current Type system and add things we wish we had.
 *   - Less rigidity for passing extra properties like className
 *   - ???
 *
 *
 * Specifications from design
 * --------------------------
 *
 * Spreadsheet:
 * https://docs.google.com/spreadsheets/d/1LiKYSuW5Lfh24OjT8e0WgNLcxuAZrFlbzmw_NJjUNOo/edit?usp=sharing
 *
 * The spreadsheet has the naming of deprecated Type components like <TitleXLarge.Serif.Book500/>,
 * the new CSS styles, and a mapping of remaining/new Type components to each viewport size.
 *
 * A lot of consolidation of responsive resizing between viewports, ideally we're working more
 * consistently with just two breakpoints (phone) vs (lablet/laptop/desktop).
 *
 *
 *
 * Engineering spec
 * --------------------------
 * In order of operations.
 *
 * 1. Create a BaseType for the legacy Type component. Change the exports from the EDS index.
 *    Should be it's own PR.
 *    Nothing should change visually.
 *    This should be deployable on it's own to consumers to prove there is no regression.
 *
 * 2. Fork BaseType and build TypeTwo with a single component POC, deployable to consumers.
 *
 *    When a new component is available in TypeTwo, EDS should warn the consumer to check if they
 *    can switch if it sees them implement an instance of the matching legacy Type component.
 *
 *    Test this component and deprecation feature by updating a CMS module from the bulk modules
 *    update ticket.
 *
 * 3. Build remaining TypeTwo components needed for high priority consumer tickets.
 *
 * 4. Build any TypeTwo components still remaining.
 *
 * 5. Rollout deprecation strategy and encourage developers to stop using legacy Type entirely and
 *    actively replace legacy components with TypeTwo components.
 *
 * 6. Once deprecation is complete, remove legacy Type (it will 'live on' through BaseType) and
 *    rename TypeTwo to Type.
 *
 *
 *
 * Engineering progress
 * --------------------------
 * (March 18) 1
 * (March 19) 1 -> 2
 *
 *  1 |  [-2-]  |  3  |  4  |  5  |  6
 */
