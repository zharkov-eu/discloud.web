"use strict";

import * as React from "react";

interface ISignUpFormState {
  errorMessage: string;
  field: {
    username: string;
    password: string;
    repeatedPassword: string;
  };
}

export default class ISignUpForm extends React.Component<{}, ISignUpFormState> {
  public render() {
    return (
        <form method="post" action={""}>
          <div className="input-wrap">
            <input type="text" value={this.state.field.username}/>
            <label>Username</label>
          </div>
          <div className="input-wrap">
            <input type="password" value={this.state.field.password}/>
            <label>Password</label>
          </div>
          <div className="input-wrap">
            <input type="password" value={this.state.field.repeatedPassword}/>
            <label>Repeat password</label>
          </div>
          <input type="submit" value="LogIn"/>
        </form>
    );
  }
}
