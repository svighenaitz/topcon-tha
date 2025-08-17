# Dating App API Contract

This document describes the client-backend communication contract for the Dating App. The API is built using REST principles and follows standard HTTP conventions.

## Base URL

```
http://localhost:3001
```

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

## Data Models

### Profile

Represents a user profile in the dating app.

```typescript
interface Profile {
  id: string;           // Unique identifier for the profile
  name: string;         // User's display name
  age: number;          // User's age
  bio: string;          // User's biography/description
  photoUrl: string;     // URL to the user's profile photo
}
```

### LikeDecision

Represents the possible decisions a user can make on a profile.

```typescript
type LikeDecision = 'like' | 'dislike';
```

### DecideResponse

Response returned when a user makes a decision on a profile.

```typescript
interface DecideResponse {
  matched: boolean;     // Whether the decision resulted in a match
}
```

## API Endpoints

### 1. Get Next Profile

Retrieves the next available profile for the user to view.

**Endpoint:** `GET /profiles/next`

**Description:** Returns the next profile in the queue. If no more profiles are available, returns a 204 No Content status.

**Request:**
- Method: `GET`
- Headers: None required
- Body: None

**Response:**

**Success (200 OK):**
```json
{
  "id": "1",
  "name": "John",
  "age": 28,
  "bio": "Coffee lover and hiker",
  "photoUrl": "https://fastly.picsum.photos/id/1/600/800.jpg?hmac=1UH7aH-yUEO8Tq9xKGOCLEyEfu_ZwlxuKm-E8DhKWK8"
}
```

**No More Profiles (204 No Content):**
- Empty response body

**Error Responses:**
- `500 Internal Server Error`: Server error occurred

**Example Usage:**
```bash
curl -X GET http://localhost:3001/profiles/next
```

### 2. Make Decision on Profile

Allows the user to like or dislike a profile and determines if there's a match.

**Endpoint:** `POST /profiles/{id}/decide`

**Description:** Submits a decision (like/dislike) for a specific profile and returns whether it resulted in a match.

**Request:**
- Method: `POST`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "decision": "like"  // or "dislike"
}
```

**Response:**

**Success (200 OK):**
```json
{
  "matched": true
}
```

**Error Responses:**
- `400 Bad Request`: Invalid decision value (must be "like" or "dislike")
- `404 Not Found`: Profile with the specified ID not found
- `500 Internal Server Error`: Server error occurred

**Example Usage:**
```bash
curl -X POST http://localhost:3001/profiles/1/decide \
  -H "Content-Type: application/json" \
  -d '{"decision": "like"}'
```

### 3. Reset Profiles

Resets the profile queue to start from the beginning.

**Endpoint:** `POST /profiles/reset`

**Description:** Resets the internal profile index to 0, allowing users to view all profiles again from the beginning.

**Request:**
- Method: `POST`
- Headers: None required
- Body: None

**Response:**

**Success (200 OK):**
```json
{
  "message": "Profiles reset successfully"
}
```

**Error Responses:**
- `500 Internal Server Error`: Server error occurred

**Example Usage:**
```bash
curl -X POST http://localhost:3001/profiles/reset
```

### 4. Health Check

Provides a simple health check endpoint to verify the API is running.

**Endpoint:** `GET /health`

**Description:** Returns the current status of the API server.

**Request:**
- Method: `GET`
- Headers: None required
- Body: None

**Response:**

**Success (200 OK):**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Example Usage:**
```bash
curl -X GET http://localhost:3001/health
```

## Error Handling

All endpoints follow consistent error handling patterns:

### Error Response Format

```json
{
  "error": "Error message describing what went wrong"
}
```

### HTTP Status Codes

- `200 OK`: Request successful
- `204 No Content`: Request successful but no content to return
- `400 Bad Request`: Invalid request data
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Rate Limiting

Currently, no rate limiting is implemented. In a production environment, consider implementing rate limiting to prevent abuse.

## CORS

The API supports Cross-Origin Resource Sharing (CORS) and is configured to allow requests from any origin for development purposes.

## Matching Logic

The current matching logic is simplified for demonstration purposes:
- A match occurs when a user likes a profile and the profile's age is even
- This is a mock implementation and should be replaced with more sophisticated matching algorithms in production

## Development Notes

### Mock Data

The API uses mock data for demonstration purposes. In production, this should be replaced with a proper database.

### Profile Queue

Profiles are served sequentially from a predefined list. Once all profiles have been viewed, the API returns a 204 status until the queue is reset.

### State Management

The API maintains a simple in-memory state for the current profile index. In a production environment, this should be replaced with proper session management or user-specific state storage.

## Client Integration

### TypeScript Types

The client application uses the following TypeScript interfaces that match the API contract:

```typescript
// From src/types/index.ts
export interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  photoUrl: string;
}

export type LikeDecision = 'like' | 'dislike';

export interface DecideResponse {
  matched: boolean;
}
```

### Service Layer

The client implements a service layer (`src/services/profileService.ts`) that provides a clean interface to the API:

```typescript
export interface ProfileService {
  fetchNextProfile(): Promise<Profile | null>;
  decide(profileId: string, decision: LikeDecision): Promise<DecideResponse>;
  reset(): Promise<void>;
}
```