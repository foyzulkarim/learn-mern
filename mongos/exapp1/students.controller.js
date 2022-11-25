const {
  insert,
  search,
  getById,
  update,
  deleteById,
} = require("./students.service");
const { validate } = require("./student.request");

const setupRoutes = (app) => {
  console.log(`setting up student routes`);
  app.get("/api/students/detail/:id", async (req, res) => {
    console.log("GET /api/students", req.params);
    const student = await getById(req.params.id);
    res.send(student);
  });

  // TODO: Proper searching with paging and ordering
  app.post("/api/students/search", async (req, res) => {
    console.log("POST /api/students", req.body);
    const result = await search(req.body);
    res.send(result);
  });

  app.post("/api/students/create", async (req, res) => {
    console.log("POST /api/students/create", req.body);
    const validationResult = validate(req.body);
    if (!validationResult.error) {
      const result = await insert(req.body);
      if (result instanceof Error) {
        res.status(400).json(JSON.parse(result.message));
        return;
      }
      return res.json(result);
    }
    return res
      .status(400)
      .json({ status: "error", message: validationResult.error });
  });

  app.put("/api/students/update/:id", async (req, res) => {
    console.log("PUT /api/students/:id", req.params.id);
    const validationResult = validate(req.body);
    if (req.params.id && !validationResult.error) {
      const result = await update(req.params.id, req.body);
      if (result instanceof Error) {
        res.status(400).json(JSON.parse(result.message));
        return;
      }
      return res.json(result);
    }
    return res
      .status(400)
      .json({ status: "error", message: validationResult.error });
  });

  app.delete("/api/students/delete/:id", async (req, res) => {
    console.log("DELETE /api/students/:id", req.params.id);
    if (req.params.id) {
      const result = await deleteById(req.params.id);
      if (result instanceof Error) {
        res.status(400).json(JSON.parse(result.message));
        return;
      }
      return res.json(result);
    }
    return res.status(400).json({ status: "error", message: "Id required" });
  });
};

module.exports = { setupRoutes };
