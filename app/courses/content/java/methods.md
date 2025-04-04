# Methods
A method is a block of code which only runs when it is called. You can pass data, known as parameters, into a method. Methods are used to perform certain actions, and they are also known as functions. Why use methods? To reuse code: define the code once, and use it many times.

## Create a Method
A method must be declared within a class. It is defined with the name of the method, followed by parentheses (). Java provides some pre-defined methods, such as System.out.println(), but you can also create your own methods to perform certain actions:

``` java filename=Main.java
public class Main {
    static void myMethod() {
        // code to be executed
    }
}
```

**Explanation:**
- `myMethod()` is the name of the method
- `static` means that the method belongs to the Main class and not an object of the Main class. You will learn more about objects and how to access methods through objects later in this tutorial.
- `void` means that this method does not have a return value. You will learn more about return values later in this chapter.

## Call a Method

To call a method in Java, write the method's name followed by two parentheses () and a semicolon;

In the following example, myMethod() is used to print a text (the action), when it is called:

```java filename=Main.java
// Inside main, call the myMethod() method
public class Main {
    static void myMethod() {
        System.out.println("I just got executed!");
    }

    public static void main(String[] args) {
        myMethod();
    }
}
```

``` txt filename=Output
I just got executed!
```

A method can also be called multiple times:
``` java filename=Main.java
public class Main {
    static void myMethod() {
        System.out.println("I just got executed!");
    }

    public static void main(String[] args) {
        myMethod();
        myMethod();
        myMethod();
    }
}
```
``` txt filename=Output
I just got executed!
I just got executed!
I just got executed!
```

# Parameters and Arguments
Information can be passed to methods as a parameter. Parameters act as variables inside the method. Parameters are specified after the method name, inside the parentheses. You can add as many parameters as you want, just separate them with a comma.

The following example has a method that takes a `String` called fname as parameter. When the method is called, we pass along a first name, which is used inside the method to print the full name:

```java filename=Main.java
public class Main {
    static void myMethod(String fname) {
        System.out.println(fname + " Refsnes");
    }

    public static void main(String[] args) {
        myMethod("Liam");
        myMethod("Jenny");
        myMethod("Anja");
    }
}
```
```txt filename=Output
Liam Refsnes
Jenny Refsnes
Anja Refsnes
```

You can have as many parameters as you like:
```java filename=Main.java
public class Main {
    static void myMethod(String fname, int age) {
        System.out.println(fname + " is " + age);
    }

    public static void main(String[] args) {
        myMethod("Liam", 5);
        myMethod("Jenny", 8);
        myMethod("Anja", 31);
    }
}
```
```txt filename=Output
Liam is 5
Jenny is 8
Anja is 31
```

# Return Values
In the previous section, we used the `void` keyword in all examples, which indicates that the method should not return a value. If you want the method to return a value, you can use a primitive data type (such as `int`, `char`, `etc`.) instead of `void`, and use the `return` keyword inside the method:
``` java filename=Main.java
public class Main {
    static int myMethod(int x) {
        return 5 + x;
    }

    public static void main(String[] args) {
        System.out.println(myMethod(3));
        // Outputs 8 (5 + 3)
  }
}
```
``` txt filename=Output
8
```
This example returns the sum of a method's two parameters:
``` java filename=Main.java
public class Main {
    static int myMethod(int x, int y) {
        return x + y;
    }

    public static void main(String[] args) {
        System.out.println(myMethod(5, 3));
    }
}
```
``` txt filename=Output
8
```