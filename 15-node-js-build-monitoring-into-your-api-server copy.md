---
title: "15. Build Monitoring into your API Server"
metaTitle: "15. Build Monitoring into your API Server"
metaDescription: "Build Monitoring into your API Server"
---

[Video link](https://egghead.io/lessons/node-js-build-monitoring-into-your-api-server)

We're going to use `process.hrtime()` to monitor timings within our API.

This returns a relative time based on when the service was started.

```js
process.hrtime();
```

It returns an array of two numbers.

```js
[607926, 635476471];
```

The first number is the number of seconds, the second is the number of nanoseconds of remaining real time that can't be represented in second precision.

If you pass a previous set value to `process.hrtime()` it returns the delta.

```js
let a = process.hrtime();
process.hrtime(a);
```

```js
[4, 761761101];
```

So, for me, some tiny bit more than 4 seconds.

We're going to create a new file in our helpers folder, `api/helpers/monitor.js`.

```js
const client = require("../helpers/es");

const monitor = function (start, tag) {
  if (start) {
    const endTime = process.hrtime(start);
    const duration = parseInt(endTime[0] * 1000 + endTime[1] / 1000000);
    console.log(`Duration for ${tag}: ${duration} msec`);
    client.create({
      index: "monitoring",
      type: "todo-api",
      id: new Date().getTime(),
      body: { duration: duration, tag: tag },
    });
  } else {
    return process.hrtime();
  }
};

module.exports = monitor;
```

So, if we don't pass in a start time, this function will return the `process.hrtime()`. Then, when we do pass in the parameter (with a tag) this will log out to our Elasticsearch instance.

For each of our endpoints we can now import our monitor helper, capture the value at the start of the execution and then log out at the start. I'll show the GetAllTodos as an example but they are all the same.

```js
"use strict";
const client = require("../helpers/es");
const monitor = require("../helpers/monitor");

module.exports = {
  GetAllTodos: GetAllTodos,
};

function GetAllTodos(req, res) {
  const start = monitor();
  client.search(
    {
      index: "todo",
      type: "todo",
      q: "*",
      _sourceInclude:
        "todo_id, todo, completed, tags, author, completeddate, duedate",
    },
    function (error, response) {
      if (error) {
        res.end(JSON.stringify(error));
      } else {
        const results = [];
        results = response.hits.hits.map(function (hit) {
          return hit._source;
        });
        res.header("Content-Type", "application/json");
        res.end(JSON.stringify(results));
        monitor(start, "GetAllTodos");
      }
    }
  );
}
```

We are now echoing our monitoring to the console and capturing this data to Elasticsearch with the duration and the tag. This will allow us to develop a great logging feature for our API.

It may be that we only want to console.log when we are in development. In that case, we can wrap that call in an if block like this.

```js
if (process.env.NODE_ENV == "development") {
  console.log(`Duration for ${tag}: ${duration} msec`);
}
```

This would allow the same code base for development and production.

## Personal take

Some helpful insights here and some pointers towards next steps. We've got the barebones required to build a cool logging service and we can have a different logging solution for development and production.
