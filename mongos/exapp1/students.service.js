const { getDb, getCollections } = require("./mongo");

const insert = async (document) => {
  const db = await getDb();
  const collection = db.collection("students");
  const result = await collection.insertOne(document);
  return result;
};

const search = async (searchObject) => {
  const { Student } = getCollections();
  const result = await Student.find(searchObject).toArray();
  return result;
};

const getById = async (id) => {
  const db = await getDb();
  const collection = db.collection("students");
};

const update = async (id, document) => {
  const db = await getDb();
  const collection = db.collection("students");
};

const deleteById = async (id) => {
  const db = await getDb();
  const collection = db.collection("students");
};

module.exports = {
  insert,
  search,
};
