# Technical Specification: Romantic Quest Web Application

## Complexity Assessment
**Level: Medium**

**Reasoning:**
- Spring Boot project setup from scratch with proper structure
- Multiple interactive pages with different UI/UX patterns
- Client-side animations and JavaScript interactions
- Session management for quest progression tracking
- Static resource serving (images, CSS, JS)
- Moderate frontend complexity with modals, carousels, and animations
- No complex backend logic or database persistence required

---

## Technical Context

### Technology Stack
- **Framework:** Spring Boot 3.2.x
- **Java Version:** 17+ (LTS)
- **Template Engine:** Thymeleaf
- **Build Tool:** Maven
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Database:** H2 in-memory (optional, for session/progress tracking)
- **Server:** Embedded Tomcat (via Spring Boot)

### Dependencies
```xml
- spring-boot-starter-web (REST controllers, embedded server)
- spring-boot-starter-thymeleaf (template rendering)
- spring-boot-starter-test (testing framework)
- spring-session-core (optional, for session management)
- h2 (optional, in-memory database)
```

---

## Implementation Approach

### Architecture Pattern
**MVC (Model-View-Controller)** with Spring Boot conventions:
- **Controllers:** Handle HTTP requests and return view names
- **Views:** Thymeleaf templates in `src/main/resources/templates/`
- **Static Resources:** CSS, JS, images in `src/main/resources/static/`
- **Models:** Simple POJOs for quest state (no persistence needed initially)

### Application Flow
```
1. User visits "/" → Welcome/Choice page with animated hearts
2. User clicks any button → Modal popup → "Start our Journey" button
3. Navigate to "/quest/bitwise" → First puzzle (XOR operation)
4. On success → "/quest/base64" → Second puzzle (decode message)
5. On success → "/quest/ascii" → Third puzzle (ASCII art display)
6. On completion → "/reward" → Photo carousel with music
```

### Session Management
Use HTTP session to track:
- Current quest stage
- Puzzle completion status
- Optional: Timestamp for "time to complete"

---

## Source Code Structure

### Project Structure (Maven Standard)
```
romantic-quest/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/com/romanticquest/
│   │   │   ├── RomanticQuestApplication.java (main class)
│   │   │   ├── controller/
│   │   │   │   ├── HomeController.java
│   │   │   │   ├── QuestController.java
│   │   │   │   └── RewardController.java
│   │   │   ├── service/
│   │   │   │   └── QuestService.java (quest logic)
│   │   │   └── model/
│   │   │       └── QuestProgress.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── templates/
│   │       │   ├── index.html (The Choice page)
│   │       │   ├── quest-bitwise.html
│   │       │   ├── quest-base64.html
│   │       │   ├── quest-ascii.html
│   │       │   └── reward.html
│   │       └── static/
│   │           ├── css/
│   │           │   ├── style.css (global styles)
│   │           │   └── hearts.css (animation)
│   │           ├── js/
│   │           │   ├── hearts.js (canvas/CSS animation)
│   │           │   ├── quest.js (puzzle logic)
│   │           │   └── carousel.js (photo gallery)
│   │           ├── images/
│   │           │   └── (photo files for carousel)
│   │           └── audio/
│   │               └── background-music.mp3
│   └── test/
│       └── java/com/romanticquest/
│           ├── controller/
│           │   ├── HomeControllerTest.java
│           │   └── QuestControllerTest.java
│           └── service/
│               └── QuestServiceTest.java
└── .gitignore
```

### Files to Create

#### Java Files (Backend)
1. **RomanticQuestApplication.java**
   - Spring Boot main application class with `@SpringBootApplication`
   - Standard `main()` method

2. **HomeController.java**
   - `GET /` → Returns "index" view
   - `POST /start-journey` → Initializes session, redirects to first quest

3. **QuestController.java**
   - `GET /quest/bitwise` → Returns bitwise puzzle view
   - `POST /quest/bitwise` → Validates XOR answer, redirects on success
   - `GET /quest/base64` → Returns base64 puzzle view
   - `POST /quest/base64` → Validates decoded message, redirects on success
   - `GET /quest/ascii` → Returns ASCII art view
   - `POST /quest/ascii` → Marks quest complete, redirects to reward

4. **RewardController.java**
   - `GET /reward` → Returns carousel view (only if quest is complete)

5. **QuestService.java**
   - `generateBitwiseChallenge()` → Returns two random numbers
   - `validateXorAnswer(int num1, int num2, int answer)` → Boolean
   - `getBase64EncodedMessage()` → Returns encoded "I love you" message
   - `validateBase64Answer(String decoded)` → Boolean
   - `getAsciiHeartArt()` → Returns pre-generated ASCII heart string

6. **QuestProgress.java** (Session-scoped bean)
   - Fields: `currentStage`, `bitwiseCompleted`, `base64Completed`, `asciiCompleted`
   - Methods: `isQuestComplete()`, `markStageComplete(String stage)`

#### Thymeleaf Templates (Frontend Views)
1. **index.html**
   - Hero section with title "The Choice"
   - 3 buttons: "Yes!", "Definitely Yes!", "Of course!"
   - Modal popup (hidden by default) with "I love you too, my love!" message
   - "Start our Journey" button → POST to `/start-journey`
   - Falling hearts animation (canvas or CSS)

2. **quest-bitwise.html**
   - Display two numbers in binary format
   - Input field for XOR result
   - Submit button → POST to `/quest/bitwise`
   - Error message area for wrong answers

3. **quest-base64.html**
   - Display encoded Base64 string
   - Input field for decoded message
   - Submit button → POST to `/quest/base64`
   - Hint: "Decode this to continue"

4. **quest-ascii.html**
   - Display ASCII heart art in `<pre>` tag
   - "Continue to Reward" button → POST to `/quest/ascii`

5. **reward.html**
   - Photo carousel/slideshow
   - Navigation buttons (prev/next)
   - Optional: Background music player with play/pause button
   - Congratulations message

#### Static Resources (CSS/JS)
1. **style.css**
   - Global styles (fonts, colors, layout)
   - Button styles with hover effects
   - Modal styling
   - Responsive design basics

2. **hearts.css**
   - CSS keyframe animations for falling hearts
   - Positioning and z-index management

3. **hearts.js**
   - Canvas rendering logic (alternative to pure CSS)
   - Random heart generation and animation loop

4. **quest.js**
   - Form validation
   - AJAX submission (optional, can use standard form POST)
   - Error handling and display

5. **carousel.js**
   - Image carousel logic (auto-advance, manual navigation)
   - Dot indicators for current slide

#### Configuration Files
1. **pom.xml**
   - Spring Boot parent dependency
   - Web, Thymeleaf, Test dependencies
   - Maven compiler plugin (Java 17+)

2. **application.properties**
   - Server port (default 8080)
   - Thymeleaf configuration (caching disabled for dev)
   - Session timeout settings
   - H2 console settings (optional)

3. **.gitignore**
   - Maven standard ignores: `target/`, `*.class`, etc.
   - IDE files: `.idea/`, `*.iml`, `.vscode/`
   - Log files: `*.log`

---

## Data Model / API

### Session Attributes
```java
@SessionAttributes("questProgress")
public class QuestController {
    // Session stores QuestProgress object
}
```

**QuestProgress Model:**
```java
public class QuestProgress {
    private String currentStage;      // "bitwise", "base64", "ascii", "complete"
    private boolean bitwiseCompleted;
    private boolean base64Completed;
    private boolean asciiCompleted;
    private LocalDateTime startTime;  // optional
    
    public boolean isQuestComplete() {
        return bitwiseCompleted && base64Completed && asciiCompleted;
    }
}
```

### REST Endpoints (Controller Methods)

| Method | Endpoint | Request Body | Response | Description |
|--------|----------|--------------|----------|-------------|
| GET | `/` | - | HTML view | Welcome page with button trap |
| POST | `/start-journey` | - | Redirect to `/quest/bitwise` | Initialize session |
| GET | `/quest/bitwise` | - | HTML view | Display XOR puzzle |
| POST | `/quest/bitwise` | `answer=<int>` | Redirect or error | Validate answer |
| GET | `/quest/base64` | - | HTML view | Display Base64 puzzle |
| POST | `/quest/base64` | `decoded=<string>` | Redirect or error | Validate decoded message |
| GET | `/quest/ascii` | - | HTML view | Display ASCII heart |
| POST | `/quest/ascii` | - | Redirect to `/reward` | Mark quest complete |
| GET | `/reward` | - | HTML view | Photo carousel (requires complete quest) |

### Validation Logic
- **Bitwise:** `num1 XOR num2 == userAnswer`
- **Base64:** Case-insensitive match: `decoded.equalsIgnoreCase("I love you")`
- **ASCII:** No validation, just display → continue
- **Reward access:** Check `questProgress.isQuestComplete()` in controller

---

## Frontend Features Implementation

### 1. Falling Hearts Animation
**Option A: Pure CSS (simpler, recommended)**
- Create 10-15 `<div>` elements with heart emoji ❤️ or SVG
- Use CSS `@keyframes` for falling effect
- Randomize `animation-delay` and `left` position via inline styles or JS

**Option B: Canvas + JavaScript (more control)**
- Draw hearts on `<canvas>` element
- `requestAnimationFrame()` loop
- Random x-position, varying speeds

### 2. Modal Popup
- Hidden by default (`display: none`)
- Show on button click via JavaScript (`modal.style.display = 'block'`)
- Overlay with semi-transparent background
- Close button (optional) or click outside to close

### 3. Button Hover Effects
- CSS `:hover` pseudo-class
- `transform: scale(1.1)` for enlargement
- `transition: all 0.3s ease` for smooth animation

### 4. Photo Carousel
- Container with `overflow: hidden`
- Inner wrapper with `display: flex`, slides positioned side-by-side
- JavaScript to translate wrapper left/right
- Auto-advance with `setInterval()` (optional)
- Pause on hover

### 5. Background Music
- `<audio>` element with controls
- Autoplay disabled by default (browser policy)
- Button to play/pause manually
- Volume control

---

## Verification Approach

### Build and Run
```bash
# Clean and compile
mvn clean compile

# Run application
mvn spring-boot:run

# Or run from IDE
# Right-click RomanticQuestApplication.java → Run
```

**Expected:** Application starts on `http://localhost:8080`

### Manual Testing Checklist
1. **Home Page (`/`)**
   - [ ] Page loads with falling hearts animation
   - [ ] All three buttons are visible
   - [ ] Clicking any button shows modal
   - [ ] "Start our Journey" button in modal works

2. **Bitwise Quest (`/quest/bitwise`)**
   - [ ] Two numbers displayed in binary
   - [ ] Correct XOR answer advances to next stage
   - [ ] Incorrect answer shows error message

3. **Base64 Quest (`/quest/base64`)**
   - [ ] Base64 string displayed
   - [ ] Decoding "I love you" advances
   - [ ] Case-insensitive validation works

4. **ASCII Quest (`/quest/ascii`)**
   - [ ] Heart art displays properly in `<pre>` tag
   - [ ] Continue button works

5. **Reward Page (`/reward`)**
   - [ ] Accessible only after quest completion
   - [ ] Photos load and display correctly
   - [ ] Carousel navigation works (prev/next)
   - [ ] Music player controls functional

6. **Session Management**
   - [ ] Accessing `/reward` directly (without completing quest) redirects or shows error
   - [ ] Progress persists across page refreshes (same session)

### Automated Testing
**Unit Tests (JUnit 5 + Mockito):**
1. **QuestServiceTest.java**
   - Test `validateXorAnswer()` with various inputs
   - Test `validateBase64Answer()` with correct/incorrect values
   - Test `getAsciiHeartArt()` returns non-null string

2. **Controller Tests (MockMvc)**
   - Test `GET /` returns 200 and contains "The Choice"
   - Test `POST /start-journey` initializes session and redirects
   - Test `POST /quest/bitwise` with correct answer redirects to base64
   - Test `POST /quest/bitwise` with wrong answer returns same page with error
   - Test `GET /reward` without completed quest redirects or returns 403

**Run Tests:**
```bash
mvn test
```

### Code Quality
```bash
# Compile without running (check for errors)
mvn compile

# Run tests with coverage (if JaCoCo plugin added)
mvn test jacoco:report
```

**IntelliJ IDEA:**
- Use built-in "Run" button (green triangle)
- Check "Problems" panel for errors
- Use "Analyze" → "Inspect Code" for quality checks

---

## Non-Functional Requirements

### Performance
- Page load time < 2 seconds (local dev)
- Animations run at 60 FPS (smooth, no jank)

### Compatibility
- Modern browsers: Chrome, Firefox, Edge (latest 2 versions)
- Responsive design for desktop/tablet (mobile optional)

### Security
- No sensitive data stored
- Session timeout after 30 minutes of inactivity
- CSRF protection enabled by default (Spring Security not needed for this app)

### Usability
- Clear instructions on each puzzle page
- Error messages are user-friendly
- Visual feedback on button clicks

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Browser autoplay blocks music | Medium | Provide manual play button, show instruction |
| Animation performance on low-end devices | Low | Use CSS animations (GPU-accelerated) instead of JS |
| User skips quest stages via URL manipulation | Medium | Validate session state in controllers, redirect if incomplete |
| Images too large, slow load times | Low | Compress images, use web-optimized formats (WebP, JPEG) |
| Spring Boot version incompatibility | Low | Use latest stable release (3.2.x), test before deployment |

---

## Future Enhancements (Out of Scope)
- Persistent storage of completion times (leaderboard)
- Multiple difficulty levels for puzzles
- Mobile-responsive design
- Sharing results on social media
- Additional puzzle types (e.g., Fibonacci sequence, sorting algorithms)
- User authentication (login to save progress)

---

## Summary
This is a **medium complexity** project requiring:
- Spring Boot application setup from scratch
- 5 Thymeleaf templates with distinct UI patterns
- 3 Java controllers and 1 service class
- Frontend animations and interactions (hearts, modal, carousel)
- Session-based state management
- Manual and automated testing

**Estimated Effort:** 6-8 hours for a developer familiar with Spring Boot and Thymeleaf.

**Critical Path:**
1. Project setup (Maven, dependencies)
2. Controllers and routing
3. Thymeleaf templates (HTML structure)
4. CSS styling and animations
5. JavaScript interactions (modal, carousel)
6. Testing and debugging
