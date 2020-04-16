---
title: "02. Create An API Schema Definition Using Swagger"
metaTitle: "02. Create An API Schema Definition Using Swagger"
metaDescription: "Create An API Schema Definition Using Swagger"
---

[Video link](https://egghead.io/lessons/node-js-create-an-api-schema-definition-using-swagger)

We're now going to use the editor to create our own todo API.

Let's start by removing the schema definition and replacing it with our own. We'll call it a Todo and it will be a type of object.

```yaml
definitions:
  Todo:
    type: "object"
    properties:
      todo_id:
        type: "integer"
        description: "Id for the todo"
      todo:
        type: "string"
        description: "The todo item"
      datecreated:
        type: "string"
        format: "date-time"
        description: "Timestamp when the Todo was created. Set by server"
      author:
        type: "string"
        description: "Creator or owner of the todo"
      duedate:
        type: "string"
        format: "date-time"
        description: "When the todo is due"
      completed:
        type: "boolean"
        description: "Indicates if the todo has been completed or not"
```

- There is no date-time in API, so we accept a string but require a specific format
- There will be lots of errors and red x's appearing as you type - this is because our example endpoint is referencing a schema which doesn't exist any more. If you scroll down on the right though, you'll be able to see the `Todo` model that we have created with the YAML. This has all the properties and data types, you can use the drop down to see the description as well.

## Personal take

YAML is quite descriptive and helpful to create this schema. It is very cool that there is a helpful description of the API as we create it. Self-documenting for the win!
