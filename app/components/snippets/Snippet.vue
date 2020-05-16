<template>
    <div class="snippet">
        <Loading v-if="this.loading" />
        
        <div class="snippet-editor">
            <h4>Try It Now:</h4>
            <div class="window-header">
                <div class="action-buttons"></div>
                <span class="language">Go</span>
            </div>
            <codemirror v-model="code" :options="cmOptions" />
        </div>

        <div class="controls">
            <button v-on:click="executeCode" class="btn btn-primary btn-execute">Submit Code</button>
            <codemirror v-model="output" :options="terminalOptions" />
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
            },
            terminalOptions: {
                tabSize: 4,
                theme: 'monokai',
                mode: 'application/html',
                lineNumbers: false,
                readOnly: true,
                cursorBlinkRate: -1,
                lineWrapping: true
            }
        }
    },
    methods: {
        executeCode: async function() {
            this.loading = true;
            try {
                let response = await axios({ method: "post", 
                    url: config.apiBase + "/v1/executego", 
                    data: this.code,
                    headers: {
                        "Authorization": "Bearer " + this.$auth.getAccessToken(),
                        "Content-Type": "application/json"
                    }
                });
                this.loading = false;
                this.output = response.data.toString();
                console.log(response);
                console.log(response.data);
            } catch (err) {
                this.loading = false;
                this.output = err;
            }
        }
    }
}
</script>
