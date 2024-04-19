import {Slice} from '@reduxjs/toolkit'
import {RouteObject} from 'react-router-dom'
import {AzureGroup} from 'authentication/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Module<T extends Slice<any> = never> = {
  allowedAzureGroups?: AzureGroup[]
  HomeComponent?: () => JSX.Element
  routes: RouteObject[]
  reduxSlice?: T
  slug: ModuleSlug
}

export enum ModuleSlug {
  constructionWorkEditor = 'construction-work-editor',
  downloadQr = 'download-qr',
  home = 'home',
  releases = 'releases',
}
