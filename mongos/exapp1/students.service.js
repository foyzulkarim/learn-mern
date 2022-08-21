const { ObjectId } = require("mongodb");
const { getDb, getCollections } = require("./mongo");

const insert = async (document) => {
  const result = await getCollections().Student.insertOne(document);
  return result;
};

const search = async (searchObject) => {
  const result = await getCollections().Student.find(searchObject).toArray();
  return result;
};

const getById = async (id) => {
  const student = await getCollections().Student.findOne({
    _id: new ObjectId(id),
  });
  return student;
};

const update = async (id, document) => {
  const updatedDoc = await getCollections().Student.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...document } }
  );
  return updatedDoc;
};

const deleteById = async (id) => {
  const deleted = await getCollections().Student.deleteOne({
    _id: new ObjectId(id),
  });
  return deleted;
};

module.exports = {
  insert,
  search,
  getById,
  update,
  deleteById,
};
