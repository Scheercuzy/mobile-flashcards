import React, { Component } from "react";
import { Alert, View } from "react-native";
import { Container, Header, Left, Body, Right, Title } from "native-base";
import {
  Content,
  List,
  ListItem,
  Text,
  Button,
  Icon,
  CheckBox
} from "native-base";

export default class Decks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: ["Simon Mignolet", "Nathaniel Clyne", "Dejan Lovren"],
      select: false,
      selected: []
    };
  }

  onPressSelectButton = () => {
    this.setState(prevState => {
      return Object.assign(prevState, {
        select: true
      });
    });
  };

  onPressCancelButton = () => {
    this.setState(prevState => {
      return Object.assign(prevState, {
        select: false,
        selected: []
      });
    });
  };

  onPressItemSelected = deck => {
    this.setState(prevState => {
      if (prevState.selected.includes(deck)) {
        return Object.assign(prevState, {
          selected: prevState.selected.filter(deckName => deckName != deck)
        });
      } else {
        return Object.assign(prevState, {
          selected: [...prevState.selected, deck]
        });
      }
    });
  };

  trashSelected = () => {
    Alert.alert("Delete decks");
  };

  addDeck = () => {
    Alert.alert("Add deck");
  };

  render() {
    const { decks, select, selected } = this.state;
    return (
      <Container>
        <Header>
          {!select ? (
            <Left />
          ) : (
            <Left>
              <Button
                transparent
                onPress={selected.length != 0 ? this.trashSelected : null}
                disabled={selected.length == 0}
              >
                <Text>Delete</Text>
              </Button>
            </Left>
          )}
          <Body>
            <Title>Decks</Title>
          </Body>
          {!select ? (
            <Right>
              <Button transparent onPress={this.addDeck}>
                <Icon name="add" style={{ fontSize: 30 }} />
              </Button>
              <Button transparent onPress={this.onPressSelectButton}>
                <Icon name="ios-checkmark-circle-outline" style={{ fontSize: 30 }} />
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
                select={select}
                selected={selected}
                onSelect={this.onPressItemSelected}
              />
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const DeckListItem = ({ deck, select, selected, onSelect }) => (
  <View>
    {!select ? (
      <ListItem>
        <Left>
          <Text>{deck}</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" style={{ fontSize: 15 }} />
        </Right>
      </ListItem>
    ) : (
      <ListItem
        onPress={e => onSelect(deck)}
        selected={selected.includes(deck)}
      >
        <CheckBox checked={selected.includes(deck)} />
        <Body>
          <Text>{deck}</Text>
        </Body>
      </ListItem>
    )}
  </View>
);
