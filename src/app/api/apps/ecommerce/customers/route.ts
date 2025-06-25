import { NextResponse } from 'next/server'

import { OdooAPI } from '@/libs/odoo'

export async function GET() {
  const fields = ['id', 'name', 'email', 'country_id', 'customer_rank']
  const odooData = await OdooAPI.searchRead('res.partner', [], fields)

  const mapped = odooData.map((item: any) => ({
    id: item.id,
    customer: item.name,
    customerId: String(item.id),
    email: item.email,
    country: Array.isArray(item.country_id) ? item.country_id[1] : '',
    countryCode: '',
    countryFlag: '',
    order: item.customer_rank || 0,
    totalSpent: 0,
    avatar: '',
    status: '',
    contact: ''
  }))

  // Pastikan mapping hasil OdooAPI ke response API sudah sesuai dan semua field yang diakses ada di response Odoo
  // Tambahkan error handling jika field tidak ditemukan

  return NextResponse.json(mapped)
}
