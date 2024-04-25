import {Slice} from '@reduxjs/toolkit'
import {FC} from 'react'
import {RouteObject} from 'react-router-dom'
import {AzureGroup} from 'authentication/types'

export enum ModuleType {
  contentManagement = 'contentManagement',
  home = 'home',
  other = 'other',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Module<T extends Slice<any> = never> = {
  allowedAzureGroups: AzureGroup[]
  HomeComponent?: FC
  routes: RouteObject[]
  reduxSlice?: T
  slug: ModuleSlug
  title: string
  /**
   * Type of module
   * - contentManagement: module is used for content management
   * - other: module is used for other purposes
   * */
  type: ModuleType
}

export enum ModuleSlug {
  constructionWorkEditor = 'construction-work-editor',
  downloadQr = 'download-qr',
  home = 'home',
  releases = 'releases',
}
