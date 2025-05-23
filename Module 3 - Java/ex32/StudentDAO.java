import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class StudentDAO {
     private static final String URL = "jdbc:mysql://localhost:3306/school";
     private static final String USER = "root";
     private static final String PASSWORD = "password";

     public void insertStudent(Student student) throws SQLException {
          String sql = "INSERT INTO students (name, age) VALUES (?, ?)";

          try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
                    PreparedStatement pstmt = conn.prepareStatement(sql)) {

               pstmt.setString(1, student.getName());
               pstmt.setInt(2, student.getAge());

               int rowsAffected = pstmt.executeUpdate();
               System.out.println(rowsAffected + " student(s) inserted.");
          }
     }

     public void updateStudent(Student student) throws SQLException {
          String sql = "UPDATE students SET name = ?, age = ? WHERE id = ?";

          try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
                    PreparedStatement pstmt = conn.prepareStatement(sql)) {

               pstmt.setString(1, student.getName());
               pstmt.setInt(2, student.getAge());
               pstmt.setInt(3, student.getId());

               int rowsAffected = pstmt.executeUpdate();
               System.out.println(rowsAffected + " student(s) updated.");
          }
     }

     public List<Student> getAllStudents() throws SQLException {
          List<Student> students = new ArrayList<>();
          String sql = "SELECT * FROM students";

          try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
                    PreparedStatement pstmt = conn.prepareStatement(sql);
                    ResultSet rs = pstmt.executeQuery()) {

               while (rs.next()) {
                    students.add(new Student(
                              rs.getInt("id"),
                              rs.getString("name"),
                              rs.getInt("age")));
               }
          }

          return students;
     }

     public void deleteStudent(int id) throws SQLException {
          String sql = "DELETE FROM students WHERE id = ?";

          try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
                    PreparedStatement pstmt = conn.prepareStatement(sql)) {

               pstmt.setInt(1, id);

               int rowsAffected = pstmt.executeUpdate();
               System.out.println(rowsAffected + " student(s) deleted.");
          }
     }

     public static void main(String[] args) {
          StudentDAO dao = new StudentDAO();

          try {
               Student newStudent = new Student(0, "John Doe", 20);
               dao.insertStudent(newStudent);

               Student updateStudent = new Student(1, "Jane Doe", 22);
               dao.updateStudent(updateStudent);

               List<Student> students = dao.getAllStudents();
               System.out.println("\nAll Students:");
               students.forEach(System.out::println);

               dao.deleteStudent(2);

          } catch (SQLException e) {
               System.out.println("Database error: " + e.getMessage());
          }
     }
}