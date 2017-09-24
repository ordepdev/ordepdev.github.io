---
layout: post
title:  "A note on testing private methods"
date:   2015-02-16
categories: programming,csharp
---

In a normal situation your public methods consume the private ones and when you're testing, 
if you're testing, you only test the public methods.

In Unit Testing, this assumption is totally right. You're testing a Unit, and if you think Unit as a class
then you will only test the public methods.

The question is: how can we break a public method and test only the tiny bits?

In this case we have a `User` class with a private method that gives a Location based on an IpAddress.

```csharp
public class User
{
    private static string GetUserCountry(string ipAddress)
    {
        return LookupService.GetLocation(ipAddress);
    }
}
```

We can test this `GetUserCountry` using Reflection.

As `GetUserCountry` is a static method we'll be using `PrivateType`
instead of `PrivateObject` to instantiate the `User` class.

To invoke the `GetUserCountry` we can use `PrivateType.InvokeStatic` instead of `PrivateObject.Invoke`.

```csharp
[TestMethod]
public void IpAddressLocationMustMatchWithGetUserCountry()
{    
    var obj = new PrivateType(typeof(User));
    var method = "GetUserCountry";
    var connection = new MockConnection() { 
        IpAddress = "92.250.0.0", 
        Country = "Portugal"
    };

    var expected = (string)obj.InvokeStatic(method, 
        new object[] 
        { 
            connection.IpAddress 
        }
    );
    
    Assert.AreEqual(expected, connection.Country);
}
```

Now that we can test private methods but this solution makes sense?

Is there anything wrong about testing private methods? I don't think so.

Should you break the things up and create another class with testable public methods? Yes, you should.
