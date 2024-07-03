// ** Config Imports
import { LEVEL_TABLE } from 'src/configs/point'

export const getLevelProperties = (userExp: number) => {
  if (LEVEL_TABLE[0].expStart <= userExp && userExp < LEVEL_TABLE[0].expCap) {
    return LEVEL_TABLE[0]
  } else if (LEVEL_TABLE[1].expStart <= userExp && userExp < LEVEL_TABLE[1].expCap) {
    return LEVEL_TABLE[1]
  } else if (LEVEL_TABLE[2].expStart <= userExp && userExp < LEVEL_TABLE[2].expCap) {
    return LEVEL_TABLE[2]
  } else if (LEVEL_TABLE[3].expStart <= userExp && userExp < LEVEL_TABLE[3].expCap) {
    return LEVEL_TABLE[3]
  } else if (LEVEL_TABLE[4].expStart <= userExp && userExp < LEVEL_TABLE[4].expCap) {
    return LEVEL_TABLE[4]
  } else if (LEVEL_TABLE[5].expStart <= userExp && userExp < LEVEL_TABLE[5].expCap) {
    return LEVEL_TABLE[5]
  } else if (LEVEL_TABLE[6].expStart <= userExp && userExp < LEVEL_TABLE[6].expCap) {
    return LEVEL_TABLE[6]
  } else if (LEVEL_TABLE[7].expStart <= userExp && userExp < LEVEL_TABLE[7].expCap) {
    return LEVEL_TABLE[7]
  } else if (LEVEL_TABLE[8].expStart <= userExp) {
    return LEVEL_TABLE[8]
  }

  return LEVEL_TABLE[0]
}
