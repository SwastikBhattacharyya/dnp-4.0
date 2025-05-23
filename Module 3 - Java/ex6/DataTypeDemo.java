public class DataTypeDemo {
     public static void main(String[] args) {
          // Integer type
          int integerNumber = 42;

          // Float type
          float floatNumber = 3.14159f;

          // Double type
          double doubleNumber = 2.71828;

          // Character type
          char character = 'A';

          // Boolean type
          boolean isTrue = true;

          // Display all variables
          System.out.println("Integer value: " + integerNumber);
          System.out.println("Float value: " + floatNumber);
          System.out.println("Double value: " + doubleNumber);
          System.out.println("Character value: " + character);
          System.out.println("Boolean value: " + isTrue);

          // Display data type ranges
          System.out.println("\nData Type Ranges:");
          System.out.println("Integer range: " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);
          System.out.println("Float range: " + Float.MIN_VALUE + " to " + Float.MAX_VALUE);
          System.out.println("Double range: " + Double.MIN_VALUE + " to " + Double.MAX_VALUE);
     }
}