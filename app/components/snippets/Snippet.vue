<template>
    <div class="snippet">
        <h4>Code:</h4>
        <codemirror v-model="code" :options="cmOptions" />

        <!-- <button v-on:click="executeCode" class="btn btn-primary">Run Code...</button>
        
        <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Output:</h4>
            <p class="mb-0">{{ this.output }}</p>
        </div>

        <hr> -->

        <Carbon />
    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import Carbon from '../misc/Carbon.vue';
import axios from 'axios';
import config from 'environment';

export default {
    name: 'Snippet',
    props: ["code"],
    components: {
        codemirror,
        Carbon
    },
    data () {
        return {
            code: "",
            output: "This is the program output...",
            cmOptions: {
                tabSize: 4,
                mode: 'text/x-go',
                theme: 'monokai',
                lineNumbers: true,
                line: true,
            }
        }
    },
    methods: {
        executeCode: async function() {
            
            let body = JSON.stringify({
                code: this.code
            })

            let response = await axios({ method: "post", 
                    url: config.apiBase + "/v1/code", 
                    data: body,
                    headers: {
                        "Authorization": "Bearer " + this.$auth.getAccessToken(),
                        "Content-Type": "application/json"
                    }
                });
            this.output = response;
        }
    }
}
</script>

<style lang="scss">
.snippet {
    padding: 40px;
}
.cm-s-monokai.CodeMirror {
    background: #272822;
    color: #f8f8f2;
    min-height: 60vh;
}

.CodeMirror {
    height: 600px auto;
}
</style>