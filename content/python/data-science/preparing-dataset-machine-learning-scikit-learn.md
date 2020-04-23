---
title: "Preparing a Dataset for Machine Learning with scikit-learn"
date: 2019-01-19T10:53:22Z
desc:
  Learn how to prepare a dataset for machine learning with scikit-learn in this
  article by Kevin Jolly, a data scientist who works as a statistical analyst
  with a digital healthcare start-up
author: Kevin Jolly
twitter: https://twitter.com/imkevinjolly
series: python
image: python.svg
tags:
  - data-science
authorImage: https://pbs.twimg.com/profile_images/868147892795588608/iAnFiiiE_400x400.jpg
---

The first step to implementing any machine learning algorithm with scikit-learn
is data preparation. Scikit-learn comes with a set of constraints to
implementation. The dataset that we will be using is based on mobile payments
and is found on the world's most popular competitive machine learning website –
Kaggle. You can download the dataset
from: [https://www.kaggle.com/ntnu-testimon/paysim1](https://www.kaggle.com/ntnu-testimon/paysim1).

Once downloaded, open a new Jupyter Notebook using the following code in
Terminal (macOS/Linux) or Anaconda Prompt/PowerShell (Windows):

```s
$ Jupyter Notebook
```

The fundamental goal of this dataset is to predict whether a mobile transaction
is fraudulent. In order to do this, we need to first have a brief understanding
of the contents of our data. In order to explore the dataset, we will use
the pandas package in Python. You can install pandas using the following code in
Terminal (macOS/Linux) or PowerShell (Windows):

```s
$ pip3 install pandas
```

Pandas can be installed on Windows machines in an Anaconda Prompt using the
following code:

```s
$ conda install pandas

```

We can now read in the dataset into our Jupyter Notebook using the following
code:

```py
#Package Imports

import pandas as pd

#Reading in the dataset

df = pd.read_csv('PS_20174392719_1491204439457_log.csv')

#Viewing the first 5 rows of the dataset

df.head()
```

This produces an output as illustrated in the following screenshot:

![jupter notebook output screenshot](https://images.tutorialedge.net/images/python/data-science/preparing-dataset-machine-learning/image1-17.png)

# Dropping features that are redundant

From the dataset seen previously, there are a few columns that are redundant to
the machine learning process:

- `nameOrig`: This column is a unique identifier that belongs to each customer.
  Since each identifier is unique with every row of the dataset, the machine
  learning algorithm will not be able to discern any patterns from this feature.
- `nameDest`: This column is also a unique identifier that belongs to each
  customer and as such provides no value to the machine learning algorithm.
- `isFlaggedFraud`: This column flags a transaction as fraudulent if a person
  tries to transfer more than 200,000 in a single transaction. Since we already
  have a feature called `isFraud` that flags a transaction as fraud, this
  feature becomes redundant.

We can drop these features from the dataset using the following code:

```py
#Dropping the redundant features

df = df.drop(['nameOrig', 'nameDest', 'isFlaggedFraud'], axis = 1)
```

# Reducing the size of the data

The dataset that we are working with contains over 6 million rows of data. Most
machine learning algorithms will take a large amount of time to work with a
dataset of this size. In order to make our execution time quicker, we will
reduce the size of the dataset to 20,000 rows. We can do this using
the following code:

```py
#Storing the fraudulent data into a dataframe

df_fraud = df[df['isFraud'] == 1]

#Storing the non-fraudulent data into a dataframe

df_nofraud = df[df['isFraud'] == 0]

#Storing 12,000 rows of non-fraudulent data

df_nofraud = df_nofraud.head(12000)

#Joining both datasets together

df = pd.concat([df_fraud, df_nofraud], axis = 0)
```

In the preceding code, the fraudulent rows are stored in one dataframe. This
dataframe contains a little over 8,000 rows. The 12,000 non-fraudulent rows are
stored in another dataframe, and the two dataframes are joined together using
the concat method from pandas.

This results in a dataframe with a little over 20,000 rows, over which we can
now execute our algorithms relatively quickly.

# Encoding the categorical variables

One of the main constraints of scikit-learn is that you cannot implement the
machine learning algorithms on columns that are categorical in nature. For
example, the type column in our dataset has five categories:

- `CASH-IN`
- `CASH-OUT`
- `DEBIT`
- `PAYMENT`
- `TRANSFER`

These categories will have to be encoded into numbers that scikit-learn can make
sense of. In order to do this, we have to implement a two-step process. The
first step is to convert each category into a number: CASH-IN = 0, CASH-OUT =
1, DEBIT = 2, PAYMENT = 3, TRANSFER = 4. We can do this using the following
code:

```py
#Package Imports

from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import OneHotEncoder

#Converting the type column to categorical

df['type'] = df['type'].astype('category')

#Integer Encoding the 'type' column

type_encode = LabelEncoder()

#Integer encoding the 'type' column

df['type'] = type_encode.fit_transform(df.type)
```

First, the code coverts the `type` column to a categorical feature. We then
use `LabelEncoder()` in order to initialize an integer encoder object that is
called `type_encode`. Finally, we apply the `fit_transform` method on
the `type` column in order to convert each category into a number.

Broadly speaking, there are two types of categorical variables:

- Nominal
- Ordinal

Nominal categorical variables have no inherent order to them. An example of the
nominal type of categorical variable is the type column.

Ordinal categorical variables have an inherent order to them. An example of the
ordinal type of categorical variable is Education Level, in which people with a
Master's degree will have a higher order/value compared to people with an
Undergraduate degree only.

In the case of ordinal categorical variables, integer encoding, as illustrated
previously, is sufficient and we do not need to one-hot encode them. Since
the type column is a nominal categorical variable, we have to one-hot encode it
after integer encoding it. This is done using the following code:

```py
#One hot encoding the 'type' column

type_one_hot = OneHotEncoder()

type_one_hot_encode = type_one_hot.fit_transform(df.type.values.reshape(-1,1)).toarray()

#Adding the one hot encoded variables to the dataset

ohe_variable = pd.DataFrame(type_one_hot_encode, columns = ["type_"+str(int(i)) for i in range(type_one_hot_encode.shape[1])])

df = pd.concat([df, ohe_variable], axis=1)

#Dropping the original type variable

df = df.drop('type', axis = 1)

#Viewing the new dataframe after one-hot-encoding

df.head()
```

In the code, we first create a one-hot encoding object called `type_one_hot`. We
then transform the type column into one-hot encoded columns using
the `fit_transform` method.

We have five categories that are represented by integers 0 to 4. Each of these
five categories will now get its own column. Therefore, we create five columns
called `type_0`, `type_1`, `type_2`, `type_3`, and `type_4`. Each of these five
columns is represented by two values: 1, which indicates the presence of that
category, and 0, which indicates the absence of that category.

This information is stored in the `ohe_variable`. Since this variable holds the
five columns, we will join this to the original dataframe using
the `concat` method from `pandas`.

The ordinal `type` column is then dropped from the dataframe as this column is
now redundant post one hot encoding. The final dataframe now looks like this:

![jupter notebook output screenshot](https://images.tutorialedge.net/images/python/data-science/preparing-dataset-machine-learning/image2-19.png)

# Missing values

Another constraint with scikit-learn is that it cannot handle data with missing
values. Therefore, we must check whether our dataset has any missing values in
any of the columns to begin with. We can do this using the following code:

```py
#Checking every column for missing values

df.isnull().any()
```

This produces this output:

![jupter notebook output screenshot](https://images.tutorialedge.net/images/python/data-science/preparing-dataset-machine-learning/image3-21.png)

Here we note that every column has some amount of missing values. Missing values
can be handled in a variety of ways, such as the following:

- Median imputation
- Mean imputation
- Filling them with the majority value

The amount of techniques is quite large and varies depending on the nature of
your dataset. This process of handling features with missing values is
called feature engineering. Feature engineering can be done for both categorical
and numerical columns. We will impute all the missing values with a zero.

We can do this using the following code:

```py
#Imputing the missing values with a 0

df = df.fillna(0)
```

We now have a dataset that is ready for machine learning with scikit-learn. You
can also export this dataset as a .csv file and store it in the same directory
that you are working in with the Jupyter Notebook using the following code:

```py
df.to_csv('fraud_prediction.csv')
```

This will create a .csv file of this dataset in the directory that you are
working in, which you can load into the notebook again using pandas.

# Conclusion

If you found this article interesting, you can explore
[Machine Learning with scikit-learn Quick Start Guide](https://amzn.to/2FInwhE)
to deploy supervised and unsupervised machine learning algorithms using
scikit-learn to perform classification, regression, and clustering.

Machine Learning with scikit-learn Quick Start Guide teaches you how to use
scikit-learn for machine learning and can help you in building your own machine
learning models for accurate predictions.
