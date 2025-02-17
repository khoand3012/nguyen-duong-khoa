# Live Score Board API Service

## Overview

A backend module for handling real-time updates to a user score leaderboard.

## Requirements

1. Maintain a score board showing the top 10 users by score
2. Provide real-time updates when the score board changes
3. Process score updates from authenticated user actions
4. Prevent unauthorized score modifications

## API Endpoints

### Score Update Endpoint

```
POST /api/v1/scores/update
```

**Request:**
- Requires valid JWT in Authorization header
- Body: `{ "actionId": "string", "timestamp": "number" }`

**Response:**
- Success: `{ "success": true, "newScore": 250, "rank": 7 }`
- Error: Appropriate status code with error message

### Get Leaderboard Endpoint

```
GET /api/v1/leaderboard
```

**Response:**
```json
{
  "lastUpdated": "2025-02-17T12:34:56Z",
  "leaderboard": [
    {
      "userId": "401e9c4d-9e43-4193-983a-65a411b4ecfa",
      "username": "t1_faker",
      "score": 9500,
      "rank": 1
    },
    ...  // Up to 10 entries
  ]
}
```

## Authentication

- All score update requests require JWT authentication
- Tokens must be valid and not expired
- Each action ID is processed only once to prevent replay attacks

## Real-time Updates

- WebSocket connection at: `wss://your-domain.com/ws/leaderboard`
- Clients receive initial leaderboard on connection
- All connected clients receive updates when top 10 changes

## Data Model

Two main tables:
1. `user_scores`: Stores user IDs, usernames, and current scores
2. `processed_actions`: Records already processed actions to prevent duplicates

## Security Measures

1. JWT authentication for all score updates
2. Action validation to ensure score changes are legitimate
3. Single processing of each action ID (idempotency)
4. Rate limiting to prevent abuse
