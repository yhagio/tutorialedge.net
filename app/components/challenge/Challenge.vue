<template>
    <div class="snippet">
        <Loading v-if="this.loading" />
        
        <h4>Try It Now:</h4>
        <codemirror v-model="code" :options="cmOptions" />

        <div class="controls">

            <button v-on:click="executeCode" class="btn btn-primary">Run Code...</button>
        
            <div v-if="this.output" class="alert alert-success" role="alert">
                <h4 class="alert-heading">Output:</h4>
                <p class="mb-0">{{ this.output }}</p>
            </div>
        </div>

        <hr>

        <Carbon />
    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import Carbon from '../misc/Carbon.vue';
import axios from 'axios';
import config from 'environment';
import Loading from '../misc/Loading.vue';

export default {
    name: 'Challenge',
    props: ["code"],
    components: {
        codemirror,
        Carbon,
        Loading
    },
    data () {
        return {
            code: "",
            output: "",
            loading: false,
            cmOptions: {
                tabSize: 4,
                mode: 'text/x-go',
                theme: 'monokai',
                lineNumbers: true,
                line: true,
            }
        }
    },
    created: async function() {
        this.loading = true;
        try {
            let response = await axios({
                url: config.apiBase + "/v1/user",
                headers: {
                    "Authorization": "Bearer " + this.$auth.getAccessToken(),
                    "Content-Type": "application/json"
                }
            })
            this.loading = false;
        } catch (e) {
            this.loading = false;
            this.error = e;
        }
        console.log("On load...")
        console.log("retrieve user's challenge status - i.e. not complete")
        console.log("loading in previous code if they have already attempted")
        console.log("load in finished code if they have completed it")
    },
    methods: {
        executeCode: async function() {
            this.loading = true;

            try {
                let response = await axios({ method: "post", 
                        url: config.apiBase + "/v1/challenge", 
                        data: this.code,
                        headers: {
                            "Authorization": "Bearer " + this.$auth.getAccessToken(),
                            "Content-Type": "application/json"
                        }
                    });
                this.loading = false;
                this.output = response.data;
            } catch (e) {
                this.loading = false;
                this.output = e;
            }
        }
    }
}
</script>

