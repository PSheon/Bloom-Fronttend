// ** Type imports
import type { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Navigation.System.SectionTitle',
      action: 'read',
      subject: 'admin-page'
    },
    {
      title: 'Navigation.System.Dashboard',
      icon: 'mdi:monitor-dashboard',
      path: '/system/dashboard',
      action: 'read',
      subject: 'admin-page'
    },
    {
      title: 'Navigation.System.Roles & Permissions',
      icon: 'mdi:shield-outline',
      path: '/system/roles-and-permissions',
      action: 'read',
      subject: 'admin-page'
    },
    {
      sectionTitle: 'Navigation.Management.SectionTitle',
      action: 'read',
      subject: 'planner-page'
    },
    {
      title: 'Navigation.Management.Dashboard',
      icon: 'mdi:google-analytics',
      path: '/management/dashboard',
      action: 'read',
      subject: 'planner-page'
    },
    {
      title: 'Navigation.Management.Funds',
      icon: 'ant-design:fund-projection-screen-outlined',
      path: '/management/fund/list',
      badgeContent: 'new',
      badgeColor: 'error',
      action: 'read',
      subject: 'planner-page'
    },
    {
      title: 'Navigation.Management.Users',
      icon: 'mdi:user-group-outline',
      path: '/management/user/list',
      action: 'read',
      subject: 'planner-page'
    },
    {
      title: 'Navigation.Management.Articles',
      icon: 'mdi:blog-outline',
      path: '/management/article/list',
      action: 'read',
      subject: 'planner-page'
    },
    {
      title: 'Navigation.Management.Media Assets',
      icon: 'mdi:multimedia',
      path: '/management/media-asset/list',
      action: 'read',
      subject: 'planner-page'
    },
    {
      title: 'Navigation.Management.Notifications',
      icon: 'mdi:bell-outline',
      path: '/management/notification/list',
      action: 'read',
      subject: 'planner-page'
    },

    // {
    //   sectionTitle: 'Review',
    //   action: 'read',
    //   subject: 'asset-manager-page'
    // },
    // {
    //   title: 'Review.Dashboard',
    //   icon: 'mdi:newspaper-variant-outline',
    //   path: '/review/dashboard',
    //   action: 'read',
    //   subject: 'asset-manager-page'
    // },
    {
      sectionTitle: 'Navigation.Public.SectionTitle',
      action: 'read',
      subject: 'user-page'
    },
    {
      title: 'Navigation.Public.Funds & Strategies',
      icon: 'mdi:strategy',
      path: '/fund/list',
      action: 'read',
      subject: 'user-page'
    },
    {
      sectionTitle: 'Navigation.Me.SectionTitle',
      action: 'read',
      subject: 'user-page'
    },
    {
      title: 'Navigation.Me.Portfolio',
      icon: 'mdi:chart-pie-outline',
      path: '/portfolio',
      action: 'read',
      subject: 'user-page'
    },
    {
      title: 'Navigation.Me.Points',
      icon: 'mdi:progress-star-four-points',
      path: '/points',
      action: 'read',
      subject: 'user-page'
    },
    {
      sectionTitle: 'Navigation.General.SectionTitle',
      action: 'read',
      subject: 'user-page'
    },
    {
      title: 'Navigation.General.Account',
      icon: 'mdi:account-outline',
      path: '/account',
      action: 'read',
      subject: 'user-page'
    },
    {
      title: 'Navigation.General.Notifications',
      icon: 'mdi:bell-outline',
      path: '/notification/list',
      action: 'read',
      subject: 'user-page'
    },
    {
      title: 'Navigation.General.Settings',
      icon: 'mdi:settings-outline',
      path: '/settings',
      action: 'read',
      subject: 'user-page'
    }
  ]
}

export default navigation
