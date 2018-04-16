"use strict";

import * as express from "express";

export default class IndexController {
  public async get(req: express.Request, res: express.Response) {
    return res.render("index", {lang: "en"});
  }
}
