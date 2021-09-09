---
title: Basic CRUD operations with AWS DynamoDB and Node.js
date: "2019-08-20"
description: "In this tutorial, you will learn the basics of using Amazon's DynamoDB in Node.js by performing 
basic data operations on movies from the Fast & Furious franchise and their Rotten Tomatoes scores."
---

Amazon's DynamoDB is a unique and fairly popular NoSQL database solution, especially for more
enterprise/professional/serverless undertakings. I personally know I'll be using it at my job some time soon, so I
figured I'd learn the basics and
whip up a quick tutorial to solidify my learning and save future readers some time and mental energy.

Because I've been working a lot with movie data building a **[game where you predict Rotten Tomatoes scores against
your coworkers in Slack](https://slack.com/apps/AKV4RFZ43-movie-medium)**, we'll do the same in this tutorial.

####In this tutorial, you'll learn how to do the following.

0.  Setup the AWS-SDK in a super basic Node.js project
1.  Create a "Movies" table
1.  Create _Fast & Furious_ movies as items in the table
1.  List all of the movies in the table
1.  Edit a movie's Rotten Tomatoes score
    <!-- 5. Search movies only with "Fresh" Rotten Tomatoes scores -->
1.  Delete a movie
1.  _Optional: Be motivated to watch a movie with insane car stunts and egregiously indestructible characters._

###Quick note...
The syntax for DynamoDB and parameters for various methods used in this tutorial are odd in my opinion, and I don't
want to muddy the waters by trying to explain them. The goal of this tutorial is just to get your feed wet with
actual items in a table. You can and should use Google and the AWS docs when seeing these things for the first time.

##Before getting into the code...
You'll need to make an AWS account, if you don't have one already.

Check out the [Getting Started](https://docs.aws.amazon.com/comprehend/latest/dg/getting-started.html) guide, which
will show you how to create an account, create an IAM user and setup the AWS CLI.

Once you're done with the CLI step, confirm that your aws config file is all good by running the following command.

```
cat  ~/.aws/credentials
```

You should see your `aws_access_key_id` and `aws_secret_access_key` printed out in the terminal.

##Setup the project
Create a directory called `dynamo-tutorial` and initialize a new Node project.

```
mkdir dynamo-tutorial
cd dynamo-tutorial
npm init -y
```

Install the AWS-SDK, which we'll use to do stuff with DynamoDB.

```
npm install aws-sdk
```

Create a new `app.js` file and add the following code to it. Here we're just setting things up to be able to use
DynamoDB methods from the SDK. This stuff won't change, so I won't include in future snippets.

```javascript
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();
```

##Create a DynamoDB table to store movies
First, add a `createTable` function and export it.

> **We'll need to export every function to actually execute them via the command line, so do the same for all future
> functions!**

```javascript
function createTable() {
  const params = {
    TableName: "Movies",
    KeySchema: [{ AttributeName: "title", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "title", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  DynamoDB.createTable(params, function(err, data) {
    if (err) {
      console.error("Unable to create table", err);
    } else {
      console.log("Created table", data);
    }
  });
}

module.exports = {
  createTable,
};
```

<!-- Let's walk through each of these `params`...
 -

You might be wondering the same thing I was when I first tried to create this table for movies...
!-->

####Execute the function in your terminal to actually create the table

```
node -e 'require("./app.js").createTable()'
```

To see that it actually worked, log in to your AWS console, navigate to DynamoDB and click the "Tables" tab on the
sidebar. Your "Movies" table should be created, or in the process of being created.

##Add all of the Fast & Furious movies to the table
Define a new function `addMovie`.

```javascript
function addMovie(title, rtScore) {
  const params = {
    TableName: "Movies",
    Item: {
      title: { S: title },
      rtScore: { N: rtScore },
    },
  };

  DynamoDB.putItem(params, function(err) {
    if (err) {
      console.error("Unable to add movie", err);
    } else {
      console.log(`Added ${title} with a Rotten Tomatoes Score of ${rtScore}%`);
    }
  });
}
```

To see that this function actually adds an item to the table, let's add the movie that started it all.

```
node -e 'require("./app.js").addMovie("The Fast and the Furious", "100")'
```

Go to your AWS console and confirm that the legendary car racing thriller was added to
the table.

Now that we can add movies, let's populate our Movies table with the rest of the franchise.

```
node -e 'require("./app.js").addMovie("2 Fast 2 Furious", "36")'
node -e 'require("./app.js").addMovie("The Fast and the Furious: Tokyo Drift", "38")'
node -e 'require("./app.js").addMovie("Fast & Furious", "29")'
node -e 'require("./app.js").addMovie("Fast Five", "77")'
node -e 'require("./app.js").addMovie("Fast & Furious 6", "70")'
node -e 'require("./app.js").addMovie("Furious 7", "81")'
node -e 'require("./app.js").addMovie("The Fate of the Furious", "67")'
node -e 'require("./app.js").addMovie("Fast & Furious Presents: Hobbs & Shaw", "67")'
```

##Get all movies in the table
So far, we've looked at the movies in our table using the AWS console. Instead, let's fetch them programmatically and
output them to the terminal (Node console).

Create a new function called `getAllMovies`. (Don't forget to export it.)

```javascript
function getAllMovies() {
  const params = {
    TableName: "Movies",
  };

  DynamoDB.scan(params, function(err, data) {
    if (err) {
      console.error("Unable to find movies", err);
    } else {
      console.log(`Found ${data.Count} movies`);
      console.log(data.Items);
    }
  });
}
```

Execute that function in your terminal and you should see all of the franchise movies we added earlier.

```
node -e 'require("./app.js").getAllMovies()'
```

If we want to just get one movie based on the title, we can use a function like `getMovie`.

```javascript
function getMovie(title) {
  const params = {
    TableName: "Movies",
    Key: {
      title: { S: title },
    },
  };

  DynamoDB.getItem(params, function(err, data) {
    if (err) {
      console.error("Unable to find movie", err);
    } else {
      console.log("Found movie", data.Item);
    }
  });
}
```

##Edit a movie's Rotten Tomatoes score
Oops! You probably noticed that I gave the first _The Fast and The Furious_ the score I think it should have gotten,
rather than the actual 53%. We need to edit that item in the table.

So let's make an `updateMovieScore` function that saves a new score for the given movie title.

```javascript
function updateMovieScore(title, newRtScore) {
  const params = {
    TableName: "Movies",
    Item: {
      title: { S: title },
      rtScore: { N: newRtScore.toString() },
    },
    ReturnConsumedCapacity: "TOTAL",
  };

  DynamoDB.putItem(params, function(err) {
    if (err) {
      console.error("Unable to find movie", err);
    } else {
      console.log(`Updated ${title} with new RT Score of ${newRtScore}%`);
    }
  });
}
```

Update the movie.

```
node -e 'require("./app.js").updateMovieScore("The Fast and the Furious", 53)'
```

To check that the score updated, verify with the output from our `getMovie` function.

```
node -e 'require("./app.js").getMovie("The Fast and the Furious")'
```

##Delete a movie
The "Hobbs & Shaw" movie isn't truly in the F&F saga - it's more of a spinoff. To please the F&F puritans, let's
delete that movie from our table.

First, create and export a `deleteMove` function.

```javascript
function deleteMovie(title) {
  const params = {
    TableName: "Movies",
    Key: {
      title: { S: title },
    },
  };

  DynamoDB.deleteItem(params, function(err) {
    if (err) {
      console.error("Unable to find movie", err);
    } else {
      console.log(`Deleted ${title}`);
    }
  });
}
```

Now execute the function to delete the movie, then list out all of the movies to prove that it was actually deleted.

```
node -e 'require("./app.js").deleteMovie("Fast & Furious Presents: Hobbs & Shaw")'
```

```
node -e 'require("./app.js").getAllMovies()'
```

##And that's it!
Super basic stuff, but it's a start!

<!--  ##Querying just "Fresh" movies
Maybe you want to only watch the movies that are considered "Fresh", i.e. have a Rotten Tomatoes score greater than
or equal to 60%. We can do that with DynamoDB's `query` method.
```javascript
function getFreshMovies() {
  const params = {
      TableName: "Movies",
      IndexName: "rtScore",
      KeyConditionExpression: "rtScore >= :fresh",
      ExpressionAttributeValues: {
        ":fresh": { N: "60" }
      }
  };

  DynamoDB.query(params, function(err) {
    if (err) {
      console.error("Unable to find fresh movies", err);
    } else {
      console.log(`Found ${data.Count} fresh movies`);
      console.log(data.Items);
    }
  });
}
```

Try executing that query in your terminal - you'll get an error message saying `Query condition missed key schema
element: title`.
```
node -e 'require("./app.js").getFreshMovies()'
```
I was confused at first, until I learn that you need to [create a global secondary index](https://stackoverflow.com/questions/43353852/query-on-non-key-attribute) (GSI) for the `rtScore`
using
 the [`updateTable`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateTable.html) method
 in
order to query based on it. I'll spare you the details, which you can learn more about in the [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html).

```javascript
function createNewSecondaryKey() {
  const params = {
    TableName: "Movies",
    AttributeDefinitions: [{ AttributeName: "rtScore", AttributeType: "N" }],
    GlobalSecondaryIndexUpdates: [
      {
        Create: {
          IndexName: "rtScore",
          KeySchema: [
            {
              AttributeName: "rtScore",
              KeyType: "HASH"
            }
          ],
          Projection: {
            ProjectionType: "ALL"
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    ]
  };

  DynamoDB.updateTable(params, function(err, data) {
    if (err) {
      console.error("Unable to update table", err);
    } else {
      console.log("Updated table", data);
    }
  });
}
```
Execute that function to create the index.
```
node -e 'require("./app.js").createNewSecondaryKey()'
```

After the table is no longer updating in your AWS console, you can run the `getFreshMovies` function and see the list
 of fresh movies.
```
node -e 'require("./app.js").getFreshMovies()'
```
-->
