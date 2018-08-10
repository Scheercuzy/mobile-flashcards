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
  Content
} from "native-base";

import { unselectDeck } from "./store/actions/selected";

class DeckInfo extends Component {
  static navigationOptions = {
    tabBarVisible: true
  };

  onPressBack = () => {
    this.props.navigation.navigate("Decks");
    this.props.unselectDeck();
  };

  render() {
    const { deck } = this.props
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
          <Right />
        </Header>
        <Content />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    selected: state.selected,
    deck: state.decks.filter(deck => deck.id == state.selected)[0] || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    unselectDeck: () => dispatch(unselectDeck())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckInfo);
