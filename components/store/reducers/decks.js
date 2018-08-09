import {
  ADD_DECK,
  DELETE_DECK,
  UPDATE_DECK,
  ADD_CARD,
  DELETE_CARDS
} from "../actions/actionTypes";

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.name]: {
          cards: []
        }
      };
    case DELETE_DECK:
      decksData = Object.assign(state);
      delete decksData[action.name];
      return { ...decksData };
    case UPDATE_DECK: // NOTE Add option to rename/edit deck
      return state;
    case ADD_CARD:
      return {
        ...state,
        [action.deck]: {
          ...state[action.deck],
          cards: [
            ...state[action.deck].cards,
            { question: action.question, answer: action.answer }
          ]
        }
      };
    case DELETE_CARDS:
      return {
        ...state,
        [action.deck]: {
          ...state[action.deck],
          cards: [
            ...state[action.deck].cards.filter(card => !action.cardList.includes(card))
          ]
        }
      };
    default:
      return state;
  }
}
