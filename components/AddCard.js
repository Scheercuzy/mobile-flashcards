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

import { addCard } from "./store/actions/decks";

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      answer: null
    };
  }

  onSave = () => {
    const { selected } = this.props
    const { question, answer } = this.state
    this.props.onSave(selected, question, answer);
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
    onSave: (deck, question, answer) => dispatch(addCard(deck, question, answer))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);
