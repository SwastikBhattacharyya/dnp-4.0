import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class FileReaderDemo {
     public static void main(String[] args) {
          try (BufferedReader reader = new BufferedReader(new FileReader("output.txt"))) {
               System.out.println("Contents of output.txt:");
               System.out.println("----------------------");

               String line;
               while ((line = reader.readLine()) != null) {
                    System.out.println(line);
               }

          } catch (IOException e) {
               System.out.println("Error reading file: " + e.getMessage());
          }
     }
}