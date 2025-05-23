import java.util.ArrayList;
import java.util.Scanner;

public class StudentList {
     public static void main(String[] args) {
          ArrayList<String> students = new ArrayList<>();
          Scanner scanner = new Scanner(System.in);

          while (true) {
               System.out.println("\nStudent List Menu:");
               System.out.println("1. Add student");
               System.out.println("2. View all students");
               System.out.println("3. Exit");
               System.out.print("Enter your choice (1-3): ");

               int choice = scanner.nextInt();
               scanner.nextLine();

               switch (choice) {
                    case 1:
                         System.out.print("Enter student name: ");
                         String name = scanner.nextLine();
                         students.add(name);
                         System.out.println("Student added successfully!");
                         break;

                    case 2:
                         if (students.isEmpty()) {
                              System.out.println("No students in the list.");
                         } else {
                              System.out.println("\nStudent List:");
                              for (int i = 0; i < students.size(); i++) {
                                   System.out.println((i + 1) + ". " + students.get(i));
                              }
                         }
                         break;

                    case 3:
                         System.out.println("Goodbye!");
                         scanner.close();
                         return;

                    default:
                         System.out.println("Invalid choice! Please try again.");
               }
          }
     }
}