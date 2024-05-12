// ** Third-Party Imports
import { AbilityBuilder, Ability } from '@casl/ability'

// ** Type Imports
import type { Role, Permission } from 'src/types/authTypes'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

export const Permissions: Permission[] = [
  {
    id: 'system-monitor-dashboard',
    displayName: '查看系統監控面板',
    assignedTo: ['Admin'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'roles-and-permissions',
    displayName: '查看角色權限頁面',
    assignedTo: ['Admin'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'analytics-dashboard',
    displayName: '查看項目統計儀表板',
    assignedTo: ['Admin', 'Planner'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'projects-management',
    displayName: '查看項目管理列表',
    assignedTo: ['Admin', 'Planner'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'users-management',
    displayName: '查看使用者管理列表',
    assignedTo: ['Admin', 'Planner'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'media-assets-management',
    displayName: '查看文件管理列表',
    assignedTo: ['Admin', 'Planner'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'article-management',
    displayName: '查看文章管理列表',
    assignedTo: ['Admin', 'Planner'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'notifications-management',
    displayName: '查看通知管理列表',
    assignedTo: ['Admin', 'Planner'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'assets-dashboard',
    displayName: '查看項目資產儀表板',
    assignedTo: ['Admin', 'Planner', 'Asset Manager'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'project-management',
    displayName: '查看項目管理頁面',
    assignedTo: ['Admin', 'Planner', 'Asset Manager'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'project-stakers-management',
    displayName: '查看項目質押者管理列表',
    assignedTo: ['Admin', 'Planner', 'Asset Manager'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'personal-dashboard',
    displayName: '查看個人儀表板頁面',
    assignedTo: ['Admin', 'Planner', 'Asset Manager', 'User'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'personal-account',
    displayName: '查看個人帳號頁面',
    assignedTo: ['Admin', 'Planner', 'Asset Manager', 'User'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'personal-notifications',
    displayName: '查看個人通知頁面',
    assignedTo: ['Admin', 'Planner', 'Asset Manager', 'User'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'settings',
    displayName: '查看設定頁面',
    assignedTo: ['Admin', 'Planner', 'Asset Manager', 'User'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'auth-login',
    displayName: '登入',
    assignedTo: ['Public'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'auth-register',
    displayName: '註冊',
    assignedTo: ['Public'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'auth-forgot-password',
    displayName: '忘記密碼',
    assignedTo: ['Public'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'auth-reset-password',
    displayName: '重設密碼',
    assignedTo: ['Public'],
    createdAt: '2023-03-25T14:00:00+08:00'
  },
  {
    id: 'auth-change-password',
    displayName: '變更密碼',
    assignedTo: ['Admin', 'Planner', 'Asset Manager', 'User'],
    createdAt: '2023-03-25T14:00:00+08:00'
  }
]

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: Role, subject: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  if (role === 'Admin') {
    can('manage', 'all')
  } else if (role === 'Planner') {
    can(['read'], 'planner-page')
    can(['read'], 'asset-manager-page')
    can(['read'], 'user-page')
  } else if (role === 'Asset Manager') {
    can(['read'], 'asset-manager-page')
    can(['read'], 'user-page')
  } else if (role === 'User') {
    can(['read'], 'user-page')
  } else {
    can(['read', 'create', 'update', 'delete'], subject)
  }

  return rules
}

export const buildAbilityFor = (role: Role, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
