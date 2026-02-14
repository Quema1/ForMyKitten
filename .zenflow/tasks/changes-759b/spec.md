# Technical Specification

## Difficulty: Easy

Small UI text/label changes and a carousel behavior fix across Thymeleaf HTML templates and one JS file.

## Technical Context
- **Language**: Java 17, Spring Boot 3.2.2 with Thymeleaf
- **Frontend**: Static HTML templates + vanilla JS + CSS
- **No build step needed for frontend** — files are served from `src/main/resources/static/` and `src/main/resources/templates/`

## Changes Required

### 1. Remove hint boxes from first two levels (Puzzle 1: Memory Match, Puzzle 2: Binary Decoder)

The blue hint boxes (`.hint` class) appear at the bottom of each puzzle page.

- **`quest-bitwise.html`** (Puzzle 1 — Memory Match): Remove the `<div class="hint">` block at lines 189–191
- **`quest-base64.html`** (Puzzle 2 — Binary Decoder): Remove the `<div class="hint">` block at lines 192–195

### 2. Change labels in the final puzzle (Connect Our Hearts)

In **`quest-api.html`** line 267–273:
- Change `You` → `Mine` in the left endpoint name
- Change `Her` → `Yours` in the right endpoint name

### 3. Remove progress indicator from each level

The `<div class="progress-indicator">` shows "✓ Puzzle 1 | ✓ Puzzle 2 | Puzzle 3 of 4" etc. Remove it from:
- **`quest-bitwise.html`**: No progress indicator present (already absent) — confirm, no action needed
- **`quest-base64.html`**: Lines 163–165
- **`quest-ascii.html`**: Lines 191–193
- **`quest-api.html`**: Lines 256–258

### 4. Remove "Play Our Song" music button from reward page

In **`reward.html`** lines 92–98: Remove the `.music-player` div (button + audio element).

Also in **`carousel.js`**: Remove references to `musicBtn` and `backgroundMusic` (lines 9–10, 93–113) to avoid JS errors.

### 5. Let video play completely — don't auto-advance past the video slide

In **`carousel.js`**: When the current slide is a video slide, pause auto-advance and wait for the video to finish (or be manually skipped) before allowing auto-advance to resume. Currently the carousel auto-advances every 4 seconds regardless of content type.

## Files to Modify

| File | Change |
|------|--------|
| `src/main/resources/templates/quest-bitwise.html` | Remove `.hint` div |
| `src/main/resources/templates/quest-base64.html` | Remove `.hint` div, remove `.progress-indicator` div |
| `src/main/resources/templates/quest-ascii.html` | Remove `.progress-indicator` div |
| `src/main/resources/templates/quest-api.html` | Change "You"→"Mine", "Her"→"Yours"; remove `.progress-indicator` div |
| `src/main/resources/templates/reward.html` | Remove `.music-player` div |
| `src/main/resources/static/js/carousel.js` | Remove music player JS; add video-aware auto-advance logic |

## Verification

- Run `mvnw spring-boot:run` and manually verify each puzzle page and the reward page
- Confirm no JS console errors on reward page after music removal
- Confirm video plays fully without being skipped by auto-advance
