"use strict";

import * as express from "express";
import IRequest, {LanguageEnum} from "../interface/request";

const languageMiddleware = () => (req: IRequest, res: express.Response, next: express.NextFunction) => {
  req.language = LanguageEnum.RUSSIAN;
  return next();
};

export default languageMiddleware;
