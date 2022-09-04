const { ObjectId } = require("mongodb");
const { getCollections } = require("./mongo");
const { Student } = require("./student.model");

const insert = async (document) => {
  try {
    const result = await Student.insertOne(document);
    return result;
  } catch (error) {
    if (error.code === 121) {
      console.log(
        JSON.stringify(
          error.errInfo.details.schemaRulesNotSatisfied.find(
            (x) => x.operatorName == "properties"
          ).propertiesNotSatisfied
        )
      );
      const errors = error.errInfo.details.schemaRulesNotSatisfied.find(
        (x) => x.operatorName == "properties"
      ).propertiesNotSatisfied;
      const reasons = errors.map((e) => {
        return {
          property: e.propertyName,
          errors: e.details.map((d) => d.reason),
        };
      });
      return new Error(JSON.stringify(reasons));
    }
    return error;
  }
};

const search = async (searchObject) => {
  const result = await Student.find(searchObject).toArray();
  return result;
};

const getById = async (id) => {
  const student = await getCollections().Student.findOne({
    _id: new ObjectId(id),
  });
  return student;
};

const update = async (id, document) => {
  const updatedDoc = await Student.updateOne(
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
