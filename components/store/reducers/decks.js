import {
  ADD_DECK,
  DELETE_DECK,
  UPDATE_DECK,
  ADD_CARD,
  DELETE_CARDS
} from "../actions/actionTypes";
import { createAndCheckID5 } from "../../utils";

export default function decks(state = [], action) {
  switch (action.type) {
    case ADD_DECK:
      const id = createAndCheckID5(state);
      return [
        ...state,
        {
          id: id,
          name: action.name,
          cards: []
        }
      ];
    case DELETE_DECK:
      return Object.assign([], state).filter(deck => deck != action.deck);
    case UPDATE_DECK:
      const data = Object.assign([], state).filter(deck => deck != action.deck);
      return [
        ...data,
        {
          ...action.deck,
          name: action.name
        }
      ];
    case ADD_CARD:
      deckData = Object.assign([], state).filter(
        deck => deck.id == action.deckId
      )[0];
      const newId = createAndCheckID5(state.cards);
      return [
        ...state.filter(deck => deck.id != action.deckId),
        {
          ...deckData,
          cards: [
            ...deckData.cards,
            {
              question: action.question,
              answer: action.answer,
              id: newId
            }
          ]
        }
      ];
    case DELETE_CARDS:
      deckData = Object.assign([], state).filter(
        deck => deck.id == action.deckId
      )[0];
      return [
        ...state.filter(deck => deck.id != action.deckId),
        {
          ...deckData,
          cards: [
            ...deckData.cards.filter(card => !action.cardList.includes(card))
          ]
        }
      ];
    default:
      return state;
  }
}
