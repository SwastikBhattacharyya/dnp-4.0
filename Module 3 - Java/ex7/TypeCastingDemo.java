public class TypeCastingDemo {
     public static void main(String[] args) {
          // Declare and initialize a double variable
          double doubleNumber = 123.456;

          // Cast double to int (explicit casting)
          int intNumber = (int) doubleNumber;
          System.out.println("Original double value: " + doubleNumber);
          System.out.println("After casting to int: " + intNumber);

          // Declare an int and cast to double (implicit casting)
          int anotherInt = 789;
          double anotherDouble = anotherInt;
          System.out.println("\nOriginal int value: " + anotherInt);
          System.out.println("After casting to double: " + anotherDouble);
     }
}