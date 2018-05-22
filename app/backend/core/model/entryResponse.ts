"use strict";

export default interface IEntryResponse {
  created: number;
  group: number;
  lastModify: number;
  location: string[];
  name: string;
  owner: number;
  path: string;
  permission: string;
  share: string;
  type: string;
  upload: string;
  uuid: string;
}
