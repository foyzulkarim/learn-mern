const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
// const express = require("express");

// const { search, getById } = require("./student.service");
// const { validate } = require("./student.request");

// jest.mock("./db.js", () => require("./__mocks__/db.js"));
// const studentsService = require("./student.service");
const { connect } = require("./db");
const app = require("./app");

describe("Students controller", () => {
  beforeAll(async () => {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    console.log("uri", uri);
    await connect(uri);
    const { setupRoutes } = require("./student.controller");
    setupRoutes(app);
  });

  test("GET /api/students/detail/:id", async () => {
    const student = { id: "63c3db57290f791b2093660c", name: "John Doe" };
    const response = await request(app).get(
      "/api/students/detail/63c3db57290f791b2093660c"
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual(student);
    // console.log("spiedGetById.mock.calls", studentsService.getById.mock);
    // expect(spiedGetById).toHaveBeenCalledWith("63c3db57290f791b2093660c");
  });

  // test("POST /api/students/search", async () => {
  //   const searchData = { name: "John" };
  //   const searchResult = [{ id: 1, name: "John Doe" }];
  //   jest.spyOn(studentsService, "search").mockResolvedValue(searchResult);
  //   const response = await request(app)
  //     .post("/api/students/search")
  //     .send(searchData);
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual(searchResult);
  //   expect(studentsService.search).toHaveBeenCalledWith(searchData);
  // });
});
