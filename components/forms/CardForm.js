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

import { addCard, updateCard } from "../store/actions/decks";

class CardForm extends Component {
  constructor(props) {
    super(props);
    if ("edit" in this.getNavigationParams()) {
      this.state = {
        question: this.getNavigationParams().card.question,
        answer: this.getNavigationParams().card.answer,
        edit: true,
        card: this.getNavigationParams().card
      };
    } else {
      this.state = {
        question: null,
        answer: null,
        edit: false
      };
    }
  }

  getNavigationParams() {
    return this.props.navigation.state.params || {};
  }

  onSave = () => {
    const { selected } = this.props;
    const { question, answer, card } = this.state;
    !this.state.edit
      ? this.props.onSaveNew(selected, question, answer)
      : this.props.onSaveEdit(selected, card, question, answer);
    this.props.navigation.navigate("Cards");
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
            <Title>Add Card</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.onSave}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Question</Label>
              <Input
                onChangeText={question => this.setState({ question })}
                value={this.state.question}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Answer</Label>
              <Input
                onChangeText={answer => this.setState({ answer })}
                value={this.state.answer}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    selected: state.selected
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onSaveNew: (selected, question, answer) =>
      dispatch(addCard(selected, question, answer)),
    onSaveEdit: (selected, card, question, answer) =>
      dispatch(updateCard(selected, card, question, answer))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardForm);
