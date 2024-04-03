// ** MUI Imports
import { AlertColor } from '@mui/material/Alert'

// ** Types Imports
import { TabIndex, RequestSheetType } from 'src/types/api/requestSheetTypes'

type BaseTypeAttributes = Record<string, { displayName: string }>
type BaseOperationalMethodAttributes = Record<string, { displayName: string }>
type BaseCooperationIndustriesAttributes = Record<string, { displayName: string }>
type BaseTabListAttributes = Record<TabIndex, { icon: string; displayName: string }>
type BaseProcessStatusAttributes = Record<
  string,
  {
    icon: string
    displayName: string
    description: string
    color: AlertColor
    processPercentage: number
    views: {
      applicant: {
        details: 'view' | 'edit' | 'hidden'
        initialReview: 'view' | 'edit' | 'hidden'
        secondaryReview: 'view' | 'edit' | 'hidden'
        abandonButton: 'view' | 'edit'
      }
      reviewer: {
        details: 'view' | 'edit' | 'hidden'
        initialReview: 'view' | 'edit' | 'hidden'
        secondaryReview: 'view' | 'edit' | 'hidden'
      }
    }
  }
>

export const getProcessStatusList = (): RequestSheetType['processStatus'][] => {
  return [
    'Abandoned',
    'Filling out the sheet',
    'Initial review',
    'Initial review modification',
    'Secondary review',
    'Secondary review modification',
    'Completed'
  ]
}

export const getRequestSheetTypeAttributes = (type: RequestSheetType['type']) => {
  const baseTypeAttributes: BaseTypeAttributes = {
    'Newly Established': { displayName: '新開辦班' },
    'Existing And Reevaluation': { displayName: '舊案新審' },
    'Regular Student': { displayName: '一般生班' },
    'Overseas Student': { displayName: '僑生班' },
    'Second Generation New Immigrant': { displayName: '新住民二代子女班' },
    Continuation: { displayName: '續辦案班' }
  }

  return Object.assign(baseTypeAttributes['Newly Established'], baseTypeAttributes[type])
}

export const getRequestSheetOperationalMethodAttributes = (
  operationalMethod: RequestSheetType['operationalMethod']
) => {
  const baseOperationalMethodAttributes: BaseOperationalMethodAttributes = {
    'Technical High School + Junior College': { displayName: '技高+二專' },
    'Technical High School + Junior College + Associate Degree': { displayName: '技高+二專+二技' },
    "Technical High School + Bachelor's Degree": { displayName: '技高+四技' },
    "Junior High School + Technical High School + Bachelor's Degree": { displayName: '國中+技高+四技' },
    'Associate Degree with a Two-Year Technical Program': { displayName: '二專+二技' },
    'Associate Degree with a Five-Year Technical Program': { displayName: '五專+二技' },
    "Bachelor's Degree in Technology": { displayName: '四技' }
  }

  return Object.assign(
    baseOperationalMethodAttributes['Technical High School + Junior College'],
    baseOperationalMethodAttributes[operationalMethod]
  )
}

export const getRequestSheetCooperationIndustriesAttributes = (
  cooperationIndustries: RequestSheetType['cooperationIndustries']
) => {
  const baseCooperationIndustriesAttributes: BaseCooperationIndustriesAttributes = {
    'Intelligent Machinery': { displayName: '智慧機械' },
    Semiconductor: { displayName: '半導體（IC設計）' },
    'Data Services': { displayName: '資料服務' },
    Shipbuilding: { displayName: '造船' },
    'Smart Agriculture': { displayName: '智慧農業' },
    'Information and Digital': { displayName: '資訊及數位' },
    'Cybersecurity Excellence Technology': { displayName: '資安卓越科技' },
    'Precision Health': { displayName: '臺灣精準健康' },
    'Green Energy and Renewable Resources': { displayName: '綠電及再生能源' },
    'Defense and Strategic': { displayName: '國防及戰略' },
    'Civilian Livelihood and Preparedness': { displayName: '民生及備戰' },
    Others: { displayName: '其他' }
  }

  return Object.assign(
    baseCooperationIndustriesAttributes['Others'],
    baseCooperationIndustriesAttributes[cooperationIndustries]
  )
}

export const getRequestSheetTabListAttributes = (tebIndex: TabIndex) => {
  const baseTabListAttributes: BaseTabListAttributes = {
    details: { icon: 'mdi:edit-circle-outline', displayName: '申請資料' },
    initialReview: { icon: 'mdi:account-view-outline', displayName: '初審資料' },
    secondaryReview: { icon: 'mdi:account-view-outline', displayName: '複審資料' }
  }

  return Object.assign(baseTabListAttributes['details'], baseTabListAttributes[tebIndex])
}

export const getRequestSheetProcessStatusAttributes = (processStatus: RequestSheetType['processStatus']) => {
  const baseProcessStatusAttributes: BaseProcessStatusAttributes = {
    Abandoned: {
      icon: 'mdi:close-circle-outline',
      displayName: '已放棄申請',
      description: '申請資料已被封存，無法再次送出',
      color: 'error',
      processPercentage: 0,
      views: {
        applicant: {
          details: 'view',
          initialReview: 'view',
          secondaryReview: 'view',
          abandonButton: 'view'
        },
        reviewer: {
          details: 'view',
          initialReview: 'view',
          secondaryReview: 'view'
        }
      }
    },
    'Filling out the sheet': {
      icon: 'mdi:edit-circle-outline',
      displayName: '填表中',
      description: '確認申請資料後後可送出進行初審',
      color: 'info',
      processPercentage: 10,
      views: {
        applicant: {
          details: 'edit',
          initialReview: 'hidden',
          secondaryReview: 'hidden',
          abandonButton: 'edit'
        },
        reviewer: {
          details: 'view',
          initialReview: 'hidden',
          secondaryReview: 'hidden'
        }
      }
    },
    'Initial review': {
      icon: 'mdi:account-view-outline',
      displayName: '初審中',
      description: '委員將給予修改建議',
      color: 'warning',
      processPercentage: 30,
      views: {
        applicant: {
          details: 'view',
          initialReview: 'hidden',
          secondaryReview: 'hidden',
          abandonButton: 'edit'
        },
        reviewer: {
          details: 'view',
          initialReview: 'edit',
          secondaryReview: 'hidden'
        }
      }
    },
    'Initial review modification': {
      icon: 'mdi:edit-circle-outline',
      displayName: '初審修改中',
      description: '請修改申請內容符合委員建議，並重新送出審查',
      color: 'info',
      processPercentage: 50,
      views: {
        applicant: {
          details: 'edit',
          initialReview: 'edit',
          secondaryReview: 'hidden',
          abandonButton: 'view'
        },
        reviewer: {
          details: 'view',
          initialReview: 'view',
          secondaryReview: 'hidden'
        }
      }
    },
    'Secondary review': {
      icon: 'mdi:account-view-outline',
      displayName: '複審中',
      description: '委員將給予修改建議',
      color: 'warning',
      processPercentage: 70,
      views: {
        applicant: {
          details: 'view',
          initialReview: 'view',
          secondaryReview: 'hidden',
          abandonButton: 'edit'
        },
        reviewer: {
          details: 'view',
          initialReview: 'hidden',
          secondaryReview: 'edit'
        }
      }
    },
    'Secondary review modification': {
      icon: 'mdi:edit-circle-outline',
      displayName: '複審修改中',
      description: '請修改申請內容符合委員建議，並重新送出審查',
      color: 'info',
      processPercentage: 90,
      views: {
        applicant: {
          details: 'edit',
          initialReview: 'view',
          secondaryReview: 'edit',
          abandonButton: 'view'
        },
        reviewer: {
          details: 'view',
          initialReview: 'hidden',
          secondaryReview: 'view'
        }
      }
    },
    Completed: {
      icon: 'mdi:success-circle-outline',
      displayName: '已完成申請',
      description: '所有資料已存檔',
      color: 'success',
      processPercentage: 100,
      views: {
        applicant: {
          details: 'view',
          initialReview: 'view',
          secondaryReview: 'view',
          abandonButton: 'view'
        },
        reviewer: {
          details: 'view',
          initialReview: 'view',
          secondaryReview: 'view'
        }
      }
    }
  }

  return Object.assign(baseProcessStatusAttributes['Filling out the sheet'], baseProcessStatusAttributes[processStatus])
}
