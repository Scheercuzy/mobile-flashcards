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
  Icon,
  CheckBox
} from "native-base";

import { deleteCards } from "./store/actions/decks";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_mode: false,
      selectedCards: []
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

  navigateToCard = card => {
    alert(`card selected ${card.question}`);
    // NOTE Add navigation for Cards
  };

  onSelectedCard = card => {
    this.state.selectedCards.includes(card)
      ? this.setState(prevState => {
          return Object.assign(prevState, {
            selectedCards: prevState.selectedCards.filter(item => card != item)
          });
        })
      : this.setState(prevState => {
          return Object.assign(prevState, {
            selectedCards: prevState.selectedCards.concat(card)
          });
        });
  };

  onPressDelete = () => {
    const { selectedCards } = this.state;
    const { selected } = this.props;
    Alert.alert(
      "Delete Cards?",
      `Are you sure you want to remove these cards?`,
      [
        { text: "NO", style: "cancel" },
        {
          text: "YES",
          onPress: () => this.props.onDeleteCards(selected, selectedCards)
        }
      ]
    );
  };

  render() {
    const { edit_mode, selectedCards } = this.state;
    const { cards } = this.props;
    return (
      <Container>
        <Header>
          {!edit_mode ? (
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("AddCard")}
              >
                <Icon name="add" style={{ fontSize: 35 }} />
              </Button>
            </Left>
          ) : (
            <Left>
              <Button transparent onPress={this.onPressDelete} disabled={selectedCards.length == 0}>
                <Text>Delete</Text>
              </Button>
            </Left>
          )}
          <Body>
            <Title> Cards </Title>
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
          {cards &&
            cards.map(card => (
              <SelectableListItem
                item={card}
                edit_mode={edit_mode}
                key={card.question}
                navigateTo={this.navigateToCard}
                itemSelected={this.onSelectedCard}
                selected={selectedCards.includes(card)}
              />
            ))}
        </Content>
      </Container>
    );
  }
}

const SelectableListItem = ({
  item,
  edit_mode,
  navigateTo,
  itemSelected,
  selected
}) =>
  !edit_mode ? (
    <ListItem onPress={() => navigateTo(item)}>
      <Left>
        <Text>{item.question}</Text>
      </Left>
      <Right>
        <Icon name="ios-arrow-forward" style={{ fontSize: 20 }} />
      </Right>
    </ListItem>
  ) : (
    <ListItem onPress={() => itemSelected(item)}>
      <CheckBox checked={selected} />
      <Body>
        <Text>{item.question}</Text>
      </Body>
    </ListItem>
  );

const mapStateToProps = state => {
  return {
    selected: state.selected,
    deck: state.decks[state.selected],
    cards: state.decks[state.selected]["cards"]
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onDeleteCards: (deck, cardList) => dispatch(deleteCards(deck, cardList))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards);
