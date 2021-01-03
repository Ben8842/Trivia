import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

class App extends Component {
  /*constructor() {
    super();
    this.state = {
      showMe: false,
    };
  }
  operation() {
    this.setState({
      showMe: !this.state.showMe,
    });
  }*/

  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}

export default App;

/*
 {this.state.showMe ? (
          <p>
            {" "}
            <Header />{" "}
          </p>
        ) : null}
        <button onClick={() => this.operation()}>Click here to Navigate</button>

        */
