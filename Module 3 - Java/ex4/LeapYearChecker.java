import java.util.Scanner;

public class LeapYearChecker {
     public static void main(String[] args) {
          Scanner scanner = new Scanner(System.in);

          // Prompt user for input
          System.out.print("Enter a year: ");
          int year = scanner.nextInt();

          // Check if it's a leap year
          boolean isLeapYear = false;

          if (year % 4 == 0) {
               if (year % 100 == 0) {
                    if (year % 400 == 0) {
                         isLeapYear = true;
                    }
               } else {
                    isLeapYear = true;
               }
          }

          // Display the result
          if (isLeapYear) {
               System.out.println(year + " is a leap year.");
          } else {
               System.out.println(year + " is not a leap year.");
          }

          scanner.close();
     }
}