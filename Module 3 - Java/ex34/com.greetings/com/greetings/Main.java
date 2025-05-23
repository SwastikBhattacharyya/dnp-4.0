package com.greetings;

import com.utils.string.StringUtils;

public class Main {
     public static void main(String[] args) {
          String message = "Hello, Modular Java!";

          System.out.println("Original message: " + message);
          System.out.println("Reversed: " + StringUtils.reverse(message));
          System.out.println("Is palindrome? " + StringUtils.isPalindrome(message));

          String name = "alice";
          System.out.println("Capitalized name: " + StringUtils.capitalize(name));
     }
}