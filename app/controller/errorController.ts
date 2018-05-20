"use strict";

import * as express from "express";
import IRequest from "../interface/request";
import AbstractController from "./abstractController";

export default class ErrorController extends AbstractController {
  public get404 = async (req: IRequest, res: express.Response) => {
    res.render("e404", {
      dictionary: AbstractController.Dictionary[req.language],
    });
  };

  public get500 = async (req: IRequest, res: express.Response) => {
    res.render("e500", {
      dictionary: AbstractController.Dictionary[req.language],
    });
  };
}
