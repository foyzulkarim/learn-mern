const { MongoClient } = require("mongodb");

console.log("Connecting to MongoDB");
const client = new MongoClient("mongodb://localhost:27017", {
  useNewUrlParser: true,
});

const insertStudent = async (db, document) => {
  const collection = db.collection("students");
  const result = await collection.insertOne(document);
  console.log(result);
};

const searchStudent = async (db, document) => {
  const collection = db.collection("students");
  const result = await collection.findOne(document);
  console.log(result);
};

const student = {
  name: "John",
  age: 30,
  city: "New York",
};

const main = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("schooldb");
    // const result = await insertStudent(db, student);
    // const result = await searchStudent(db, { age: { $gt: 30 } });
    const count = await db.collection("students").countDocuments();
    console.log(count);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

main();
