import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Grid } from "react-native-easy-grid";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Text,
  Button,
  Card,
  CardItem
} from "native-base";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false,
      quizCards: [...this.props.cards]
    };
  }

  onShowAnswer = () => {
    this.setState({ showAnswer: true });
  };

  onAnswerQuestion = (currentCard, correct) => {
    this.setState(prevState => {
      return Object.assign(
        {
          showAnswer: false
        },
        {
          quizCards: [
            ...prevState.quizCards.filter(card => card != currentCard),
            { correct: correct, ...currentCard }
          ]
        }
      );
    });
  };

  getUnansweredCard = () => {
    const { quizCards } = this.state;
    return quizCards.filter(card => !card.hasOwnProperty("correct"))[0];
  };

  onStartOver = () => {
      this.setState({showAnswer: false, quizCards: [...this.props.cards]})
  }

  render() {
    const { showAnswer, quizCards } = this.state;
    const currentCard = this.getUnansweredCard();
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Text>{currentCard != undefined ? "Cancel" : "Done"}</Text>
            </Button>
          </Left>
          <Body>
            <Title>Quiz</Title>
          </Body>
          {currentCard != undefined ? (
            <Right>
            <Button
              transparent
              onPress={() => this.onStartOver()}
            >
              <Text>Restart</Text>
            </Button>
          </Right>
          ) : (
            <Right>
              <Button
                transparent
                onPress={() => this.onStartOver()}
              >
                <Text>Start Over</Text>
              </Button>
            </Right>
          )}
        </Header>
        {currentCard != undefined ? (
          <Grid>
            <QuizCard
              showAnswer={showAnswer}
              currentCard={currentCard}
              quizCards={quizCards}
            />
            {!showAnswer ? (
              <Row size={1}>
                <Button
                  full
                  style={{ flex: 1, height: 100, alignSelf: "flex-end" }}
                  onPress={this.onShowAnswer}
                >
                  <Text>Show Answer</Text>
                </Button>
              </Row>
            ) : (
              <Row size={1}>
                <Button
                  full
                  style={{ flex: 1, height: 100, alignSelf: "flex-end" }}
                  onPress={() => this.onAnswerQuestion(currentCard, true)}
                  success
                >
                  <Text>Correct</Text>
                </Button>
                <Button
                  full
                  style={{ flex: 1, height: 100, alignSelf: "flex-end" }}
                  onPress={() => this.onAnswerQuestion(currentCard, false)}
                  danger
                >
                  <Text>Incorrect</Text>
                </Button>
              </Row>
            )}
            ))}
          </Grid>
        ) : (
          <Grid>
            <Row size={1} style={{ padding: 10 }}>
              <Card style={{ flex: 1 }}>
                <CardItem header>
                  <Text>Result</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>
                      Answered {quizCards.filter(card => card.correct).length}{" "}
                      out of {quizCards.length} Correctly
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            </Row>
          </Grid>
        )}
      </Container>
    );
  }
}

const QuizCard = ({ showAnswer, currentCard, quizCards }) => {
  return (
    <Row style={{ padding: 10 }} size={3}>
      {!showAnswer ? (
        <Card style={{ flex: 1 }}>
          <CardItem header>
            <Text>Question</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{currentCard.question}</Text>
            </Body>
          </CardItem>
        </Card>
      ) : (
        <Card style={{ flex: 1 }}>
          <CardItem header>
            <Text>Answer</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{currentCard.answer}</Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>
              {quizCards.filter(card => !card.hasOwnProperty("correct"))
                .length - 1}{" "}
              cards left
            </Text>
          </CardItem>
        </Card>
      )}
    </Row>
  );
};

const mapStateToProps = state => {
  return {
    cards: state.decks.filter(deck => deck.id == state.selected)[0]["cards"]
  };
};

export default connect(mapStateToProps)(Quiz);
