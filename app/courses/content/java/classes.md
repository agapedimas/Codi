# Classes

## OOP
OOP stands for Object-Oriented Programming. Procedural programming is about writing procedures or methods that perform operations on the data, while object-oriented programming is about creating objects that contain both data and methods.

Object-oriented programming has several advantages over procedural programming:
- OOP is faster and easier to execute
- OOP provides a clear structure for the programs
- OOP helps to keep the Java code DRY "Don't Repeat Yourself", and makes the code easier to maintain, modify and debug
- OOP makes it possible to create full reusable applications with less code and shorter development time

**Tip**: The "Don't Repeat Yourself" (DRY) principle is about reducing the repetition of code. You should extract out the codes that are common for the application, and place them at a single place and reuse them instead of repeating it.

## What are Classes and Objects?
Classes and objects are the two main aspects of object-oriented programming. Look at the following illustration to see the difference between class and objects:

So, a class is a template for objects, and an object is an instance of a class. When the individual objects are created, they inherit all the variables and methods from the class. You will learn much more about classes and objects in the next chapter.

## Create a Class
To create a class, use the keyword `class`:

``` java filename=Main.java
//Create a class named "Main" with a variable x:
public class Main {
    int x = 5;
}
```
Remember from the Java Syntax chapter that a class should always start with an uppercase first letter, and that the name of the java file should match the class name.

## Create an Object
In Java, an object is created from a class. We have already created the class named `Main`, so now we can use this to create objects. To create an object of `Main`, specify the class name, followed by the object name, and use the keyword `new`:

``` java filename=Main.java
// Create an object called "myObj" and print the value of x:
public class Main {
    int x = 5;

    public static void main(String[] args) {
        Main myObj = new Main();
        System.out.println(myObj.x);
    }
}
```
You can create multiple objects of one class:
``` java filename=Main.java
// Create two objects of Main:
public class Main {
    int x = 5;

    public static void main(String[] args) {
        Main myObj1 = new Main();  // Object 1
        Main myObj2 = new Main();  // Object 2
        System.out.println(myObj1.x);
        System.out.println(myObj2.x);
    }
}
```