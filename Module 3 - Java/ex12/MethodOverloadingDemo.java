public class MethodOverloadingDemo {
     public static int add(int a, int b) {
          return a + b;
     }

     public static double add(double a, double b) {
          return a + b;
     }

     public static int add(int a, int b, int c) {
          return a + b + c;
     }

     public static void main(String[] args) {
          int sum1 = add(5, 10);
          System.out.println("Sum of 5 and 10: " + sum1);

          double sum2 = add(3.5, 2.7);
          System.out.println("Sum of 3.5 and 2.7: " + sum2);

          int sum3 = add(5, 10, 15);
          System.out.println("Sum of 5, 10, and 15: " + sum3);
     }
}