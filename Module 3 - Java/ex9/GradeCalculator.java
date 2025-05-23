import java.util.Scanner;

public class GradeCalculator {
     public static void main(String[] args) {
          Scanner scanner = new Scanner(System.in);

          System.out.print("Enter your marks (0-100): ");
          int marks = scanner.nextInt();

          String grade;

          if (marks >= 90 && marks <= 100) {
               grade = "A";
          } else if (marks >= 80 && marks < 90) {
               grade = "B";
          } else if (marks >= 70 && marks < 80) {
               grade = "C";
          } else if (marks >= 60 && marks < 70) {
               grade = "D";
          } else if (marks >= 0 && marks < 60) {
               grade = "F";
          } else {
               grade = "Invalid marks! Please enter marks between 0 and 100.";
          }

          System.out.println("Your grade is: " + grade);

          scanner.close();
     }
}