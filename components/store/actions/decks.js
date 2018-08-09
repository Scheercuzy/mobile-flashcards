import { ADD_DECK, DELETE_DECK, UPDATE_DECK } from "./actionTypes";

export function addDeck(name) {
  return {
    type: ADD_DECK,
    name
  };
}

export function deleteDeck(name) {
  return {
    type: DELETE_DECK,
    name
  };
}

export function updateDeck(old_name, name) {
  return {
    type: UPDATE_DECK,
    old_name,
    name
  };
}

