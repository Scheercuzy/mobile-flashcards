import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Text,
  Button,
  Icon,
  Content,
  Card,
  CardItem
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

class DeckInfo extends Component {
  static navigationOptions = {
    tabBarVisible: true
  };

  onPressBack = () => {
    this.props.navigation.navigate("Decks");
  };

  render() {
    const { deck } = this.props;
    var deckCreatedDate = new Date(deck.dateCreated);
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.onPressBack}>
              <Icon name="ios-arrow-back" />
              <Text>Decks</Text>
            </Button>
          </Left>
          <Body>
            <Title>{deck.name}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Quiz")}
              disabled={deck.cards.length == 0}
            >
              <Text>Start Quiz</Text>
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Card>
            <CardItem bordered>
              <Text>Date Created</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{deckCreatedDate.toLocaleDateString()}</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Text>Number of Cards</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{deck.cards.length}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    selected: state.selected,
    deck: state.decks.filter(deck => deck.id == state.selected)[0]
  };
};

export default connect(mapStateToProps)(DeckInfo);
