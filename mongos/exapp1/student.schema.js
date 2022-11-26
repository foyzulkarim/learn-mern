const { BANGLADESH_CITIES } = require("./constant");

const updateSchema = async (db) => {
  const validator = {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "phone", "age", "city"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        phone: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        age: {
          bsonType: "int",
          minimum: 0,
          maximum: 100,
          description: "must be an integer in [ 0, 100 ] and is required",
          additionalProperties: false,
        },
        city: {
          enum: BANGLADESH_CITIES,
          description: "can only be one of the enum values and is required",
          additionalProperties: false,
        },
      },
    },
  };
  const collections = await db.listCollections({ name: "students" }).toArray();
  if (collections.length === 0) {
    console.log("creating students");
    db.createCollection("students", { validator });
  } else {
    console.log("updating students");
    db.command({
      collMod: "students",
      validator,
    });
  }
};

module.exports = {
  updateSchema,
};
