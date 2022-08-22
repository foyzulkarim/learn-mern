const express = require("express");
const app = express();

app.use(express.json());

const { setupRoutes } = require("./app");
const { connect } = require("./mongo");

const PORT = 4000;

app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);
  await connect();
  setupRoutes(app);
  console.log("connected to mongodb");
});
