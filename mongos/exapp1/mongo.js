// import the mongoclient
const { MongoClient } = require("mongodb");

let _db = null;
// create a connect
const connect = async () => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useNewUrlParser: true,
  });
  console.log("connecting to MongoDB");
  await client.connect();
  _db = client.db("schooldb");
};

// create a getdb
const getDb = async () => {
  if (!_db) {
    await connect();
  }
  return _db;
};

// export them
module.exports = {
  connect,
  getDb,
};
