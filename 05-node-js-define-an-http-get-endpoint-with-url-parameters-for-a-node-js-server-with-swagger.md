---
title: "5. Define an HTTP GET Endpoint with URL Parameters for a Node.js Server with Swagger"
metaTitle: "5. Define an HTTP GET Endpoint with URL Parameters fo~r a Node.js Server with Swagger"
metaDescription: "Define an HTTP GET Endpoint with URL Parameters for a Node.js Server with Swagger"
---

[Video link](https://egghead.io/lessons/node-js-define-an-http-get-endpoint-with-url-parameters-for-a-node-js-server-with-swagger)

We want to be able to access our todo by `id`, so we need to add a route/path for that. Here is the definition for the left hand side which I'll explain below.

```yaml
paths:
  ...
  /todo/{id}:
    get:
      description: "Retrieve a single todo by id"
      operationId: "FindTodoById"
      produces:
      - ["application/json"]
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

Most of these are familiar.

This time, we are looking in the `path` for the parameter, rather than the body from our POST request.

I'm still not 100% clear what the x-swagger-router-controller is about but hoping to find out soon!

## Personal take

This is pretty functional and useful. I can see how APIs I have written in the past could be described in this way. It is super helpful to have the clear description of the API in YAML and in diagrammatic form.
