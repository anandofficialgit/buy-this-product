# User API Backend

Java Spring Boot backend for user management with JSON file storage.

## Prerequisites

- Java 17 or higher
- Maven 3.6+

## Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

   Or run the JAR file:
   ```bash
   java -jar target/user-api-1.0.0.jar
   ```

## Configuration

The application runs on port **8081** by default.

Data is stored in: `backend/data/users.json`

You can change the data file location in `src/main/resources/application.properties`:
```properties
app.data.file=data/users.json
```

## API Endpoints

### POST /api/users/signup
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "mobileNumber": "9876543210",
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully!",
  "data": {
    "name": "John Doe",
    "mobileNumber": "9876543210",
    "username": "johndoe",
    "password": "password123"
  }
}
```

### POST /api/users/login
Authenticate a user.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful!",
  "data": {
    "name": "John Doe",
    "mobileNumber": "9876543210",
    "username": "johndoe",
    "password": ""
  }
}
```

### GET /api/users
Get all users (passwords are not included in response).

**Response:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "name": "John Doe",
      "mobileNumber": "9876543210",
      "username": "johndoe",
      "password": ""
    }
  ]
}
```

## CORS

The API is configured to accept requests from any origin. For production, you should restrict this to your frontend domain.

## Data Storage

User data is stored in a JSON file at `backend/data/users.json`. The file is automatically created if it doesn't exist.

**Note:** In production, consider using a proper database instead of a JSON file.
