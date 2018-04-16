"use strict";

import {Reducer} from "redux";

export enum LanguageEnum {
  en = "English",
  ru = "Russian",
}

export interface ILanguageState {
  language: LanguageEnum;
}

interface IChangeLanguageAction {
  language: LanguageEnum;
  type: "CHANGE_LANGUAGE";
}

type KnownAction = IChangeLanguageAction;

export const actionCreators = {
  change: (language: LanguageEnum): IChangeLanguageAction => ({ language, type: "CHANGE_LANGUAGE" }),
};

export const reducer: Reducer<ILanguageState> = (state: ILanguageState, action: KnownAction) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      return { language: action.language };
  }

  return state || { language: LanguageEnum.ru };
};
