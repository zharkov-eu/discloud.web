"use strict";

import * as React from "react";

interface ILoginFormState {
  errorMessage: string;
  field: {
    username: string;
    password: string;
  };
}

export default class LoginForm extends React.Component<{}, ILoginFormState> {
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
          <input type="submit" value="LogIn"/>
        </form>
    );
  }
}
