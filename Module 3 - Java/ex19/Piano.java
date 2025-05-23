public class Piano implements Playable {
     @Override
     public void play() {
          System.out.println("Playing piano keys...");
     }

     public static void main(String[] args) {
          // Create instances of both instruments
          Playable guitar = new Guitar();
          Playable piano = new Piano();

          // Play both instruments
          System.out.println("Playing Guitar:");
          guitar.play();

          System.out.println("\nPlaying Piano:");
          piano.play();
     }
}