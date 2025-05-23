import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;
import java.util.Random;

public class ExecutorDemo {
     static class NumberCruncher implements Callable<Integer> {
          private final int id;
          private final int iterations;

          public NumberCruncher(int id, int iterations) {
               this.id = id;
               this.iterations = iterations;
          }

          @Override
          public Integer call() throws Exception {
               Random random = new Random();
               int sum = 0;

               for (int i = 0; i < iterations; i++) {
                    Thread.sleep(100);
                    sum += random.nextInt(100);
               }

               System.out.printf("Task %d completed with sum: %d%n", id, sum);
               return sum;
          }
     }

     public static void main(String[] args) {
          int numberOfTasks = 10;
          int iterationsPerTask = 5;

          ExecutorService executor = Executors.newFixedThreadPool(4);
          List<Future<Integer>> futures = new ArrayList<>();

          System.out.println("Submitting tasks...\n");

          for (int i = 0; i < numberOfTasks; i++) {
               Future<Integer> future = executor.submit(
                         new NumberCruncher(i + 1, iterationsPerTask));
               futures.add(future);
          }

          int totalSum = 0;
          try {
               for (Future<Integer> future : futures) {
                    totalSum += future.get();
               }

               System.out.println("\nAll tasks completed!");
               System.out.println("Total sum: " + totalSum);
               System.out.println("Average per task: " + (totalSum / numberOfTasks));

          } catch (InterruptedException | ExecutionException e) {
               System.out.println("Error processing results: " + e.getMessage());
          } finally {
               executor.shutdown();
               try {
                    if (!executor.awaitTermination(1, TimeUnit.MINUTES)) {
                         executor.shutdownNow();
                    }
               } catch (InterruptedException e) {
                    executor.shutdownNow();
               }
          }
     }
}