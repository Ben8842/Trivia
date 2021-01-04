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
      cats: [],
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
        cats: superData.categories,
      });
    }
  }

  render() {
    var { isLoggedIn, data, superUser, superScores, cats } = this.state;
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
      <div id="triviaScore">
        <p id="trivia">
          Hello {superUser}! Please view all of your scores below{" "}
        </p>

        <div class="row">
          <div class="column left">
            <h3>#</h3>
          </div>
          <div class="column middle">
            <h3>Score</h3>
          </div>
          <div class="column right">
            <h3>Category</h3>
          </div>
        </div>

        {superScores
          ? superScores.map((item, index) => (
              <div class="row">
                <div class="column left">
                  <p>{index + 1}</p>
                </div>
                <div class="column middle">
                  <p>{item}</p>
                </div>
                <div class="column right">
                  <p>{cats[index]}</p>
                </div>
              </div>
            ))
          : null}

        <p id="trivia">Thank you so much for playing</p>

        <button class="button button1">
          <Link to={{ pathname: "/", state: { ...data } }}>
            Continue to Trivia Now!
          </Link>
        </button>
      </div>
    );

    return <body>{isLoggedIn ? triviaScores : pleaseLogIn}</body>;
  }
}

export default Scores;
