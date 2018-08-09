import React, { Component } from "react";
import { Alert } from "react-native";
import { connect } from 'react-redux'
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

  deleteDeck = deck => {
    Alert.alert(
      'Delete Deck?',
      `Are you sure you want to remove ${deck}`,
      [
        {text: 'NO', style: 'cancel'},
        {text: 'YES', onPress: () => this.props.deleteDeck(deck)},
      ]
    );
  };

  navigateToDeck = deck => {
    this.props.selectDeck(deck)
    this.props.navigation.navigate('TabNav')
  }

  render() {
    const { edit_mode } = this.state;
    const { decks } = this.props
    return (
      <Container>
        <Header>
          {!edit_mode ? (
            <Left>
              <Button transparent onPress={() => this.props.navigation.navigate('AddDeck')}>
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
            {decks && Object.keys(decks).map(deck => (
              <RemovableListItem
                item={deck}
                key={deck}
                edit_mode={edit_mode}
                deleteItem={this.deleteDeck}
                navigateTo={this.navigateToDeck}
              />
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const RemovableListItem = ({ item, edit_mode, deleteItem, navigateTo }) => (
    !edit_mode ? (
      <ListItem onPress={() => navigateTo(item)}>
        <Left>
          <Text>{item}</Text>
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
            onPress={() => deleteItem(item)}
          />
          <Text>{item}</Text>
        </Left>
        <Right />
      </ListItem>
    )
);

const mapStateToProps = (state) => {
  return {
    decks: state.decks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteDeck : name => dispatch(deleteDeck(name)),
    selectDeck : name => dispatch(selectDeck(name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)