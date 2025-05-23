import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.IntStream;

public class VirtualThreadDemo {
     private static final int THREAD_COUNT = 100_000;
     private static final AtomicInteger completedThreads = new AtomicInteger(0);

     public static void main(String[] args) {
          System.out.println("Starting Virtual Threads Demo...");
          System.out.println("Creating " + THREAD_COUNT + " virtual threads\n");

          Instant start = Instant.now();

          // Create and start virtual threads
          IntStream.range(0, THREAD_COUNT).forEach(i -> {
               Thread.startVirtualThread(() -> {
                    try {
                         // Simulate some work
                         Thread.sleep(100);
                         int completed = completedThreads.incrementAndGet();
                         if (completed % 10000 == 0) {
                              System.out.println("Completed " + completed + " threads");
                         }
                    } catch (InterruptedException e) {
                         System.out.println("Thread interrupted: " + e.getMessage());
                    }
               });
          });

          // Wait for all threads to complete
          while (completedThreads.get() < THREAD_COUNT) {
               try {
                    Thread.sleep(100);
               } catch (InterruptedException e) {
                    System.out.println("Main thread interrupted: " + e.getMessage());
               }
          }

          Instant end = Instant.now();
          Duration duration = Duration.between(start, end);

          System.out.println("\nAll virtual threads completed!");
          System.out.printf("Total time: %d seconds%n", duration.toSeconds());
          System.out.printf("Average time per thread: %d milliseconds%n",
                    duration.toMillis() / THREAD_COUNT);
     }
}