import java.util.Scanner;

public class DivisionCalculator {
     public static void main(String[] args) {
          Scanner scanner = new Scanner(System.in);

          try {
               System.out.print("Enter the first number (dividend): ");
               int dividend = scanner.nextInt();

               System.out.print("Enter the second number (divisor): ");
               int divisor = scanner.nextInt();

               int result = dividend / divisor;
               System.out.println("\nResult: " + dividend + " / " + divisor + " = " + result);

          } catch (ArithmeticException e) {
               System.out.println("\nError: Division by zero is not allowed!");
               System.out.println("Please enter a non-zero divisor.");
          } catch (Exception e) {
               System.out.println("\nError: Invalid input!");
               System.out.println("Please enter valid integers.");
          } finally {
               scanner.close();
          }
     }
}