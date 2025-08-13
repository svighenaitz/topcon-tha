## Tinder-like Prototype (Like/Dislike Only)

Production-ready prototype using React + Vite + TypeScript + MUI. It implements a like/dislike flow with mock API by default and supports switching to a real backend without code changes.

### Run

- Install: `pnpm i` or `npm i`
- Dev: `pnpm dev` or `npm run dev`
- Build: `pnpm build` or `npm run build`
- Test (100% coverage): `pnpm test:coverage` or `npm run test:coverage`

### Environment

Configure via Vite env vars (all optional):

- `VITE_USE_MOCK_API` (default `true`): when `true`, uses in-memory mock service
- `VITE_API_BASE_URL`: base URL for backend, e.g. `https://api.example.com`

No code changes needed across environments. Provide env per stage.

### API Contract (REST)

Base URL: `${VITE_API_BASE_URL}`

1) GET `/profiles/next`
- Returns 200 with a `Profile` JSON body when a profile is available
- Returns 204 when there are no more profiles
- Errors: 5xx or 4xx return JSON `{ message: string }`

Response (200):
```json
{
  "id": "string",
  "name": "string",
  "age": 30,
  "bio": "string",
  "photoUrl": "https://..."
}
```

2) POST `/profiles/{id}/decide`
- Body: `{ "decision": "like" | "dislike" }`
- Returns 200 with `{ matched: boolean }`
- Errors: 404 if profile not found; generic 4xx/5xx with `{ message }`

Request body:
```json
{ "decision": "like" }
```

Response (200):
```json
{ "matched": true }
```

### UI Behavior
- Uses MUI components
- Shows current profile card with Like/Dislike buttons
- On like, if `{ matched: true }`, displays a modal
- When profiles run out, shows a friendly empty state with reload
- Errors show MUI `Alert` with Retry

### Tests
- Unit tests using Vitest and Testing Library
- 100% coverage required by CI command `test:coverage`

### Notes
- Mock data seeds 3 profiles and simulates matches when the other user liked you already (even ages)
