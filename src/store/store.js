import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userSlice from './slices/userSlice'
import projectSlice from './slices/client/projectSlice'
import allProjectSlice from './slices/projects/allProjectSlice'
import freelancerSlice from "./slices/freelancer/allFreelancers"
import singleProjectSlice from "./slices/projects/singleProjectSlice"
import proposalSlice from "./slices/propsoal/proposalSlice"
import myProposals from "./slices/propsoal/freelancer/myProposalSlice"

// Combine reducers
const rootReducer = combineReducers({
  user: userSlice,
  clientProjects: projectSlice,
  allProjects: allProjectSlice,
  singleProject: singleProjectSlice,
  allFreelancers: freelancerSlice,
  createProposal: proposalSlice,
  freelancerProposals: myProposals,
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
