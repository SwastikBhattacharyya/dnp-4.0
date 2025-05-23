import java.util.ArrayList;
import java.util.List;

record Person(String name, int age) {
}

public class PersonDemo {
     public static void main(String[] args) {
          List<Person> people = new ArrayList<>();
          people.add(new Person("John", 25));
          people.add(new Person("Alice", 30));
          people.add(new Person("Bob", 20));
          people.add(new Person("Carol", 35));
          people.add(new Person("David", 28));

          System.out.println("All people:");
          people.forEach(System.out::println);

          System.out.println("\nPeople older than 25:");
          people.stream()
                    .filter(person -> person.age() > 25)
                    .forEach(System.out::println);

          double averageAge = people.stream()
                    .mapToInt(Person::age)
                    .average()
                    .orElse(0.0);
          System.out.println("\nAverage age: " + averageAge);

          Person youngest = people.stream()
                    .min((p1, p2) -> p1.age() - p2.age())
                    .orElse(null);
          Person oldest = people.stream()
                    .max((p1, p2) -> p1.age() - p2.age())
                    .orElse(null);

          System.out.println("\nYoungest person: " + youngest);
          System.out.println("Oldest person: " + oldest);
     }
}