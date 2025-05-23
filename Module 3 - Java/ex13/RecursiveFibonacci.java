import java.util.Scanner;

public class RecursiveFibonacci {
     // Recursive method to calculate Fibonacci number
     public static int fibonacci(int n) {
          if (n <= 1) {
               return n;
          }
          return fibonacci(n - 1) + fibonacci(n - 2);
     }

     public static void main(String[] args) {
          Scanner scanner = new Scanner(System.in);

          // Prompt user for input
          System.out.print("Enter a positive integer to find its Fibonacci number: ");
          int n = scanner.nextInt();

          // Validate input
          if (n < 0) {
               System.out.println("Error: Please enter a positive integer!");
          } else {
               // Calculate and display result
               int result = fibonacci(n);
               System.out.println("The " + n + "th Fibonacci number is: " + result);
          }

          scanner.close();
     }
}