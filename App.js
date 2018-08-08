import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux'
import { AppLoading } from 'expo';

import { store, persistor } from "./components/store";
import Decks from "./components/Decks";
import AddDeck from "./components/AddDeck";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <StackNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const StackNavigator = createStackNavigator(
  {
    Decks: Decks,
    AddDeck: AddDeck
  },
  {
    navigationOptions: {
      header: null
    }
  }
);
