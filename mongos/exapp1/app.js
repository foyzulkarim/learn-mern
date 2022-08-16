const express = require("express");
const app = express();
const { getDb } = require("./mongo");

app.use(express.json());

app.get("/api/students/detail/:id", async (req, res) => {
  console.log("GET /api/students", req.query);
  const db = await getDb();
  const collection = db.collection("students");
  const students = await collection.find().toArray();

  res.send(students);
});

app.post("/api/students/search", (req, res) => {
  console.log("POST /api/students", req.body);
  res.send("Hello World");
});

app.post("/api/studets/create", (req, res) => {
  console.log("POST /api/students/create", req.body);
  res.send("Hello World");
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
