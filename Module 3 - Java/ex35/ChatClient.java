import java.io.*;
import java.net.*;
import java.util.Scanner;

public class ChatClient {
     private static final String SERVER_ADDRESS = "localhost";
     private static final int SERVER_PORT = 5000;

     public static void main(String[] args) {
          try (Socket socket = new Socket(SERVER_ADDRESS, SERVER_PORT);
                    PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                    BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                    Scanner scanner = new Scanner(System.in)) {

               // Start a thread to read messages from the server
               new Thread(() -> {
                    try {
                         String message;
                         while ((message = in.readLine()) != null) {
                              System.out.println(message);
                         }
                    } catch (IOException e) {
                         System.out.println("Connection to server lost.");
                    }
               }).start();

               // Main thread reads user input and sends to server
               System.out.println("Connected to chat server. Type 'exit' to leave.");
               String userInput;
               while (true) {
                    userInput = scanner.nextLine();
                    out.println(userInput);

                    if (userInput.equalsIgnoreCase("exit")) {
                         break;
                    }
               }

          } catch (UnknownHostException e) {
               System.out.println("Server not found: " + e.getMessage());
          } catch (IOException e) {
               System.out.println("I/O error: " + e.getMessage());
          }
     }
}