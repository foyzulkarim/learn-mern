const { validatorMiddleware } = require("./middlewares");
const {
  insert,
  search,
  getById,
  update,
  deleteById,
} = require("./students.service");
const { validateCreate, validateUpdate } = require("./student.request");

const setupRoutes = (app) => {
  console.log(`setting up student routes`);
  app.get("/api/students/detail/:id", async (req, res) => {
    console.log("GET /api/students", req.params);
    const student = await getById(req.params.id);
    res.send(student);
  });

  app.post("/api/students/search", async (req, res) => {
    console.log("POST /api/students", req.body);
    const result = await search(req.body);
    res.send(result);
  });

  app.post(
    "/api/students/create",
    validatorMiddleware(validateCreate),
    async (req, res) => {
      console.log("POST /api/students/create", req.body);
      try {
        const result = await insert(req.body);
        if (result instanceof Error) {
          next(result, req, res);
          return;
        }
        return res.json(result);
      } catch (error) {
        next(error, req, res);
      }
    }
  );

  app.put(
    "/api/students/update/:id",
    validatorMiddleware(validateUpdate),
    async (req, res, next) => {
      console.log("PUT /api/students/:id", req.params.id);
      try {
        const updated = await update(req.params.id, req.body);
        res.send(updated);
      } catch (error) {
        next(error, req, res, next);
      }
    }
  );

  app.delete("/api/students/delete/:id", async (req, res) => {
    console.log("DELETE /api/students/:id", req.params.id);
    const result = await deleteById(req.params.id);
    res.send(result);
  });
};

module.exports = { setupRoutes };
