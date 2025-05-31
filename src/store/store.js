import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userSlice from './slices/userSlice'
import projectSlice from './slices/client/projectSlice'
import allProjectSlice from './slices/projects/allProjectSlice'
import freelancerSlice from "./slices/freelancer/allFreelancers"

// Combine reducers
const rootReducer = combineReducers({
  user: userSlice,
  clientProjects: projectSlice,
  allProjects: allProjectSlice,
  allFreelancers: freelancerSlice
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
