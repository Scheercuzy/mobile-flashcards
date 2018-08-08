import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from "./reducers";

const persistConfig = {
    key: 'test',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, reducers)


export let store = createStore(persistedReducer)
export let persistor = persistStore(store)


// export const store = createStore(reducers)