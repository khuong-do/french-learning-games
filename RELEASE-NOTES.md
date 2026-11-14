# Language Learning Games — release audit

- Source: user-supplied french-learning-games.zip (14 Nov 2026).
- Shared scoring: displayed score/max and first-try accuracy, 1–3 stars based on 70%/90% accuracy, levels Explorer/Skilled/Expert, collectible badge item; local best accuracy per language and game.
- Mission Digestion retains 270 maximum points (100 + 70 + 100). Mission 2 grants its 70 points **only when correct on first check**; subsequent attempts remain available for learning.
- Supermarché compares displayed token sequences instead of original token indices, so duplicate tokens are handled correctly.
- All 11 main HTML pages load shared analytics.js and rewards.js; all 8 games include Facebook link.
- GA4 G-JXNH96HZ0Q is activated automatically after the user has opted in. A single persistent opt-in/decline choice prevents repeated prompts. This is necessary for standard GA4 under EU/France rules; do not silently turn GA4 on before consent. A preference control allows changing the choice.
- Event naming: game_start, answer, mission_complete, game_complete, game_replay, share_result (where implemented).

## Repository integration checks

- Imported the supplied standardized ZIP unchanged in the first commit; follow-up fixes are isolated in a second commit.
- Fixed the four kitchen games to send events through the shared analytics helper.
- Removed duplicate shared script loads from the two category pages.
- Analytics opt-out now stops event forwarding in the current page and sets the GA disable flag; re-enabling reuses the existing loader.
- Digestion uses one game ID across events and the shared first-try reward stars instead of a conflicting score-based star display.
- Validation: all local links/assets on 13 HTML pages resolve; all inline/external JavaScript passes syntax checks; dependency-free DOM-stub tests cover all eight games, perfect runs, replay resets, supermarket retries, Digestion mission-2 retries (200/270), reward accuracy, event counts, and consent event gating.
- Run checks from the repository root: `python3 tests/check_release.py` followed by `node tests/logic.cjs` (Python 3 and Node.js required).
- Full browser/layout QA and live GA4 delivery are not verified: Chromium could not start in the execution environment (socket permission denied). Tests use a minimal DOM stub and do not establish real-browser rendering or GA server receipt.
