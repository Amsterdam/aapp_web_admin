const countPropertyOccurrences = <T extends object>(
  list: T[],
  prop: string,
): number => {
  let count = 0
  list.forEach(value => {
    if (prop in value) {
      count += 1
    }
  })
  return count
}

export default countPropertyOccurrences
