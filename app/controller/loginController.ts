"use strict";

import * as express from "express";

export default class LoginController {
  public async get(req: express.Request, res: express.Response) {
      return res.render("login", {lang: "en"});
  }
}
