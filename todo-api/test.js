"use strict";

const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

async function run() {
  await client.search(
    {
      index: "todo",
      type: "todo",
      q: "*",
      _sourceIncludes:
        "todo_id, todo, completed, tags, author, completeddate, duedate",
    },
    function (error, response) {
      if (error) {
        res.end(JSON.stringify(error));
      } else {
        res.end(response.body.hits.hits);
      }
    }
  );
}

run().catch(console.log);
