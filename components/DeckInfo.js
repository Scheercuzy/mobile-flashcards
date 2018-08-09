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
            <Title>{this.props.selected}</Title>
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
    decks: state.decks
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
