import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import Decks from "./Decks";
import AddDeck from "./AddDeck";
import DeckInfo from "./DeckInfo";
import Cards from "./Cards";
import AddCard from "./AddCard";

const CardStackNav = createStackNavigator(
  {
    Cards: Cards,
    AddCard: AddCard
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
      tabBarLabel: "Deck Info",
      tabBarIcon: ({ focused, tintColor }) => (
        <Ionicons name="ios-alert" color={tintColor} style={{ fontSize: 30 }} />
      )
    }
  },
  Cards: {
    screen: CardStackNav,
    navigationOptions: {
      tabBarLabel: "Cards",
      tabBarIcon: ({ focused, tintColor }) => (
        <Ionicons
          name="ios-albums"
          color={tintColor}
          style={{ fontSize: 30 }}
        />
      )
    }
  }
});

export default (AppNav = createStackNavigator(
  {
    Decks: Decks,
    AddDeck: AddDeck,
    TabNav: TabNav
  },
  {
    navigationOptions: {
      header: null
    }
  }
));
