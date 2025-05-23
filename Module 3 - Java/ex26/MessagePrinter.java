public class MessagePrinter implements Runnable {
     private String message;
     private int count;

     public MessagePrinter(String message, int count) {
          this.message = message;
          this.count = count;
     }

     @Override
     public void run() {
          for (int i = 0; i < count; i++) {
               System.out.println(Thread.currentThread().getName() + ": " + message);
               try {
                    Thread.sleep(1000); // Sleep for 1 second
               } catch (InterruptedException e) {
                    System.out.println(Thread.currentThread().getName() + " was interrupted!");
                    return;
               }
          }
     }

     public static void main(String[] args) {
          // Create two threads with different messages
          Thread thread1 = new Thread(new MessagePrinter("Hello from Thread 1", 5), "Thread-1");
          Thread thread2 = new Thread(new MessagePrinter("Greetings from Thread 2", 5), "Thread-2");

          // Start both threads
          System.out.println("Starting threads...\n");
          thread1.start();
          thread2.start();

          // Wait for both threads to complete
          try {
               thread1.join();
               thread2.join();
          } catch (InterruptedException e) {
               System.out.println("Main thread was interrupted!");
               return;
          }

          System.out.println("\nAll threads have completed!");
     }
}