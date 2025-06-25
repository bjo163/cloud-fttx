// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import SubscriptionTemplateList from '@views/apps/subscription/list/template/list'

// Data Imports
import { OdooAPI } from '@/libs/odoo'
import type { SubscriptionTemplateType } from '@/types/apps/subscriptionTypes'

const SubscriptionTemplateApp = async () => {
  // Ambil data template dari Odoo (model sale.order.template)
  const odooTemplates = await OdooAPI.searchRead(
    'sale.order.template',
    [],
    ['id', 'name', 'active', 'company_id', 'note', 'number_of_days', 'require_signature', 'require_payment']
  )

  // Mapping ke SubscriptionTemplateType
  const data: SubscriptionTemplateType[] = odooTemplates.map((tpl: any) => ({
    id: String(tpl.id),
    name: tpl.name ?? '',
    active: !!tpl.active,
    company: Array.isArray(tpl.company_id) ? tpl.company_id[1] : '',
    user: '', // user_id dihapus, isi string kosong
    note: tpl.note ?? '',
    numberOfDays: tpl.number_of_days ?? '',
    requireSignature: !!tpl.require_signature,
    requirePayment: !!tpl.require_payment,
    totalAmount: 0 // total_amount dihapus, isi 0
  }))

  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <SubscriptionTemplateList templateData={data} />
      </Grid>
    </Grid>
  )
}

export default SubscriptionTemplateApp
