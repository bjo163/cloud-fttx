// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import InvoiceList from '@views/apps/invoice/list'

// Data Imports
import { OdooAPI } from '@/libs/odoo'
import type { InvoiceType } from '@/types/apps/invoiceTypes'

const InvoiceApp = async () => {
  // Ambil data invoice dari Odoo
  const odooInvoices = await OdooAPI.searchRead(
    'account.move',
    [['move_type', '=', 'out_invoice']],
    [
      'id',
      'name',
      'amount_total',
      'invoice_date_due',
      'invoice_date',
      'partner_id',
      'invoice_partner_display_name',
      'state',
      'amount_residual',
      'currency_id',
      'company_id',
      'invoice_origin'
    ]
  )

  // Mapping ke InvoiceType
  const data: InvoiceType[] = odooInvoices.map((inv: any) => ({
    id: String(inv.id),
    name: inv.name ?? '',
    total: inv.amount_total ?? 0,
    avatar: '', // Tidak ada avatar di Odoo invoice
    service: inv.invoice_origin ?? '',
    dueDate: inv.invoice_date_due ?? '',
    address: '', // Butuh query partner jika ingin detail
    company: Array.isArray(inv.company_id) ? inv.company_id[1] : '',
    country: '', // Butuh query partner jika ingin detail
    contact: Array.isArray(inv.partner_id) ? inv.partner_id[1] : '',
    issuedDate: inv.invoice_date ?? '',
    companyEmail: '', // Butuh query partner jika ingin detail
    balance: inv.amount_residual ?? 0,
    invoiceStatus: inv.state ?? ''
  }))

  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <InvoiceList invoiceData={data} />
      </Grid>
    </Grid>
  )
}

export default InvoiceApp
