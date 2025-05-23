import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class FileWriter {
     public static void main(String[] args) {
          Scanner scanner = new Scanner(System.in);

          try {
               // Get input from user
               System.out.println("Enter text to write to file (press Enter when done):");
               String input = scanner.nextLine();

               // Write to file
               try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
                    writer.write(input);
                    writer.newLine();
                    System.out.println("\nSuccessfully wrote to output.txt");
               }

          } catch (IOException e) {
               System.out.println("Error writing to file: " + e.getMessage());
          } finally {
               scanner.close();
          }
     }
}