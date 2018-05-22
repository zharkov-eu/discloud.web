"use strict";

import {Reducer} from "redux";
import IEntryResponse from "../../backend/core/model/entryResponse";

export interface IWorkspaceState {
  current: IEntryResponse;
}

interface IChangeWorkspaceAction {
  directory: IEntryResponse;
  type: "CHANGE_DIRECTORY";
}

type KnownAction = IChangeWorkspaceAction;

export const actionCreators = {
  change: (directory: IEntryResponse): IChangeWorkspaceAction => ({ directory, type: "CHANGE_DIRECTORY" }),
};

export const reducer: Reducer<IWorkspaceState> = (state: IWorkspaceState, action: KnownAction) => {
  switch (action.type) {
    case "CHANGE_DIRECTORY":
      return { current: action.directory };
  }

  return state || { current: undefined };
};
