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
          maximum: 200,
          description: "must be an integer in [ 0, 200 ] and is required",
        },
        city: {
          enum: BANGLADESH_CITIES,
          description: "can only be one of the enum values and is required",
        },
      },
    },
  };

  const collections = await db.listCollections({ name: "students" }).toArray();
  if (collections.length === 0) {
    console.log("creating students");
    await db.createCollection("students", { validator });
  } else {
    console.log("updating students");
    await db.command({
      collMod: "students",
      validator,
    });
  }
  await db.command({
    createIndexes: "students",
    indexes: [
      {
        key: { name: -1 },
        name: "custom_name_index",
      },
      {
        key: { name: "text" },
        name: "name_text_index",
      },
      {
        key: { phone: 1 },
        name: "custom_phone_index",
        unique: true,
      },
    ],
  });
};

module.exports = {
  updateSchema,
};
