<template>
    <div class="challenge bg-gray-200 w-full">
        <Loading v-if="this.loading" />
        
        <div class="snippet-editor text-white text-lg flex-none rounded">
            <!-- <div class="window-header bg-gray-600 px-4 py-2">
                <span class="language">{{ this.language }}</span>
            </div> -->
            <codemirror v-model="code" 
                :options="cmOptions"></codemirror>
        </div>

        <div v-if="!this.loggedIn" class="bg-white p-8 shadow">
            <h4 class="text-xl">You Need To Register To Attempt Challenges</h4>
            <p class="mb-8">Sign up now to gain access to all of our free challenges</p>

            <a v-bind:href="this.redirectTo" class="btn btn-subscribe">Become a Member</a> or <a v-bind:href="this.redirectTo">Log In</a> 
        </div>

        <div v-if="this.loggedIn" class="bg-white p-8 shadow">

            <button v-on:click="executeCode" class="btn btn-primary btn-execute">Run Code...</button>

            <div v-if="this.response" role="alert">
                <div class="output-label">
                    <h5>Progam Output:</h5>
                    <p id="outputtime">{{ this.response.time }}</p>
                </div>
                <pre class="output">{{ this.response.output }}</pre>
                <br/>
                <h4>Test Results</h4>
                <div id="test-output" class="output" v-for="test in response.tests" v-bind:key="test.name">
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

                <hr/>
                
                <div v-if="this.complete" class="complete text-center mt-4 mb-8">
                    <h4 class="text-3xl mb-4 mt-8">🎉 Challenge Complete! 🎉</h4>

                    <p>You have been awared <b>10 challenge points!</b></p>
                </div>
            </div>
        </div>
        <div class="p-4 rounded bg-white mt-10 shadow">
            <Carbon />
        </div>
    </div>
    
</template>

<script>
import { codemirror } from 'vue-codemirror';
import "codemirror/mode/go/go.js";
import "codemirror/mode/python/python.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";

import Carbon from '../misc/Carbon.vue';
import SocialShare from '../social/SocialShare.vue';
import axios from 'axios';
import md from 'markdown-it';
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
        Loading,
        SocialShare
    },
    data () {
        return {
            loggedIn: false,
            code: "",
            complete: false,
            output: "",
            loading: false,
            redirectTo: "",
            challenges: {},
            user: {},
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
        // this.getChallengeStats()
        this.redirectTo = "/profile/?redirectUri=" + window.location.pathname;
        if(this.$auth.isAuthenticated()) {
            this.loggedIn = true;
            this.user = this.$auth.getUser();
        }
    },
    methods: {
        markdown: function(input) {
            return md({
                html: true
            }).render(input)
        },
        getChallengeStats: async function() {
            let resp = await axios({
                url: config.apiBase + "/v1/challenges",
                method: "get",
                params: {
                    slug: window.location.pathname,
                }
            });

            this.challenges = resp.data;
        },
        testsPassed: function(tests) {
            if (tests === null || tests === undefined) {
                return false
            } else {
                return tests.every(test => test.passed === true);
            }
        },
        markChallengeComplete: async function() {
            let challenge = JSON.stringify({
                slug: window.location.pathname,
                code: this.code,
                score: 10,
                passed: true,
                execution_time: this.response.time,
                user: this.user,
                sub: this.user.sub
            })

            let response = await axios({
                url: config.apiBase + "/v1/challenges",
                method: "post",
                data: challenge,
                headers: {
                    "Authorization": "Bearer " + this.$auth.getAccessToken(),
                    "Content-Type": "application/json"
                }
            })
        },
        executeCode: async function() {
            this.loading = true;
            let request = {
                code: this.code,
                tests: JSON.parse(this.tests)
            }

            try {
                
                let resp = await axios({ method: "post", 
                        url: config.goApiUrl + "/challenge", 
                        data: JSON.stringify(request),
                        headers: {
                            "Authorization": "Bearer " + this.$auth.getAccessToken(),
                            "Content-Type": "application/json"
                        }
                    });
                this.loading = false;
                this.response = resp.data;
                this.complete = this.testsPassed(this.response.tests)

                this.markChallengeComplete();

            } catch (e) {
                this.loading = false;
                this.error = e;
            }
        }
    }
}
</script>

<style lang="scss">
.output {
    margin: 0 0 5px;
    color: #576871;
    color: var(--color-text-dark-faded);
    font-weight: 400;
    font-size: 14px;
    background-color: #F3F7F7;
    padding: 20px;
}

.output-label {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    font-family: monospace;
}

.CodeMirror {
    font-size: 18px;
    height: auto;
}
</style>