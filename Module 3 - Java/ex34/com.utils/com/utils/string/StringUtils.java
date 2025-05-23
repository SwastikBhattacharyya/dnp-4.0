package com.utils.string;

public class StringUtils {
     public static String reverse(String input) {
          return new StringBuilder(input).reverse().toString();
     }

     public static boolean isPalindrome(String input) {
          String cleaned = input.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
          return cleaned.equals(new StringBuilder(cleaned).reverse().toString());
     }

     public static String capitalize(String input) {
          if (input == null || input.isEmpty()) {
               return input;
          }
          return Character.toUpperCase(input.charAt(0)) +
                    (input.length() > 1 ? input.substring(1) : "");
     }
}