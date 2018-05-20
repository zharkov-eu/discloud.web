"use strict";

import Language from "../lib/language";

export default class AbstractController {
  protected static Dictionary = {
    en: new Language(),
    ru: new Language(Language.loadDictionary("ru")),
  };
}
