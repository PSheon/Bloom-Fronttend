// ** Config Imports
import { LEVEL_TABLE } from 'src/configs/point'

// ** Type Imports
import type { LevelType } from 'src/configs/point'

/* TODO: Update get level logic later */
export const getLevelProperties = (userExp: number): LevelType => {
  if (LEVEL_TABLE[0].expDisplayMin <= userExp && userExp < LEVEL_TABLE[0].expDisplayMax) {
    return LEVEL_TABLE[0]
  } else if (LEVEL_TABLE[1].expDisplayMin <= userExp && userExp < LEVEL_TABLE[1].expDisplayMax) {
    return LEVEL_TABLE[1]
  } else if (LEVEL_TABLE[2].expDisplayMin <= userExp && userExp < LEVEL_TABLE[2].expDisplayMax) {
    return LEVEL_TABLE[2]
  } else if (LEVEL_TABLE[3].expDisplayMin <= userExp && userExp < LEVEL_TABLE[3].expDisplayMax) {
    return LEVEL_TABLE[3]
  } else if (LEVEL_TABLE[4].expDisplayMin <= userExp && userExp < LEVEL_TABLE[4].expDisplayMax) {
    return LEVEL_TABLE[4]
  } else if (LEVEL_TABLE[5].expDisplayMin <= userExp && userExp < LEVEL_TABLE[5].expDisplayMax) {
    return LEVEL_TABLE[5]
  } else if (LEVEL_TABLE[6].expDisplayMin <= userExp && userExp < LEVEL_TABLE[6].expDisplayMax) {
    return LEVEL_TABLE[6]
  } else if (LEVEL_TABLE[7].expDisplayMin <= userExp && userExp < LEVEL_TABLE[7].expDisplayMax) {
    return LEVEL_TABLE[7]
  } else if (LEVEL_TABLE[8].expDisplayMin <= userExp) {
    return LEVEL_TABLE[8]
  }

  return LEVEL_TABLE[0]
}
