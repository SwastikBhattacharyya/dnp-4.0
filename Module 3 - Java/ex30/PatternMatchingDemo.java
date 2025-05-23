public class PatternMatchingDemo {
     public static String getObjectInfo(Object obj) {
          return switch (obj) {
               case String s -> "String of length " + s.length();
               case Integer i -> "Integer with value " + i;
               case Double d -> "Double with value " + d;
               case Long l -> "Long with value " + l;
               case Boolean b -> "Boolean with value " + b;
               case null -> "null value";
               default -> "Unknown type: " + obj.getClass().getSimpleName();
          };
     }

     public static void main(String[] args) {
          Object[] objects = {
                    "Hello",
                    42,
                    3.14,
                    true,
                    123L,
                    null,
                    new StringBuilder("Test")
          };

          System.out.println("Pattern Matching Demo:");
          System.out.println("---------------------");

          for (Object obj : objects) {
               String info = getObjectInfo(obj);
               System.out.println("Object: " + obj + " -> " + info);
          }
     }
}