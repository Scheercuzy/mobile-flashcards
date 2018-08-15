import {
  ADD_DECK,
  DELETE_DECK,
  UPDATE_DECK,
  ADD_CARD,
  DELETE_CARDS,
  UPDATE_CARD
} from "./actionTypes";

export function addDeck(name) {
  return {
    type: ADD_DECK,
    name
  };
}

export function deleteDeck(deck) {
  return {
    type: DELETE_DECK,
    deck
  };
}

export function updateDeck(deck, name) {
  return {
    type: UPDATE_DECK,
    deck,
    name
  };
}

export function addCard(deckId, question, answer) {
  return {
    type: ADD_CARD,
    deckId,
    question,
    answer
  };
}

export function deleteCards(deckId, cardList) {
  return {
    type: DELETE_CARDS,
    deckId,
    cardList
  };
}

export function updateCard(deckId, card, question, answer) {
  return {
    type: UPDATE_CARD,
    deckId,
    card,
    question,
    answer
  };
}
