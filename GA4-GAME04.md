# Google Analytics 4 — Game #04

GA4 measurement ID: `G-JXNH96HZ0Q`.

Both `french/digestion/` and `english/digestion/` now load GA4 (`gtag.js`) and send these events:

- `game_start` — first load and each replay; includes `replay` boolean.
- `mission_complete` — when the player completes each mission (1, 2, 3); includes `mission_number` and `score`.
- `game_complete` — after mission 3; includes `score` and `max_score=270`.
- `game_replay` — when the player clicks the replay button; includes `previous_score`.
- `share_result` — after native sharing or clipboard copy succeeds; includes `score` and `share_method`.

Every event includes `game_id=game_04`, `game_name=mission_digestion`, and `game_language=fr|en`.

GA4 requires internet access and may be blocked by browser privacy tools or consent settings. To test, deploy to GitHub Pages and use GA4 Realtime / DebugView (with debugging enabled). Do not assume analytics is working solely from the presence of the script.
