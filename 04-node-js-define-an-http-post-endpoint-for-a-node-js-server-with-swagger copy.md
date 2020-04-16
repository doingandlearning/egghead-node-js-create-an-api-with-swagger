---
title: "04. Define an HTTP POST Endpoint for a Node.js Server with Swagger"
metaTitle: "04. Define an HTTP POST Endpoint for a Node.js Server with Swagger"
metaDescription: "Define an HTTP POST Endpoint for a Node.js Server with Swagger"
---

[Video link](https://egghead.io/lessons/node-js-define-an-http-post-endpoint-for-a-node-js-server-with-swagger)

Now, we are going to add a POST route.

```yaml
path:
  /:
  ....
    post:
      description: "Add a new Todo"
      operationId: "AddTodo"
      produces:
      - "application/json"
      parameters:
      - in: "body"
        name: "todo"
        description: "the Todo to be added"
        required: true
        schema:
          $ref: "#/definitions/Todo"
      responses:
        200:
          description: "Successful Todo add"
      x-swagger-router-controller: "AddTodo"
```

Lots to describe here.

- operationId: Again, this is the function in our code that will be called when this endpoint is accessed with a POST request. This will become clearer later in the course.
- produces: This endpoint will send back `application/json`.
- parameters: We do need a parameter for this request - we need to accept the actual todo.
  - in: Where should we look for the parameter? In the `body`.
  - The other fields are similar to the others.
- responses: Again, we're only defining the 200 response here.
- x-swagger-router-controller: This isn't explained in the video, but this seems to be the controller in the API after looking quickly at the docs.

## Personal take

This all seems good and straightforward. Referring back to the changes in the OpenAPI Specification (OAS) I see that if you are using that version, produces is no longer a thing. It has all be consumed in paths.
