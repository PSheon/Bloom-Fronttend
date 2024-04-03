/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'Admin') return '/system/dashboard'
  if (role === 'Manager') return '/management/dashboard'
  if (role === 'Reviewer') return '/review/dashboard'
  if (role === 'User') return '/dashboard'
  else return '/dashboard'
}

export default getHomeRoute
