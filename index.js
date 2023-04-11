const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.updatedAt = Date.now();
    req.body.createdAt = Date.now();
  }
  if (req.method === "PUT") {
    req.body.updatedAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});
// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data,
    statusCode: res.statusCode,
  });
};

// Use default router
server.use("/api", router);
server.listen(8080, () => {
  console.log("JSON Server is running");
});
