public class Dog extends Animal {
     public Dog(String name) {
          super(name);
     }

     @Override
     public void makeSound() {
          System.out.println(name + " says: Bark! Bark!");
     }

     public static void main(String[] args) {
          // Create instances of Animal and Dog
          Animal genericAnimal = new Animal("Generic Animal");
          Dog dog = new Dog("Max");

          // Call makeSound() on both objects
          System.out.println("Generic Animal:");
          genericAnimal.makeSound();

          System.out.println("\nDog:");
          dog.makeSound();
     }
}