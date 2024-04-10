import {Slice} from '@reduxjs/toolkit'
import {RouteObject} from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Module<T extends Slice<any> = never> = {
  routes: RouteObject[]
  reduxSlice?: T
}

export type RequiredId<T> = T & {id: number}
