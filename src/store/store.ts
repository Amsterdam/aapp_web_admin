/* eslint-disable @typescript-eslint/ban-ts-comment */
import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import modules from 'modules'
import {baseApi} from 'services/baseApi'

const reducers = modules
  .filter(module => !!module.reduxSlice)
  .reduce(
    (acc, module) => ({
      ...acc,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      [module.reduxSlice!.name]: module.reduxSlice!.reducer,
    }),
    {},
  )

export const store = configureStore({
  reducer: combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    ...reducers,
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

type Modules = typeof modules

type SliceStates = {
  // @ts-ignore
  [P in keyof Modules as Exclude<
    // @ts-ignore
    Modules[P]['reduxSlice'],
    never | undefined
  >['name']]: ReturnType<
    // @ts-ignore
    Exclude<Modules[P]['reduxSlice'], never | undefined>['getInitialState']
  >
}

export type RootState = {
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>
} & SliceStates

export type AppDispatch = typeof store.dispatch
