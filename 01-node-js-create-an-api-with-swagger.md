---
title: "01. Create an API with Swagger"
metaTitle: "01. Create an API with Swagger"
metaDescription: "Create an API with Swagger."
---

[Video link](https://egghead.io/lessons/node-js-create-an-api-with-swagger)

To get started using Swagger, the first thing we need to do is install the package
itself. Will suggests installing the `swagger` package globally and, while this is now a
deprecated package, we can still use this version while we learn. The more recent
version runs in a Docker container and you can find it [here](https://github.com/swagger-api/swagger-editor).

```shell
npm install -g swagger
```

I'm going to try the course with this version and will document any problems I have.

Once that has been installed we can create a new Swagger project, called todo-api
like this:

```shell
swagger project create todo-api
```

There are multiple frameworks supported but this course is going to use Express.

Once the process has finished there will be a new directory, called `todo-api` which
contains all of the scaffolding for our API.

We can test our API with:

```shell
swagger project start todo-api
```

That was successful and it gave me a curl command to test my application:

```shell
curl http://127.0.0.1:10010/hello?name=Scott
```

which returned:

```shell
"Hello, Scott!"
```

The main benefit of using Swagger is the graphical UI that allows you to create
and edit your endpoints in your browser.

To access this run the edit command:

```shell
swagger project edit todo-api
```

Running this command, opens up a browser pointed to a localhost port that is
serving the Swagger editor.

Let's start looking on the right-hand side first. You can see that it has the name of our application, the version number, and then, it defines all of the paths that exist in the API. We've already used the /hello endpoint in our curl command that we did earlier, but it also allows us to use that from this editor, as well.

It gives us a description about the endpoint, and tells us about all the parameters
and responses.

We also have the ability to try it out from within the editor. It selects the scheme for us. Then, we can change the content type if we're selecting multiple content types. Then parameters, we can supply. As you change the value in `name` the url below will be
updated to reflect the change.

Then I can send that response, or send that request.

> This should come back with a response and a success message. This didn't work for
> me and I realised that I needed to run the `swagger project start todo-api` in
> another terminal instance while running the editor.

All of the right-hand side is generated from the YAML on the left hand side.

I imagine we'll dive into these in more detail during the course but we have the
swagger version at the top. This course uses Swagger v2, v3 was published as
OpenAPI Specification in 2015. You can find out more [here](https://swagger.io/blog/news/whats-new-in-openapi-3-0/).

The newer version seems more straightforward so I'll try to keep and eye on this
as I do the course and see if there are better ways to achieve the same goals.

## Personal take

This is an old course but I think it's going to have some great content. I'm going
to work through the course and see what is still useful and what needs to be updated.
I'm looking forward to it!
