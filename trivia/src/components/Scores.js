//import { null } from "mathjs";

import React, { Component } from "react";
import { Link } from "react-router-dom";

class Scores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      superUser: "",
      isLoggedIn: false,

      data: [],
      superScores: [],
    };
  }

  componentDidMount() {
    var { superUser, isLoggedIn, data } = this.state;
    const superData = this.props.location.state;
    console.log(JSON.stringify({ superData }));
    if (superData === undefined) {
      this.setState({ isLoggedIn: false });
    } else {
      this.setState({
        isLoggedIn: true,
        superUser: superData.username,
        data: superData,
        superScores: superData.scores,
      });
    }
  }

  render() {
    var { isLoggedIn, data, superUser, superScores } = this.state;
    console.log("component mounted and " + isLoggedIn + data + superUser);

    const pleaseLogIn = (
      <div id="trivia">
        <p id="trivia">Welcome and Please Log In or Sign Up </p>

        <p id="trivia">Thank you so much for visiting</p>

        <button class="button button1" onClick={null}>
          A Button
        </button>
      </div>
    );

    const triviaScores = (
      <div id="trivia">
        <p id="trivia">Hello {superUser}! </p>
        <p>See your scores below!</p>
        <ul>
          {superScores
            ? superScores.map((item, index) => (
                <li key={index}>
                  {index + 1} | {item}
                </li>
              ))
            : null}
        </ul>
        <p id="trivia">Thank you so much for playing</p>

        <button class="button button1">
          <Link to={{ pathname: "/trivia", state: { ...data } }}>
            Continue to Trivia Now!
          </Link>
        </button>
      </div>
    );

    return <body>{isLoggedIn ? triviaScores : pleaseLogIn}</body>;
  }
}

export default Scores;
