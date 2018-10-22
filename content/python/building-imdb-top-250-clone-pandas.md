---
title: "Building an IMDB Top 250 Clone with Pandas"
desc: "Learn how to build an IMDB Top 250 clone with Pandas in this article by Rounak Banik."
date: 2018-10-21T19:20:13+01:00
author: "Rounak Banik"
twitter: https://twitter.com/rounak_banik
series:
- python
tags:
- "machine learning"
---

The Internet Movie Database (IMDB) maintains a chart called the IMDB Top 250, which is a ranking of the top 250 movies according to a certain scoring metric. All the movies in this list are non-documentary, theatrical releases with a runtime of at least 45 minutes and over 250,000 ratings:

![IMDB Recommender system](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/python/recommender-system-python/image1-17.png)

This chart can be considered the simplest of recommenders. It doesn't take into consideration the tastes of a particular user nor does it try to deduce similarities between different movies. It simply calculates a score for every movie based on a predefined metric and outputs a sorted list of movies based on that score.

This article covers the following:

* Building a clone of the IMDB Top 250 chart (henceforth referred to as the simple recommender).
* Taking the functionalities of the chart one step further and building a knowledge-based recommender. This model takes user preferences with regards to genre, timeframe, runtime, and language, and recommends movies that satisfy all conditions.

You’ll be required to have Python installed on a system. Finally, to use the Git repository, you need to install Git. The code files of this article can be found on GitHub at https://github.com/PacktPublishing/Hands-On-Recommendation-Systems-with-Python/tree/master/Chapter3. You can also see the code in action at http://bit.ly/2v7SZD4.

# The simple recommender

The first step in building your simple recommender is setting up your workspace. Create a new directory named `IMDB`. Create a Jupyter Notebook in this directory named `Simple Recommender` and open it in the browser.

Now load the dataset available at https://www.kaggle.com/rounakbanik/the-movies-dataset/downloads/movies_metadata.csv/7:

```py
import pandas as pd
import numpy as np

#Load the dataset into a pandas dataframe
df = pd.read_csv('../data/movies_')

#Display the first five movies in the dataframe
df.head()
```

Upon running the cell, you should see a familiar table-like structure output in the notebook.

Building the simple recommender is fairly straightforward. The steps are as follows:

1. Choose a metric (or score) to rate the movies on
1. Decide on the prerequisites for the movie to be featured on the chart
1. Calculate the score for every movie that satisfies the conditions
1. Output the list of movies in decreasing order of their scores

# The metric

The metric is the numeric quantity based on which you rank movies. A movie is considered to be better than another movie if it has a higher metric score than the other movie. It is very important that you have a robust and reliable metric to build your chart upon to ensure a good quality of recommendations.

The choice of a metric is arbitrary. One of the simplest metrics that can be used is the movie rating. However, this suffers from a variety of disadvantages. In the first place, the movie rating does not take the popularity of a movie into consideration. Therefore, a movie rated 9 by 100,000 users will be placed below a movie rated 9.5 by 100 users. This is not desirable as it is highly likely that a movie watched and rated only by 100 people caters to a very specific niche and may not appeal as much to the average person as the former.

It is also a well-known fact that as the number of voters increase, the rating of a movie normalizes and it approaches a value that is reflective of the movie's quality and popularity with the general populace. To put it another way, movies with very few ratings are not very reliable. A movie rated 10/10 by five users doesn't necessarily mean that it's a good movie.

Therefore, what you need is a metric that can, to an extent, take into account the movie rating and the number of votes it has garnered (a proxy for popularity). This would give a greater preference to a blockbuster movie rated 8 by 100,000 users over an art house movie rated 9 by 100 users.

Fortunately, you do not have to brainstorm a mathematical formula for the metric. You can use IMDB's weighted rating formula as your metric. Mathematically, it can be represented as follows:

Weighted Rating (WR) = 

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/python/recommender-system-python/image2-19.png)

The following apply:

* v is the number of votes garnered by the movie
* m is the minimum number of votes required for the movie to be in the chart (the prerequisite)
* R is the mean rating of the movie
* C is the mean rating of all the movies in the dataset

You already have the values for v and R for every movie in the form of the `vote_count` and `vote_average` features respectively. Calculating C is extremely trivial.

# The prerequisties

The IMDB weighted formula also has a variable m, which it requires to compute its score. This variable is in place to make sure that only movies that are above a certain threshold of popularity are considered for the rankings. Therefore, the value of m determines the movies that qualify to be in the chart and also, by being part of the formula, determines the final value of the score.

Just like the metric, the choice of the value of m is arbitrary. In other words, there is no right value for m. It is a good idea to experiment with different values of m and then choose the one that you (and your audience) think gives the best recommendations. The only thing to be kept in mind is that the higher the value of m, the higher the emphasis on the popularity of a movie, and therefore the higher the selectivity.

For your recommender, use the number of votes garnered by the 80th percentile movie as your value for m. In other words, for a movie to be considered in the rankings, it must have garnered more votes than at least 80% of the movies present in your dataset. Additionally, the number of votes garnered by the 80th percentile movie is used in the weighted formula described previously to come up with the value for the scores.

Now calculate the value of m:

```py
#Calculate the number of votes garnered by the 80th percentile movie
m = df['vote_count'].quantile(0.80)
m

OUTPUT:
50.0
```

You can see that only 20% of the movies have gained more than 50 votes. Therefore, your value of m is `50`.

Another prerequisite that you want in place is the runtime. Only consider movies that are greater than `45 minutes` and less than `300 minutes` in length. Define a new DataFrame, `q_movies`, which will hold all the movies that qualify to appear in the chart:

```py
#Only consider movies longer than 45 minutes and shorter than 300 minutes
q_movies = df[(df['runtime'] >= 45) & (df['runtime'] <= 300)]

#Only consider movies that have garnered more than m votes
q_movies = q_movies[q_movies['vote_count'] >= m]

#Inspect the number of movies that made the cut
q_movies.shape

OUTPUT:
(8963, 24)
```

From your dataset of 45,000 movies, approximately 9,000 movies (or 20%) made the cut. 

# Calculating the score

The final value that you need to discover before you calculate your scores is C, the mean rating for all the movies in the dataset:

```py
# Calculate C
C = df['vote_average'].mean()
C

OUTPUT:
5.6182072151341851
```

The average rating of a movie is approximately 5.6/10. It seems that IMDB happens to be particularly strict with their ratings. Now that you have the value of C, you can go about calculating your score for each movie.

First, define a function that computes the rating for a movie, given its features and the values of m and C:

```py
# Function to compute the IMDB weighted rating for each movie
def weighted_rating(x, m=m, C=C):
    v = x['vote_count']
    R = x['vote_average']
    # Compute the weighted score
    return (v/(v+m) * R) + (m/(m+v) * C)
```

Next, use the familiar `apply` function on your `q_movies` DataFrame to construct a new feature score. Since the calculation is done for every row, set the axis to `1` to denote row-wise operation:

```py
# Compute the score using the weighted_rating function defined above
q_movies['score'] = q_movies.apply(weighted_rating, axis=1)
```

# Sorting and output

There is just one step left. You now need to sort your DataFrame on the basis of the score you just computed and output the list of top movies:

![Our Recommendation system](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/python/recommender-system-python/image3-21.png)

And voila! You have just built your recommender. Congratulations!

You can see that the Bollywood film **Dilwale Dulhania Le Jayenge** figures at the top of the list. It has a noticeably smaller number of votes than the other Top 25 movies. This strongly suggests that you should probably explore a higher value of m. Experiment with different values of m and observe how the movies in the chart change.

# The knowledge-based recommender

Now, you’ll learn to build a knowledge-based recommender on top of your IMDB Top 250 clone. This will be a simple function that will perform the following tasks:

* Ask the user for the genres of movies he/she is looking for
* Ask the user for the duration
* Ask the user for the timeline of the movies recommended
* Using the information collected, recommend movies to the user that have a high weighted rating (according to the IMDB formula) and that satisfy the preceding conditions

The data that you have has information on the duration, genres, and timelines, but it isn't currently in a form that is directly usable. Your data needs to be wrangled before it can be put to use to build this recommender.

In your `IMDB` folder, create a new Jupyter Notebook named `Knowledge Recommender`. This notebook will contain all the code that you write as part of this section.

Load your packages and the data into your notebook. Also, take a look at the features that you have and decide on the ones that will be useful for this task:

```py
import pandas as pd
import numpy as np

df = pd.read_csv('../data/movies_metadata.csv')

#Print all the features (or columns) of the DataFrame
df.columns

OUTPUT:
Index(['adult', 'belongs_to_collection', 'budget', 'genres', 'homepage', 'id',
       'imdb_id', 'original_language', 'original_title', 'overview',
       'popularity', 'poster_path', 'production_companies',
       'production_countries', 'release_date', 'revenue', 'runtime',
       'spoken_languages', 'status', 'tagline', 'title', 'video',
       'vote_average', 'vote_count'],
      dtype='object')
```

From your output, it is quite clear which features you do and do not require. Now, reduce your DataFrame to only contain features that you need for your model:

```py
#Only keep those features that we require 
df = df[['title','genres', 'release_date', 'runtime', 'vote_average', 'vote_count']]

df.head()
```

Extract the year of release from your `release_date` feature:

```py
#Convert release_date into pandas datetime format
df['release_date'] = pd.to_datetime(df['release_date'], errors='coerce')

#Extract year from the datetime
df['year'] = df['release_date'].apply(lambda x: str(x).split('-')[0] if x != np.nan else np.nan)
```

Your `year` feature is still an `object` and is riddled with `NaT` values, which are a type of null value used by Pandas. Convert these values to an integer, `0`, and convert the datatype of the `year` feature into `int`.

To do this, define a helper function, `convert_int`, and apply it to the `year` feature:

```py
#Helper function to convert NaT to 0 and all other years to integers.
def convert_int(x):
    try:
        return int(x)
    except:
        return 0

#Apply convert_int to the year feature
df['year'] = df['year'].apply(convert_int)
You do not require the release_date feature anymore. So, go ahead and remove it:
#Drop the release_date column
df = df.drop('release_date', axis=1)

#Display the dataframe
df.head()
```

The runtime feature is already in a form that is usable. It doesn't require any additional wrangling. Now, turn your attention to genres.

# Genres

You may observe that the genres are in a format that looks like a JSON object (or a Python dictionary). Take a look at the genres object of one of your movies:

```py
#Print genres of the first movie
df.iloc[0]['genres']

OUTPUT:
"[{'id': 16, 'name': 'Animation'}, {'id': 35, 'name': 'Comedy'}, {'id': 10751, 'name': 'Family'}]"
```

Observe that the output is a stringified dictionary. In order for this feature to be usable, it is important that you convert this string into a native Python dictionary. Fortunately, Python gives you access to a function called `literal_eval` (available in the `ast` library) which does exactly that. `literal_eval` parses any string passed into it and converts it into its corresponding Python object:

```py
#Import the literal_eval function from ast
from ast import literal_eval

#Define a stringified list and output its type
a = "[1,2,3]"
print(type(a))

#Apply literal_eval and output type
b = literal_eval(a)
print(type(b))

OUTPUT:
<class 'str'>
<class 'list'>
```

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/python/recommender-system-python/image4-23.png)

You now have all the tools required to convert the genres feature into the Python dictionary format.

Also, each dictionary represents a genre and has two keys: id and name. However, for this exercise, you only require the name. Therefore, convert your list of dictionaries into a list of strings, where each string is a genre name:

```py
#Convert all NaN into stringified empty lists
df['genres'] = df['genres'].fillna('[]')

#Apply literal_eval to convert to the list object
df['genres'] = df['genres'].apply(literal_eval)

#Convert list of dictionaries to a list of strings
df['genres'] = df['genres'].apply(lambda x: [i['name'] for i in x] if isinstance(x, list) else [])

df.head()
```

Printing the head of the DataFrame should show you a new `genres` feature, which is a list of genre names. However, you're still not done yet. The last step is to `explode` the genres column. In other words, if a particular movie has multiple genres, create multiple copies of the movie, with each movie having one of the genres.

For example, if there is a movie called Just Go With It that has romance and comedy as its genres, `explode` this movie into two rows. One row will be Just Go With It as a romance movie. The other will be a comedy movie:

```py
#Create a new feature by exploding genres
s = df.apply(lambda x: pd.Series(x['genres']),axis=1).stack().reset_index(level=1, drop=True)

#Name the new feature as 'genre'
s.name = 'genre'

#Create a new dataframe gen_df which by dropping the old 'genres' feature and adding the new 'genre'.
gen_df = df.drop('genres', axis=1).join(s)

#Print the head of the new gen_df
gen_df.head()
```

You should be able to see three Toy Story rows now; one each to represent animation, family, and comedy. This `gen_df` DataFrame is what you will use to build your knowledge-based recommender.

# The build_chart function

You are finally in a position to write the function that will act as your recommender. You cannot use your computed values of m and C from earlier, as you’ll not be considering every movie just the ones that qualify. In other words, these are three main steps:

1. Get user input on their preferences
1. Extract all movies that match the conditions set by the user
1. Calculate the values of m and C for only these movies and proceed to build the chart as in the previous section

Therefore, the `build_chart` function will accept only two inputs: your `gen_df` DataFrame and the percentile used to calculate the value of m. By default, set this to 80% or `0.8`:

```py
def build_chart(gen_df, percentile=0.8):
    #Ask for preferred genres
    print("Input preferred genre")
    genre = input()

    #Ask for lower limit of duration
    print("Input shortest duration")
    low_time = int(input())

    #Ask for upper limit of duration
    print("Input longest duration")
    high_time = int(input())

    #Ask for lower limit of timeline
    print("Input earliest year")
    low_year = int(input())

    #Ask for upper limit of timeline
    print("Input latest year")
    high_year = int(input())

    #Define a new movies variable to store the preferred movies. Copy the contents of gen_df to movies
    movies = gen_df.copy()

    #Filter based on the condition
    movies = movies[(movies['genre'] == genre) & 
                    (movies['runtime'] >= low_time) & 
                    (movies['runtime'] <= high_time) & 
                    (movies['year'] >= low_year) & 
                    (movies['year'] <= high_year)]

    #Compute the values of C and m for the filtered movies
    C = movies['vote_average'].mean()
    m = movies['vote_count'].quantile(percentile)

    #Only consider movies that have higher than m votes. Save this in a new dataframe q_movies
    q_movies = movies.copy().loc[movies['vote_count'] >= m]

    #Calculate score using the IMDB formula
    q_movies['score'] = q_movies.apply(lambda x: (x['vote_count']/(x['vote_count']+m) * x['vote_average']) 
                                       + (m/(m+x['vote_count']) * C)
                                       ,axis=1)

    #Sort movies in descending order of their scores
    q_movies = q_movies.sort_values('score', ascending=False)

    return q_movies
```
  
# Time to put your model into action!

You may want recommendations for animated movies between 30 minutes and 2 hours in length, and released anywhere between 1990 and 2005. See the results:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/python/recommender-system-python/image5-25.png)

You can see that the movies that it outputs satisfy all the conditions you passed in as input. Since you applied IMDB's metric, you can also observe that your movies are very highly rated and popular at the same time. 

If you found this article interesting, you can explore Rounak Banik’s Hands-On Recommendation Systems with Python to get started with building recommendation systems is a familiarity with Python. With [Hands-On Recommendation Systems with Python](https://amzn.to/2PRq53f), learn the tools and techniques required in building various kinds of powerful recommendation systems (collaborative, knowledge and content based) and deploying them to the web.

<div class="amazon-link">
View on Amazon: <a href="https://amzn.to/2PRq53f">Hands-On Recommendation Systems with Python</a>
</div>
