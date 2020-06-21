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
                
                <div v-if="this.complete" class="complete text-center">
                    <h4>🎉 Challenge Complete! 🎉</h4>

                    <p>You have been awared <b>10 challenge points!</b></p>

                    <!-- <SocialShare /> -->
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

.output-label {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    font-family: monospace;
}
</style>