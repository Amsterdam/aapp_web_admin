import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {modulesApi} from 'modules/releases/services/modules'
import {releaseSlice} from 'modules/releases/slices/release.slice'

const rootReducer = combineReducers({
  [modulesApi.reducerPath]: modulesApi.reducer,
  release: releaseSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(modulesApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
