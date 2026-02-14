# Spec and build

## Configuration
- **Artifacts Path**: {@artifacts_path} → `.zenflow/tasks/{task_id}`

---

## Agent Instructions

Ask the user questions when anything is unclear or needs their input. This includes:
- Ambiguous or incomplete requirements
- Technical decisions that affect architecture or user experience
- Trade-offs that require business context

Do not make assumptions on important decisions — get clarification first.

---

## Workflow Steps

### [x] Step: Technical Specification
<!-- chat-id: fe5a2387-944c-436a-a1ea-e5f758abe90f -->

Assess the task's difficulty, as underestimating it leads to poor outcomes.
- easy: Straightforward implementation, trivial bug fix or feature
- medium: Moderate complexity, some edge cases or caveats to consider
- hard: Complex logic, many caveats, architectural considerations, or high-risk changes

Create a technical specification for the task that is appropriate for the complexity level:
- Review the existing codebase architecture and identify reusable components.
- Define the implementation approach based on established patterns in the project.
- Identify all source code files that will be created or modified.
- Define any necessary data model, API, or interface changes.
- Describe verification steps using the project's test and lint commands.

Save the output to `{@artifacts_path}/spec.md` with:
- Technical context (language, dependencies)
- Implementation approach
- Source code structure changes
- Data model / API / interface changes
- Verification approach

If the task is complex enough, create a detailed implementation plan based on `{@artifacts_path}/spec.md`:
- Break down the work into concrete tasks (incrementable, testable milestones)
- Each task should reference relevant contracts and include verification steps
- Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint, write tests for a module). Avoid steps that are too granular (single function).

Important: unit tests must be part of each implementation task, not separate tasks. Each task should implement the code and its tests together, if relevant.

Save to `{@artifacts_path}/plan.md`. If the feature is trivial and doesn't warrant this breakdown, keep the Implementation step below as is.

---

### [x] Step: Project Setup & Configuration
<!-- chat-id: 9c31b937-ded9-4083-8ca0-a6fe10e62dc4 -->

Set up the Spring Boot project structure with all necessary dependencies and configuration files.

**Tasks:**
- Create Maven project with Spring Boot parent (version 3.2.x)
- Add dependencies: spring-boot-starter-web, spring-boot-starter-thymeleaf, spring-boot-starter-test
- Create main application class (RomanticQuestApplication.java)
- Configure application.properties (server port, Thymeleaf settings, session config)
- Create .gitignore file for Maven/Java/IDE artifacts
- Create directory structure for controllers, services, models, templates, and static resources
- Verify: Application starts successfully with `mvn spring-boot:run`

---

### [x] Step: Core Controllers & Session Management
<!-- chat-id: e1479a3f-cabf-4270-81a6-dd460b22fc98 -->

Implement the controller layer and session-based quest progression tracking.

**Tasks:**
- Create QuestProgress model class (session-scoped bean with completion flags)
- Create HomeController with GET `/` endpoint
- Create QuestController with routes for all three puzzle stages
- Create RewardController with GET `/reward` endpoint (with quest completion guard)
- Implement POST handlers for puzzle validation and progression
- Add session initialization in `/start-journey` endpoint
- Write unit tests for controllers using MockMvc
- Verify: All routes respond correctly, session state persists across requests

---

### [x] Step: Quest Service Logic & Puzzle Generation
<!-- chat-id: b558ffe5-c2d8-41bf-a3ec-0075c4c0b455 -->

Implement the business logic for generating and validating puzzles.

**Tasks:**
- Create QuestService class with puzzle generation methods
- Implement `generateBitwiseChallenge()` - returns two random integers
- Implement `validateXorAnswer()` - validates user's XOR result
- Implement `getBase64EncodedMessage()` - returns Base64 encoded "I love you"
- Implement `validateBase64Answer()` - case-insensitive validation
- Implement `getAsciiHeartArt()` - returns pre-generated ASCII heart string
- Write unit tests for QuestService (test validation logic with edge cases)
- Verify: All tests pass with `mvn test`

---

### [x] Step: Home Page - The Choice (UI & Animation)
<!-- chat-id: bc26d9c8-1742-4843-9cf2-4b2f67b325f5 -->

Create the welcome page with button trap and falling hearts animation.

**Tasks:**
- Create index.html Thymeleaf template with hero section
- Add three buttons: "Yes!", "Definitely Yes!", "Of course!"
- Implement modal popup (hidden by default) with "I love you too" message
- Add "Start our Journey" button in modal (POST to `/start-journey`)
- Create style.css with global styles, button hover effects
- Create hearts.css with CSS keyframe animations for falling hearts
- Create hearts.js to generate and animate falling hearts (10-15 hearts)
- Verify: Page displays correctly, buttons show modal, animation runs smoothly at 60 FPS

---

### [x] Step: Quest Pages - Puzzles (UI & Logic)
<!-- chat-id: 1b5cec8d-efa3-41d5-9390-455de607ad54 -->

Implement the three puzzle pages with their specific UI requirements.

**Tasks:**
- Create quest-bitwise.html with binary number display and answer input
- Create quest-base64.html with encoded string display and decode input
- Create quest-ascii.html with ASCII heart art in `<pre>` tag
- Add quest.js for client-side form validation and error display
- Style puzzle pages consistently (headings, inputs, buttons, error messages)
- Add navigation flow between puzzles (redirects on success, error messages on failure)
- Verify: Each puzzle validates correctly, wrong answers show errors, progression works

---

### [x] Step: Reward Page - Photo Carousel & Music
<!-- chat-id: 30d8b565-9f22-4310-910d-1c5303dd2c2f -->

Create the final reward page with photo slideshow and background music.

**Tasks:**
- Create reward.html Thymeleaf template with carousel container
- Add sample placeholder images to `src/main/resources/static/images/`
- Create carousel.js with slideshow logic (prev/next navigation, auto-advance)
- Add dot indicators for current slide position
- Implement `<audio>` element with background music (manual play button)
- Style carousel with transitions and responsive layout
- Add access guard: redirect to `/` if quest not complete
- Verify: Carousel displays images, navigation works, music plays on user interaction

---

### [x] Step: Testing & Final Verification
<!-- chat-id: 9a763c9b-8d56-4557-9b19-b346e598d58e -->

Comprehensive testing and quality assurance before completion.

**Tasks:**
- Run full test suite: `mvn test` (all tests must pass)
- Perform manual testing checklist (see spec.md verification section)
- Test session management: direct URL access to `/reward` should be blocked
- Test edge cases: invalid inputs, empty forms, special characters
- Verify animations work across browsers (Chrome, Firefox, Edge)
- Check responsive behavior (desktop/tablet sizes)
- Run `mvn clean compile` to ensure no compilation errors
- Document any known issues or browser-specific quirks
- Write completion report to `{@artifacts_path}/report.md`
- Verify: Full application flow works end-to-end without errors
