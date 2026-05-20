# Task Management System

A full-stack Task Management System with JWT Authentication & Role-Based Access, built using Java Spring Boot and React.js.

## Features

**Backend:**
- Java 17, Spring Boot 3
- Spring Security with JWT (JSON Web Tokens)
- Role-based Authorization (USER, ADMIN)
- Spring Data JPA & Hibernate
- MySQL Database
- Swagger UI Documentation


**Frontend:**
- React.js with React Router DOM
- Axios for API requests
- JWT token storage (localStorage)
- Protected routes
- Login/Registration flows
- Task CRUD operations
- Admin Dashboard to manage users and tasks
- Bootstrap CSS

## Setup Instructions

### 1. Database Setup
1. Ensure MySQL is installed and running.
2. The database `task_management` will be automatically created if it does not exist (configured in `application.properties`).
3. (Optional) Run the provided `database/schema.sql` to prepopulate sample users.

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Build and run using Maven:
   ```bash
   mvnw spring-boot:run
   ```
   *Note: If `mvnw` is not available, use your local Maven: `mvn spring-boot:run`*
3. The backend will run on `http://localhost:8080`.
4. Access Swagger API documentation at: `http://localhost:8080/swagger-ui.html`

### 3. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
4. The frontend will be accessible at `http://localhost:3000`.

### Default Accounts
If you use the `schema.sql`:
- **Admin**: `admin` / `admin123`
- **User**: `user` / `user123`

## Project Architecture

The application follows a clean layered architecture:
- **Controller Layer**: Exposes RESTful APIs and handles HTTP requests.
- **Service Layer**: Contains business logic and orchestrates data flow.
- **Repository Layer**: Interfaces with the database via Spring Data JPA.
- **Security Layer**: Handles JWT authentication, token validation, and role-based access.

## JWT Flow
1. User submits login credentials.
2. Spring Security authenticates credentials.
3. If successful, `JwtUtils` generates a signed JWT.
4. The token is returned to the client and stored in `localStorage`.
5. Client attaches the token as `Bearer <token>` in the `Authorization` header for subsequent requests.
6. `AuthTokenFilter` intercepts requests, validates the token, and sets the SecurityContext.

## Role-Based Authorization
- `@PreAuthorize` annotations are used on controllers/methods.
- `USER` role can only access and modify their own tasks.
- `ADMIN` role can access all tasks, manage all users, and delete tasks/users.

## Database Relationships
- **User - Task**: One-to-Many. A user can create multiple tasks. A task belongs to one user (`@ManyToOne` mapping in `Task` entity).

## Scalability & Future Enhancements
To scale this application for enterprise-level traffic, the following architecture improvements could be implemented:
1. **Caching Layer (Redis)**: Implement Redis to cache frequently accessed data (like User Profiles or Global Task Statistics) to reduce the load on the primary MySQL database.
2. **Microservices Architecture**: If the application grows, the Authentication Service (User Management) and Task Service could be decoupled into independent microservices communicating via message brokers (e.g., RabbitMQ or Kafka).
3. **Database Scaling**: Implement Database Read Replicas to handle high-volume read requests, keeping the primary MySQL instance dedicated to write operations.
4. **Load Balancing & Deployment**: Containerize the application using **Docker** and deploy it to a Kubernetes cluster behind an API Gateway/Load Balancer (like NGINX or AWS ALB) to auto-scale instances based on traffic.
