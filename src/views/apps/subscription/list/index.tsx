// MUI Imports
import Grid from '@mui/material/Grid2'

// Type Imports
import type { SubscriptionType } from '@/types/apps/subscriptionTypes'

// Component Imports
import SubscriptionListTable from './SubscriptionListTable'
import SubscriptionCard from './SubscriptionCard'

const SubscriptionList = ({ subscriptionData }: { subscriptionData?: SubscriptionType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <SubscriptionCard subscriptionData={subscriptionData} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SubscriptionListTable subscriptionData={subscriptionData} />
      </Grid>
    </Grid>
  )
}

export default SubscriptionList
