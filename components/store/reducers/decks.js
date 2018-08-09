import { ADD_DECK, DELETE_DECK, UPDATE_DECK } from "../actions/actionTypes";

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
    case UPDATE_DECK:
      return state;
    default:
      return state;
  }
}
