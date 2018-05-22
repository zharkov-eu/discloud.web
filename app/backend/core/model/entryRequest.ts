"use strict";

import {IsMemberOf, IsNumber, NotEmpty, NotEmptyString, Validate, ValidationError} from "validation-api";

export enum EntryType {
  FILE = "f",
  DIRECTORY = "d",
}

export enum EntryShare {
  NONE = "n",
  LINK = "l",
}

export interface IEntryRequest {
  type?: EntryType;
  filetype?: string;
  path?: string;
  owner?: number;
  group?: number;
  permission?: string;
  share?: EntryShare;
  location?: string[];
}

@Validate({throwable: false})
export default class EntryRequest implements IEntryRequest {
  @IsMemberOf({array: [EntryType.DIRECTORY, EntryType.FILE]})
  public type?: EntryType;

  @NotEmptyString()
  public filetype?: string;

  @NotEmptyString()
  public parent?: string;

  @NotEmptyString()
  public path?: string;

  @IsNumber()
  public owner?: number;

  @IsNumber()
  public group?: number;

  @NotEmptyString()
  public permission?: string;

  @IsMemberOf({array: [EntryShare.LINK]})
  public share?: EntryShare;

  @NotEmpty()
  public location?: string[];

  constructor(request: IEntryRequest, required: IEntryRequest = {}) {
    if (!request || typeof request !== "object") {
      throw new ValidationError([{
        constraint: "object",
        message: "EntryRequest not a object",
        property: undefined,
        value: undefined,
      }]);
    }
    if (required.type || request.type) this.type = request.type;
    if (required.filetype || request.filetype) this.filetype = request.filetype;
    if (required.path || request.path) this.path = request.path;
    if (required.owner || request.owner) this.owner = request.owner;
    if (required.group || request.group) this.group = request.group;
    if (required.permission || request.permission) this.permission = request.permission;
    if (required.share || request.share) this.share = request.share;
    if (required.location || request.location) this.location = request.location;
  }
}
