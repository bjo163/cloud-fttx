/**
 * ! The server actions below are used to fetch the static data from the fake-db. If you're using an ORM
 * ! (Object-Relational Mapping) or a database, you can swap the code below with your own database queries.
 */

'use server'

// Data Imports
import { db as eCommerceData } from '@/fake-db/apps/ecommerce'
import { db as academyData } from '@/fake-db/apps/academy'
import { db as vehicleData } from '@/fake-db/apps/logistics'
import { db as invoiceData } from '@/fake-db/apps/invoice'
import { db as permissionData } from '@/fake-db/apps/permissions'
import { db as profileData } from '@/fake-db/pages/userProfile'
import { db as faqData } from '@/fake-db/pages/faq'
import { db as pricingData } from '@/fake-db/pages/pricing'
import { db as statisticsData } from '@/fake-db/pages/widgetExamples'
import { OdooAPI } from '@/libs/odoo'

export const getEcommerceData = async () => {
  return eCommerceData
}

export const getAcademyData = async () => {
  return academyData
}

export const getLogisticsData = async () => {
  return vehicleData
}

export const getInvoiceData = async () => {
  return invoiceData
}

export const getUserData = async () => {
  // Ambil semua user Odoo
  return OdooAPI.searchRead('res.users', [], ['id', 'name', 'email', 'login'])
}

export const getPermissionsData = async () => {
  return permissionData
}

export const getProfileData = async () => {
  return profileData
}

export const getFaqData = async () => {
  return faqData
}

export const getPricingData = async () => {
  return pricingData
}

export const getStatisticsData = async () => {
  return statisticsData
}

export const getCustomerOdooData = async () => {
  const odooCustomers = await OdooAPI.searchRead(
    'res.partner',
    [],
    ['id', 'name', 'email', 'country_id', 'customer_rank']
  )


  return odooCustomers.map((item: any) => ({
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
}
