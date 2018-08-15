import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Decks from "./Decks";
import DeckForm from "./forms/DeckForm";
import DeckInfo from "./DeckInfo";
import Cards from "./Cards";
import CardForm from "./forms/CardForm";
import Quiz from "./Quiz";

const CardStackNav = createStackNavigator(
  {
    Cards: Cards,
    CardForm: CardForm
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

const TabNav = createBottomTabNavigator({
  DeckInfo: {
    screen: DeckInfo,
    navigationOptions: {
      tabBarLabel: "Deck",
      tabBarIcon: ({ focused, tintColor }) => (
        <Ionicons
          name="ios-information-circle"
          color={tintColor}
          style={{ fontSize: 30 }}
        />
      )
    }
  },
  Cards: {
    screen: CardStackNav,
    navigationOptions: {
      tabBarLabel: "Cards",
      tabBarIcon: ({ focused, tintColor }) => (
        <MaterialCommunityIcons
          name="cards"
          color={tintColor}
          style={{ fontSize: 30 }}
        />
      )
    }
  }
});

const DeckInfoNav = createStackNavigator(
  {
    Home: TabNav,
    Quiz: Quiz
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

export default (AppNav = createStackNavigator(
  {
    Decks: Decks,
    DeckForm: DeckForm,
    DeckInfo: DeckInfoNav
  },
  {
    navigationOptions: {
      header: null
    }
  }
));
