import express from "express";

const app = express();
app.use(express.json());

app.all("/", (req, res) => {
  res.send(`I'm up!`);
});

const PORT = 5111;
app.listen(PORT, () => {
  console.log(`Serve is running at port ${PORT}`);
});

const todos = [
  {
    id: "1",
    title: "Task 1",
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    completed: true,
  },
];

// CREATE
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.json({
    message: "New Todo Added!",
  });
});

// READ
app.get("/todos", (req, res) => {
  res.json(todos);
});

// UPDATE
app.put("/todos/:id", (req, res) => {
  const newTodoData = req.body;
  const todoParamId = req.params.id;
  const todoIndex = todos.findIndex((td) => td.id === todoParamId);
  if (todoIndex !== -1) {
    todos[todoIndex] = {
      id: req.params.id,
      ...newTodoData,
    };
    res.json({
      message: `Todo updated successfully!`,
    });
  } else {
    res.status(400).json({
      message: "Todo Id does not exists",
    });
  }
});

// DELETE
app.delete("/todos/:id", (req, res) => {
  const todoParamId = req.params.id;
  const todoIndex = todos.findIndex((td) => td.id === todoParamId);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
  }
  res.json({
    message: `Todo updated successfully!`,
  });
});
