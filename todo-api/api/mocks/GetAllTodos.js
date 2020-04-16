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
