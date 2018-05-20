"use strict";

import * as express from "express";
import IRequest from "../interface/request";
import AbstractController from "./abstractController";

export default class IndexController extends AbstractController {
  public get = async (req: IRequest, res: express.Response) => {
    return res.render("index", {
      dictionary: AbstractController.Dictionary[req.language],
      lang: req.language,
    });
  }
}
