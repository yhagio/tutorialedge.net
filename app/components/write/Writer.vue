<template>
    <div>
        <Loading v-if="this.loading" />

        <div v-id="!this.loading">
            <div class="bg-gray-800 py-4 px-16 text-center text-white">
                <h1 class="flex mx-auto">
                    <img class="w-16 h-16" src="https://images.tutorialedge.net/images/logo.svg" alt="Write for us">
                    <span class="text-3xl ml-8 mt-3">Write an Article</span>
                </h1>
            </div>

            <div class="p-8 bg-gray-200">
                <div class="max-w-screen-xl mx-auto flex justify-between">
                    <div class="w-full bg-white p-8 mb-8 mr-4 rounded shadow">
                        <div class="mb-8">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Title
                            </label>
                            <input v-model="post.title" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Your Article Title...">            
                        </div>
                        <div class="mb-8">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Description
                            </label>
                            <input v-model="post.desc" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="A fitting description">            
                        </div>
                    </div>
                    
                    <div class="w-full bg-white p-8 mb-8 rounded shadow">
                        <div class="mb-8">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                Language
                            </label>
                            <div class="relative">
                                <select v-model="post.language" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    <option>Golang</option>
                                    <option>Rust</option>
                                    <option>Python</option>
                                    <option>JavaScript</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div class="mb-8">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                Actions
                            </label>
                            <div>
                                <button v-on:click="publish" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" aria-label="Publish Article">
                                Publish 🎉
                                </button>

                                {{ this.post }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="max-w-screen-xl mx-auto bg-white p-8 rounded shadow">
                    <vue-editor v-model="post.content" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import Loading from '../misc/Loading.vue';

export default {
    name: "Writer",
    data: function() {
        return {
            loading: false,
            user: {},
            post: {
                author: "",
                time: "",
                status: "",
                content: "",
                language: "Golang",
                desc: "",
                title: ""
            }
        }
    },
    components: {
        VueEditor,
        Loading
    },
    methods: {
        publish: function() {
            console.log(this.post)
        }
    },
    created: function() {
        
        if(!this.$auth.isAuthenticated()) {
            this.$auth.login()
        } else {
            this.user = this.$auth.getUser()
            this.loading = false;
        }
    }
}
</script>