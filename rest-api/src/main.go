package main

import (
	"log"
	"net/http"
	"os"

	"./index"
	bleveHttp "github.com/blevesearch/bleve/http"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func staticFileRouter() *mux.Router {
	r := mux.NewRouter()
	r.StrictSlash(true)
	return r
}

func muxVariableLookup(req *http.Request, name string) string {
	return mux.Vars(req)[name]
}

func docIDLookup(req *http.Request) string {
	return muxVariableLookup(req, "docID")
}

func handleRequests() {
	router := staticFileRouter()
	tutorialedgeIndex := index.GetIndex()

	bleveHttp.RegisterIndexName("content", tutorialedgeIndex)
	searchHandler := bleveHttp.NewSearchHandler("content")
	router.Handle("/api/search", searchHandler).Methods("POST")

	listFieldsHandler := bleveHttp.NewListFieldsHandler("content")
	router.Handle("/api/fields", listFieldsHandler).Methods("GET")

	debugHandler := bleveHttp.NewDebugDocumentHandler("content")
	debugHandler.DocIDLookup = docIDLookup
	router.Handle("/api/debug/{docId}", debugHandler).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		Debug:            true,
	})

	log.Fatal(http.ListenAndServe(":9000", c.Handler(router)))
}

func main() {
	log.Println(" - TutorialEdge Rest API Started")
	if len(os.Args) > 1 {
		index.InitIndex()
	} else {
		log.Println(" - Starting Search Service on Port 9000")
		handleRequests()
	}
}
