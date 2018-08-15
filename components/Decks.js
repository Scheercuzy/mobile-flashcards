import React, { Component } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
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

import { deleteDeck } from "./store/actions/decks";
import { selectDeck } from "./store/actions/selected";

class Decks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_mode: false
    };
  }

  onPressHeaderEditButton = () => {
    this.setState(prevState => {
      return Object.assign(prevState, {
        edit_mode: true
      });
    });
  };

  onPressHeaderCancelButton = () => {
    this.setState(prevState => {
      return Object.assign(prevState, {
        edit_mode: false
      });
    });
  };

  deleteDeck = deck => {
    Alert.alert("Delete Deck?", `Are you sure you want to remove ${deck.name}`, [
      { text: "NO", style: "cancel" },
      { text: "YES", onPress: () => this.props.deleteDeck(deck) }
    ]);
  };

  editDeck = deck => {
    this.props.navigation.navigate("DeckForm", {edit: true, deck: deck})
  }

  navigateToDeck = deck => {
    this.props.selectDeck(deck.id);
    this.props.navigation.navigate("DeckInfo");
  };

  render() {
    const { edit_mode } = this.state;
    const { decks } = this.props;
    return (
      <Container>
        <Header>
          {!edit_mode ? (
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("DeckForm")}
              >
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
              <Button transparent onPress={this.onPressHeaderEditButton}>
                <Text>Edit</Text>
              </Button>
            </Right>
          ) : (
            <Right>
              <Button transparent onPress={this.onPressHeaderCancelButton}>
                <Text>Cancel</Text>
              </Button>
            </Right>
          )}
        </Header>
        <Content>
          <List>
            {decks &&
              decks.map(deck => (
                <RemovableListItem
                  item={deck}
                  key={deck.id}
                  edit_mode={edit_mode}
                  deleteItem={this.deleteDeck}
                  editItem={this.editDeck}
                  navigateTo={this.navigateToDeck}
                />
              ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const RemovableListItem = ({ item, edit_mode, deleteItem, editItem, navigateTo }) =>
  !edit_mode ? (
    <ListItem onPress={() => navigateTo(item)} style={{ height: 100 }}>
      <Left>
        <Text>{item.name}</Text>
        <Text style={{ color: 'grey'}}> ({item.cards.length} Cards)</Text>
      </Left>
      <Right>
        <Icon name="ios-arrow-forward" style={{ fontSize: 20 }} />
      </Right>
    </ListItem>
  ) : (
    <ListItem style={{ height: 100 }}>
      <Left>
        <Icon
          name="ios-remove-circle"
          style={{ color: "red" , fontSize: 20}}
          onPress={() => deleteItem(item)}
        />
        <Text>{item.name}</Text>
      </Left>
      <Right>
        <Button transparent onPress={() => editItem(item)}>
          <Text>Edit</Text>
        </Button>
      </Right>
    </ListItem>
  );

const mapStateToProps = state => {
  return {
    decks: state.decks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteDeck: deck => dispatch(deleteDeck(deck)),
    selectDeck: id => dispatch(selectDeck(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decks);
