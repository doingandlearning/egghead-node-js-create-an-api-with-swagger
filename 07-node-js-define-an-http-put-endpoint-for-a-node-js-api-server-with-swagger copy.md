---
title: "7. Define an HTTP PUT Endpoint for a Node.js API Server with Swagger"
metaTitle: "7. Define an HTTP PUT Endpoint for a Node.js API Server with Swagger"
metaDescription: "Define an HTTP PUT Endpoint for a Node.js API Server with Swagger"
---

[Video link](https://egghead.io/lessons/node-js-define-an-http-put-endpoint-for-a-node-js-api-server-with-swagger)

The last thing we're going to do on this same endpoint is to add a PUT option. To update a given id.

```yaml
paths:
  ...
  /todo/{id}:
    ...
    put:
      description: "Update a single todo by id"
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
        description: "The content of the new todo"
        required: true
        schema:
          $ref: "#/descriptions/Todo"
      responses:
        200:
          description: "Todo updated"
        400:
          description: "Errors"
```

This is again, mostly the same. This time we have two parameters, one from the path and the other from the body. The body parameter needs to match the todo schema.

We also have defined a 400 response here in case there is an error.

## Personal take

I'm glad to see the beginning of some error handling here. I was able to write this YAML before the video and confirm I was write. I guess that means I've learnt something about the structure of these endpoints.
