"use strict";

import * as express from "express";
import {TimeoutError} from "../error";

function errorMiddlewareHandler(err, req: express.Request, res: express.Response, next: express.NextFunction) {
  if (err instanceof TimeoutError) {
    res.status(500).render("e404");
  } else {
    console.error(err.stack);
    console.error("Unknown error " + JSON.stringify(err));
    res.status(500).render("e500");
  }
}

export default function errorMiddleware() {
  return errorMiddlewareHandler;
}
