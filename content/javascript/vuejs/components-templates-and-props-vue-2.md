---
title: "Components, Templates, and Props in Vue 2"
date: 2019-01-30T14:08:59Z
desc: In this guest post by Ajdin Imsirovic, the author of Vue.js Quick Start Guide, you’ll learn about components, templates, and props in Vue 2.
author: Ajdin Imsirovic
twitter: https://www.linkedin.com/in/ajdin-imsirovic/?originalSubdomain=ba
series: vuejs
image: vuejs.png
tags:
- beginner
authorImage: https://media.licdn.com/dms/image/C4E03AQEMw64D-DxhmQ/profile-displayphoto-shrink_800_800/0?e=1554336000&v=beta&t=XdHlrGzvCX2DYWrpyuU8N_P6a5ci0So3yRW42Wri_CE
---

To begin, let's look at how to make a component in Vue. First, we specify the component, like this:

```js
Vue.component('custom-article', {
  template: `
    <article>
      Our own custom article component!<span></span>
    </article>`
})
new Vue({
    el: '#app'
})
```

A component is a block of code that we give a custom name. This custom name can be anything we come up with, and it's a single label for that entire block of code in the form of a custom HTML tag. In the previous example, we grouped the article and span tags and gave that custom tag the name of custom-article. 

> **Note -** Components are named using kebab-case.

The code for this component is available as a Codepen at https://codepen.io/AjdinImsirovic/pen/xzpOaJ.

Now, to create an instance of our component, we simply use our <custom-article> opening and closing tags in our HTML, like this:

```html
<main id="app">
    <custom-article></custom-article>
</main>
```

> **Note -** Our custom-article component is referred to as the child component. The parent is the actual Vue instance.

Note that you can use string templates even without a component. You simply add the template option to your Vue instance, like this:

```js
//HTML
<main id="app"></main>
//JS
new Vue({
  el: '#app',
  template: '<article>A string template without a component!<span></span></article>'
})
```

The example code for the previous example is available here: https://codepen.io/AjdinImsirovic/pen/RJxMae.

Next, we'll see how we can improve our component with the help of the props and data options.

# Adding props and data for better components

To make our custom-article component more useful, we'll add a props option to it, like this:

```js
Vue.component('custom-article', {
  props: ['content'],
  template: '<article>{{content}}</article>'
})
new Vue({
  el: '#app'
})
```

Props are a way to pass the data from the parent to the child. They are one-way flows of data between the parent and the child. Props are always defined as an array.

The code for the previous example is available here: https://codepen.io/AjdinImsirovic/pen/KeZNPr.

We have registered a prop in our component, and now we can use it in HTML as an attribute named just like our prop:

```html
<main id="app">
  <custom-article content="This component was made with the help of a prop."> 
  </custom-article>
</main>
```

Props are used when we need to make smaller changes to our components without having to make a whole new component. They help us reuse what we already have.

In the next section, we'll use the Vue instance's data object to add content to our custom-article component.

# Adding content to our components with the help of the data object

> **Code -** The code pen for this example can be found at https://codepen.io/AjdinImsirovic/pen/QxadmE.

In our HTML, we'll change the code to the following:

```html
<main id="app">
  <custom-article v-bind:content="datacontent"> 
  </custom-article>
</main>
```

In our JS, we'll update our Vue code to this:

```js
Vue.component('custom-article', {
  props: ['content'],
  template: '<article>{{content}}</article>'
})
new Vue({
    el: '#app',
    data: {
      datacontent: 'This component was made with the help of a data object in the Vue instance'
    }
})
```

In the previous example, we are using the v-bind directive to bind the content prop in our custom-article component to the datacontent property of our data object.

> **Note -** If you think through this code, you will see that props are almost like named variables (with the prop's variable name being content in the example). Props simply pass to the child component whatever data they receive from the parent.

There is also another way we can do this. Instead of using data inside our Vue instance, we can give it to our component; only this time it has to be a data function. Here is the full code for this implementation:

```js
// HTML
<main id="app">
  <custom-article></custom-article>
</main>

// JS
Vue.component('custom-article', {
  template: '<article>{{datacontent}}</article>',
  data: function() {
    return {
      datacontent: 'This component was made with the help of a data function in the Vue component called custom-article'
    }
  }
})
new Vue({
    el: '#app'
})
```

To view the pen for the previous example, visit https://codepen.io/AjdinImsirovic/pen/VdyQzW.

> **Note -** If we used data as an object instead of as a function, then reactivity would apply to all instances of our component. Since the main purpose of components is to be reusable, it is important to remember that in this case data must be a function.

Props can also be defined as objects, which allows us to give them a lot more information: validate incoming data, set default values in case no data comes through, and so on.

In the following example, we are stating that our custom-article component is expecting the parent to pass it a prop named message, or type string, which is required:

```html
// HTML
<div id="app">
  <custom-article :message-being-passed="datacontent"></custom-article>
</div>

//JS
Vue.component('custom-article', {
  props: {
    messageBeingPassed: {
      type: String,
      required: true,
      default: 'Hello Vue'
    }
  },
  template: `<div class="thetemplate">{{ message }}</div>`
});

new Vue({
  el: "#app",
  data: function() {
    return {
      datacontent: 'This component was made with the help of a data function in the Vue component called custom-article, and the data passed was validated with the help of the props object inside the Vue component'
    }
  }
})

//CSS
.thetemplate {
  font-size: 30px;
  padding: 20px;
  color: limegreen;
  font-family: Arial;
  border: 3px solid green;
  border-radius: 10px;
}
```

> **Code-** This example is available at https://codepen.io/AjdinImsirovic/pen/mKpxGZ.

Let's say we commented out the datacontent property of the Vue instance's data function. Can you guess what would happen?

In other words, what would happen if datacontent is not providing the correct data? The child component will simply revert to its default property in the props object.

> **Codepen -** To see this in action, visit this link: https://codepen.io/AjdinImsirovic/pen/BVJxKL.

# Other ways of building component templates in Vue

So far, we have looked at defining templates as strings (using single or double quotes) and as template literals (using backticks). There are also many other ways to work with component templates:

* Inline templates
* X-templates
* Render functions
* Single file components
* JSX

Most of them have their pros and cons. For example, using JSX in Vue is possible but generally frowned upon, as it in not the Vue way of doing things. Inline templates are made using the inline-template attribute in your HTML.
If you add type=''text/x-template'' to an HTML script tag, you will make a Vue x-template. Here's an example:

```html
// HTML
<div id="app">
  <script type="text/x-template" id="custom-article-template">
    <p>{{ name }}</p>
  </script>
</div>

// JS
Vue.component('custom-article', {
  template: '#custom-article-template',
  props: ['name']
})
new Vue({
    el: '#app'
})
```

> **Codepen -** The code pen for this example is available here: https://codepen.io/AjdinImsirovic/pen/NzXyem.

Single-file templates are probably the most practical way of creating templates in Vue. You keep all your HTML, JS, and styling in a single file (with a .vue file extension), and you compile this file with a build process, such as Webpack. 

# Building a simple web page out of components

As we have seen in the previous section, there are many ways to build a component in Vue, which might make things look more complex than they have to be. While it is important to be aware of the versatility that Vue brings to the various ways we can build components, in this section we will look at a simple way to use components to build a web page.

Before we begin building out our page, one thing should be clear to us: each component in Vue is also just another Vue instance. This means that each component takes an options object, which has the same key value pairs as any other Vue instance. The only difference to this rule is that the root Vue instance has some additional options that can only be used in it.

After these introductory clarifications, let's see how a component can be added to a Vue instance. 

# Adding simple components to a Vue instance

To start off this example, we'll begin with a simple Vue instance.

In our JavaScript file, let's make the simplest possible Vue instance, with the #app element as its entry point:

```js
new Vue({
  el: '#app',
  data: {}
})
```

Next, let's add just one div in our HTML, so that our Vue instance has an element in our page to get access to its DOM:

```html
<div id="app"></div>
```

Now we will add another component to our JavaScript file. Let's extend our existing JS file by adding the following code to the very top:

```js
Vue.component('the-header', {
  template: '<h1 class="header css classes go here">Our example header</h1>'
})
```

Now we can simply add the custom the-header component inside our HTML:

```html
<div id="app">
  <the-header></the-header>
</div>
```

Doing this will render Our example header text on the screen.
Now that we have seen just how easy it is to add one simple component to our Vue apps, let's add another one to drive the point home.

We'll start by extending our JS file with another component, the-footer:

```js
Vue.component('the-header', {
  template: '<h1 class="header css classes go here">Our example header</h1>'
});

Vue.component('the-footer', {
  template: '<h1 class="footer css classes go here">Our example header</h1>'
});

//Root Instance
new Vue({
  el: '#app',
  data: {}
})
```

Of course, we need to update our HTML in order to make this work:

```html
<div id="app">
  <the-header></the-header>
  <the-footer></the-footer>
</div>
```

When naming custom components, we need to use hyphens. This is done to make sure there are no naming collisions with regular HTML elements.
> **Codepen -** The example code for this section is available at https://codepen.io/AjdinImsirovic/pen/qypBbz.

Now that we understand how to add a simple component to our Vue instance, let's practice by adding a more complex example.

# Creating a more complex page out of components in Vue

To begin, let's add a single component to our new Vue instance. This time, we will employ the data option inside our custom component's options object.

This is the code we start with:

```js
Vue.component('the-header', {
  template: '<h1 class="h1 text-success">{{header}}</h1>',
  data: function() {
    return {
      header: 'Just another simple header'
    }
  }
});

//Root Instance
new Vue({
  el: '#app',
  data: {}
})
```

In this code, we have added mustache syntax to our template. Then we have utilized the data option to return the text, which will be interpolated in the template. The mustache syntax tells our component to look for the header inside our data option.
The code for this example is available here: https://codepen.io/AjdinImsirovic/pen/wxpvxy. 
Next, under our header, we'll add some Bootstrap cards. 
For simplicity's sake, we'll use an existing example from the official Bootstrap documentation, which is available at the following URL: https://getbootstrap.com/docs/4.0/components/card/#using-grid-markup.

The example provides the following code:

```html
<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">
          With supporting text below as a natural lead-in to additional 
          content.    
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">
          With supporting text below as a natural lead-in to additional 
          content.
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</div>
```

Now let's see how we can add a single card to our example Vue webpage. This is the code to add to our JS:

```js
Vue.component('the-card', {
  template: '<div class="card"><div class="card-body"><h5 class="card-title">Special title treatment</h5><p class="card-text">With supporting text below as a natural lead-in to additional content.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div></div>',
});
```

> **Codepen- ** The code for this stage of the development of our code is available here: https://codepen.io/AjdinImsirovic/pen/VByYeW.

Next, let's add our card component to our HTML. The full updated code will look like this:

```html
<div id="app">
 <div class="container">
    <the-header></the-header>
    <div class="row">
      <div class="col-sm-6">
        <the-card></the-card>
      </div>
      <div class="col-sm-6">
        <the-card></the-card>
      </div>
    </div>
</div>
```

Adding the previous code to our HTML, with the JS updates already in place as described earlier, we will get the following result:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/javascript/vuejs/components-templates-props/image1-17.png)

We have added a single card component in our JS; however, as we can see in the previous example, we can now reuse it in our HTML as many times as needed.

This gives us an excellent opportunity to quickly prototype complete web pages with the help of Vue.

We can take it even one step further, as we'll see in the next section.

# Improving our Vue-based layouts with v-for

In this section, we will improve our existing web page with the help of Vue directives. 

Our specific goal is to try to use the data option in our component instance and combine it with the powers of Vue directives to further improve our Vue apps.

> **Codepen -** The code for this section is available at https://codepen.io/AjdinImsirovic/pen/Epoamy.

Let's make our JS a bit easier to read with the help of the backtick ES6 JS syntax. This syntax allows us to write JavaScript strings which span multiple lines:

```js
Vue.component('the-header', {
  template: '<h1 class="h1 text-success">{{header}}</h1>',
  data: function() {
    return {
      header: 'Just another simple header'
    }
  }
});

Vue.component('the-card', {
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">
          With supporting text below as a natural lead-in to addtional 
          content.
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>`,
});

//Root Instance
new Vue({
  el: '#app',
  data: {}
})
```

Now, let's add the data option to the the-card Vue component:

```js
  data: function() {
    return {
      customCard: [{
        heading: 'John Doe',
        text: 'John.doe@acme.org'
      }, 
      {
        heading: 'John Doe',
        text: 'John.doe@acme.org'
      }
     ]}
  }
```

As we can see in the preceding code, we are returning a customCard array of objects, with each object holding a specific heading and text.

Next, we can use the v-for directive in our template, like this:

```js
Vue.component('the-card', {
  template: `
    <div class="card">
      <div class="card-body" v-for="customCard in customCards">
        <h5 class="card-title">{{customCard.heading}}</h5>
        <p class="card-text">
          {{customCard.text}}
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>`,
```

We introduce the v-for directive in the div that has the class of card-body. We loop through each customCard in our collection of customCards, and we interpolate the h5 text's content with customCard.heading for each object of our customCard array.

Finally, let's add a Bootstrap class to our HTML so that the h1 tag of our web page is not glued to the very top of the viewport. For that, we will use Bootstrap's spacing utilities. You can read about them here: https://getbootstrap.com/docs/4.0/utilities/spacing/.

The change in our HTML will be minimal, with just an addition of another CSS class: mt-5.

Finally, what follows is the complete JS code for the improved page. First, we register the main title component:

```js
//Register main title component
Vue.component("main-title-component", {
  template: '<h1 class="text-center mt-5 mb-4">{{title}}</h1>',
  data: function() {
    return {
      title: "Just another title"
    };
  }
});
```

Then we register the list group component:

```js
//Register list group component
Vue.component("list-group-component", {
  template: `
    <ul class="list-group">
      <li class="list-group-item" v-for="item in items">{{item.description}}</li>
    </ul>`,
  data: function() {
    return {
      items: [
        {
          description: "Description one"
        },
        {
          description: "Description two"
        },
        {
          description: "Description three"
        }
      ]
    };
  }
});
```

After that, we register the card component:

```js
// Register card component
Vue.component("card-component", {
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{title}}</h5>
        <p class="card-text">{{text}}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>`,
  data: function() {
    return {
      title: "This is the card title",
      text: "This is the card text"
    };
  }
});
```

We also add the root instance:

```js
//root Instance
new Vue({
  el: "#app",
    data: {}
});
```

And here is the HTML:

```html
<div id="app">
  <div class="container mt-5 mb-5">
    <main-title-component></main-title-component>
    <div class="row">
      <div class="col">
        <list-group-component></list-group-component>
      </div>
      <div class="col">
        <card-component></card-component>
      </div>
    </div>
  </div>
</div>
```

The result of adding the previous code can be seen in this screenshot:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/javascript/vuejs/components-templates-props/image2-19.png)

# Conclusion

If you found this article helpful and would like to get started with Vue.js, Vue.js Quick Start Guide is the most ideal book for you to learn how to build amazing and complex reactive web applications easily using Vue.js
