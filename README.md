## Tinder-like Prototype (Like/Dislike Only)

Production-ready prototype using React + Vite + TypeScript + MUI. It implements a like/dislike flow with a real backend API.

### 🚀 Production Ready

This application is **production-ready** and can be deployed to any environment without code changes:
- ✅ **Environment variable configuration** - Just set `VITE_API_BASE_URL` for your API
- ✅ **No hardcoded URLs** - All API endpoints are configurable
- ✅ **Standard build process** - Works with any deployment platform

### 🏃‍♂️ Quick Start

- Install: `bun install`
- Dev: `bun run dev`
- Build: `bun run build`
- Test (100% coverage): `bun run test:coverage`

### Environment Configuration

Configure via environment variables:

- `VITE_API_BASE_URL`: base URL for backend, e.g. `https://api.example.com`

**Note**: `VITE_API_BASE_URL` is required for the application to function.

Copy `env.example` to `.env` and set your API URL:
```bash
cp env.example .env
```

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
- The application requires a running backend server to function
- Ensure your backend implements the required API endpoints as specified in the API Contract section
