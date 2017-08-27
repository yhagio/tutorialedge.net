package index

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/blevesearch/bleve"
	"github.com/blevesearch/bleve/analysis/lang/en"
	"github.com/spf13/hugo/parser"
)

// Article. struct for all articles
type Article struct {
	Title       string
	Meta        string
	Description string
	Body        string
	Url         string
}

func InitIndex() {

	if _, err := os.Stat("tutorialedge"); err == nil {
		os.RemoveAll("tutorialedge")
	}

	englishTextFieldMapping := bleve.NewTextFieldMapping()
	englishTextFieldMapping.Analyzer = en.AnalyzerName

	contentMapping := bleve.NewDocumentMapping()
	contentMapping.AddFieldMappingsAt("Title", englishTextFieldMapping)
	contentMapping.AddFieldMappingsAt("Body", englishTextFieldMapping)

	indexMapping := bleve.NewIndexMapping()
	indexMapping.AddDocumentMapping("content", contentMapping)

	indexMapping.TypeField = "type"
	indexMapping.DefaultAnalyzer = "en"

	index, err := bleve.New("tutorialedge", indexMapping)
	defer index.Close()
	if err != nil {
		panic(err)
	}

	populate(index)
	log.Println("Successfully Indexed All Files")

}

func parseArticle(filepath string) (Article, error) {
	var tempArticle Article
	file, err := os.Open(filepath)
	if err != nil {
		fmt.Println(err)
	}

	page, err := parser.ReadFrom(file)

	if err != nil {
		fmt.Println(err)
		return tempArticle, err
	} else {
		tempArticle.Body = string(page.Content())
		tempArticle.Meta = string(page.FrontMatter())

		mdi, _ := page.Metadata()
		md, _ := mdi.(map[string]interface{})
		if md["title"] == nil {
			fmt.Println("Empty Title: ", filepath)
		}
		tempArticle.Title = md["title"].(string)
		return tempArticle, nil
	}
}

func populate(index bleve.Index) {
	searchDir := "../../tutorialedge/content/"

	fileList := []string{}
	err := filepath.Walk(searchDir, func(path string, f os.FileInfo, err error) error {
		fileList = append(fileList, path)
		return nil
	})

	if err != nil {
		fmt.Println(err)
	}

	for _, file := range fileList {
		article, err := parseArticle(file)

		if err != nil {
			fmt.Println(err)
		}

		if !isDirectory(file) {
			index.Index(convertPathToLink(file), article)
		}

	}
}

func convertPathToLink(path string) (url string) {
	tmpStr := strings.Replace(path, "\\", "/", -1)
	tempString := tmpStr[26:(len(tmpStr)-3)] + "/"
	fmt.Println(tempString)
	return tempString
}

func isDirectory(path string) bool {
	fileInfo, err := os.Stat(path)
	if err != nil {
		fmt.Println(err)
	}
	return fileInfo.IsDir()
}

func GetIndex() bleve.Index {
	index, err := bleve.Open("tutorialedge")
	if err != nil {
		fmt.Println(err)
	}
	return index
}
