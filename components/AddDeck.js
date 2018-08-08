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

import { addDeck } from "./store/actions/deck";

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null
    };
  }

  onSave = () => {
    this.props.onSave(this.state.name);
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
    onSave: name => dispatch(addDeck({name}))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AddDeck);
