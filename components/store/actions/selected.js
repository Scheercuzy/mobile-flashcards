import { SELECT_DECK, UNSELECT_DECK } from './actionTypes'

export function selectDeck(name) {
    return {
      type: SELECT_DECK,
      name
    };
  }
  
  export function unselectDeck() {
    return {
      type: UNSELECT_DECK,
    };
  }