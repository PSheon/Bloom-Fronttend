// ** Config Imports
import { LEVEL_TABLE } from 'src/configs/point'

// ** Type Imports
import type { LevelType } from 'src/configs/point'

export const getLevelProperties = (userLevel: number = 1): LevelType => {
  if (LEVEL_TABLE[0].level === userLevel) {
    return LEVEL_TABLE[0]
  } else if (LEVEL_TABLE[1].level === userLevel) {
    return LEVEL_TABLE[1]
  } else if (LEVEL_TABLE[2].level === userLevel) {
    return LEVEL_TABLE[2]
  } else if (LEVEL_TABLE[3].level === userLevel) {
    return LEVEL_TABLE[3]
  } else if (LEVEL_TABLE[4].level === userLevel) {
    return LEVEL_TABLE[4]
  } else if (LEVEL_TABLE[5].level === userLevel) {
    return LEVEL_TABLE[5]
  } else if (LEVEL_TABLE[6].level === userLevel) {
    return LEVEL_TABLE[6]
  } else if (LEVEL_TABLE[7].level === userLevel) {
    return LEVEL_TABLE[7]
  } else if (LEVEL_TABLE[8].level === userLevel) {
    return LEVEL_TABLE[8]
  }

  return LEVEL_TABLE[0]
}
