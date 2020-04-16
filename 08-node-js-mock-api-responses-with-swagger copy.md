---
title: "8. Mock API Responses with Swagger"
metaTitle: "8. Mock API Responses with Swagger"
metaDescription: "Mock API Responses with Swagger"
---

[Video link](https://egghead.io/lessons/node-js-mock-api-responses-with-swagger)

We can use Swagger to enter `mock` mode with the following command from the project directory.

```shell
swagger project start -m
```

Now, when we go to that endpoint in our browser, we get a mocked response like this.

```json
[
  {
    "todo_id": 1,
    "todo": "Sample text",
    "datecreated": "2020-04-11T11:09:32.544Z",
    "author": "Sample text",
    "duedate": "2020-04-11T11:09:32.544Z",
    "completed": true
  }
]
```

Similarly, if we go to /todo/1, we'll get a mock todo with id 1.

```json
{
  "todo_id": 1,
  "todo": "Sample text",
  "datecreated": "2020-04-11T11:56:21.532Z",
  "author": "Sample text",
  "duedate": "2020-04-11T11:56:21.532Z",
  "completed": true
}
```

This allows you to begin testing before you have worked out the totality of your backend code. But, what if you need some more complex mocks? If you want to reflect some expected business logic.

In our project folder, there is a directory `/api/mocks`. In here, we create a new file, `GetAllTodos.js`, which matches the `x-swagger-route-controller` parameter in our GET `/` endpoint. Within this file, we will create a function called `GetAllTodos` and this is matching the `operationId`.

We can now write a JS function to return our more complex data.

```js
"use strict";

module.exports = {
  GetAllTodos: GetAllTodos,
};

function GetAllTodos(req, res, next) {
  res.json([
    {
      todo_id: 0,
      todo: "Sample text",
      datecreated: "2020-04-11T11:56:21.532Z",
      author: "Sample text",
      duedate: "2020-04-11T11:56:21.532Z",
      completed: false,
    },
    {
      todo_id: 1,
      todo: "Sample text",
      datecreated: "2020-04-11T12:02:14.484Z",
      author: "Sample text",
      duedate: "2020-04-11T12:02:14.484Z",
      completed: true,
    },
  ]);
}
```

We are using this as middleware, so need to account for the request, response and next object. However, we are only going to use the response object.

Now, when we submit a GET on `/`, we will see this data returned. So, if we have constraints we can quickly mock this up before we've managed to completely wire up the backend.

## Personal take

Okay, I've finally got it. `x-swagger-router-controller` is the file that is going to be called by the endpoint and `operationId` is the function in that file!
