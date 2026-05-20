CREATE DATABASE IF NOT EXISTS task_management;
USE task_management;

-- Note: Hibernate will create the tables automatically because of spring.jpa.hibernate.ddl-auto=update
-- But here is the schema for reference:

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(120) NOT NULL,
    role VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample admin user
-- Password is 'admin123' (bcrypt encoded)
INSERT INTO users (username, email, password, role) 
VALUES ('admin', 'admin@example.com', '$2a$10$Rz29qE5P2fQZ6R6pQ8v2e.E4Z8W8.P48a8l2.O84z4e5M4E2O8r/a', 'ROLE_ADMIN');

-- Insert sample normal user
-- Password is 'user123' (bcrypt encoded)
INSERT INTO users (username, email, password, role) 
VALUES ('user', 'user@example.com', '$2a$10$T8Z8W8.P48a8l2.O84z4e5M4E2O8r/a.Rz29qE5P2fQZ6R6pQ8v2e', 'ROLE_USER');
