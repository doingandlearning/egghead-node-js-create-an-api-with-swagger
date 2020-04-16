---
title: "9. Create a Node.js function for an HTTP GET request for a Swagger API"
metaTitle: "9. Create a Node.js function for an HTTP GET request for a Swagger API"
metaDescription: "Create a Node.js function for an HTTP GET request for a Swagger API"
---

[Video link](https://egghead.io/lessons/node-js-create-a-node-js-function-for-an-http-get-request-for-a-swagger-api)

We are going to write the logic for our endpoints in `api/controllers` with a different file representing each `x-swagger-router-controller`. Each of those will have an exposed function corresponding to the `operationId` like in the mock example.

Before we do that, we're going to use Elasticsearch for our backend, so we'll need to install that in our project. So, in our project folder,

```shell
npm install --save elasticsearch:12.1.3
```

Let's create `api/controllers/GetAllTodos.js` and set up the skeleton of our function.

```js
"use strict";

module.exports = {
  GetAllTodos: GetAllTodos,
};

function GetAllTodos(req, res) {}
```

We're going to create some helper functions for our Elasticsearch integration in `api/helps/es.js`. The instructor has this installed locally but I didn't and in the comments below the video, there is a link to [Git repo](https://github.com/rekibnikufesin/nodejs-api-swagger/tree/master#running-elasticsearch-and-sample-data) which has instructions for Docker. If you don't have Docker installed, then you might want to sign up for a free account at https://elastic.co. If you do, there were two changes in the docker-compose.yml files required to get setup.

```js
"use strict";

const Elasticsearch = require("elasticsearch");
const client = new Elasticsearch.Client({
  host: "localhost:9200",
  log: "error",
});

module.exports = { client: client };
```

Now we can get our client back in our controller and in our function we can use that client.

```js
"use strict";
const client = require("../helpers/es");
module.exports = {
  GetAllTodos: GetAllTodos,
};

function GetAllTodos(req, res) {
  client.search(
    {
      index: "todo",
      type: "todo",
      q: "*",
      _sourceInclude:
        "todo_id, todo, completed, tags, author, completeddate, duedate",
    },
    function (error, response) {
      if (error) {
        res.end(JSON.stringify(error));
      } else {
        const results = response.hits.hits.map((hit) => hit._source);
        res.header("Content-Type", "application/json");
        res.end(JSON.stringify(results));
      }
    }
  );
}
```

If you have populated the data using the Git repo, it will have an `index` and `type`. These are Elasticsearch terms and it would be worth looking at another course on this if you aren't familiar and want to learn more. Will has a course on that [here](https://egghead.io/courses/get-started-with-elasticsearch).

The `_sourceInclude` parameter is saying which fields we'd like the index to return. There are other data for each record that we don't want.

The callback function sends back any error. It then creates a new array and maps over the `response.hits.hits` array and extracts the `_source` from each element.

We then set the header, stringify the data and send it back to the client.

## Personal take

Phew! This was a tough lesson to get through because there were a lot of versioning issues and a need to set up Elasticsearch. I'm hoping now that is done the rest of the course will be a breeze :)

I presume we don't need the next object because we aren't using this as middleware but the instructor didn't specify that.

I've never run Elasticsearch locally do this felt like an unnecessary complication for me. I've put a PR in for the changes to docker-compose file I had to make to get this to work.

I had quite a few issues because I was using the latest version of the Elasticsearch-js client and it doesn't have a search function. So, once I matched the version in the example this worked. I couldn't find an obvious matching for this function in the current version of the library.
