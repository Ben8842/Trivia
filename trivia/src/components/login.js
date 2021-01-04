//import { null } from "mathjs";

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/userActions.js";

class logIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      isLoaded: false,
      email: "",
      username: "",
      password: "",
      loggedin: false,
      data: [],
    };
    this.handleChange = this.handleChange.bind(this);

    // this.closeModal = this.closeModal.bind(this);
  }

  submitLogIn() {
    const { email, password, username } = this.state;
    fetch("http://localhost:5000/authenticate", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ email, password, username }),
      // body data type must match "Content-Type" header
    })
      .then((res) => {
        if (res.status === 400) {
          return res.text();
        }
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (typeof data === "string") {
          console.log("message hello");
          // this.props.createModalError(data);
        }
        if (typeof data === "object") {
          localStorage.setItem("user", JSON.stringify(data));
          console.log(data);
          // this.setState(data);
          /*this.setState({
            loggedin: true,
            username: data.username,
            data: data,
          });*/
          this.props.login(data);
        }
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  git;
  render() {
    var { isLoggedIn, userName, data } = this.props.user;

    console.log(this.props.user);

    const logger = (
      <div id="trivia">
        <h4>You are Logged in as {userName} ! </h4>

        <button class="button button1">
          <Link to={{ pathname: "/", state: { ...data } }}>
            Continue to Trivia Now!
          </Link>
        </button>
      </div>
    );

    const signFields = (
      <div id="trivia">
        <form>
          <h4>Log In Here</h4>

          <div>
            <input
              id="tab"
              name="email"
              placeholder="EMAIL"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <input
              id="tab"
              type="text"
              name="password"
              git
              placeholder="PASSWORD"
              type="text"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button
              type="button"
              class="button button1"
              onClick={() => this.submitLogIn()}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    );

    return <body>{isLoggedIn ? logger : signFields}</body>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { login })(logIn);
