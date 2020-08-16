---
title: "Challenge 04 - Checking for Duplicates"
date: 2020-05-24T21:23:23+01:00
desc: In this challenge, we are going to implement a function that allows us to check and see if there are duplicates within a list in Go
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
image: golang.png
difficulty: Medium
weight: 4
series:
  - go-challenges
tags:
  - "Data Structures"
language: go
layout: challenge
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
  package main

  import "fmt"

  type Developer struct {
    Name string
    Age int
  }

  func FilterUnique(developers []Developer) []string {
    // TODO Implement
    return nil
  }

  func main() {
    fmt.Println("Filter Unique Challenge")
  }
tests: 
  - name: main_test
    test: TestFilterUnique
    code: |
      package main

      import (
        "reflect"
        "testing"
      )

      func TestFilterUnique(t *testing.T) {
        input := []Developer{
          Developer{Name: "Elliot"},
          Developer{Name: "Elliot"},
          Developer{Name: "David"},
          Developer{Name: "Alexander"},
          Developer{Name: "Eva"},
          Developer{Name: "Alan"},
        }

        expected := []string{
          "Elliot",
          "David",
          "Alexander",
          "Eva",
          "Alan",
        }

        result := FilterUnique(input)

        if !reflect.DeepEqual(result, expected) {
          t.Fail()
        }
      }

---

In this challenge, we are going to be looking at how you can effectively filter out the duplicate entries from a slice in Go.

The task will be to implement the `FilterDuplicates` function so that it returns a slice of type string which contains only the unique names of developers retrieved from the inputted list.

**Example:**

```go
// input
[]Developers{
  Developer{Name: "Elliot"},
  Developer{Name: "Alan"},
  Developer{Name: "Jennifer"},
  Developer{Name: "Graham"},
  Developer{Name: "Paul"},
  Developer{Name: "Alan"},
}

// output
[]string{
  "Elliot",
  "Alan",
  "Jennifer",
  "Graham",
}

```

<details><summary>Hints</summary>

You may wish to use a `map` in your function in order to check if elements have already been seen by our function.

</details>


## See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 04 - Filtering Duplicates](https://discuss.tutorialedge.net/t/challenge-04-filtering-duplicates/21) 


### Further Reading:

If you like this challenge then you may also enjoy some of the other challenges on the site:

* [Sorting Flights by Price](/challenges/go/sort-by-price/)
* [Satisfying Interfaces](/challenges/go/interfaces/)