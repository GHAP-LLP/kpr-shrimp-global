# QA & Security

Living document — current state, not a log. See `CHANGELOG.md` for history.

## Testing
- `backend/pytest.ini` + `tests/` exist but coverage unknown — needs review.
- `frontend` has no test files currently (`yarn test` runs but nothing to test).
- `test_result.md` and `test_reports/` exist at repo root — check these for prior test run history before assuming untested.

## Security notes
- Removed `emergentintegrations` (unused dependency, reduced supply-chain surface) — see `decisions.md`.
- No secrets committed to the repo (`MONGO_URL`, `CORS_ORIGINS` are `.env`-only / Render dashboard secrets). Keep it that way.
- No backend is live yet, so no live attack surface currently — revisit this file once Render deployment happens (CORS config, input validation on new endpoints, rate limiting on public forms).
