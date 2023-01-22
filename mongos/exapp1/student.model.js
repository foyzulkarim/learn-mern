const { getDb } = require("./db");

const getCollection = () => {
  console.log(`get student collection`);
  const db = getDb();
  const collection = db.collection("students");
  return collection;
};

module.exports = {
  Student: getCollection(),
};
