import java.lang.reflect.Method;
import java.lang.reflect.Field;
import java.lang.reflect.Constructor;

class Person {
     private String name;
     private int age;

     public Person() {
          this("Unknown", 0);
     }

     public Person(String name, int age) {
          this.name = name;
          this.age = age;
     }

     private void setName(String name) {
          this.name = name;
     }

     public String getName() {
          return name;
     }

     private void setAge(int age) {
          this.age = age;
     }

     public int getAge() {
          return age;
     }
}

public class ReflectionDemo {
     public static void main(String[] args) {
          try {
               // Load the Person class
               Class<?> personClass = Class.forName("Person");
               System.out.println("Class name: " + personClass.getName());

               // Get and print all declared methods
               System.out.println("\nDeclared Methods:");
               for (Method method : personClass.getDeclaredMethods()) {
                    System.out.printf("Method: %s, Return Type: %s%n",
                              method.getName(), method.getReturnType().getSimpleName());
               }

               // Get and print all declared fields
               System.out.println("\nDeclared Fields:");
               for (Field field : personClass.getDeclaredFields()) {
                    System.out.printf("Field: %s, Type: %s%n",
                              field.getName(), field.getType().getSimpleName());
               }

               // Create instance using reflection
               Constructor<?> constructor = personClass.getConstructor(String.class, int.class);
               Object person = constructor.newInstance("John Doe", 30);

               // Get and invoke getName method
               Method getNameMethod = personClass.getMethod("getName");
               String name = (String) getNameMethod.invoke(person);
               System.out.println("\nName from getName(): " + name);

               // Access and modify private field
               Field nameField = personClass.getDeclaredField("name");
               nameField.setAccessible(true);
               nameField.set(person, "Jane Doe");

               // Verify the change
               String newName = (String) getNameMethod.invoke(person);
               System.out.println("Modified name: " + newName);

               // Invoke private method
               Method setAgeMethod = personClass.getDeclaredMethod("setAge", int.class);
               setAgeMethod.setAccessible(true);
               setAgeMethod.invoke(person, 25);

               // Get age using reflection
               Method getAgeMethod = personClass.getMethod("getAge");
               int age = (int) getAgeMethod.invoke(person);
               System.out.println("Age after modification: " + age);

          } catch (Exception e) {
               System.out.println("Error during reflection: " + e.getMessage());
               e.printStackTrace();
          }
     }
}