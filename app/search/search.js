class Search {
    /* 
    * Search Class sets up our algolia instantsearch
    * widget which subsequently handles searches across the indexed
    * articles of the site
    */
    constructor() {
        console.log("hi");
        // constrain this to only run on the /search/ page
        if (window.location.pathname == '/search/') {
            let search = instantsearch({
                appId: 'HC4LXZHZ0P',
                apiKey: 'c03dde5425f223cd11270e711db47c0c', 
                indexName: 'TutorialEdge',
                urlSync: true,
                searchParameters: {
                    hitsPerPage: 18
                }
            });
        
            search.addWidget(
                instantsearch.widgets.refinementList({
                    container: "#refinement-list",
                    attributeName: "section"
                })
            );

            search.addWidget(
                instantsearch.widgets.refinementList({
                    container: '#tag-list',
                    attributeName: 'tags'
                })
            );

            search.addWidget(
                instantsearch.widgets.searchBox({
                    container: '#search-input'
                }),
            );
        
            search.addWidget(
                instantsearch.widgets.hits({
                    container: '#hits',
                    templates: {
                        body: function (data) {
                            return '<div>You have ' + data.nbHits + ' results, fetched in ' +
                                data.processingTimeMS + 'ms.</div>'
                        },
                        item: function (data) {
                            return '<a href="' + data.permalink + '">'
                                + '<div class="course-progress-box">'
                                + '<img src="/images/logo.png" alt="' + data.title + 'Image">'
                                + '<h2><small>Lesson</small><br />' + data.title + '</h2>'
                                + '<button class="btn btn-success">View Article</button>'
                                + '</div>'
                                + '</a>';
                        },
                        empty: "We didn't find any results for the query"
                    }
                })
            );
        
            search.addWidget(
                instantsearch.widgets.pagination({
                    container: '#pagination'
                })
            );

            search.start();
        }
    }
}

export default Search;