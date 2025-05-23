public class OperatorPrecedenceDemo {
     public static void main(String[] args) {
          int result1 = 10 + 5 * 2;
          System.out.println("10 + 5 * 2 = " + result1);
          System.out.println("(Multiplication performed first, then addition)\n");

          int result2 = (10 + 5) * 2;
          System.out.println("(10 + 5) * 2 = " + result2);
          System.out.println("(Parentheses evaluated first)\n");

          int result3 = 20 - 4 * 2 + 8 / 2;
          System.out.println("20 - 4 * 2 + 8 / 2 = " + result3);
          System.out.println(
                    "(Multiplication and division performed first, then addition and subtraction from left to right)\n");

          boolean result4 = 5 > 3 && 10 <= 20 - 5;
          System.out.println("5 > 3 && 10 <= 20 - 5 = " + result4);
          System.out.println("(Arithmetic operations first, then comparisons, then logical operators)");
     }
}