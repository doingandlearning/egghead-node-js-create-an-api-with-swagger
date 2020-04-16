---
title: "11. Create a Node.js function for an HTTP GET request with URL parameters"
metaTitle: "11. Create a Node.js function for an HTTP GET request with URL parameters"
metaDescription: "Create a Node.js function for an HTTP GET request with URL parameters"
---

[Video link](https://egghead.io/lessons/node-js-create-a-node-js-function-for-an-http-get-request-with-url-parameters)

We're going to write the code that will handle the endpoint we created here:

```yaml
/todo/{id}:
  get:
    description: "Retrieve a single todo by id"
    operationId: "FindTodoById"
    produces:
      - "application/json"
    parameters:
      - name: "id"
        in: "path"
        description: "ID of the todo to get"
        required: true
        type: "integer"
        format: "int64"
    responses:
      200:
        description: "Todo response"
        schema:
          $ref: "#/definitions/Todo"
    x-swagger-router-controller: "FindTodoById"
```

So, the file will be `api/controllers/FindTodoById.js` and the exported function will be `FindTodoById`.

The file will look like this:

```js
"use strict";
const client = require("../helpers/es");

module.exports = {
  FindTodoById: FindTodoById,
};

function FindTodoById(req, res) {
  console.log(`Getting Todo with id ${req.swagger.params.id.value}`);
  client.get(
    {
      index: "todo",
      type: "todo",
      id: req.swagger.params.id.value,
    },
    function (error, response) {
      res.header("Content-Type", "application/json");
      if (error) {
        res.end(JSON.stringify(error));
      } else {
        res.end(JSON.stringify(response._source));
      }
    }
  );
}
```

Again, we are getting the `id` from the `swagger.params` object.

We'll open our Elasticsearch client, set the index, type and id. Our callback will set the errors and then handle the errors and the response. You'll notice that the response is not the whole object but just the \_source property. Without that the response looks like this:

```json
{
  "_index": "todo",
  "_type": "todo",
  "_id": "321",
  "_version": 1,
  "found": true,
  "_source": {
    "todo_id": 321,
    "todo": "This is a todo",
    "datecreated": "2020-04-11T17:58:29Z",
    "author": "Kevin",
    "duedate": "2020-04-11T17:58:29Z"
  }
}
```

That's a lot of extra information that we don't need and that doesn't comply with our API contract. Just extracting the \_source property gives us what we want.

```json
{
  "todo_id": 321,
  "todo": "This is a todo",
  "datecreated": "2020-04-11T17:58:29Z",
  "author": "Kevin",
  "duedate": "2020-04-11T17:58:29Z"
}
```

## Personal take

This feels pretty straightforward and builds on what has come before.
