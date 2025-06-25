// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

// Vars
const UserListCards = ({ userData }: { userData?: any[] }) => {
  // Hitung statistik Odoo user
  const total = userData?.length || 0
  const active = userData?.filter(u => u.active).length || 0
  const inactive = userData?.filter(u => !u.active).length || 0
  const admin = userData?.filter(u => u.name === 'Administrator').length || 0

  const data = [
    {
      title: 'Total Users',
      stats: total.toString(),
      avatarIcon: 'tabler-users',
      avatarColor: 'primary',
      subtitle: 'All Odoo Users',
      trend: 'positive',
      trendNumber: ''
    },
    {
      title: 'Active Users',
      stats: active.toString(),
      avatarIcon: 'tabler-user-check',
      avatarColor: 'success',
      subtitle: 'Active in Odoo',
      trend: 'positive',
      trendNumber: ''
    },
    {
      title: 'Inactive Users',
      stats: inactive.toString(),
      avatarIcon: 'tabler-user-off',
      avatarColor: 'secondary',
      subtitle: 'Inactive in Odoo',
      trend: 'negative',
      trendNumber: ''
    },
    {
      title: 'Admin Users',
      stats: admin.toString(),
      avatarIcon: 'tabler-crown',
      avatarColor: 'error',
      subtitle: 'Administrator',
      trend: 'positive',
      trendNumber: ''
    }
  ]

  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default UserListCards
