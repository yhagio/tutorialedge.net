<template>
    <div class="w-full">
        <ais-instant-search 
            index-name="TutorialEdge" 
            :search-client="searchClient">
            
           <div class="mx-auto p-4 sm:p-8">
                <h2 class="text-xl mb-4">Search For Courses and Tutorials </h2>
                <ais-search-box :autofocus="true" />
                <br/>
                <ais-powered-by />
            </div>
            
            <div class="article-list bg-gray-200">
                <div class="w-full sm:w-4/5 mx-auto grid grid-flow-col">
                    <ais-hits>
                        <div slot="item" class="col-span-1" slot-scope="{ item }">
                            <a v-bind:href="item.permalink">
                                <div class="bg-white rounded shadow sm:flex p-4 sm:p-8 m-4 sm:m-8">
                                    <div class="hidden sm:block p-8">
                                        <img v-if="item.image" class="w-full h-auto mx-auto" v-bind:src="'https://images.tutorialedge.net/images/' + item.image" />
                                        <img v-if="!item.image" class="w-full h-auto mx-auto" src="https://images.tutorialedge.net/images/logo.png" />
                                    </div>
                                    <div class="ml-8">
                                        <h2>{{ item.title }}</h2>
                                        <p><b>Author:</b> {{ item.author }}</p>
                                        <p><b>Published:</b> {{ item.publishdate | moment }}</p>
                                        <p>{{ item.summary }}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </ais-hits>
                </div>

            </div>

            <div class="p-8">
              <ais-pagination />
            </div>

        </ais-instant-search>
     </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';

export default {
    name: 'SearchPage',
    data: function() {
        return {
            query: '',
            searchClient: algoliasearch(
                'HC4LXZHZ0P',
                'c03dde5425f223cd11270e711db47c0c'
            )
        }
    },
    filters: {
        moment: function (date) {
            const d = new Date(date)
            const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
            const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d) 

            return `${da}/${mo}/${ye}`
        }
    },
    created: function(helper) {
        const page = helper.getPage(); // Retrieve the current page
        let uri = window.location.search.substring(1); 
        let params = new URLSearchParams(uri);
        helper.setQuery(params.get("query")) // this call resets the page
                .setPage(page) // we re-apply the previous page
                .search();
    }
}
</script>

<style lang="scss">

.search {
    display: flex;
    
    input {
        width: 80%;
        padding: 20px;
        background-color: #21252D;
        border: none;
        font-size: 16px;
        color: white;
    }
}

.search button {
    display: block;
}

.search-bar {
  background-color: #F3F4F5;
  padding: 40px;
}

.course-progress-box {
    padding: 40px;
}

.search-results {
  min-height: 50vh;
  width:100%;
  padding: 40px;
  background-color: #fafbfc;
}

.search-results a:hover {
    text-decoration: none !important;
}

.search-results h2 {
    font-weight: 800 !important;
    margin-bottom: 10px !important;
}

.search-results img {
    margin: auto;
}

.search-result .url {
  color: #006621;
  margin: 0;
  padding: 0;
}

.search-btn {
  margin: auto;
  background-color: rgb(12, 122, 161) !important;
  margin-top: 20px;
}

.search-result {
  margin-bottom: 20px;
  margin-top: 20px;
}
.search-result .description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 22px;
  max-height: 44px;
  padding-bottom: 5px;
  color: #545454;
}
.search-result h3 {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 5px;
  padding: 0;
  color: #1a0dab;
}

.padding {
  padding: 40px;
}
.filter {
  background-color: white;
  padding: 20px;
  box-shadow: 0 5px 15px -5px rgba(0,0,0,.1);
}


.search {
  padding-left: 40px;
  padding-right: 40px;
}

.input-group {
  width: 100%;
  margin-bottom: 40px;
}

.ais-search-input {
  width: 100% !important;
}

.filters {
  background-color: white;
}

#hits {
  display: flex;
}

.ais-hits {
  flex: 1;
  // grid: auto-flow dense / 1fr;
  // grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  // grid-column-gap: 40px;
}

.ais-hits a:hover {
    text-decoration: none;
}

.ais-refinement-list--item:hover {
  background-color: #f6f6f6;
  cursor: pointer;
}

.ais-refinement-list--item {
  min-height: 35px;
  padding: .25rem .25rem .25rem .25rem;
  border-radius: 20px;
  cursor: pointer;
}

.ais-refinement-list--label {
  display: grid;
  grid: auto-flow dense / 1fr 5fr 1fr;
  grid-auto-columns: 1fr 5fr 1fr;
}

.ais-refinement-list--count {
  background-color: #f6f6f6;
  color: #3d4852;
  font-size: .75rem;
  margin-left: auto;
  align-items: center;
  color: #4d545d;
  font-size: 15px;
  line-height: 16px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  white-space: nowrap;
  border-radius: 20px;
}

.filter h3 {
  color: #22292f;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  font-weight: 700;
  margin: 1em 0;
}

.ais-Hits-list {
  display: flex !important; 
} 

.ais-SearchBox-submit {
    display: none;
}

.ais-Hits-item {

h2 {
    font-size: 20px;
    font-weight: 400;
  }

  p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  border: none !important;
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
  box-shadow: none !important;
}

.course-progress-box {
  border-color: #eaecef !important;
  border: 1px solid;
}

</style>