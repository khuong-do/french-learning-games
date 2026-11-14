# Language Learning Games — release audit

- Source: user-supplied french-learning-games.zip (14 Nov 2026).
- Shared scoring: displayed score/max and first-try accuracy, 1–3 stars based on 70%/90% accuracy, levels Explorer/Skilled/Expert, collectible badge item; local best accuracy per language and game.
- Mission Digestion retains 270 maximum points (100 + 70 + 100). Mission 2 grants its 70 points **only when correct on first check**; subsequent attempts remain available for learning.
- Supermarché compares displayed token sequences instead of original token indices, so duplicate tokens are handled correctly.
- All 11 main HTML pages load shared analytics.js and rewards.js; all 8 games include Facebook link.
- GA4 G-JXNH96HZ0Q is activated automatically after the user has opted in. A single persistent opt-in/decline choice prevents repeated prompts. This is necessary for standard GA4 under EU/France rules; do not silently turn GA4 on before consent. A preference control allows changing the choice.
- Event naming: game_start, answer, mission_complete, game_complete, game_replay, share_result (where implemented).
- No live-browser test or live GA4 network confirmation performed. Browser QA remains necessary.
