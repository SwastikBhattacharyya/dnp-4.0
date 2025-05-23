import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class LambdaSorting {
     public static void main(String[] args) {
          // Create a list of strings
          List<String> names = new ArrayList<>();
          names.add("John");
          names.add("Alice");
          names.add("Bob");
          names.add("Carol");
          names.add("David");

          // Print original list
          System.out.println("Original list:");
          names.forEach(name -> System.out.println(name));

          // Sort using lambda expression
          Collections.sort(names, (s1, s2) -> s1.compareToIgnoreCase(s2));

          // Print sorted list
          System.out.println("\nSorted list (case-insensitive):");
          names.forEach(name -> System.out.println(name));

          // Sort by length using lambda expression
          Collections.sort(names, (s1, s2) -> s1.length() - s2.length());

          // Print list sorted by length
          System.out.println("\nSorted by length:");
          names.forEach(name -> System.out.println(name + " (length: " + name.length() + ")"));
     }
}