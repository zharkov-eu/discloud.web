"use strict";

import * as express from "express";

export default class ErrorController {
  public async get404(req: express.Request, res: express.Response) {
    res.render("e404");
  }

  public async get500(req: express.Request, res: express.Response) {
    res.render("e500");
  }
}
