import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.math.BigDecimal;

public class BankTransaction {
     private static final String URL = "jdbc:mysql://localhost:3306/bank";
     private static final String USER = "root";
     private static final String PASSWORD = "password";

     public void transfer(int fromAccount, int toAccount, BigDecimal amount) throws SQLException {
          Connection conn = null;
          try {
               conn = DriverManager.getConnection(URL, USER, PASSWORD);
               conn.setAutoCommit(false);

               String debitSql = "UPDATE accounts SET balance = balance - ? WHERE account_id = ? AND balance >= ?";
               try (PreparedStatement debitStmt = conn.prepareStatement(debitSql)) {
                    debitStmt.setBigDecimal(1, amount);
                    debitStmt.setInt(2, fromAccount);
                    debitStmt.setBigDecimal(3, amount);

                    int rowsAffected = debitStmt.executeUpdate();
                    if (rowsAffected == 0) {
                         throw new SQLException("Insufficient funds in account " + fromAccount);
                    }
               }

               String creditSql = "UPDATE accounts SET balance = balance + ? WHERE account_id = ?";
               try (PreparedStatement creditStmt = conn.prepareStatement(creditSql)) {
                    creditStmt.setBigDecimal(1, amount);
                    creditStmt.setInt(2, toAccount);

                    int rowsAffected = creditStmt.executeUpdate();
                    if (rowsAffected == 0) {
                         throw new SQLException("Destination account " + toAccount + " not found");
                    }
               }

               conn.commit();
               System.out.println("Transaction completed successfully!");

          } catch (SQLException e) {
               if (conn != null) {
                    try {
                         conn.rollback();
                         System.out.println("Transaction rolled back: " + e.getMessage());
                    } catch (SQLException ex) {
                         System.out.println("Error during rollback: " + ex.getMessage());
                    }
               }
               throw e;
          } finally {
               if (conn != null) {
                    try {
                         conn.setAutoCommit(true);
                         conn.close();
                    } catch (SQLException e) {
                         System.out.println("Error closing connection: " + e.getMessage());
                    }
               }
          }
     }

     public static void main(String[] args) {
          BankTransaction bank = new BankTransaction();
          try {
               bank.transfer(1, 2, new BigDecimal("100.00"));
          } catch (SQLException e) {
               System.out.println("Transaction failed: " + e.getMessage());
          }
     }
}