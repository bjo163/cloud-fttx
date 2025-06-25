// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import SubscriptionList from '@views/apps/subscription/list'

// Data Imports
import { OdooAPI } from '@/libs/odoo'
import type { SubscriptionType } from '@/types/apps/subscriptionTypes'

const SubscriptionApp = async () => {
  // Ambil data subscription dari Odoo (ganti ke model 'sale.order')
  const odooSubscriptions = await OdooAPI.searchRead(
    'sale.order',
    [],
    [
      'id',
      'name',
      'partner_id',
      'date_order',
      'state',
      'amount_total',
      'company_id',
      'user_id',
      'validity_date',
      'client_order_ref'
    ]
  )

  // Mapping ke SubscriptionType (pakai field dari sale.order)
  const data: SubscriptionType[] = odooSubscriptions.map((sub: any) => ({
    id: String(sub.id),
    name: sub.name ?? '',
    client: Array.isArray(sub.partner_id) ? sub.partner_id[1] : '',
    nextDate: sub.validity_date ?? '',
    stage: sub.state ?? '',
    template: sub.client_order_ref ?? '',
    total: sub.amount_total ?? 0,
    company: Array.isArray(sub.company_id) ? sub.company_id[1] : '',
    state: sub.state ?? ''
  }))

  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <SubscriptionList subscriptionData={data} />
      </Grid>
    </Grid>
  )
}

export default SubscriptionApp
