/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'Admin') return '/system/dashboard'
  if (role === 'Planner') return '/management/dashboard'
  if (role === 'Asset Manager') return '/review/dashboard'
  if (role === 'User') return '/portfolio'
  else return '/'
}

export default getHomeRoute
