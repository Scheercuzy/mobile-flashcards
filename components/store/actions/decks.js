import {
  ADD_DECK,
  DELETE_DECK,
  UPDATE_DECK,
  ADD_CARD,
  DELETE_CARDS
} from "./actionTypes";

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

export function addCard(deck, question, answer) {
  return {
    type: ADD_CARD,
    deck,
    question,
    answer
  };
}

export function deleteCards(deck, cardList) {
  return {
    type: DELETE_CARDS,
    deck,
    cardList
  };
}
