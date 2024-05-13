// ** Custom Component Imports
import PointsSection from 'src/views/points'

const PointsPage = () => {
  return <PointsSection />
}

PointsPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default PointsPage
