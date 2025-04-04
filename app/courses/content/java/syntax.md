# Syntax

In the previous chapter, we created a Java file called `Main.java`, and we used the following code to print "Hello World" to the screen:

``` java filename=Main.java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

## Example explained
Every line of code that runs in Java must be inside a `class`. And the class name should always start with an uppercase first letter. In our example, we named the class Main.

Note: Java is case-sensitive: "MyClass" and "myclass" has different meaning.

The name of the java file must match the class name. When saving the file, save it using the class name and add ".java" to the end of the filename. To run the example above on your computer, make sure that Java is properly installed: Go to the Get Started Chapter for how to install Java. The output should be:

``` txt filename=Output
Hello World
```

## The main Method

The `main()` method is required and you will see it in every Java program:

``` java
public static void main(String[] args)
```

Any code inside the `main()` method will be executed. Don't worry about the keywords before and after it. You will get to know them bit by bit while reading this tutorial.

For now, just remember that every Java program has a    `class` name which must match the filename, and that every program must contain the `main()` method.

## Output
Inside the `main()` method, we can use the `println()` method to print a line of text to the screen:

``` java
public static void main(String[] args) {
    System.out.println("Hello World");
}
```
``` txt filename=Output
Hello World
```

## Comments
Comments can be used to explain Java code, and to make it more readable. It can also be used to prevent execution when testing alternative code.

### Single-line Comments
Single-line comments start with two forward slashes (`//`). Any text between `//` and the end of the line is ignored by Java (will not be executed).

This example uses a single-line comment before a line of code:
``` java
// This is a comment
System.out.println("Hello World");
```
This example uses a single-line comment at the end of a line of code:
``` java
System.out.println("Hello World"); // This is a comment
```

### Multi-line Comments
Multi-line comments start with `/*` and ends with `*/`. Any text between `/*` and `*/` will be ignored by Java.

This example uses a multi-line comment (a comment block) to explain the code:
``` java
/* The code below will print the words Hello World
to the screen, and it is amazing */
System.out.println("Hello World");
```

It's up to you which one you use. Normally, we use `//` for short comments, and `/* */` for longer.

## Variables
Variables are containers for storing data values. In Java, there are different types of variables, for example:

- `String` - stores text, such as "Hello". String values are surrounded by double quotes
- `int` - stores integers (whole numbers), without decimals, such as 123 or -123
- `float` - stores floating point numbers, with decimals, such as 19.99 or -19.99
- `char` - stores single characters, such as 'a' or 'B'. Char values are surrounded by single quotes
- `boolean` - stores values with two states: true or false

### Declaring (Creating) Variables
To create a variable, you must specify the type and assign it a value:
``` java
type variableName = value;
```
Where _type_ is one of Java's types (such as `int` or `String`), and _variableName_ is the name of the variable (such as **x** or **name**). The `=` is used to assign values to the variable.

To create a variable that should store text, look at the following example:
``` java
// Create a variable called name of type String and assign it the value "John".
// Then we use println() to print the name variable:

String name = "John";
System.out.println(name);
```
``` txt filename=Output
John
```
To create a variable that should store a number, look at the following example:
``` java
// Create a variable called myNum of type int and assign it the value 15:
int myNum = 15;
System.out.println(myNum);
```
``` txt filename=Output
15
```
Note that if you assign a new value to an existing variable, it will overwrite the previous value:
``` java
// Change the value of myNum from 15 to 20:
int myNum = 15;
myNum = 20;  // myNum is now 20
System.out.println(myNum);
```
``` txt filename=Output
20
```

### Other types
A demonstration of how to declare variables of other types:
``` java
int myNum = 5;
float myFloatNum = 5.99f;
char myLetter = 'D';
boolean myBool = true;
String myText = "Hello";
```