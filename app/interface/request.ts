"use strict";

import * as express from "express";

export enum LanguageEnum {
  ENGLISH = "en",
  RUSSIAN = "ru",
}

export default interface IRequest extends express.Request {
  language: LanguageEnum;
}
