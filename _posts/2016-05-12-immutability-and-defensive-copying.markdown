---
layout: post
title:  "Immutability and defensive copying"
date:   2016-05-12
---

immutable data type; has the property that the value of an object never changes once constructed.

In Java, we can enforce immutability with the *final* modifier. When declaring a variable as final, we are promising to assign it a value only once.

What's the point of immutable types?

* the value does not change.
* prevents accidental changes.
* makes programs easier to debug.

Generally, immutable types are easier to use and harder to misuse than mutable types because the scope of code that can change their values is far smaller. It is easier to debug code that uses immutable types because it is easier to guarantee that variables in client code that uses them remain in a consistent state. When using mutable types, we are always concerned about where and when their values change.

There are a few *manageable* downsides of immutability:

* a new object must be created for every value.
* *final* doesn't guarantees immutability on reference types.

If an instance variable of a reference type has the *final* modifier, the reference will never change but the value of the object itself *can* change.

We'll take this class as an example:

```java
public class Person {

  private final String firstName;
  private final String lastName;
  private final List<Person> children;

  public Person(String firstName, String lastName, List<Person> children) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.children = children
  }

  public List<Person> getChildren) {
    return children;
  }
}
```

A client program could create a Person, providing an empty list of children and then populate it after construction.

```java
List<Person> children = new ArrayList<>();

Person person = new Person("John", "Doe", children);
Person child1 = new Person("Jack", "Doe", Arrays.asList());
Person child2 = new Person("Jane", "Doe", Arrays.asList());

children.add(child1);
children.add(child2);

System.out.println(person.getChildren().size()) // => 2.
```

The instance *children* is private and also final, but ```List<Person>``` is mutable because the client holds a reference to the data.

How can we fix this? With *defensive copying*.

```java
public Person(String firstName, String lastName, List<Person> children) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.children = new ArrayList<>(children);
}

public List<Person> getChildren() {
  return new ArrayList<>(children);
}

System.out.println(person.getChildren().size()) // => 0.
```

Note that we only need to do a defensive copy if the object is mutable. The Strings firstName and lastName are immutable by default so there is no need to do a defensive copy.

