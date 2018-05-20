"use strict";

import * as fs from "fs";
import * as path from "path";

export default class Language {
  public static loadDictionary(language: string): {[index: string]: string} {
    const filePath = path.resolve(__dirname, "..", "..", "localization", `${language}.json`);
    return JSON.parse(fs.readFileSync(filePath).toString());
  }

  private static format(text: string, ...args: any[]): string {
    return text.replace(/{(\d+)}/g, (match: string, count: number) => {
      return typeof args[count] !== "undefined" ? args[count] : match;
    });
  }

  private dictionary: {[index: string]: string};

  constructor(dictionary?: {[index: string]: string}) {
    this.dictionary = dictionary || {};
  }

  public getText(text: string, ...args): string {
    return this.dictionary[text] ? Language.format(this.dictionary[text], ...args) : Language.format(text, ...args);
  }
}
