// ** Type Imports
import type { ThemeColor } from 'src/@core/layouts/types'

export type PrivilegeType = {
  color: ThemeColor
  icon: string
  title: string
  displayValue: string
  value: number
}
export type UpgradeTaskType = {
  color: ThemeColor
  taskType: 'Exp' | 'Refer' | 'Staking' | 'Direct Referral Staking' | 'Team Staking'
  title: string
  description: string
  displayValue: string
  value: number
}
export type LevelType = {
  level: number
  title: string
  expDisplayMin: number
  expDisplayMax: number
  privileges: PrivilegeType[]
  upgradeTasks: UpgradeTaskType[]
}

export const LEVEL_TABLE: LevelType[] = [
  {
    level: 1,
    title: 'Digital Star ⭐',
    expDisplayMin: 0,
    expDisplayMax: 300,
    privileges: [
      {
        color: 'primary',
        icon: 'mdi:chevron-double-up',
        title: 'APY Boost',
        displayValue: '+ 0%',
        value: 0
      },
      {
        color: 'info',
        icon: 'mdi:numeric-1-box-outline',
        title: 'Direct Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'info',
        icon: 'mdi:numeric-2-box-outline',
        title: 'Second Generation Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'info',
        icon: 'mdi:numeric-3-box-outline',
        title: 'Third Generation Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'success',
        icon: 'mdi:account-group',
        title: 'Team Staking Share',
        displayValue: '0%',
        value: 0
      }
    ],
    upgradeTasks: [
      {
        color: 'primary',
        taskType: 'Exp',
        title: 'Gain 300 Exp',
        description: 'Complete the tasks to earn exp and reach 300 exp.',
        displayValue: '300',
        value: 300
      }
    ]
  },
  {
    level: 2,
    title: 'Digital Star ⭐⭐',
    expDisplayMin: 300,
    expDisplayMax: 750,
    privileges: [
      {
        color: 'primary',
        icon: 'mdi:chevron-double-up',
        title: 'APY Boost',
        displayValue: '+ 0.3%',
        value: 0.3
      },
      {
        color: 'info',
        icon: 'mdi:numeric-1-box-outline',
        title: 'Direct Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'info',
        icon: 'mdi:numeric-2-box-outline',
        title: 'Second Generation Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'info',
        icon: 'mdi:numeric-3-box-outline',
        title: 'Third Generation Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'success',
        icon: 'mdi:account-group',
        title: 'Team Staking Share',
        displayValue: '0%',
        value: 0
      }
    ],
    upgradeTasks: [
      {
        color: 'primary',
        taskType: 'Exp',
        title: 'Gain 750 Exp',
        description: 'Complete the tasks to earn exp and reach 750 exp.',
        displayValue: '750',
        value: 750
      }
    ]
  },
  {
    level: 3,
    title: 'Decentralized Elite ⭐',
    expDisplayMin: 750,
    expDisplayMax: 1_250,
    privileges: [
      { color: 'primary', icon: 'mdi:chevron-double-up', title: 'APY Boost', displayValue: '+ 0.6%', value: 0.6 },
      {
        color: 'info',
        icon: 'mdi:numeric-1-box-outline',
        title: 'Direct Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'info',
        icon: 'mdi:numeric-2-box-outline',
        title: 'Second Generation Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'info',
        icon: 'mdi:numeric-3-box-outline',
        title: 'Third Generation Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'success',
        icon: 'mdi:account-group',
        title: 'Team Staking Share',
        displayValue: '0%',
        value: 0
      }
    ],
    upgradeTasks: [
      {
        color: 'primary',
        taskType: 'Exp',
        title: 'Gain 1,250 Exp',
        displayValue: '1,250',
        value: 1_250,
        description: 'Complete the tasks to earn exp and reach 1,250 exp.'
      },
      {
        color: 'warning',
        taskType: 'Refer',
        title: 'Refer 1 Friend',
        displayValue: '1',
        value: 1,
        description: 'Refer 1 friend to join the referral program and you can gain 500 exp.'
      },
      {
        color: 'info',
        taskType: 'Staking',
        title: 'Staking $500 Value',
        displayValue: '500',
        value: 500,
        description: 'Staking $500 value in the any fund.'
      }
    ]
  },
  {
    level: 4,
    title: 'Decentralized Elite ⭐⭐',
    expDisplayMin: 1_250,
    expDisplayMax: 1_800,
    privileges: [
      {
        color: 'primary',
        icon: 'mdi:chevron-double-up',
        title: 'APY Boost',
        displayValue: '+ 0.9%',
        value: 0.9
      },
      {
        color: 'info',
        icon: 'mdi:numeric-1-box-outline',
        title: 'Direct Member Staking Share',
        displayValue: '5%',
        value: 5
      },
      {
        color: 'info',
        icon: 'mdi:numeric-2-box-outline',
        title: 'Second Generation Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'info',
        icon: 'mdi:numeric-3-box-outline',
        title: 'Third Generation Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'success',
        icon: 'mdi:account-group',
        title: 'Team Staking Share',
        displayValue: '0%',
        value: 0
      }
    ],
    upgradeTasks: [
      {
        color: 'primary',
        taskType: 'Exp',
        title: 'Gain 1,800 Exp',
        displayValue: '1,800',
        value: 1_800,
        description: 'Complete the tasks to earn exp and reach 1,800 exp.'
      },
      {
        color: 'warning',
        taskType: 'Refer',
        title: 'Refer 2 Friend',
        displayValue: '2',
        value: 2,
        description: 'Refer 2 friend to join the referral program and you can gain 500 exp.'
      },
      {
        color: 'info',
        taskType: 'Staking',
        title: 'Staking $1,000 Value',
        displayValue: '1,000',
        value: 1_000,
        description: 'Staking $1,000 value in the any fund.'
      },
      {
        color: 'info',
        taskType: 'Direct Referral Staking',
        title: 'Direct Referral Staking $1,500 Value',
        displayValue: '1,500',
        value: 1_500,
        description: 'Direct referral staking $1,500 value in the any fund.'
      }
    ]
  },
  {
    level: 5,
    title: 'Decentralized Elite ⭐⭐⭐',
    expDisplayMin: 1_800,
    expDisplayMax: 2_500,
    privileges: [
      {
        color: 'primary',
        icon: 'mdi:chevron-double-up',
        title: 'APY Boost',
        displayValue: '+ 1.25%',
        value: 1.25
      },
      {
        color: 'info',
        icon: 'mdi:numeric-1-box-outline',
        title: 'Direct Member Staking Share',
        displayValue: '10%',
        value: 10
      },
      {
        color: 'info',
        icon: 'mdi:numeric-2-box-outline',
        title: 'Second Generation Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'info',
        icon: 'mdi:numeric-3-box-outline',
        title: 'Third Generation Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'success',
        icon: 'mdi:account-group',
        title: 'Team Staking Share',
        displayValue: '0%',
        value: 0
      }
    ],
    upgradeTasks: [
      {
        color: 'primary',
        taskType: 'Exp',
        title: 'Gain 2,500 Exp',
        displayValue: '2,500',
        value: 2_500,
        description: 'Complete the tasks to earn exp and reach 2,500 exp.'
      },
      {
        color: 'warning',
        taskType: 'Refer',
        title: 'Refer 3 Friend',
        displayValue: '3',
        value: 3,
        description: 'Refer 3 friend to join the referral program and you can gain 500 exp.'
      },
      {
        color: 'info',
        taskType: 'Staking',
        title: 'Staking $1,500 Value',
        displayValue: '1,500',
        value: 1_500,
        description: 'Staking $1,500 value in the any fund.'
      },
      {
        color: 'info',
        taskType: 'Direct Referral Staking',
        title: 'Direct Referral Staking $3,000 Value',
        displayValue: '3,000',
        value: 3_000,
        description: 'Direct referral staking $3,000 value in the any fund.'
      },
      {
        color: 'info',
        taskType: 'Team Staking',
        title: 'Team Staking $30,000 Value',
        displayValue: '30,000',
        value: 30_000,
        description: 'Team staking $30,000 value in the any fund.'
      }
    ]
  },
  {
    level: 6,
    title: 'Crypto Navigator ⭐',
    expDisplayMin: 2_500,
    expDisplayMax: 3_500,
    privileges: [
      {
        color: 'primary',
        icon: 'mdi:chevron-double-up',
        title: 'APY Boost',
        displayValue: '+ 1.6%',
        value: 1.6
      },
      {
        color: 'info',
        icon: 'mdi:numeric-1-box-outline',
        title: 'Direct Member Staking Share',
        displayValue: '20%',
        value: 20
      },
      {
        color: 'info',
        icon: 'mdi:numeric-2-box-outline',
        title: 'Second Generation Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'info',
        icon: 'mdi:numeric-3-box-outline',
        title: 'Third Generation Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'success',
        icon: 'mdi:account-group',
        title: 'Team Staking Share',
        displayValue: '0%',
        value: 0
      }
    ],
    upgradeTasks: [
      {
        color: 'primary',
        taskType: 'Exp',
        title: 'Gain 3,500 Exp',
        displayValue: '3,500',
        value: 3_500,
        description: 'Complete the tasks to earn exp and reach 3,500 exp.'
      },
      {
        color: 'warning',
        taskType: 'Refer',
        title: 'Refer 5 Friend',
        displayValue: '5',
        value: 5,
        description: 'Refer 5 friend to join the referral program and you can gain 500 exp.'
      },
      {
        color: 'info',
        taskType: 'Staking',
        title: 'Staking $2,500 Value',
        displayValue: '2,500',
        value: 2_500,
        description: 'Staking $2,500 value in the any fund.'
      },
      {
        color: 'info',
        taskType: 'Direct Referral Staking',
        title: 'Direct Referral Staking $9,000 Value',
        displayValue: '9,000',
        value: 9_000,
        description: 'Direct referral staking $9,000 value in the any fund.'
      },
      {
        color: 'info',
        taskType: 'Team Staking',
        title: 'Team Staking $100,000 Value',
        displayValue: '100,000',
        value: 100_000,
        description: 'Team staking $100,000 value in the any fund.'
      }
    ]
  },
  {
    level: 7,
    title: 'Crypto Navigator ⭐⭐',
    expDisplayMin: 3_500,
    expDisplayMax: 5_000,
    privileges: [
      {
        color: 'primary',
        icon: 'mdi:chevron-double-up',
        title: 'APY Boost',
        displayValue: '+ 2.2%',
        value: 2.2
      },
      {
        color: 'info',
        icon: 'mdi:numeric-1-box-outline',
        title: 'Direct Member Staking Share',
        displayValue: '20%',
        value: 20
      },
      {
        color: 'info',
        icon: 'mdi:numeric-2-box-outline',
        title: 'Second Generation Member Staking Share',
        displayValue: '10%',
        value: 10
      },
      {
        color: 'info',
        icon: 'mdi:numeric-3-box-outline',
        title: 'Third Generation Member Staking Share',
        displayValue: '0%',
        value: 0
      },
      {
        color: 'success',
        icon: 'mdi:account-group',
        title: 'Team Staking Share',
        displayValue: '0%',
        value: 0
      }
    ],
    upgradeTasks: [
      {
        color: 'primary',
        taskType: 'Exp',
        title: 'Gain 5,000 Exp',
        displayValue: '5,000',
        value: 5_000,
        description: 'Complete the tasks to earn exp and reach 5,000 exp.'
      },
      {
        color: 'warning',
        taskType: 'Refer',
        title: 'Refer 8 Friend',
        displayValue: '8',
        value: 8,
        description: 'Refer 8 friend to join the referral program and you can gain 500 exp.'
      },
      {
        color: 'info',
        taskType: 'Staking',
        title: 'Staking $4,000 Value',
        displayValue: '4,000',
        value: 4_000,
        description: 'Staking $4,000 value in the any fund.'
      },
      {
        color: 'info',
        taskType: 'Direct Referral Staking',
        title: 'Direct Referral Staking $15,000 Value',
        displayValue: '15,000',
        value: 15_000,
        description: 'Direct referral staking $15,000 value in the any fund.'
      },
      {
        color: 'info',
        taskType: 'Team Staking',
        title: 'Team Staking $350,000 Value',
        displayValue: '350,000',
        value: 350_000,
        description: 'Team staking $350,000 value in the any fund.'
      }
    ]
  },
  {
    level: 8,
    title: 'Crypto Navigator ⭐⭐⭐',
    expDisplayMin: 5_000,
    expDisplayMax: 8_000,
    privileges: [
      {
        color: 'primary',
        icon: 'mdi:chevron-double-up',
        title: 'APY Boost',
        displayValue: '+ 2.8%',
        value: 2.8
      },
      {
        color: 'info',
        icon: 'mdi:numeric-1-box-outline',
        title: 'Direct Member Staking Share',
        displayValue: '20%',
        value: 20
      },
      {
        color: 'info',
        icon: 'mdi:numeric-2-box-outline',
        title: 'Second Generation Member Staking Share',
        displayValue: '10%',
        value: 10
      },
      {
        color: 'info',
        icon: 'mdi:numeric-3-box-outline',
        title: 'Third Generation Member Staking Share',
        displayValue: '5%',
        value: 5
      },
      {
        color: 'success',
        icon: 'mdi:account-group',
        title: 'Team Staking Share',
        displayValue: '0%',
        value: 0
      }
    ],
    upgradeTasks: [
      {
        color: 'primary',
        taskType: 'Exp',
        title: 'Gain 8,000 Exp',
        displayValue: '8,000',
        value: 8_000,
        description: 'Complete the tasks to earn exp and reach 8,000 exp.'
      },
      {
        color: 'warning',
        taskType: 'Refer',
        title: 'Refer 12 Friend',
        displayValue: '12',
        value: 12,
        description: 'Refer 12 friend to join the referral program and you can gain 500 exp.'
      },
      {
        color: 'info',
        taskType: 'Staking',
        title: 'Staking $6,000 Value',
        displayValue: '6,000',
        value: 6_000,
        description: 'Staking $6,000 value in the any fund.'
      },
      {
        color: 'info',
        taskType: 'Direct Referral Staking',
        title: 'Direct Referral Staking $25,000 Value',
        displayValue: '25,000',
        value: 25_000,
        description: 'Direct referral staking $25,000 value in the any fund.'
      },
      {
        color: 'info',
        taskType: 'Team Staking',
        title: 'Team Staking $1,000,000 Value',
        displayValue: '1,000,000',
        value: 1_000_000,
        description: 'Team staking $1,000,000 value in the any fund.'
      }
    ]
  },
  {
    level: 9,
    title: 'Blockchain Titan',
    expDisplayMin: 8_000,
    expDisplayMax: 12_000,
    privileges: [
      {
        color: 'primary',
        icon: 'mdi:chevron-double-up',
        title: 'APY Boost',
        displayValue: '+ 5%',
        value: 5
      },
      {
        color: 'info',
        icon: 'mdi:numeric-1-box-outline',
        title: 'Direct Member Staking Share',
        displayValue: '20%',
        value: 20
      },
      {
        color: 'info',
        icon: 'mdi:numeric-2-box-outline',
        title: 'Second Generation Member Staking Share',
        displayValue: '10%',
        value: 10
      },
      {
        color: 'info',
        icon: 'mdi:numeric-3-box-outline',
        title: 'Third Generation Member Staking Share',
        displayValue: '5%',
        value: 5
      },
      {
        color: 'success',
        icon: 'mdi:account-group',
        title: 'Team Staking Share',
        displayValue: '0.5%',
        value: 0.5
      }
    ],
    upgradeTasks: []
  }
]
