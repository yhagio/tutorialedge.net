<template>
    <div class="snippet">
        <Loading v-if="this.loading" />
        
        <div class="snippet-editor">
            <div class="window-header">
                <div class="action-buttons"></div>
                <span class="language">{{ this.language }}</span>
            </div>
            <codemirror v-model="code" :options="cmOptions" />
        </div>

        <div v-if="!this.loggedIn" class="controls">
            <h4>You Need To Register To Attempt Challenges</h4>
            <p>Sign up now to gain access to all of our free challenges</p>

            <a v-bind:href="this.redirectTo" class="btn btn-subscribe">Become a Member</a> or <a v-bind:href="this.redirectTo">Log In</a> 
        </div>

        <div v-if="this.loggedIn" class="controls">

            <button v-on:click="executeCode" class="btn btn-primary">Run Code...</button>
        
            <div v-if="this.response" role="alert">
                <h4 class="alert-heading">Program Output:</h4>
                <p class="output">{{ this.response.output }}</p>
                <br/>
                <h4>Test Results</h4>
                <div class="output" v-for="test in response.tests" v-bind:key="test.name">
                    <p class="mb-0"><b>Test: </b> {{ test.name }}</p>
                    <p class="mb-0"><b>Passed: </b> 
                        <span v-if="test.passed">✅</span> 
                        <span v-if="!test.passed">❌</span> 
                    </p>
                    <p class="mb-0">
                        <b>Output: </b> 
                        <span>{{ test.output }}</span>
                    </p>
                </div>
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
    props: [
        "code",
        "language",
        "tests"
    ],
    components: {
        codemirror,
        Carbon,
        Loading
    },
    data () {
        return {
            loggedIn: false,
            code: "",
            output: "",
            loading: false,
            redirectTo: "",
            response: {},
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
        this.redirectTo = "/profile/?redirectUri=" + window.location.pathname;
        if(this.$auth.isAuthenticated()) {
            this.loggedIn = true;
        }
    },
    methods: {
        executeCode: async function() {
            this.loading = true;
            let request = {
                code: this.code,
                tests: JSON.parse(this.tests)
            }

            try {
                
                let resp = await axios({ method: "post", 
                        url: config.apiBase + "/v1/challenge" + this.language, 
                        data: JSON.stringify(request),
                        headers: {
                            "Authorization": "Bearer " + this.$auth.getAccessToken(),
                            "Content-Type": "application/json"
                        }
                    });
                this.loading = false;
                this.response = resp.data;

            } catch (e) {
                this.loading = false;
                this.error = e;
            }
        }
    }
}
</script>

<style lang="scss">
.btn-subscribe {
  background-color: #1D84B5;
  padding: 10px;
  color: white !important;
  background: #0276d9;
  background-image: linear-gradient(22deg, #0276d9, #2C9CFC);
  border-bottom: 1px solid #0376d8;
  border: none;
  margin-right: 20px;
  text-decoration: none;
  padding-left: 20px;
  padding-right: 20px;
}

.output {
    margin: 0 0 5px;
    color: #576871;
    color: var(--color-text-dark-faded);
    font-weight: 400;
    font-size: 14px;
    background-color: #F3F7F7;
    padding: 20px;
}

</style>