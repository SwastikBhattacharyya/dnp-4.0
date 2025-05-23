public class BytecodeDemo {
     private int value;

     public BytecodeDemo(int value) {
          this.value = value;
     }

     public int factorial(int n) {
          if (n <= 1) {
               return 1;
          }
          return n * factorial(n - 1);
     }

     public void printValue() {
          System.out.println("Value: " + value);
     }

     public static void main(String[] args) {
          BytecodeDemo demo = new BytecodeDemo(42);
          demo.printValue();
          System.out.println("Factorial of 5: " + demo.factorial(5));
     }
}