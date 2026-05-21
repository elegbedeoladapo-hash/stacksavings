# Tests — StackSavings

## Running Tests

```bash
npm test
```

All tests are in `src/lib/audit-engine.test.ts` and cover the core audit engine logic.

## Test Suite

### File: `src/lib/audit-engine.test.ts`

| Test | What it covers | Status |
|---|---|---|
| returns zero savings for optimal spend | Verifies that a user paying exactly the right amount gets isOptimal=true and $0 savings | ✅ Pass |
| detects overpayment vs expected price | Verifies that paying more than the plan price triggers a savings recommendation | ✅ Pass |
| detects too many seats vs team size | Verifies that having more seats than team members triggers a reduce-seats recommendation | ✅ Pass |
| recommends downgrade from Cursor Business to Pro for small teams | Verifies the specific Cursor Business → Pro recommendation fires for teams of 2 or fewer | ✅ Pass |
| recommends Claude Pro over Max for non-research use case | Verifies the Claude Max → Pro downgrade recommendation fires for coding/writing use cases | ✅ Pass |
| audit result has correct structure | Verifies the audit result object has all required fields: id, recommendations, totalMonthlySavings, totalAnnualSavings | ✅ Pass |
| annual savings equals monthly savings times 12 | Verifies the math: totalAnnualSavings === totalMonthlySavings × 12 | ✅ Pass |

## Test Results
Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        1.318s

## CI Integration

Tests run automatically on every push to main via GitHub Actions.
See `.github/workflows/ci.yml` for the workflow configuration.
The CI pipeline runs lint + tests and must pass before any merge.

## What's Not Tested (and Why)

- **API routes** (`/api/audit`, `/api/leads`, `/api/summary`) — These require a live Supabase connection and Anthropic API key. Integration tests for these would need a test database. Out of scope for this submission but would be added in week 2.
- **UI components** — No React component tests. The audit engine is the business logic that matters most to test. UI is validated manually.
- **Pricing data accuracy** — Not tested programmatically. Prices are verified manually against vendor URLs and documented in PRICING_DATA.md.