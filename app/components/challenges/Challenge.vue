<template>
    <div>
        <div class="top-bar">
            <div class="container">
                <h1>Challenges</h1>
            </div>
        </div>

        <div class="content">
            <div class="row">
                <div class="col-lg-6">
                    <codemirror v-model="code" :options="cmOptions" />
                </div>
                <div class="col-lg-6">
                    <h4>Challenge</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum aliquam, atque dolores quae eligendi veritatis placeat doloribus a minima optio dicta obcaecati, aspernatur itaque aliquid molestias adipisci, sit voluptas voluptatum!</p>

                    <button class="btn btn-primary">Submit</button>

                    <hr/>

                    <div class="float-right">
                        <Carbon />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import Carbon from '../misc/Carbon.vue';

export default {
    name: 'Challenge',
    components: {
        codemirror,
        Carbon
    },
    data () {
        return {
            code: 'const a = 10',
            cmOptions: {
                tabSize: 4,
                mode: 'text/javascript',
                theme: 'monokai',
                lineNumbers: true,
                line: true,
            }
        }
    }
}
</script>

<style lang="scss">
.search-results {
  min-height: 50vh;
  width:100%;
  padding: 40px;
  background-color: #fafbfc;
}
</style>