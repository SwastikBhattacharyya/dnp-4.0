import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.io.IOException;
import java.time.Duration;

public class GitHubApiClient {
     private static final String GITHUB_API = "https://api.github.com";
     private final HttpClient client;

     public GitHubApiClient() {
          client = HttpClient.newBuilder()
                    .version(HttpClient.Version.HTTP_2)
                    .connectTimeout(Duration.ofSeconds(10))
                    .build();
     }

     public void getRepositoryInfo(String owner, String repo) {
          HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(GITHUB_API + "/repos/" + owner + "/" + repo))
                    .header("Accept", "application/vnd.github.v3+json")
                    .GET()
                    .build();

          try {
               HttpResponse<String> response = client.send(request,
                         HttpResponse.BodyHandlers.ofString());

               System.out.println("Status Code: " + response.statusCode());
               System.out.println("Response Body:");
               System.out.println(response.body());

          } catch (IOException | InterruptedException e) {
               System.out.println("Error fetching repository info: " + e.getMessage());
          }
     }

     public void getUserInfo(String username) {
          HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(GITHUB_API + "/users/" + username))
                    .header("Accept", "application/vnd.github.v3+json")
                    .GET()
                    .build();

          try {
               HttpResponse<String> response = client.send(request,
                         HttpResponse.BodyHandlers.ofString());

               System.out.println("Status Code: " + response.statusCode());
               System.out.println("Response Body:");
               System.out.println(response.body());

          } catch (IOException | InterruptedException e) {
               System.out.println("Error fetching user info: " + e.getMessage());
          }
     }

     public static void main(String[] args) {
          GitHubApiClient apiClient = new GitHubApiClient();

          // Get repository information
          System.out.println("Fetching repository information...");
          apiClient.getRepositoryInfo("openjdk", "jdk");

          System.out.println("\n----------------------------\n");

          // Get user information
          System.out.println("Fetching user information...");
          apiClient.getUserInfo("torvalds");
     }
}