const { ObjectId } = require("mongodb");
const { Student } = require("./student.model");

// TODO: add logging

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
          description: e.description,
          errors: e.details.map((d) => d.reason),
          rawErrors: e.details,
        };
      });
      return new Error(JSON.stringify(reasons));
    }
    return error;
  }
};

// TODO: use regex or like search
const search = async (searchObject) => {
  const result = await Student.find(searchObject).toArray();
  return result;
};

const getById = async (id) => {
  try {
    const student = await Student.findOne({
      _id: new ObjectId(id),
    });
    return student;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const update = async (id, document) => {
  try {
    const updatedDoc = await Student.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...document } }
    );
    return updatedDoc;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const deleteById = async (id) => {
  try {
    const deleted = await Student.deleteOne({
      _id: new ObjectId(id),
    });
    return deleted;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  insert,
  search,
  getById,
  update,
  deleteById,
};
