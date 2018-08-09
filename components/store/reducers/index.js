import { combineReducers } from 'redux'

import decks from './decks'
import selected from './selected'


export default combineReducers({decks, selected})