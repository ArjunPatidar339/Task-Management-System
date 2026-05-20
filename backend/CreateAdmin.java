import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class CreateAdmin {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/task_management?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
        String user = "root";
        String password = "root";

        // Password is 'admin123' encoded with BCrypt
        String insertSql = "INSERT IGNORE INTO users (username, email, password, role) VALUES ('admin', 'admin@example.com', '$2a$10$Rz29qE5P2fQZ6R6pQ8v2e.E4Z8W8.P48a8l2.O84z4e5M4E2O8r/a', 'ROLE_ADMIN');";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement stmt = conn.prepareStatement(insertSql)) {
            
            int rowsAffected = stmt.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("SUCCESS: Admin account created!");
            } else {
                System.out.println("SUCCESS: Admin account already exists!");
            }
        } catch (Exception e) {
            System.err.println("ERROR: Could not connect to MySQL: " + e.getMessage());
        }
    }
}
