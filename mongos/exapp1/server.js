const app = require("./app");
const { connect } = require("./mongo");

const PORT = 4000;

app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);
  await connect();
  console.log("connected to mongodb");
});
