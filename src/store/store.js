import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userSlice from './slices/userSlice'

// Combine reducers
const rootReducer = combineReducers({
  user: userSlice,
})

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create store using configureStore
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for redux-persist
    }),
})

// Create persistor
export const persister = persistStore(store)
