import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.SQLException;

public class DatabaseConnection {
     private static final String URL = "jdbc:mysql://localhost:3306/school";
     private static final String USER = "root";
     private static final String PASSWORD = "password";

     public static void main(String[] args) {
          try {
               Class.forName("com.mysql.cj.jdbc.Driver");
          } catch (ClassNotFoundException e) {
               System.out.println("MySQL JDBC Driver not found.");
               return;
          }

          try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
                    Statement stmt = conn.createStatement();
                    ResultSet rs = stmt.executeQuery("SELECT * FROM students")) {

               System.out.println("Connected to database successfully!");
               System.out.println("\nStudent List:");
               System.out.println("------------");

               while (rs.next()) {
                    int id = rs.getInt("id");
                    String name = rs.getString("name");
                    int age = rs.getInt("age");
                    System.out.printf("ID: %d, Name: %s, Age: %d%n", id, name, age);
               }

          } catch (SQLException e) {
               System.out.println("Database error occurred: " + e.getMessage());
          }
     }
}