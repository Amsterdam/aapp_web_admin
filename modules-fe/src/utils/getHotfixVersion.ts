import {compareVersions} from './compareVersions'
import {parseVersion} from './parseVersion'

export const getHotfixVersion = (
  version: string,
  existingVersions: string[] = [],
): string => {
  const versions = [...existingVersions].sort((a, b) => compareVersions(a, b))
  return versions.reduce((suggestedVersion, checkVersion) => {
    if (suggestedVersion === checkVersion) {
      return getNextPatchVersion(suggestedVersion)
    }
    return suggestedVersion
  }, version)
}

export const getNextPatchVersion = (version: string): string => {
  const {major, minor, patch} = parseVersion(version)

  return `${major}.${minor}.${patch + 1}`
}

export const getPreviousPatchVersion = (version: string): string => {
  const {major, minor, patch} = parseVersion(version)

  if (patch > 0) {
    return `${major}.${minor}.${patch - 1}`
  }
  return version
}
