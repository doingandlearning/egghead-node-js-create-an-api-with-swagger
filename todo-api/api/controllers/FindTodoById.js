"use strict";
const client = require("../helpers/es");

module.exports = {
  FindTodoById: FindTodoById,
};

function FindTodoById(req, res) {
  console.log(`Getting Todo with id ${req.swagger.params.id.value}`);
  client.get(
    {
      index: "todo",
      type: "todo",
      id: req.swagger.params.id.value,
    },
    function (error, response) {
      res.header("Content-Type", "application/json");
      if (error) {
        res.end(JSON.stringify(error));
      } else {
        res.end(JSON.stringify(response._source));
      }
    }
  );
}
