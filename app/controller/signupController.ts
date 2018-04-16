"use strict";

import * as express from "express";

export default class SignupController {
  public async get(req: express.Request, res: express.Response) {
      return res.render("signup", {lang: "en"});
  }
}
