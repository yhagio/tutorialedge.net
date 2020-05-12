<template>
    <div class="snippet">
        <Loading v-if="this.loading" />
        
        <h4>Try It Now:</h4>
        <codemirror v-model="code" :options="cmOptions" />

        <button v-on:click="executeCode" class="btn btn-primary">Run Code...</button>
        
        <div v-if="this.output" class="alert alert-success" role="alert">
            <h4 class="alert-heading">Output:</h4>
            <p class="mb-0">{{ this.output }}</p>
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
    name: 'Snippet',
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
    methods: {
        executeCode: async function() {
            this.loading = true;
            let response = await axios({ method: "post", 
                    url: config.apiBase + "/v1/code", 
                    data: this.code,
                    headers: {
                        "Authorization": "Bearer " + this.$auth.getAccessToken(),
                        "Content-Type": "application/json"
                    }
                });
            this.loading = false;
            this.output = response.data;
        }
    }
}
</script>

<style lang="scss">
.loading {
    z-index: 200;
}
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