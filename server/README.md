# Topcon THA API Server

A simple Express.js API server that provides sample data for the Topcon THA application.

## Features

- **GET** `/profiles/next` - Get the next profile in the queue
- **POST** `/profiles/:id/decide` - Make a decision (like/dislike) on a profile
- **POST** `/profiles/reset` - Reset the profile queue to start from the beginning
- **GET** `/health` - Health check endpoint

## Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the server:
   ```bash
   bun run start
   ```

   Or for development with auto-restart:
   ```bash
   bun run dev
   ```

The server will start on `http://localhost:3001` by default.

## API Endpoints

### GET /profiles/next
Returns the next profile in the queue. Returns `204 No Content` when no more profiles are available.

**Response:**
```json
{
  "id": "1",
  "name": "Gianni",
  "age": 28,
  "bio": "Coffee lover and hiker",
  "photoUrl": "https://picsum.photos/seed/1/600/800?webp"
}
```

### POST /profiles/:id/decide
Make a decision on a profile. The decision can be either "like" or "dislike".

**Request Body:**
```json
{
  "decision": "like"
}
```

**Response:**
```json
{
  "matched": true
}
```

**Matching Logic:** Profiles with even ages will like you back when you like them.

### POST /profiles/reset
Reset the profile queue to start from the beginning.

**Response:**
```json
{
  "message": "Profiles reset successfully"
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Configuration

You can change the port by setting the `PORT` environment variable:

```bash
PORT=3002 bun run start
```

## Frontend Integration

Update your frontend environment to use this server:

```typescript
// In your env.ts or similar
export const API_BASE_URL = 'http://localhost:3001';
```

## Sample Data

The server includes 5 sample profiles with realistic data and WebP images from Picsum Photos. The profiles are served in sequence, and the queue advances after each decision is made.
