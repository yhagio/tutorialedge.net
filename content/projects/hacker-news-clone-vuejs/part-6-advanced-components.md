---
author: Elliot Forbes
date: 2018-03-19T16:24:13Z
desc:
  In this tutorial, we are going to split out our application into more
  components and use some of the more advanced features such as props and
  transitions.
image: vuejs.png
series:
  - hackernewsclone
tags:
  - vuejs
  - javascript
title: Part 6 - Advanced Components
twitter: https://twitter.com/Elliot_F
weight: 6
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

As we continue to build this HackerNews clone up, the code within some of our
components is going to increasingly grow. We need to start splitting our
application up into multiple smaller components and in order for us to do this,
we'll first have to learn some new concepts such as passing data into components
using props.

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/HMYVQjU2KJM?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="640" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

In this tutorial, we are going to create an `Item.vue` component that will
render a single item within our `Homepage.vue` component. The finished product
of this will look like this:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/hackernews-clone/screenshot-11.png)

> Note: We will be stealing a lot of the design elements from the official
> HackerNews project:
> [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)

# Item.vue

The first thing we will need to do is to define our `Item.vue` component. This
will take in a story and will render it for us using the `css` that we will
define in the `<style>` tags.

```html
<template>
  <div class="story">
    <span class="score">{{ story.data.score }}</span>
    <router-link :to="{ path: '/story/' + story.data.id }"
      >{{ story.data.title }}<span
        >{{ story.data.url | host }}</span
      ></router-link
    ><br />
    <span class="meta">
      by {{ story.data.by }} | {{ story.data.time }} Ago | {{
      story.data.descendants }} comments
    </span>
  </div>
</template>

<script>
  export default {
    name: "Item",
    props: ["story"]
  };
</script>

<style scoped>
  .story {
    background-color: #fff;
    padding: 20px 30px 20px 80px;
    border-bottom: 1px solid #eee;
    position: relative;
    line-height: 20px;
  }
  .score {
    color: #f60;
    font-size: 1.1em;
    font-weight: 700;
    position: absolute;
    top: 50%;
    left: 0;
    width: 80px;
    text-align: center;
    margin-top: -10px;
  }
  .story a {
    color: #34495e;
    font-weight: 600;
    text-decoration: none;
  }
  .story a span {
    font-size: 0.85em;
    margin-left: 10px;
    color: #828282;
  }
  .story .meta {
    font-size: 0.85em;
    color: #828282;
  }
</style>
```

Notice that we've used `props` within our component's `js`. This will allow us
to pass in a `story` object further down the line from a parent component such
as our `Home.vue` component.

Now that we have created this new component, we can go about updating our
`Home.vue` component so that it uses our newly defined `Item.vue` component.

# Updating our Home.vue

Let us first modify our `<template>` tags so that we utilize our new `Item.vue`
component. We'll still want to reuse the `v-for` VueJS directive in order to
render an array of top items.

We use `:story` to bind an individual `story` object to each of our `Item`
components.

```html
<template>
  <div class="container">
    <item v-for="story in stories" :key="story.data.id" :story="story"></item>
  </div>
</template>
```

This looks a lot more succinct and is positively far better than just having our
`Home.vue` component constantly grow on us.

Now that we've done this, we need to import our `Item` component and register it
within our `Home` component. We can do this like so:

```ts
import axios from 'axios'
import Item from '@/views/Item.vue'

export default {
  name: 'Homepage',
  components: {
    'item': Item
  },
  data: function () {
    return {
      err: '',
      stories: []
    }
  },
  // ... the rest of our Home.vue component
```

Nothing else within our `Home.vue` component needs to change. If you save all of
the changes you have just made then you should see your application rendering
nicely in the browser.

# Why Break Up Our Application?

So at this point, I think it's worthwhile covering why we have just made a
smaller `Item.vue` component instead of just pushing all our code into one
component. By doing this, we effectively enable ourselves to reuse various parts
of our codebase in different places. It also helps to break up a massive
application into a series of smaller, easier to debug, digest and expand upon.

Let's see a perfect example of this now. Create a new component called
`New.vue`, this is going to show off all of the newest articles available
courtesy of the HackerNews API.

Within our `<template>` tags I want you to add the following:

```html
<template>
  <div class="container">
    <item v-for="story in stories" :key="story.data.id" :story="story"></item>
  </div>
</template>
```

You may notice that this is identical to the code we currently have in our
`Home.vue` component and you would be 100% right. We now want to update our
`<script>` element to look like this:

```js
import axios from "axios";
import Item from "@/views/Item.vue";

export default {
  name: "New",
  components: {
    item: Item
  },
  data: function() {
    return {
      err: "",
      stories: []
    };
  },
  created: function() {
    axios
      .get("https://hacker-news.firebaseio.com/v0/newstories.json")
      .then(result => {
        this.results = result.data.slice(0, 25);
        this.results.forEach(element => {
          axios
            .get(
              "https://hacker-news.firebaseio.com/v0/item/" + element + ".json"
            )
            .then(result => {
              this.stories.push(result);
            })
            .catch(err => {
              console.log(err);
            });
        });
      })
      .catch(err => {
        this.err = err;
      });
  }
};
```

Again, this should look identical to our `Home.vue` component, except for the
fact that we are hitting the
`https://hacker=news.firebaseio.com/v0/newstories.json` API endpoint as opposed
to the `topstories.json` endpoint.

# Adding a 'New' Route

We need a new route to render our `New.vue` component, so fire open your
`/src/router/index.js` and update it to have a route that maps to our `New`
component like so:

```js
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Single from "./views/Single.vue";
import New from "./views/New.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Homepage",
      component: Homepage
    },
    {
      path: "/story/:id",
      name: "Single",
      component: Single
    },
    {
      path: "/new",
      name: "New",
      component: New
    }
  ]
});
```

# Updating our Navbar.vue

Finally, let's update our `Navbar.vue` component so that we have a link to not
only our `Homepage`, but also to `/new` so that we can decide when we want to
view new stories or top stories:

```html
<template>
  <div class="pure-menu pure-menu-horizontal">
    <div class="container">
      <router-link :to="{ path: '/' }" class="pure-menu-heading pure-menu-link"
        >Home</router-link
      >
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <router-link :to="{ path: '/new' }" class="pure-menu-link"
            >New</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Navbar"
  };
</script>

<style scoped>
  .pure-menu {
    background-color: #e17842;
  }
  .pure-menu a {
    color: white;
  }
</style>
```

# Conclusion

So, in this tutorial, we looked at how we could further break up our growing
application into more components and start passing information from a parent
component, our `Home.vue` component, to individual `Item.vue` components.

We've covered some of the main benefits of breaking down a large, growing
application into a series of smaller components. We also looked at how we could
pass information between both a parent component and a series of child
components using `props`.

In the next tutorial, we are going to look at how we can manage state within our
VueJS application using Vuex and improve the performance of our application by
caching API results. You can see the next tutorial here:
[Part 7 - Managing State with Vuex](/projects/hacker-news-clone-vuejs/part-7-managing-state-with-vuex-vuejs/)
