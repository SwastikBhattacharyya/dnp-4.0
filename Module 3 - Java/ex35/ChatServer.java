import java.io.*;
import java.net.*;
import java.util.*;

public class ChatServer {
     private static final int PORT = 5000;
     private static Set<PrintWriter> clientWriters = new HashSet<>();

     public static void main(String[] args) {
          System.out.println("Chat Server is running...");

          try (ServerSocket serverSocket = new ServerSocket(PORT)) {
               while (true) {
                    new ClientHandler(serverSocket.accept()).start();
               }
          } catch (IOException e) {
               System.out.println("Error starting server: " + e.getMessage());
          }
     }

     private static class ClientHandler extends Thread {
          private Socket socket;
          private PrintWriter out;
          private BufferedReader in;

          public ClientHandler(Socket socket) {
               this.socket = socket;
          }

          public void run() {
               try {
                    // Set up input and output streams
                    out = new PrintWriter(socket.getOutputStream(), true);
                    in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

                    // Add this client's writer to the set
                    synchronized (clientWriters) {
                         clientWriters.add(out);
                    }

                    // Welcome message
                    out.println("Welcome to the chat server! Type 'exit' to leave.");
                    broadcast("New user connected: " + socket.getInetAddress());

                    // Process messages from this client
                    String message;
                    while ((message = in.readLine()) != null) {
                         if (message.equalsIgnoreCase("exit")) {
                              break;
                         }
                         broadcast(socket.getInetAddress() + ": " + message);
                    }

               } catch (IOException e) {
                    System.out.println("Error handling client: " + e.getMessage());
               } finally {
                    // Remove this client's writer from the set
                    synchronized (clientWriters) {
                         clientWriters.remove(out);
                    }

                    try {
                         socket.close();
                    } catch (IOException e) {
                         System.out.println("Error closing socket: " + e.getMessage());
                    }

                    broadcast("User disconnected: " + socket.getInetAddress());
               }
          }

          private void broadcast(String message) {
               synchronized (clientWriters) {
                    for (PrintWriter writer : clientWriters) {
                         writer.println(message);
                    }
               }
          }
     }
}