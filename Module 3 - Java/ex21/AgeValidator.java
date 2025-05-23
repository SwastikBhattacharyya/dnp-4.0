import java.util.Scanner;

public class AgeValidator {
     public static void validateAge(int age) throws InvalidAgeException {
          if (age < 18) {
               throw new InvalidAgeException("Age must be 18 or older!");
          }
     }

     public static void main(String[] args) {
          Scanner scanner = new Scanner(System.in);

          try {
               System.out.print("Enter your age: ");
               int age = scanner.nextInt();

               validateAge(age);
               System.out.println("Age validation successful. You are " + age + " years old.");

          } catch (InvalidAgeException e) {
               System.out.println("Error: " + e.getMessage());
          } catch (Exception e) {
               System.out.println("Error: Invalid input!");
          } finally {
               scanner.close();
          }
     }
}