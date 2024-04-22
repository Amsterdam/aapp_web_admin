type GenericResponse = Record<string, unknown>

export type WithSearchString<T extends GenericResponse> = T & {
  searchString: string
}

const SEPARATOR = '|'

/**
 * Generates a SEPARATOR separated search string from the input. Handles nested objects and arrays, ignores booleans.
 */
export const getSearchString = (input: unknown): string => {
  if (!input || input === true) {
    return ''
  }

  if (typeof input === 'object') {
    return Object.values(input)
      .map(getSearchString)
      .join(SEPARATOR)
      .toLowerCase()
  }

  return input.toString().toLowerCase()
}

/**
 * Filters the input object based on the allow list. Returns the original if allow list is omitted.
 */
export const applyAllowList = <T extends GenericResponse>(
  input: T,
  allowList?: (keyof T)[],
) => {
  if (!allowList?.length) {
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
  input: T[] = [],
  allowList: (keyof T)[] = [],
): WithSearchString<T>[] =>
  input.map(item => ({
    ...item,
    searchString: getSearchString(applyAllowList(item, allowList)),
  }))

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
    searchString
      .split(SEPARATOR)
      .some(item => item.includes(query.toLowerCase())),
  )
}
