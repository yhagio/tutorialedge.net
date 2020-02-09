---
title: "Vuejs I18n Basics Tutorial"
date: 2020-02-09T09:03:59Z
desc: In this tutorial, we are going to be looking at how you can add internationalization to your Vue.js applications using the vue-i18n library.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: vuejs
image: vuejs.png
tags:
- intermediate
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this tutorial, we are going to look at how you can introduce internationalization into your Vue.js applications using the `vue-i18n` library.

# What is i18n?

If you are trying to build a global audience for your application then being able to cater for a huge number of different languages within your application is a huge win. Thankfully, **i18n** makes this a lot easier for us by giving us a standard format for defining translations within our application's codebase which can then be quickly swapped in and out depending on the users preference.

```js
const messages = {
    "en" : {
        "hello": "Hello"
    }, 
    "es" : {
        "hello": "Hola!"
    }
}
```

With these definitions in place, we can render our `hello` message within our app and easily switch between the two languages using the `$t("key")` syntax which interpolates the correct value in for the given `locale` and `key`:

```html
<div id="app">
    {{ $t("hello") }}
</div>
```

# Installation

In order to add the `vue-i18n` package to your Vue.js apps, you can either include the CDN link:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-i18n/dist/vue-i18n.js"></script>
```

Or, if you are using a module system via the likes of the `vue-cli` then you can install it with **yarn** or **npm**:

```output
$ npm install vue-i18n
$ yarn add vue-i18n
```

And then you will be able to import it into your components like so:

```js
import VueI18n from 'vue-i18n';

Vue.use(VueI18n)
...
```

# A Simple Application

Ok, now that we've covered the theory and installing the package, let's build up a simple Vue.js app which uses this package to quickly switch between different locales.

Let's start by creating a new Vue.js application using the `vue-cli` like so:

```output
$ vue create vue-i18n-test-app
```

With this in place, let's navigate into our new `vue-i18n-test-app/` directory and install the package:

```output
$ yarn add vue-i18n
```

Awesome. The next step is to plugin this package to our app and we can do that by opening up the `main.js` file and then importing the package and adding it to our **vue instance** like so:

<div class="filename"> main.js </div>

```js
import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false
Vue.use(VueI18n);

const messages = {
  en: {
    hello: "hello"
  },
  es: {
    hello: "hola"
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')

```

<div class="filename"> src/App.vue </div>

```html
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h2>{{ $t("hello") }}</h2>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

Now, when we view our app in the browser, we should see that it renders the default `hello` which is the default `en` locale.

If we change up the default `locale` within our `main.js` to `es` then we should see that the greeting changes to `hola` when we refresh out app!

## Changing Locale Dynamically

Giving your users the ability to change their default locale can ensure that your users face consistent behavior from your app regardless of where they are using it around the world and from what browser.

Changing this can be done through the changing the `$i18n.locale` variable within you app. Let's update the `App.vue` component within our test app and add a `<select>` element which we can change to either `es` or `en`:

<div class="filename"> src/App.vue </div>

```html
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h2>{{ $t("hello") }}</h2>

    <div class="locale-changer">
      <select v-model="$i18n.locale">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return { langs: ['es', 'en'] }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

Now, when we refresh our page, we should see a handy select box just below our `Hello` statement which allows us to change between preferred locales. When this is set to a different locale, the corresponding `hello` message is updated for us!

# Conclusion

So, in this tutorial, we looked at how you could break down the language barriers within your Vue.js applications using the wonderful `vue-i18n` package. We also explored the various ways you could handle multiple massive locale files and dynamically switching between them within your application. 

## Further Reading:

If you enjoyed this article, you may also enjoy these other articles on the site:

* [Vue.js Animations and Transitions Tutorial](/javascript/vuejs/vuejs-transitions-animations-tutorial/)