import java.util.Scanner;

public class ArrayCalculator {
     public static void main(String[] args) {
          Scanner scanner = new Scanner(System.in);

          // Get array size from user
          System.out.print("Enter the number of elements: ");
          int size = scanner.nextInt();

          // Create and populate the array
          int[] numbers = new int[size];
          System.out.println("Enter " + size + " integers:");

          for (int i = 0; i < size; i++) {
               System.out.print("Element " + (i + 1) + ": ");
               numbers[i] = scanner.nextInt();
          }

          // Calculate sum
          int sum = 0;
          for (int number : numbers) {
               sum += number;
          }

          // Calculate average
          double average = (double) sum / size;

          // Display results
          System.out.println("\nResults:");
          System.out.println("Sum: " + sum);
          System.out.println("Average: " + average);

          scanner.close();
     }
}