export const compareVersions = (a: string, b: string): -1 | 0 | 1 => {
  if (a === b) {
    return 0
  }
  const [partA, ...restA] = a.split('.').map(Number)
  const [partB, ...restB] = b.split('.').map(Number)
  if (partA === partB) {
    return compareVersions(restA.join('.'), restB.join('.'))
  }
  if (partA > partB) {
    return 1
  }
  if (partA < partB) {
    return -1
  }
  return 0
}
