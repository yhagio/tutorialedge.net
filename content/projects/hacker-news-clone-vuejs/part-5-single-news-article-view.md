---
title: "Part 5 - Viewing Individual News Articles"
date: 2018-03-19T16:24:13Z
draft: true
desc: "In this tutorial, we are going to add some more routes and components to our application to view individual news items and the comments"
author: "Elliot Forbes"
tags: ["vuejs", "javascript"]
image: "vuejs.png"
weight: 5
series: [ "hackernewsclone" ]
twitter: "https://twitter.com/Elliot_F"
---

In the previous tutorial, we looked at how we could show all of the latest HackerNews stories on our `Homepage` component and showed information like the score and the URL of that story. Whilst this is pretty cool, it doesn't let us see the discussion going on around any of the stories, as we all know, this can be the best bit!

In this tutorial, we'll be adding a new route to our VueJS application which will be able to render an individual story and the comments associated with it. 

## Video Tutorial

This tutorial is also available in video format, should you wish to support the series then you can do so by subscribing to my YouTube channel and hitting that like button on my videos! 

<div style="position:relative;height:0;padding-bottom:42.76%"><iframe src="https://www.youtube.com/embed/weR4NFFgrOo?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="842" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

## Our Single.vue Component

First things first, we will need a new component. Create a new file within your `src/components` directory called `Single.vue`.

```html
<template>
    <div>
        <h2>My Single Route</h2>
    </div>
</template>

<script>
export default {
    name: 'Single'
}
</script>

<style scoped>

</style>
```

Next, we will need to create a new route in our `vue router`. Extend your `index.js` file within the `src/router/` directory so that it imports our newly defined `Single` component and so that it has a new `/story` path which will render our component.

```js
import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Single from '@/components/Single'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/story/:id',
      name: 'Single',
      component: Single
    }
  ]
})
```

You should notice that the `path` that we've set for our `Single` component features a `:id` at the end of it. This will represent the `id` of the story that we wish to view and it prevents us from having to hardcode say `/story/1/` in order to view story 1 and so on. 

Within our `Single` component we will be able to retrieve this `:id` value and then make the appropriate REST API request to fetch that stories' comments and render them accordingly.

## Updating our Homepage Component

So, now that we've defined this route, we need to update our `Homepage` component so that each story we retrieve links back to the appropriate `/story/:id` page within our application.

To do this, we'll use the `<router-link/>` component to wrap our stories' title like so:


```html
<template>
    <div>
        <h2>Homepage</h2>
        <div v-for="story in stories" :key="story">
          <router-link :to="{ path: '/story/' + story.data.id }"><h2>{{ story.data.title }}</h2></router-link>
          <p>Type: {{ story.data.type }}</p>
          <p>Link: {{ story.data.url }}</p>
          <p>Score: {{ story.data.score }}</p>
        </div>
    </div>
</template>
```

This `<router-link>` component effectively allows you to change your location within this Single Page Application without making a request for a new page. It effectively tells Vue that it want's to change location, Vue picks this up and matches the location against an existing route, and then displays the appropriate component assigned to that route.

You could in theory do this with `<a>` tags, however, `<router-link>` provides a few more advanced features such as the ability to update the underlying web browser's history via API requests should we wish!

When you save this and navigate to your application in the browser, you should see all of our storie's titles rendering as HTML links.

![Our Stories now have links](https://s3-eu-west-1.amazonaws.com/tutorialedge.net/images/hackernews-clone/screenshot-08.png)

When you subsequently click on a link, you should see it take you through to our newly defined `Single` component with the `ID` appended to the end of our URL like so:

![Our single component](https://s3-eu-west-1.amazonaws.com/tutorialedge.net/images/hackernews-clone/screenshot-09.png)

## Querying The Comments API

So, we have the story, we have our new component, how do we get our new component to retrieve all of the top-level comments for said story? 

The answer? Another series of RESTful API calls within our component's `created()` lifecycle hook.

```js
import axios from 'axios'
export default {
  name: 'Single',
  data: function () {
    return {
      story: {},
      comments: []
    }
  },
  created: function () {
    axios.get('https://hacker-news.firebaseio.com/v0/item/' + this.$route.params.id + '.json')
      .then((res) => {
        this.story = res.data
        this.story.comments = []
        this.story.kids.forEach(id => {
          axios.get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json')
            .then((res) => {
              this.$nextTick(() => {
                console.log(res.data)
                this.comments.push(res.data)
              })
            })
            .catch((err) => {
              console.log(err)
            })
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
```

## Updating our Template

Now that we've queried the appropriate API endpoints to retrieve the top level comments, it's time to display these in our `Single.vue` component. In order to do this we are going to add the following HTML:

```html
<template>
    <div class="container">
        <h2>{{ story.title }}</h2>
        <p>Score: {{ story.score }}</p>
        <p>{{ story.url }}</p>
        <div v-for="comment in comments" :key="comment">
          <div class="comment-wrap">
                <div class="comment-block">
                    <p class="comment-text">{{ comment.text }}</p>
                    <div class="bottom-comment">
                        <div class="comment-author">{{ comment.by }}</div>
                        <div class="comment-date">{{ comment.time }}</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
```

If you were to save this and view it as it currently stands, it wouldn't look all that good. So, let's add some CSS to make things look a little nicer all around. Add the following CSS to the `<style scoped>` part of your `Single.vue` component:

> These were taken from this codepen: [Comments](https://codepen.io/kavendish/pen/aOdopx)! I can't take credit for making it look nice!

```css

.comment-wrap {
  margin-bottom: 1.25rem;
  display: table;
  width: 100%;
  min-height: 5.3125rem;
}

.photo {
  padding-top: 0.625rem;
  display: table-cell;
  width: 3.5rem;
}
.photo .avatar {
  height: 2.25rem;
  width: 2.25rem;
  border-radius: 50%;
  background-size: contain;
}

.comment-block {
  padding: 1rem;
  background-color: #fff;
  display: table-cell;
  vertical-align: top;
  border-radius: 0.1875rem;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
}
.comment-block textarea {
  width: 100%;
  resize: none;
}

.comment-text {
  margin-bottom: 1.25rem;
}

.bottom-comment {
  color: #acb4c2;
  font-size: 0.875rem;
}

.comment-date {
  float: left;
}

.comment-actions {
  float: right;
}
.comment-actions li {
  display: inline;
  margin: -2px;
  cursor: pointer;
}
.comment-actions li.complain {
  padding-right: 0.75rem;
  border-right: 1px solid #e1e5eb;
}
.comment-actions li.reply {
  padding-left: 0.75rem;
  padding-right: 0.125rem;
}
.comment-actions li:hover {
  color: #0095ff;
}
```

## Some Global Style Changes

To polish this just a little bit more, let's add a `static/style.css` file to our project and populate it with the following CSS:

```css
body {
    background-color: #f0f2fa;
  font-family: "PT Sans", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;
  color: #555f77;
  -webkit-font-smoothing: antialiased;
}

.container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  @media (min-width: 768px) {
    .container {
      width: 750px;
    }
  }
  @media (min-width: 992px) {
    .container {
      width: 970px;
    }
  }
  @media (min-width: 1200px) {
    .container {
      width: 1170px;
    }
  }
```

## The Finished Product

Once you have made the above changes, you should see something like this render out into your browser:

![The finished Product](https://s3-eu-west-1.amazonaws.com/tutorialedge.net/images/hackernews-clone/screenshot-10.png)

This project is starting to look a little more polished, a little closer to being finished. However, there is still a lot to be improved upon. For instance, the way we are rendering that text isn't right, neither is the date format. And we can't see any child comments underneath the top comments listed. 

If you are enjoying the course so far then I would love to hear your feedback on twitter: [@Elliot_f](https://twitter.com/elliot_f). I'm also open to any constructive critiques you may have with regards to not only this project, but anything about this site!

> The next tutorial in this series can be found here: [Part 6 - Advanced Components](/projects/hacker-news-clone-vuejs/part-6-advanced-components/)