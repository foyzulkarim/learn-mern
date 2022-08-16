const express = require("express");
const app = express();

const { insert, search } = require("./students.service");

app.use(express.json());

app.get("/api/students/detail/:id", async (req, res) => {
  console.log("GET /api/students", req.query);
  res.send(`Hello world`);
});

app.post("/api/students/search", async (req, res) => {
  console.log("POST /api/students", req.body);
  const result = await search(req.body);
  res.send(result);
});

app.post("/api/students/create", async (req, res) => {
  console.log("POST /api/students/create", req.body);
  const result = await insert(req.body);
  res.send(result);
});

app.put("/api/students/update/:id", (req, res) => {
  console.log("PUT /api/students/:id", req.params.id);
  res.send("Hello World");
});

app.delete("/api/students/delete/:id", (req, res) => {
  console.log("DELETE /api/students/:id", req.params.id);
  res.send("Hello World");
});

// which request, what handler
app.use("/", (req, res) => {
  console.log(`request received at ${new Date()}`);
  console.log("req", req.body);
  //console.dir(res);
  res.send(`request received at ${new Date()}`);
});

module.exports = app;
