import {AzureGroup} from 'authentication/types'

export const allowedAzureGroups = [AzureGroup.admin]

type OpenAPIUrl = {
  url: string
  name: string
  slug: string
}

export const defaultSlug = 'modules'

export const openAPIUrls: OpenAPIUrl[] = [
  {
    url: '/bridge/api/v1/openapi/',
    name: 'Bridge',
    slug: 'bridge',
  },
  {
    url: '/city-pass/api/v1/openapi/',
    name: 'City Pass',
    slug: 'city-pass',
  },
  {
    url: '/construction-work/api/v1/openapi/',
    name: 'Construction Work',
    slug: 'construction-work',
  },
  {
    url: '/contact/api/v1/openapi/',
    name: 'Contact',
    slug: 'contact',
  },
  {
    url: '/image/api/v1/openapi/',
    name: 'Image',
    slug: 'image',
  },
  {
    url: '/modules/api/v1/openapi/',
    name: 'Modules',
    slug: 'modules',
  },
  {
    url: '/notification/api/v1/openapi/',
    name: 'Notification',
    slug: 'notification',
  },
]
