import React, { Component } from "react";
import { Alert, View } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  List,
  ListItem,
  Text,
  Button,
  Icon
} from "native-base";

export default class Decks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: ["Deck 1", "Deck 2", "Deck 3"],
      edit_mode: false
    };
  }

  onPressEditButton = () => {
    this.setState(prevState => {
      return Object.assign(prevState, {
        edit_mode: true
      });
    });
  };

  onPressCancelButton = () => {
    this.setState(prevState => {
      return Object.assign(prevState, {
        edit_mode: false
      });
    });
  };

  removeDeck = deck => {
    Alert.alert(`Are you sure you want to remove ${deck}`);
  };

  addDeck = () => {
    Alert.alert("Add deck");
  };

  render() {
    const { decks, edit_mode } = this.state;
    return (
      <Container>
        <Header>
          {!edit_mode ? (
            <Left>
              <Button transparent onPress={this.addDeck}>
                <Icon name="add" style={{ fontSize: 35 }} />
              </Button>
            </Left>
          ) : (
            <Left />
          )}
          <Body>
            <Title>Decks</Title>
          </Body>
          {!edit_mode ? (
            <Right>
              <Button transparent onPress={this.onPressEditButton}>
                <Text>Edit</Text>
              </Button>
            </Right>
          ) : (
            <Right>
              <Button transparent onPress={this.onPressCancelButton}>
                <Text>Cancel</Text>
              </Button>
            </Right>
          )}
        </Header>
        <Content>
          <List>
            {decks.map(deck => (
              <DeckListItem
                deck={deck}
                key={deck}
                edit_mode={edit_mode}
                removeDeck={this.removeDeck}
              />
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const DeckListItem = ({ deck, edit_mode, removeDeck }) => (
    !edit_mode ? (
      <ListItem>
        <Left>
          <Text>{deck}</Text>
        </Left>
        <Right>
          <Icon name="ios-arrow-forward" style={{fontSize: 20}}/>
        </Right>
      </ListItem>
    ) : (
      <ListItem>
        <Left>
          <Icon
            name="ios-remove-circle"
            style={{ color: "red" }}
            onPress={() => removeDeck(deck)}
          />
          <Text>{deck}</Text>
        </Left>
        <Right />
      </ListItem>
    )
);
