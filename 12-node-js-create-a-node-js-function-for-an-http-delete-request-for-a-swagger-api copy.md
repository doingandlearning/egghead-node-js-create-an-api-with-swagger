---
title: "12. Create a Node.js function for an HTTP DELETE request for a Swagger API"
metaTitle: "12. Create a Node.js function for an HTTP DELETE request for a Swagger API"
metaDescription: "Create a Node.js function for an HTTP DELETE request for a Swagger API"
---

[Video link](https://egghead.io/lessons/node-js-create-a-node-js-function-for-an-http-delete-request-for-a-swagger-api)

Now, we are going to write the code that will support our DELETE definition from earlier.

```yaml
delete:
  description: "Delete a todo by Id"
  operationId: "DeleteTodoById"
  parameters:
    - name: "id"
      in: "path"
      description: "id of the todo to delete"
      required: true
      type: "integer"
      format: "int64"
  responses:
    204:
      description: "todo deleted"
  x-swagger-router-controller: "DeleteTodoById"
```

Can you guess the filename and exported function name? You got it! Export `DeleteTodoById` from `api/controllers/DeleteTodoById.js`. Also, we can see that the parameter is going to come from the path.

```js
"use strict";
const client = require("../helpers/es");

module.exports = {
  DeleteTodoById: DeleteTodoById,
};

function DeleteTodoById(req, res) {
  console.log(`Deleting todo with id ${req.swagger.params.id.value}`);
  client.delete(
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
        res.end(JSON.stringify(response));
      }
    }
  );
}
```

We're using the `delete` method on the client and passing on all the parameters that you'd expect. We'll then define the options and the callback function.

We can test this with the UI, with curl or with an app like Postman.

## Personal take

I feel like at this point, I'm learning about the Elasticsearch client rather than the creation of the API. I've got that bit, now I'm being shown how the various features of the API work.

If I am building a SQL/Mongo/Solr/etc backend, I'd have to redo all of this logic to consider my backend. The benefit here is that I have the definitions for what I'm getting and what I'm passing back. I get that we want to make a full application but these implementation details will change.
