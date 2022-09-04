const app = require("./app");
const { connect } = require("./mongo");
const { handleError } = require("./middlewares");

const PORT = 4000;

const setup = () => {
  const { setupRoutes } = require("./students.controller");
  setupRoutes(app);
};

app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);
  await connect();
  setup();
  app.use(async (err, req, res, next) => {
    await handleError(err, req, res, next);
  });
  // which request, what handler
  app.use("/", (req, res) => {
    console.log(`request received at ${new Date()}`);
    console.log("req", req.body);
    //console.dir(res);
    res.send(`request received at ${new Date()}`);
  });

  console.log("application setup completed");
});
