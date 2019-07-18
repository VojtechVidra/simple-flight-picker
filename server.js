const { createServer } = require("http");
const next = require("next");

const app = next({ dev: process.env.NODE_ENV !== "production", dir: "./src" });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  createServer(handler).listen(3000);
});
