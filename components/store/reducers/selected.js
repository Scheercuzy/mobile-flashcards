import { SELECT_DECK, UNSELECT_DECK } from "../actions/actionTypes";

export default function selected(state = {}, action) {
    switch (action.type) {
      case SELECT_DECK:
        return action.id
      case UNSELECT_DECK:
        return null
      default:
        return state;
    }
  }