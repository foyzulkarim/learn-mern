// import the mongoclient
const { MongoClient } = require("mongodb");

const createCollections = async (db) => {
  const names = (await _db.collections()).map((n) => n.s.namespace.collection);
  console.dir(names);
  const students = "students";
  if (!names.find((n) => n === students)) {
    console.log("creating ", students);
    db.createCollection(students, {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "year", "major", "address"],
          properties: {
            name: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            year: {
              bsonType: "int",
              minimum: 2017,
              maximum: 3017,
              description:
                "must be an integer in [ 2017, 3017 ] and is required",
            },
            major: {
              enum: ["Math", "English", "Computer Science", "History", null],
              description: "can only be one of the enum values and is required",
            },
            gpa: {
              bsonType: ["double"],
              description: "must be a double if the field exists",
            },
            address: {
              bsonType: "object",
              required: ["city"],
              properties: {
                street: {
                  bsonType: "string",
                  description: "must be a string if the field exists",
                },
                city: {
                  bsonType: "string",
                  description: "must be a string and is required",
                },
              },
            },
          },
        },
      },
    });
  }
};

let _db = null;
// create a connect
const connect = async () => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useNewUrlParser: true,
  });
  console.log("connecting to MongoDB");
  await client.connect();
  _db = client.db("schooldb");
  createCollections(_db);
};

// create a getdb
const getDb = async () => {
  if (!_db) {
    await connect();
  }
  return _db;
};

const getCollections = () => {
  return {
    Student: _db.collection("students"),
    Teacher: _db.collection("teachers"),
  };
};

// export them
module.exports = {
  connect,
  getDb,
  getCollections,
};
