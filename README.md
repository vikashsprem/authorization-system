# Role-Based Access Control (RBAC)

A RESTful API for a social media platform with role-based access control built using Node.js, Express, and MongoDB.

## Features

- User Authentication (Register/Login)
- Role-based Access Control (User/Moderator/Admin)
- Post Management (Create/Read/Delete)
- User Management (Admin only)
- Input Validation using Zod
- JWT Authentication
- API Documentation using Swagger/OpenAPI

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Atmalviya/authorization-system.git
cd authorization-system
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/your_database
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

4. Start the server:

```bash
# Development
npm run dev

# Production
npm start
```

The server will start at `http://localhost:3000`

## API Documentation

### Swagger UI

Access the API documentation at: `http://localhost:3000/api-docs`

### API Endpoints

#### Authentication

**Register User**

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123"
  }'
```

**Login**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123"
  }'
```

#### Posts

**Get All Posts**

```bash
curl -X GET http://localhost:3000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Create Post**

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my post"
  }'
```

**Delete Post**

```bash
curl -X DELETE http://localhost:3000/api/posts/POST_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Admin Routes

**Get All Users**

```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Update User Role**

```bash
curl -X PATCH http://localhost:3000/api/users/role \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "role": "moderator"
  }'
```

## Testing Locally

### Using Postman

1. Import the Swagger documentation:

   - Open Postman
   - Click "Import" -> "Link"
   - Enter: `http://localhost:3000/api-docs-json`

2. Set up environment variables in Postman:
   - Create a new environment
   - Add variable `baseUrl`: `http://localhost:3000`
   - Add variable `token`: `<your-jwt-token>`

### Using Swagger UI

1. Navigate to `http://localhost:3000/api-docs`
2. Execute the register/login endpoint to get a token
3. Click the "Authorize" button and enter your token
4. Test endpoints directly from the UI

## Role-Based Access

The API implements three roles with different permissions:

- **User**
  - Can read posts
- **Moderator**

  - Can read posts
  - Can create posts
  - Can delete posts

- **Admin**
  - All moderator permissions
  - Can manage users
  - Can update user roles

## Error Handling

The API returns standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Validation

Input validation is handled using Zod schemas:

- Email format validation
- Password strength requirements
- Post content length limits
- MongoDB ObjectId validation

## Development

### Directory Structure

```
authorization-system/
├── src/
│   ├── constants/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   └── db.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

### Running in Development Mode

```bash
npm run dev
```

This will start the server with nodemon for hot reloading.
