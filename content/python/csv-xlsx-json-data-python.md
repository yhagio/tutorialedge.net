---
author: Nick McCullum
date: 2020-04-17
desc:
  Learn how to deal with csv, xlsx, and json files in Python
series: python
image: python.svg
tags:
  - data
title: How To Manipulate csv, xlsx, and json Data in Python Using Pandas
twitter: https://twitter.com/NickJMcCullum
authorImage: https://nickmccullum.com/images/headshot.jpg
---


Python is one of the best languages for working with large datasets. Data scientists around the world use it for both exploratory and descriptive data projects.

With that said, Python itself lacks many of the core capabilities that data scientists require. We instead rely on an outside programming library called [pandas](https://nickmccullum.com/advanced-python/pandas/).

In this tutorial, I will show you how to manipulate csv, xlsx, and json data in Python using the pandas programming library.


## Installing Pandas

To manipulate data using the pandas programming library, you'll first need to import pandas into your Python script. Here's the command you would use to import pandas using the alias `pd` (which is convention in the data science world):

```python

import pandas as pd

```

If you encounter an error when executing this command, then it is likely that you do not have pandas installed on your machine. You can install pandas easily using the `pip` package manager by running the following on the command line:

```

pip install pandas

```


## Data Input and Output in Pandas

Pandas includes methods for inputting and outputting data from its DataFrame object. There are different methods for `csv`, `xlsx`, and `json` files, but they all follow similar syntax. Data input methods look like `read_filetype(path)` while data output methods look like `to_filetype(path)`.

As an example, let's use a data set of stock prices that I have uploaded to a public GitHub repository. The path to this database (for the `.csv` file) is `https://raw.githubusercontent.com/nicholasmccullum/advanced-python/master/stock_prices/stock_prices.csv`. Simply replace the `.csv` on the end with `.xlsx` and `.json` for equivalent databases stored in the other file types.

Now that we have a data set to import, lets see how we would import and save this file:

```python

#Import the csv data as a pandas DataFrame

csv_data = pd.read_csv('https://raw.githubusercontent.com/nicholasmccullum/advanced-python/master/stock_prices/stock_prices.csv')

#Save the DataFrame as a file on our local computer

csv_data.to_csv('stock_prices_data.csv')

#Import the xlsx data as a pandas DataFrame

excel_data = pd.read_excel('https://raw.githubusercontent.com/nicholasmccullum/advanced-python/master/stock_prices/stock_prices.xlsx')

#Save the DataFrame as a file on our local computer

excel_data.to_excel('stock_prices_data.xlsx')

#Import the json data as a pandas DataFrame

json_data = pd.read_json('https://raw.githubusercontent.com/nicholasmccullum/advanced-python/master/stock_prices/stock_prices.json')

#Save the DataFrame as a file on our local computer

json_data.to_json('stock_prices_data.json')

```


## Pandas Core Functionality

Now that we have imported (and saved) the data as a pandas DataFrame, let's consider some of the core functionality included in the pandas Python library.


### How To Create Pandas Series From Pandas DataFrames

The pandas library has another data structure called a pandas Series which is very similar to a [NumPy array](https://nickmccullum.com/advanced-python/numpy-arrays/). It is a one-dimensional list of data elements.

You can create a pandas Series that contains the data from a row of a pandas DataFrame by referencing the DataFrame's variable name and passing in the column name in square brackets.

As an example, the `csv_data` DataFrame has a column called `Alphabet Inc Price`. Here's how you would create a Series using the data from this column:

```python

my_series = csv_data['Alphabet Inc Price']

```


### How To Deal With Missing Data in a Pandas DataFrame

It is common to encounter [missing data](https://nickmccullum.com/advanced-python/missing-data-pandas/) when dealing with large datasets. Fortunately, the pandas library has built-in methods that make it easy to work with missing data.

The first method is `dropna`, which removes any rows that have missing data in the DataFrame. Here's how you would apply the `dropna` method to the `csv_data` DataFrame:

```python

csv_data.dropna()

```

You can also pass in the `axis=1` argument into the `dropna` method to force the method to exclude _columns_ with missing data instead of _rows_ with missing data, like this:

```python

csv_data.dropna(axis=1)

```

In certain cases, it is useful to replace missing data instead of excluding it entirely. The `fillna` method solves this problem.

As an example, here's how you would replace all of the missing data in `csv_data` with `0`:

```python

csv_data.fillna(0)

```

It is common to nest the `mean` method within the `filna` method to replace missing values with the average value of a DataFrame (or even a row or column from that DataFrame).


### How To Sort Pandas DataFrames

It is possible to sort a pandas DataFrame using the `sort_values` method. This is similar to applying a filter in Excel. 

As an example, the `csv_data` DataFrame has a column called `Amazon.com Inc Price`. Here's how you would sort the DataFrame by this column in ascending order:

```python

csv_data.sort_values('Amazon.com Inc Price')

```


## Final Thoughts

Manipulating data that is stored in csv, xlsx, and json files is an important concept for any data scientist to understand.

In this tutorial, you learned:



*   How to import pandas
*   How to import datasets stored in remote locations into a pandas DataFrame by pinging their URL path
*   How to create a pandas Series from a pandas DataFrame
*   How to deal with missing data in Pandas
*   How to sort pandas DataFrames

Please feel free to refer back to this tutorial if you ever get stuck in the future!
