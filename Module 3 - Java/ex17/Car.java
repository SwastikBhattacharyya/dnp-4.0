public class Car {
     private String make;
     private String model;
     private int year;

     public Car(String make, String model, int year) {
          this.make = make;
          this.model = model;
          this.year = year;
     }

     public void displayDetails() {
          System.out.println("\nCar Details:");
          System.out.println("Make: " + make);
          System.out.println("Model: " + model);
          System.out.println("Year: " + year);
     }

     public static void main(String[] args) {
          Car car1 = new Car("Toyota", "Camry", 2022);
          Car car2 = new Car("Honda", "Civic", 2023);
          Car car3 = new Car("Tesla", "Model 3", 2024);

          car1.displayDetails();
          car2.displayDetails();
          car3.displayDetails();
     }
}