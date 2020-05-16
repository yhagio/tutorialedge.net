<template>
    <div class="snippet">
        <Loading v-if="this.loading" />
        
        <h4>Try It Now:</h4>

        <div class="snippet-editor">
            <div class="window-header">
                <div class="action-buttons"></div>
                <span class="language">Go</span>
            </div>
            <codemirror v-model="code" :options="cmOptions" />
        </div>

        <div class="controls">

            <button v-on:click="executeCode" class="btn btn-primary btn-execute">Submit Code</button>
            
            <codemirror v-model="output" :options="terminalOptions" />
<!--             
            <div class="tests">
                <h4>Test Results</h4>
                <div class="test" v-for="test in tests" v-bind:key="test.id">
                    {{ test.name }}
                    <span v-if="test.passed">✅</span>
                    <span v-if="!test.passed">❌</span>
                </div>
            </div>
             -->
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
            tests: [
                { name: "Test Case 1", passed: true },
                { name: "Test Case 2", passed: false }
            ],
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
                mode: 'application/xml',
                theme: 'monokai',
                lineNumbers: false,
                line: true,
                readOnly: true,
                cursorBlinkRate: -1,
                lineWrapping: true
            }
        }
    },
    methods: {
        executeCode: async function() {
            this.loading = true;
            let response = await axios({ method: "post", 
                    url: config.apiBase + "/v1/executego", 
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
