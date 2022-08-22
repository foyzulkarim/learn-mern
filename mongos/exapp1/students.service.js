const { ObjectId } = require("mongodb");
const { getDb, getCollections } = require("./mongo");

const insert = async (document) => {
  try {
    const result = await getCollections().Student.insertOne(document);
    return result;
  } catch (error) {
    console.log(JSON.stringify(error));
    if (error.code == 121) {
      const errors = error.errInfo.details.schemaRulesNotSatisfied
        .map((e) =>
          e.propertiesNotSatisfied.map((p) => ({
            property: p.propertyName,
            errors: p.details.map((q) => q.reason),
          }))
        )
        .flatMap((x) => x);
      console.log("errors: ", errors);
      return new Error(JSON.stringify({ message: error.message, errors }));
    }
    return new Error(error.message);
  }
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
