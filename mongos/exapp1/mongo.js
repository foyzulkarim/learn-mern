const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017", {
  useNewUrlParser: true,
});

let _db = null;

const getDb = async () => {
  if (!_db) {
    await connect();
  }
  return _db;
};

const connect = async () => {
  console.info("connecting to mongodb");
  await client.connect();
  _db = client.db("schooldb");
  return _db;
};

module.exports = {
  getDb,
  connect,
};
