---
title: "10. Create a Node.js function for an HTTP POST request for a Swagger API"
metaTitle: "10. Create a Node.js function for an HTTP POST request for a Swagger API"
metaDescription: "Create a Node.js function for an HTTP POST request for a Swagger API"
---

[Video link](https://egghead.io/lessons/node-js-create-a-node-js-function-for-an-http-post-request-for-a-swagger-api)

We're now going to create the POST controller to create a todo. You can see from the definition that the `x-swagger-router-controller` is `AddTodo` and the `operationId` is `AddTodo`. So, we will create a file at `api/controllers/AddTodo.js` which exports a function `AddTodo`.

```js
"use strict";

const client = require("../helpers/es");

module.exports = { AddTodo };

function AddTodo(req, res) {
  client.create(
    {
      index: "todo",
      type: "todo",
      id: req.swagger.params.todo.value.todo_id,
      body: req.swagger.params.todo.value,
    },
    function (error, response) {
      res.header("Content-Type", "application/json");
      if (error) {
        console.log(error);
        res.statusCode = 409;
        res.end(JSON.stringify(error));
      } else {
        console.log(
          JSON.stringify({ id: req.swagger.params.todo.value.todo_id })
        );
        res.end(JSON.stringify({ id: req.swagger.params.todo.value.todo_id }));
      }
    }
  );
}
```

The id is set automatically by Elasticsearch but we want to override this. But, why `req.swagger.params.todo.value.todo_id`?

If we look at our API definition, we've said the "todo" will be found in the `body` and will follow the todo schema. So, in the swagger object, there is a params object, that has a todo object, the value of which contains the todo_id! Phew!

We can use the Swagger UI to be able to send a test response to our endpoint. When we try, we'll get an error.

If you check the console or read the warning in yellow, you will see this is a CORS problem (see Mike's excellent course [here](https://egghead.io/courses/web-security-essentials-mitm-csrf-and-xss) if you want to brush up on CORS and web security).

We'll need to install cors in our project:

```shell
npm install --save cors
```

We then need go to our `app.js` file, require cors and get our app to use it.

```js
...
const cors = require("cors");
module.exports = app; // for testing

var config = {
  appRoot: __dirname, // required config
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }
  app.use(cors())
...
```

The default cors options will accept from any source. For our purposes that is fine but for practical applications, you'll want to be more nuanced with your settings here.

## Personal take

I follow along when I'm working on these videos which meant that when I got an error on the sending POST request, I assumed I'd done something wrong. I went away, played a bit and managed to get it to work with Postman. But, when I came back and watched the rest of the video I found out about the cors issue and was able to fix it.

There is a lesson here ... I knew about CORS and I could see the warning, I just need to watch the videos, maybe? Or was it good to assume I'd messed up, try to fix it, get _a_ fix and then come and find a better one? **shrug** :)
