---
title: "03. Define an HTTP GET Endpoint for a Node.js API Server with Swagger"
metaTitle: "03. Define an HTTP GET Endpoint for a Node.js API Server with Swagger"
metaDescription: "Define an HTTP GET Endpoint for a Node.js API Server with Swagger"
---

[Video link](https://egghead.io/lessons/node-js-define-an-http-get-endpoint-for-a-node-js-api-server-with-swagger)

Now, let's get rid of some of the red x's!

Let's change the title to `Todo API` at the top. The right hand side should update as you are typing in the left.

```yaml
info:
  version: "0.0.1"
  title: Todo API
```

Let's get rid of all the paths down to the `/swagger` endpoint and replace it with our new root path.

```yaml
paths:
  /:
    get:
      description: "This endpoint returns all todos available in the database"
      operationId: "GetAllTodos"
      parameters: []
      responses:
        200:
          description: "An array of todos"
          schema:
            type: "array"
            items:
              $ref: "#/definitions/Todo"
      x-swagger-router-controller: "GetAllTodos"
  /swagger:
    x-swagger-pipe: swagger_raw
```

There is a lot in there!

- operationId: This references the function in our API that will be called in response to this API
- parameters: None required for this operation.
- responses: We are only defining a 200 response. Our return will be a type of array and the items will be of our previously defined Todo model.
- You can see that the reference is defined with `$ref` and we can reference the model from the definitions section.

## Personal take

This feels very doable. It's fun to see the definitions clear up and to have such quick feedback on the right to remind me of bits that I haven't got to yet. Red x's and orange triangles to warn me and make me sure I do all of the required pieces.
