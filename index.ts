"use strict";

import * as express from "express";
import * as http from "http";
import * as path from "path";
import errorMiddleware from "./app/midlleware/errorMiddleware";
import router from "./app/router";

// noinspection TsLint
const packageJson = require("./package.json");
const port = parseInt(process.argv[0], 10) || process.env["NODE_PORT"] || 8000;

const app = express();
const server = http.createServer(app);

app.set("views", path.join(__dirname, "/app/template"));
app.set("view engine", "ejs");
app.set("view options", {
  rmWhitespace: true,
});

app.use("/public", express.static(path.join("public", "build")));
app.use(router);
app.use(errorMiddleware());

server.on("error", (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on("listening", () => {
  const bind = typeof server.address() === "string" ? "pipe " + server.address() : "port " + server.address().port;
  console.log(`${packageJson.name} version ${packageJson.version} started on ${bind}`);
});

(async () => {
  server.listen(port);
})();
