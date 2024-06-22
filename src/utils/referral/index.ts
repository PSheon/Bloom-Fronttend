export const getLevelProperties = (userExp: number) => {
  const LEVEL_TABLE = [
    {
      level: 1,
      title: 'Digital Star ⭐',
      expCap: 300,
      privileges: [
        {
          title: 'APY Boost',
          value: '+ 0%'
        }
      ]
    },
    {
      level: 2,
      title: 'Digital Star ⭐⭐',
      expCap: 750,
      privileges: [
        {
          title: 'APY Boost',
          value: '+ 0.3%'
        }
      ]
    },
    {
      level: 3,
      title: 'Decentralized Elite ⭐',
      expCap: 1_250,
      privileges: [
        {
          title: 'APY Boost',
          value: '+ 0.8%'
        }
      ]
    },
    {
      level: 4,
      title: 'Decentralized Elite ⭐⭐',
      expCap: 1_800,
      privileges: [
        {
          title: 'APY Boost',
          value: '+ 1.25%'
        }
      ]
    },
    {
      level: 5,
      title: 'Decentralized Elite ⭐⭐⭐',
      expCap: 2_500,
      privileges: [
        {
          title: 'APY Boost',
          value: '+ 1.5%'
        }
      ]
    },
    {
      level: 6,
      title: 'Crypto Navigator ⭐',
      expCap: 3_500,
      privileges: [
        {
          title: 'APY Boost',
          value: '+ 2%'
        }
      ]
    },
    {
      level: 7,
      title: 'Crypto Navigator ⭐⭐',
      expCap: 3_500,
      privileges: [
        {
          title: 'APY Boost',
          value: '+ 2.2%'
        }
      ]
    },
    {
      level: 8,
      title: 'Crypto Navigator ⭐⭐⭐',
      expCap: 5_000,
      privileges: [
        {
          title: 'APY Boost',
          value: '+ 2.8%'
        }
      ]
    },
    {
      level: 9,
      title: 'Blockchain Titans',
      expCap: 8_000,
      privileges: [
        {
          title: 'APY Boost',
          value: '+ 5%'
        }
      ]
    }
  ]

  if (0 <= userExp && userExp < LEVEL_TABLE[0].expCap) {
    return LEVEL_TABLE[0]
  } else if (LEVEL_TABLE[0].expCap <= userExp && userExp < LEVEL_TABLE[1].expCap) {
    return LEVEL_TABLE[1]
  } else if (LEVEL_TABLE[1].expCap <= userExp && userExp < LEVEL_TABLE[2].expCap) {
    return LEVEL_TABLE[2]
  } else if (LEVEL_TABLE[2].expCap <= userExp && userExp < LEVEL_TABLE[3].expCap) {
    return LEVEL_TABLE[3]
  } else if (LEVEL_TABLE[3].expCap <= userExp && userExp < LEVEL_TABLE[4].expCap) {
    return LEVEL_TABLE[4]
  } else if (LEVEL_TABLE[4].expCap <= userExp && userExp < LEVEL_TABLE[5].expCap) {
    return LEVEL_TABLE[5]
  } else if (LEVEL_TABLE[5].expCap <= userExp && userExp < LEVEL_TABLE[6].expCap) {
    return LEVEL_TABLE[6]
  } else if (LEVEL_TABLE[6].expCap <= userExp && userExp < LEVEL_TABLE[7].expCap) {
    return LEVEL_TABLE[7]
  } else {
    return LEVEL_TABLE[8]
  }
}
