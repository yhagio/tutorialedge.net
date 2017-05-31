+++
date = "2017-04-15T09:53:07+01:00"
title = "Bridge Design Pattern Tutorial"
draft = true
desc = "This tutorial looks to demonstrate the capabilities of the Bridge design pattern and how one can implement this pattern using Java."
series = ["design-patterns"]
tags = ["design-patterns", "java"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<h2>Intent</h2>

<p>The intent of the Bridge design pattern is to decouple an abstraction from its implementation so that the two can vary independently. This basically allows you to build upon an abstract class and allows you to build to very different concrete classes based upon this abstract class.</p>

<h2>Motivation</h2>

<p>When an abstraction can have one of several possible implementations, the usual way to accommodate them is to use inheritance. Traditional methods tend not to be flexible enough and thus the Bridge design pattern was conceived. </p>

<p>Now this can be hugely beneficial for those of you wishing to create multi-platform tools and games and need a way to design the code around the different operating systems code tweaks. </p>

<h2>When Should You Use This Pattern?</h2>

<p>You should typically use the Bridge pattern when:</p>

<ul>
	<li>You require run-time binding of the implementation.</li>
	<li>both the abstractions and their implementations should be extensible by subclassing.</li>
	<li>changes in the implementation of an abstraction should have no impact on clients; that is, their code should not have to be recompiled</li>
	<li>you want to share an implementation among multiple objects and this fact should be hidden from the client.</li>
</ul>

<h2>Implementation</h2>

<p>This code example showcases how you could implement the bridge design pattern in the context of a game programming scenario.</p>

<h3>Enemy Abstract Class</h3>

~~~
package Bridge;

/**
 * Enemy abstract class
 */
public abstract class Enemy {

    protected Armour armour;

    public Enemy(Armour armour){
        this.armour = armour;
    }

    public abstract void addArmour();

}
~~~

<h3>Archer Concrete Class</h3>

~~~
package Bridge;

/**
 * Archer Concrete Implementation
 */
public class Archer extends Enemy {

    public Archer(Armour armour){
        super(armour);
    }

    @Override
    public void addArmour(){
        armour.addArmour();
    }

}
~~~

<h3>Knight Concrete Class</h3>

~~~
package Bridge;

/**
 * Created by elliotforbes on 03/07/15.
 */
public class Knight extends Enemy {

    public Knight(Armour armour){
        super(armour);
    }

    public void addArmour(){
        armour.addArmour();
    }
}
~~~

<h3>Armour Interface</h3>

~~~
package Bridge;

/**
 * Armour Interface
 */
public interface Armour {

    public void addArmour();

}
~~~

<h3>LightArmour Concrete Class</h3>

~~~
package Bridge;

/**
 * Created by elliotforbes on 03/07/15.
 */
public class LightArmour implements Armour {

    public void addArmour(){
        System.out.println("Light Armour Added");
    }

}
~~~

<h3>HeavyArmour Concrete Class</h3>

~~~
package Bridge;

/**
 * HeavyArmour Concrete Class
 */
public class HeavyArmour implements Armour {

    public void addArmour(){
        System.out.println("Heavy Armour Added");
    }
}
~~~

<h3>Driver Class</h3>

~~~
package Bridge;

/**
 * In this class we create 2 new enemies of both
 * type Knight and of type Archer respectively. 
 * We pass in a HeavyArmour class to our Knight and
 * a LightArmour class to our Archer.
 * 
 */
public class Driver {

    public static void main(String args[]){
        System.out.println("Bridge Design Pattern");
        Enemy knight = new Knight(new HeavyArmour());
        Enemy archer = new Archer(new LightArmour());

        knight.addArmour();
        archer.addArmour();
    }

}
~~~