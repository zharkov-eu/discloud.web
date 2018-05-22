"use strict";

import * as React from "react";
import AddComponent from "./add/addComponent";

interface IInterfaceState {
  popWrap: boolean;
}

export default class Interface extends React.Component<{}, IInterfaceState> {

  public render() {
    return (
      <div id="interface">
        {this.state.popWrap ? <div className="app-pop-wrap"/> : undefined}
        <AddComponent togglePopWrap={this.togglePopWrap}/>
      </div>
    );
  }

  private togglePopWrap = () => {
    this.setState({popWrap: !this.state.popWrap});
  }
}
