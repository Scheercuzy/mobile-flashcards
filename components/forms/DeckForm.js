import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Right,
  Button,
  Text,
  Form,
  Item,
  Label,
  Content,
  Input
} from "native-base";

import { addDeck, updateDeck } from "../store/actions/decks";

class AddDeck extends Component {
  constructor(props) {
    super(props);
    if ("edit" in this.getNavigationParams()) {
      this.state = {
        name: this.getNavigationParams().deck.name,
        edit: true,
        deck: this.getNavigationParams().deck
      };
    } else {
      this.state = {
        name: null,
        edit: false
      };
    }
  }

  getNavigationParams() {
    return this.props.navigation.state.params || {};
  }

  onSave = () => {
    !this.state.edit
      ? this.props.onSaveNew(this.state.name)
      : this.props.onSaveEdit(this.state.deck, this.state.name);
    this.props.navigation.navigate("Decks");
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Text>Cancel</Text>
            </Button>
          </Left>
          <Body>
            <Title>Add Deck</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.onSave}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel last>
              <Label>Deck Name</Label>
              <Input
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSaveNew: name => dispatch(addDeck(name)),
    onSaveEdit: (deck, name) => dispatch(updateDeck(deck, name))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AddDeck);
