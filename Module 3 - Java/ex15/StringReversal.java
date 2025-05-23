import java.util.Scanner;

public class StringReversal {
     public static void main(String[] args) {
          Scanner scanner = new Scanner(System.in);

          // Get input string from user
          System.out.print("Enter a string to reverse: ");
          String input = scanner.nextLine();

          // Method 1: Using StringBuilder
          String reversed1 = new StringBuilder(input).reverse().toString();
          System.out.println("\nMethod 1 (StringBuilder):");
          System.out.println("Reversed string: " + reversed1);

          // Method 2: Using character array
          char[] charArray = input.toCharArray();
          String reversed2 = "";
          for (int i = charArray.length - 1; i >= 0; i--) {
               reversed2 += charArray[i];
          }
          System.out.println("\nMethod 2 (Character Array):");
          System.out.println("Reversed string: " + reversed2);

          scanner.close();
     }
}