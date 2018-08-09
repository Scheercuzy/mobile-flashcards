import React from "react";
import { StyleSheet } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux'
import { AppLoading } from 'expo';

import { store, persistor } from "./components/store";
import AppNav from './components/Navigation'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <AppNav />
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
