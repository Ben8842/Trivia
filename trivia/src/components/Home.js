import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/userActions.js";

var listCatsId = [
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
];

var listCats = [
  "General Knowledge",
  "Entertainment: Books",
  "Entertainment: Film",
  "Entertainment: Music",
  "Entertainment: Musicals & Theatres",
  "Entertainment: Television",
  "Entertainment: Video Games",
  "Entertainment: Board Games",
  "Science & Nature",
  "Science: Computers",
  "Science: Mathematics",
  "Mythology",
  "Sports",
  "Geography",
  "History",
  "Politics",
  "Art",
  "Celebrities",
  "Animals",
  "Vehicles",
  "Entertainment: Comics",
  "Science: Gadgets",
  "Entertainment: Japanese Anime & Manga",
  "Entertainment: Cartoon & Animations",
];

class trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      isLoaded: false,
      triviaData: [],
      show: false,
      count: 1,
      isCorrectChoice: false,
      isWrongChoice: false,
      correctCount: 0,
      startButton: true,
      triviaDone: false,
      category: 9,
      categoryDisplay: false,
      catsIsLoaded: false,
      cats: [],
      isLoggedIn: false,
      superUser: "",
      data: [],
      categoryName: "",
    };
  }

  componentDidMount() {
    const data = this.props.location.state;
    console.log(JSON.stringify({ data }));
    if (data === undefined) {
      this.setState({ isLoggedIn: false });
    } else {
      this.setState({ isLoggedIn: true, superUser: data.username });
    }
    fetch(
      "https://opentdb.com/api.php?amount=15&category=30&type=multiple&encode=base64"
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          triviaData: json,
          data: data,
        });
      });
  }

  handleClick() {
    this.setState({
      show: true,
      startButton: false,
    });
  }

  handleCat() {
    this.setState({
      startButton: false,
      categoryDisplay: true,
    });
  }

  nextTrivia() {
    this.incrementCount();
    this.setState({ isCorrectChoice: false });
    this.setState({ isWrongChoice: false });
  }

  incrementCount() {
    this.setState((state) => {
      if (state.count < 10) {
        return { count: state.count + 1 };
      } else return { triviaDone: true };
    });
  }

  incrementCorrectCount() {
    this.setState((state) => {
      return { correctCount: state.correctCount + 1 };
    });
  }

  isCorrect(ans) {
    var { triviaData, count } = this.state;
    if (atob(triviaData.results[count].correct_answer) === ans) {
      this.incrementCorrectCount();
      this.setState({
        isCorrectChoice: true,
      });
    } else {
      this.setState({
        isWrongChoice: true,
      });
    }
  }

  displayTrivia() {
    var { isLoaded, triviaData, count } = this.state;

    if (isLoaded) {
      var firstQuestion = triviaData.results[count].question;
      var decodedStringAtoB = atob(firstQuestion);
    } else {
      console.log("waiting");
    }
    const tquestion = (
      <div>
        <p>{decodedStringAtoB}</p>
      </div>
    );
    return tquestion;
  }

  displayTriviaA() {
    var { isLoaded, triviaData, count } = this.state;
    if (isLoaded) {
      var firstAnswer = atob(triviaData.results[count].correct_answer);
      var secondAnswer = atob(triviaData.results[count].incorrect_answers[0]);
      var thirdAnswer = atob(triviaData.results[count].incorrect_answers[1]);
      var fourthAnswer = atob(triviaData.results[count].incorrect_answers[2]);

      function shuffle(arry) {
        arry.sort(() => Math.random() - 0.5);
      }

      let answerArr = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];
      shuffle(answerArr);
      const tAnswers = (
        <div>
          <button
            class="button button1"
            onClick={() => this.isCorrect(answerArr[0])}
          >
            A. {answerArr[0]}
          </button>
          <button
            class="button button1"
            onClick={() => this.isCorrect(answerArr[1])}
          >
            B. {answerArr[1]}
          </button>
          <button
            class="button button1"
            onClick={() => this.isCorrect(answerArr[2])}
          >
            C. {answerArr[2]}
          </button>
          <button
            class="button button1"
            onClick={() => this.isCorrect(answerArr[3])}
          >
            D. {answerArr[3]}
          </button>
        </div>
      );
      return tAnswers;
    } else {
      console.log("waiting");
    }
  }

  displayTriviaWrong() {
    var { isLoaded, triviaData, count } = this.state;
    if (isLoaded) {
      var firstAnswer = atob(triviaData.results[count].correct_answer);

      const cAnswers = <div>The Correct Answer was {firstAnswer}</div>;
      return cAnswers;
    } else {
      console.log("waiting");
    }
  }

  returnHome() {
    var { superUser, correctCount, categoryName } = this.state;

    console.log("HOME");
    console.log("adding SCORE");

    console.log(JSON.stringify({ superUser, correctCount, categoryName }));
    fetch("http://localhost:5000/scores", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ superUser, correctCount, categoryName }),
      // body data type must match "Content-Type" header
    })
      .then((res) => {
        console.log("trigger");
        if (res.status === 400) {
          this.setState({
            count: 1,
            show: false,
            startButton: true,
            triviaDone: false,
            correctCount: 0,
          });
          return res.text();
        }
        //if (res.status === 201) {
        else {
          this.setState({
            count: 1,
            show: false,
            startButton: true,
            triviaDone: false,
            correctCount: 0,
          });
          return;
        }
      })

      .then((data) => {
        if (typeof data === "string") {
          console.log("time to push the data");
          // this.props.createModalError(data);
        }
        //if (typeof data === "object") {
        else {
          console.log("no user found");
          //  this.closeModal();
        }
      });
  }

  logOut() {
    this.props.logout();
  }

  handleCatChoice(ids) {
    var caty = listCatsId.indexOf(ids);
    var finalChoice = listCats[caty];
    console.log(finalChoice);
    this.setState({ isLoaded: false, categoryName: finalChoice });
    fetch(
      "https://opentdb.com/api.php?amount=15&category=" +
        ids +
        "&type=multiple&encode=base64"
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          triviaData: json,
          show: true,
          startButton: false,
          categoryDisplay: false,
        });
      });
  }

  render() {
    var {
      isLoaded,
      show,
      count,
      isCorrectChoice,
      isWrongChoice,
      correctCount,
      startButton,
      triviaDone,
      categoryDisplay,
      isLoggedIn,
      superUser,
      data,
    } = this.state;

    var { username, isLoggedIn, data } = this.props.user;

    const question = this.displayTrivia();
    const answer = this.displayTriviaA();
    const answerWrong = this.displayTriviaWrong();
    const celebration = (
      <div id="correct">
        <p id="correct">You got this question number {count} correct! </p>
        <p>{question}</p>
        <p id="correct">CORRECT !</p>
        <p>Continue to the next Question</p>
        <button class="button button3" onClick={() => this.nextTrivia()}>
          Next Question
        </button>
      </div>
    );

    const recuperate = (
      <div id="wrong">
        <p id="wrong">You got this question number {count} Wrong! </p>
        <p>Don't give up yet. </p>
        <p id="wrong">{answerWrong}</p>
        <button class="button button2" onClick={() => this.nextTrivia()}>
          Next Question
        </button>
      </div>
    );

    const questionBox = (
      <div id="trivia">
        <p id="trivia">QUESTION {count} </p>
        <p>{question}</p>
        <p id="trivia">CHOOSE YOUR ANSWER</p>
        <p>{answer}</p>
      </div>
    );

    const runningScore = (
      <p id="tab">
        {correctCount} answers correct out of {count} questions
      </p>
    );

    const triviaComplete = (
      <div id="trivia">
        <p id="trivia">Trivia Complete! </p>
        <p>
          Your score is {correctCount} of {count}
        </p>
        <p id="trivia">Thank you so much for playing</p>
        <p>Try again soon!</p>
        <button class="button button1" onClick={(e) => this.returnHome()}>
          HOME
        </button>
      </div>
    );

    const categoryChoices = (
      <div id="trivia">
        <h3>Choose a Category !</h3>
        <button class="button button1" onClick={() => this.handleCatChoice(9)}>
          General Knowledge
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(10)}>
          Books
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(11)}>
          Film
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(12)}>
          Music
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(14)}>
          Television
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(15)}>
          Video Games
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(16)}>
          Board Games
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(17)}>
          Nature
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(18)}>
          Computers
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(19)}>
          Mathematics
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(20)}>
          Mythology
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(21)}>
          Sports
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(22)}>
          Geography
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(23)}>
          History
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(24)}>
          Politics
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(27)}>
          Animals
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(28)}>
          Vehicles
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(29)}>
          Comics
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(31)}>
          Anime
        </button>

        <button class="button button1" onClick={() => this.handleCatChoice(32)}>
          Cartoons
        </button>
      </div>
    );

    const triviaStartButton = (
      <div id="trivia">
        <button class="button button1" onClick={() => this.handleCat()}>
          Start Trivia
        </button>
      </div>
    );

    const superHeader = (
      <div id="Header">
        <button class="button button4">
          <Link to="/login">Log In</Link>
        </button>

        <button class="button button4" onClick={null}>
          <Link to="/SignUp">Sign Up</Link>
        </button>
      </div>
    );
    const superHeaderAuthentication = (
      <div id="Header">
        <button class="button button4">
          <Link to={{ pathname: "/Scores", state: { ...data } }}>
            View Your Scores
          </Link>
        </button>

        <button class="button button4" onClick={() => this.logOut()}>
          Log Out
        </button>
        <h3>You are currently logged in as {superUser} </h3>
      </div>
    );

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <body>
          {isLoggedIn && isLoaded ? superHeaderAuthentication : superHeader}

          {categoryDisplay ? categoryChoices : null}
          {startButton ? triviaStartButton : null}
          {isLoaded && show ? runningScore : null}
          {triviaDone ? triviaComplete : null}
          {!triviaDone && isLoaded && show && !isCorrectChoice && !isWrongChoice
            ? questionBox
            : null}
          {isCorrectChoice ? celebration : null}
          {isWrongChoice ? recuperate : null}
        </body>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout })(trivia);

/*<ul>
            DATA HAS BEEN LOADED
            {triviaData.results.map((item) => (
              <li key={item.id}>
                Question: {item.question} | Answer: {item.correct_answer} |{" "}
                {item.id}
              </li>
            ))}
            ;
          </ul>*/
