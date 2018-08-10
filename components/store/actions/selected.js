import { SELECT_DECK, UNSELECT_DECK } from './actionTypes'

export function selectDeck(id) {
    return {
      type: SELECT_DECK,
      id
    };
  }
  
  export function unselectDeck() {
    return {
      type: UNSELECT_DECK,
    };
  }