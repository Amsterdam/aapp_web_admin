export type WithSearchString<T extends Record<string, unknown>> = T & {
  searchString: string
}

type GenericResponse = Record<string, unknown>

const SEPARATOR = '|'

/**
 * Generates a SEPARATOR separated search string from the input. Handles nested objects and arrays, ignores booleans.
 */
export const getSearchString = (input: unknown): string => {
  if (!input || input === true) {
    return ''
  }

  if (typeof input === 'object') {
    return Object.values(input).map(getSearchString).join(SEPARATOR)
  }

  return input.toString()
}

/**
 * Filters the input object based on the allow list. Returns the original if allow list is omitted.
 */
export const applyAllowList = <T extends GenericResponse>(
  input: T,
  allowList?: string[],
) => {
  if (!allowList) {
    return input
  }

  const filteredInput: GenericResponse = {}

  Object.entries(input).forEach(([key, value]) => {
    if (allowList.includes(key)) {
      filteredInput[key] = value
    }
  })

  return filteredInput as Partial<T>
}

/**
 * Adds a search string to the input object based on the allow list.
 */
export const addSearchString = <T extends GenericResponse>(
  input: T,
  allowList?: string[],
): WithSearchString<T> => ({
  ...input,
  searchString: getSearchString(applyAllowList(input, allowList)),
})

/**
 * Adds a search string to the input object based on the allow list.
 */
export const filterBySearchStringMatch = <T extends GenericResponse>(
  input: WithSearchString<T>[],
  query?: string,
) => {
  if (!query) {
    return input
  }

  return input.filter(({searchString}) =>
    searchString.split(SEPARATOR).includes(query),
  )
}
