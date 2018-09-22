---
author: Andrea Koutifaris
date: 2018-07-27T19:36:57+01:00
desc: Learn how to develop an application to take notes, called EveryNote, using Vuex
  in this tutorial by Andrea Koutifaris, a passionate programmer obsessed with good
  programming and test-driven development.
image: vuejs.png
series:
- vuejs
tags:
- vuejs
- javascript
title: Designing the EveryNote Web App with VueJS and Vuex
twitter: https://amzn.to/2K4Ih5G
weight: 1
---

In this article, you’ll learn to develop an application to take notes, called `EveryNote`, from scratch. You’ll analyze and design the application, as well as preparing the folder structure for the project. After that, you’ll build the application incrementally through tests and code, providing a real-world Vuex development example. 

The application can be downloaded by cloning the [https://github.com/PacktPublishing/-Vuex-Condensed](https://github.com/PacktPublishing/-Vuex-Condensed) Git repository. You’ll require Node.js installed on a system. Finally, to use the Git repository, the user needs to install Git. The code files of this article can be found on GitHub: https://github.com/PacktPublishing/Vuex-Quick-Start-Guide/tree/master/chapter-4.

## Designing the EveryNote web app

One way to start designing an application is by creating mock-ups of the user interfaces. The EveryNote app will look like the following mock-up:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/javascript/vuejs/vuex-quickstart-image1.png)

### The EveryNote mock-up interface

The EveryNote features are simple and well defined, so you can begin by picking a feature and starting to develop it.

### Application structure

Vuex proposes an application-generic structure, which you can adopt. The following is the folder structure:

```s
test # test folder
├── test_file.spec.js # a test file
└── ...
src # app main folder
├── index.html
├── main.js
├── api
│ └── ... # abstractions for making API requests
├── components
│ ├── App.vue
│ └── ...
└── store
    ├──index.js #here we assemble modules and export the store
    ├── actions.js # root actions
    ├── mutations.js # root mutations
    └── modules
        ├── module_a.js # a module
        └── module_b.js # another module
```

You can create the project scaffold by adding some files to the notes-app folder. The first file to be created is index.html. As for any Vue.js application, you’ll need to put the root container for the Vue/Vuex application inside the body as follows:

```html
<!-- src/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Packt: Vuex condensed EveryNote</title>
</head>
<body>
<div id="app"></div>
</body>
</html>
```

The second file is main.js. It contains the code to start the Vue.js part of the application:

```js
// src/main.js
import Vue from 'vue';
import App from './components/App.vue';
import store from './store';
 
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
```

Now that the Vue application is ready, you can add Vuex to it by creating index.js inside the store folder:

```js
// src/store/index.js
import Vuex from 'vuex';
import Vue from 'vue';
 
Vue.use(Vuex);
 
const debug = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
state: {},
strict: debug,
});
 
export default store;
```

Finally, you can create the root Vue component of the EveryNote app as follows:

```html
// src/components/App.vue
<template>
 <div class="app">EveryNote app</div>
</template>
<script>
export default {};
</script>
<style>
.app {
font-family: "Times New Roman", Times, serif;
background-image: url("background.jpeg");
}
</style>
```

Clone the `book` repository and use `git checkout step-0_project-scaffold` to see all the project files for this step. Now that the project scaffold is ready, you can start coding the first feature.

## Developing the EveryNote app

In the following paragraphs, you’ll learn to develop the application using test-driven development (TDD). 

#### But why use TDD?

One reason is that it is easier to understand what the code is supposed to do by reading assertions about its behavior inside the test code, rather than inferring its behavior from implementation code. Another reason is that it is easier to understand how to test a component while writing the component.

### Using a to-do list to help the development process

This to-do list is a simple .txt file that changes over time and will hopefully be empty when the app is finished. The initial To-do list looks like this:

```
To-do:
Show all notes*
Create new notes
Update an existing note
Delete a note
Save notes to LocalStorage
 
Extra:
Search among notes
Pin a note
 
Done:
```

Use the * symbol to mark the current feature under development.

### Displaying a list of notes

Start by displaying a list of notes because the other features depend on it. Another possible feature to start with is the ability to create a new note. In order to display a list of notes, you need to add that list to the application's Vuex.Store. Then, you need a Vue component that uses the store to display the notes.

The first test is about defining a note list inside the application's main store:

```js
// test/store/store.spec.js
import store from '../../src/store';
 
describe('EveryNote main store', () => {
  it('should have a list of notes', () => {
    expect(Array.isArray(store.state.noteList)).toBe(true);
  });
});
```

Next, define the implementation:

```js
// src/store/index.js 
import ...
// ...
const store = new Vuex.Store({
  state: {
noteList: [],
  },
  strict: debug,
});
...
```

From now on, you will first see a frame detailing a component's tests, and, just after, a frame with the code implementation. It is important that you understand that TDD has a pace: one test, one piece of production code, one test, one piece of production code, and so on.
This is also referred to as red, green, refactor:

* Red: You write a small test and the result of executing it is a test failing—you'll see red in the test console.
* Green: You make the test pass in the easiest way—you'll see green in the test console. Duplicating code in this step is allowed.
* Refactor: You remove code duplication and improve code quality if you feel it is necessary.

The next step is creating a Vue component `noteList` to show the list of notes.

Test code:

```js
// test/components/NoteList.spec.js
import Vue from 'vue';
import Vuex from 'vuex';
import NoteList from '../../src/components/NoteList.vue';
 
describe('NoteList.vue', () => {
  let store;
  let noteList;
 
  function newNoteListCmp() {
    const Constructor = Vue.extend(NoteList);
    return new Constructor({
      store,
    }).$mount();
  }
 
  beforeEach(() => {
    Vue.use(Vuex);
 
    noteList = [];
    store = new Vuex.Store({
      state: { noteList },
    });
  });
 
  it('should expose store.noteList', () => {
    const noteListCmp = newNoteListCmp();
 
    expect(noteListCmp.notes).toBe(noteList);
  });
 
  it('should cycle through noteList', () => {
    noteList.push({});
    noteList.push({});
 
    const noteListCmp = newNoteListCmp();
 
    const contents =
      noteListCmp.$el.querySelectorAll('.content');
    expect(contents.length).toBe(2);
  });
 
  it('should render notes inside noteList', () => {
    const title = 'Note title';
    const content = 'Note content';
    noteList.push({ title, content });
 
    const noteListCmp = newNoteListCmp();
 
    const { $el } = noteListCmp;
    const titleEl = $el.querySelector('.title');
    const contentEl = $el.querySelector('.content');
    expect(titleEl.textContent).toBe(title);
    expect(contentEl.textContent).toBe(content);
  });
});
```

Application code:

```html
// src/components/NoteList.vue
<template>
  <div class="container">
    <div v-for="note in notes">
      <div class="title">{{note.title}}</div>
      <div class="content">{{note.content}}</div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
 
export default {
computed: mapState({
notes: 'noteList',
}),
};
</script>
<style>
</style>
```

> Remember the red-green-refactor pattern!

In order to write the NoteList code, you needed three tests:

* The first test checks that there is a computed property named notes that exposes state.store.NoteList
* The second test ensures that each note inside notes is rendered in the template section
* Finally, the last test ensures that the note's title and content are rendered

In addition, there is some code to set up the test environment in order to mock the store and create the component. Each item being tested should be isolated. This means that you can’t use the real store and you need to provide a mocked one for each component being tested.

You can now proceed to the next feature, but first, you can see some notes actually shown in the browser before moving on. To achieve this, you can temporarily add two notes to the store and add the NoteList component to App.vue.

Test code:

```js
// src/store/index.js
import Vuex from 'vuex';
import Vue from 'vue';
 
Vue.use(Vuex);
 
const debug = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
  state: {
    noteList: [
      { title: 'title A', content: 'content 1' },
      { title: 'title B', content: 'content 2' },
    ],
  },
  strict: debug,
});
 
export default store;
```

Application code:

```html
// src/components/App.vue
<template>
  <div class="app">
    <div>EveryNote app</div>
<note-list></note-list>
  </div>
</template>
<script>
  import NoteList from './NoteList.vue';
 
  export default {
    components: {
      NoteList,
    },
  };
</script>
<style>
  .app {
    font-family: "Times New Roman", Times, serif;
    background-image: url("background.jpeg");
  }
</style>
```

The following is a screenshot of the result:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/javascript/vuejs/vuex-quickstart-image2.png)

## List of notes

Right now, the result is ugly; you can add some CSS to make it much better looking after all the main features are implemented.

You can download the code at this stage by typing:
`git checkout step-1_note-list`

###  Creating new notes

At this point, the To-do list looks like this:

```
To-do:
Create new notes*
- NoteEditor component
- Update current note mutation
- Add note to noteList mutation
- Add note action
 
Update an existing note
Delete a note
Save notes to LocalStorage
 
Extra:
Search among notes
Pin a note
 
Done:
Show all notes
  - Add note list to the store
  - Note list vue component
  -- Add a temporary note list to the store
```

The next feature you’ll learn is the ability to create new notes. For this feature, you need a NoteEditor component, a store property named currentNote, an action named addNote, and two mutations: UPDATE_CURRENT_NOTE and ADD_NOTE.
The idea is that when a user writes in the note editor, the currentNote store property gets updated. When he taps on the Add note button, the addNote action is fired, resulting in the new note added to the note list. Add the currentNote property to the application store.
Test code:

```js
// test/store/store.spec.js
import store from '../../src/store';
 
describe('EveryNote main store', () => {
  it('should have a list of notes', () => {
    expect(Array.isArray(store.state.noteList)).toBe(true);
  });
 
  it('should have currentNote property', () => {
    const { state } = store;
    expect(state.currentNote.title).not.toBe(undefined);
    expect(state.currentNote.content).not.toBe(undefined);
  });
});
```

Application code:

```js
// src/store/index.js
 
//...
 
const store = new Vuex.Store({
state: {
noteList: [
      { title: 'title A', content: 'content 1' },
{ title: 'title B', content: 'content 2' },
],
currentNote: { title: '', content: '' },
},
  mutations,
strict: debug,
});
Now that currentNote is defined, you can write an UPDATE_CURRENT_NOTE mutation.
Test code:
// test/store/mutations.spec.js
import { mutations, types } from '../../src/store/mutations';
 
describe('EveryNote root mutations', () => {
  it('should update current note', () => {
    const updateCurrentNote
      = mutations[types.UPDATE_CURRENT_NOTE];
    const state = { currentNote: { title: '', content: '' } };
    const newNote = { title: 'title', content: 'some text' };
 
    updateCurrentNote(state, newNote);
 
    expect(state.currentNote).toEqual(newNote);
  });
});
```

Application code:

```js
// src/store/mutations.js
export const types = {
  UPDATE_CURRENT_NOTE: 'UPDATE_CURRENT_NOTE',
};
 
export const mutations = {
[types.UPDATE_CURRENT_NOTE](state, { title, content }) {
    state.currentNote = { title, content };
  },
};
```

Next, create the `NoteEditor` component.

Test code:

```js
// test/components/NoteEditor.spec.js
import Vue from 'vue';
import Vuex from 'vuex';
import NoteEditor from '../../src/components/NoteEditor.vue';
import { types, mutations } from '../../src/store/mutations';
import actions from '../../src/store/actions';
 
const { UPDATE_CURRENT_NOTE } = types;
describe('NoteEditor component', () => {
  let store;
  let currentNote;
 
  function newNoteEditorCmp() {
    const Constructor = Vue.extend(NoteEditor);
    store = new Vuex.Store({
            state: { currentNote, noteList: [] },
      mutations,
      actions,
    });
    return new Constructor({
      store,
    }).$mount();
  }
 
  beforeEach(() => {
    Vue.use(Vuex);
    currentNote = { title: 'title', content: 'content' };
  });
 
  it('should expose currentNote.content as content', () => {
    const editorCmp = newNoteEditorCmp();
 
    expect(editorCmp.content).toBe(currentNote.content);
  });
 
  it('should expose currentNote.content setter', () => {
    const editorCmp = newNoteEditorCmp();
    store.commit = jasmine.createSpy('commit spy');
    const newContent = 'A new content';
 
    editorCmp.content = newContent;
 
    const expected = {
      title: currentNote.title,
      content: newContent,
    };
    expect(store.commit)
      .toHaveBeenCalledWith(UPDATE_CURRENT_NOTE, expected);
  });
 
  it('should expose currentNote.title as title', () => {
    const editorCmp = newNoteEditorCmp();
 
    expect(editorCmp.title).toBe(currentNote.title);
  });
 
  it('should expose currentNote.title setter', () => {
    const editorCmp = newNoteEditorCmp();
    store.commit = jasmine.createSpy('commit spy');
    const newTitle = 'A new title';
 
    editorCmp.title = newTitle;
 
    const expected = {
      title: newTitle,
      content: currentNote.content,
    };
    expect(store.commit)
      .toHaveBeenCalledWith(UPDATE_CURRENT_NOTE, expected);
  });
 
  it('should render current note inside the editor', () => {
    const editorCmp = newNoteEditorCmp();
 
    const { $el } = editorCmp;
    const contentEl = $el.querySelector('.content');
    const titleEl = $el.querySelector('.title');
    expect(contentEl.value).toBe(currentNote.content);
    expect(titleEl.value).toBe(currentNote.title);
  });
});
```

Application code:

```html
// src/components/NoteEditor.vue
<template>
  <div>
    <input v-model="title" type="text" class="title"/>
    <input v-model="content" type="text" class="content"/>
  </div>
</template>
<script>
  import { types } from '../store/mutations';
 
  const { UPDATE_CURRENT_NOTE } = types;
  export default {
    computed: {
content: {
        get() {
          return this.$store.state.currentNote.content;
        },
        set(value) {
          const newContent = {
            title: this.title,
            content: value,
          };
          this.$store.commit(UPDATE_CURRENT_NOTE, newContent);
        },
      },
title: {
        get() {
          return this.$store.state.currentNote.title;
        },
        set(value) {
          const newContent = {
            title: value,
            content: this.content,
          };
          this.$store.commit(UPDATE_CURRENT_NOTE, newContent);
        },
      },
    },
  };
</script>
<style></style>
```

In order to code the NoteEditor component, you have tested that the computed content and title properties were properly linked to $store.state.currentNote, and that these properties were used in the template section.

As with the tests for the NoteList component, the first part of the test file is just some code to create the component under test.

The next step is creating the addNote action and the corresponding mutation so that you can update NoteEditor to dispatch this action when a user presses the Add note button. The following is the ADD_NOTE mutation.

Test code:

```js
// test/store/mutations.spec.js
import { mutations, types } from '../../src/store/mutations';
 
describe('EveryNote root mutations', () => {
  it('should update current note', () => {
    // ...
  });
 
  it('should add a note to noteList', () => {
    const ADD_NOTE = mutations[types.ADD_NOTE];
    const state = { noteList: [] };
    const newNote = { title: 'title', content: 'some text' };
 
    ADD_NOTE(state, newNote);
 
    expect(state.noteList['0']).toBe(newNote);
  });
});
```

Application code:

```js
// src/store/mutations.js
export const types = {
  UPDATE_CURRENT_NOTE: 'UPDATE_CURRENT_NOTE',
ADD_NOTE: 'ADD_NOTE',
};
 
export const mutations = {
  [types.UPDATE_CURRENT_NOTE](state, { title, content }) {
    state.currentNote = { title, content };
  },
[types.ADD_NOTE](state, aNote) {
    state.noteList.push(aNote);
  },
};
```

The following is the addNote action tests:

```js
// test/store/actions.spec.js
 
import actions from '../../src/store/actions';
import { types } from '../../src/store/mutations';
 
describe('EveryNote root actions', () => {
  it('should have addNote action', () => {
    const { addNote } = actions;
    const mockContext = {
      commit: jasmine.createSpy('commit'),
    };
    const aNote = {};
 
    addNote(mockContext, aNote);
 
    expect(mockContext.commit)
      .toHaveBeenCalledWith(types.ADD_NOTE, aNote);
  });
});
```

The following is the application code:

```js
// src/store/actions
import { types } from './mutations';
 
export default {
addNote({ commit }, aNote) {
    commit(types.ADD_NOTE, aNote);
  },
};
```

Finally, you can update NoteEditor to dispatch the addNote action and see that the note list gets updated. First, update the NoteEditor.

Test code:

```js
// test/components/NoteEditor.spec.js
import // ...
 
const { UPDATE_CURRENT_NOTE } = types;
describe('NoteEditor component', () => {
  let store;
  let currentNote;
 
  function newNoteEditorCmp() {
    // ...
  }
 
  // ...
 
  it('should have addNote method', () => {
    const editorCmp = newNoteEditorCmp();
    spyOn(store, 'dispatch');
 
    editorCmp.addNote();
 
    expect(store.dispatch)
      .toHaveBeenCalledWith('addNote', currentNote);
  });
 
  it('should not add empty notes', () => {
    const editorCmp = newNoteEditorCmp();
    spyOn(store, 'dispatch');
    currentNote.title = '';
    currentNote.content = '';
 
    editorCmp.addNote();
 
    expect(store.dispatch).not.toHaveBeenCalled();
  });
 
  it('should reset title and content on addNote', () => {
    const editorCmp = newNoteEditorCmp();
 
    editorCmp.addNote();
 
    expect(editorCmp.title).toBe('');
    expect(editorCmp.content).toBe('');
  });
});
```

Application code:

```html
// src/components/NoteEditor.vue
<template>
  <div>
    <input v-model="title" type="text" class="title"
           placeholder="title"/>
    <input v-model="content" type="text" class="content"
           placeholder="content"/>
<button @click="addNote">Add note</button>
  </div>
</template>
<script>
  import { types } from '../store/mutations';
 
  const { UPDATE_CURRENT_NOTE } = types;
  export default {
    computed: {
      content: {
        // ...
      },
      title: {
        // ...
      },
    },
    methods: {
addNote() {
        if (this.title !== '' || this.content !== '') {
          const newNote = {
            title: this.title,
            content: this.content,
          };
 
          this.$store.dispatch('addNote', newNote);
        }
        this.title = '';
        this.content = '';
      },
    },
  };
</script>
```

Now add actions to the store:

```js
// src/store/index.js
import // ...
import actions from './actions';
 
// ...
 
const store = new Vuex.Store({
state: { // ...},
mutations,
actions,
strict: debug,
});
```

Now add NoteEditor to App.vue

```html
// src/components/App.vue
<template>
  <div class="app">
    <div>EveryNote app</div>
    <note-editor></note-editor>
    <note-list></note-list>
  </div>
</template>
<script>
import NoteList from './NoteList.vue';
import NoteEditor from './NoteEditor.vue';
 
export default {
components: {
      NoteList,
NoteEditor,
},
};
</script>
<style>
    // ...
</style>
```

After having added some CSS to the components and restyling the application a bit, it now looks like the following figure:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/javascript/vuejs/vuex-quickstart-image3.png)

## EveryNote restyled

You can download the code at this stage by typing the following:
`git checkout step-2_create-notes`

If you found this article helpful, you can explore more in Andrea Koutifaris’ [Vuex Quick Start Guide](https://amzn.to/2K4Ih5G). This book is the easiest way to get started with Vuex to improve your Vue.js application architecture and overall user experience.

