const { MongoClient } = require("mongodb");
const { updateSchema } = require("./student.schema");

let _db = null;
const connect = async (url) => {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
  });
  console.log("connecting to MongoDB");
  await client.connect();
  _db = client.db("schooldb");
  await updateSchema(_db);
};

// create a getdb
const getDb = () => {
  return _db;
};

// export them
module.exports = {
  connect,
  getDb,
};
