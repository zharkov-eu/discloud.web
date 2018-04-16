"use strict";

import * as express from "express";

export default class PricingController {
  public async get(req: express.Request, res: express.Response) {
      return res.render("pricing", {lang: "en"});
  }
}
