const app = require("./app");
const { connect: connectToMongo } = require("./mongo");

const PORT = 4000;

app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);
  const db = await connectToMongo();
  console.log(`connected to mongodb`);
});
