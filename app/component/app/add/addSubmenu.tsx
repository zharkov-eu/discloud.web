"use strict";

import * as React from "react";
import {EntryType} from "../../../backend/core/model/entryRequest";

interface IAddComponentProps {
  togglePopUp: (entryType: EntryType) => void;
}

export default class AddSubmenu extends React.Component<IAddComponentProps, {}> {

  public render() {
    return (
      <div className="app-add-submenu">
        <ul className="app-add-submenu-list">
          <li className="app-add-submenu-list__entry"
              onClick={this.onEntryClick(EntryType.FILE)}>
            <i className="icon-upload-file"/>
            <span>New file</span>
          </li>
          <li className="app-add-submenu-list__entry"
              onClick={this.onEntryClick(EntryType.DIRECTORY)}>
            <i className="icon-plus-square"/>
            <span>New folder</span>
          </li>
        </ul>
      </div>
    );
  }

  private onEntryClick = (entryType: EntryType) => (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    this.props.togglePopUp(entryType);
  }
}
