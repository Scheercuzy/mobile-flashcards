import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Decks from './components/Decks'
import AddDeck from './components/AddDeck'

export default class App extends React.Component {
  render() {
    return (
      <StackNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const StackNavigator = createStackNavigator({
  Decks: Decks,
  AddDeck: AddDeck
  },
  {
    navigationOptions: {
      header: null
    }
  }
);
