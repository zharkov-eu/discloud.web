"use strict";

import * as express from "express";

export default (fn: (req: express.Request, res: express.Response) => Promise<any>) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    fn(req, res).catch((error) => next(error));
  }
}