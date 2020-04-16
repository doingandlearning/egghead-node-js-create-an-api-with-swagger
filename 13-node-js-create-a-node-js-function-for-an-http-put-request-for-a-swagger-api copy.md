---
title: "13. Create a Node.js function for an HTTP PUT request for a Swagger API"
metaTitle: "13. Create a Node.js function for an HTTP PUT request for a Swagger API"
metaDescription: "Create a Node.js function for an HTTP PUT request for a Swagger API"
---

[Video link](https://egghead.io/lessons/node-js-create-a-node-js-function-for-an-http-put-request-for-a-swagger-api)

One more to go, our PUT operation. Here is the definition:

```yaml
put:
  description: "Update a single to by id"
  operationId: "UpdateTodoById"
  parameters:
    - name: "id"
      in: "path"
      description: "Id of the todo being updated"
      required: true
      type: "integer"
      format: "int64"
    - name: "updated_todo"
      in: "body"
      description: "the updated todo"
      required: true
      schema:
        $ref: "#/definitions/Todo"
  responses:
    200:
      description: "Todo updated"
    400:
      description: "Yikes! An error!"
  x-swagger-router-controller: "UpdateTodoById"
```

If I tell you the client function is update, can you predict what you'll need to write and where?

That's right! Export the `UpdateTodoById` from `api/controllers/UpdateTodoById.js`.

Here it is, were you close?

```js
"use strict";
const client = require("../helpers/es");

module.exports = {
  UpdateTodoById: UpdateTodoById,
};

function UpdateTodoById(req, res) {
  client.update(
    {
      index: "todo",
      type: "todo",
      id: req.swagger.params.id.value,
      body: {
        doc: req.swagger.params.updated_todo.value,
      },
    },
    function (error, response) {
      res.header("Content-Type", "application/json");
      if (error) {
        res.statusCode = 400;
        res.end(JSON.stringify(error));
      } else {
        res.end();
      }
    }
  );
}
```

We are passing the `index`, `type` and `id` as before. Our body needs a doc property where we are adding the `updated_todo`.

The rest of the processing is as you'd expect it.

## Personal take

I'm enjoying challenging myself to write these bits before I watch the video. Again, having learnt how Swagger works here I feel like the main learning point here was how the `client.update` method works in the Elasticsearch client.
