"use strict";

const Elasticsearch = require("elasticsearch");
const client = new Elasticsearch.Client({
  host: "localhost:9200",
  log: "error",
});

module.exports = client;
