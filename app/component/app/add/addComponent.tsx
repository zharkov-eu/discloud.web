"use strict";

import * as React from "react";
import {EntryType} from "../../../backend/core/model/entryRequest";
import AddPopup from "./addPopup";
import AddSubmenu from "./addSubmenu";

interface IAddComponentProps {
  togglePopWrap: () => void;
}

interface IAddComponentState {
  entryType: EntryType;
  submenuOpen: boolean;
  popupOpen: boolean;
}

export default class AddComponent extends React.Component<IAddComponentProps, IAddComponentState> {

  public render() {
    return (
      <div className="app-add-wrapper">
        <div className="app-add">
          <a className="button app-add__button">Add</a>
        </div>
        {this.state.submenuOpen ? <AddSubmenu togglePopUp={this.togglePopUp}/> : undefined}
        {this.state.popupOpen ? <AddPopup/> : undefined}
      </div>
    );
  }

  private togglePopUp = (entryType: EntryType) => {
    this.props.togglePopWrap();
    this.setState({entryType, popupOpen: !this.state.popupOpen, submenuOpen: false});
  }
}
