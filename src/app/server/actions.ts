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
  const result = await OdooAPI.searchRead('res.users', [], ['id', 'name', 'email', 'login'])

  // Pastikan OdooAPI.searchRead di getUserData field-nya sesuai dengan response Odoo dan type yang digunakan
  if (!Array.isArray(result)) {
    throw new Error('Response Odoo tidak sesuai')
  }

  return result
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
    ['id', 'name', 'email', 'country_id', 'customer_rank', 'phone', 'mobile', 'is_company']
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
    contact: '',
    phone: item.phone ?? '',
    mobile: item.mobile ?? '',
    isCompany: !!item.is_company
  }))
}

export const updateCustomerOdooData = async (id: number, values: any) => {
  // Update customer di Odoo
  try {
    const result = await OdooAPI.update('res.partner', id, values)

    return { success: !!result, result }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export const deleteCustomerOdooData = async (id: number) => {
  try {
    const result = await OdooAPI.delete('res.partner', id)

    return { success: !!result, result }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

// Type for user profile return
type UserProfile = {
  id?: number;
  name: string;
  email: string;
  login?: string;
  company?: string;
  avatar: string;
  country: string;
  lang?: string;
  timezone?: string;
  active?: boolean;
  groups?: number[];
  phone: string;
  mobile?: string;
  function?: string;
  title?: string;
  website?: string;
  partner_id?: number;
  state?: string;
  city?: string;
  street?: string;
  zip?: string;
  birthday?: string;
  error?: string;
  [key: string]: string | number | boolean | number[] | undefined;
};

// Helper function to get Odoo connection
async function getOdooConnection(): Promise<{ odoo: any; uid: number | null }> {
  try {
    const { odoo, uid } = await OdooAPI.getOdooClient();

    return { odoo, uid };
  } catch (error) {
    console.error('Error connecting to Odoo:', error);

    return { odoo: null, uid: null };
  }
}

// Helper function to fetch user data
async function fetchOdooUserData(odoo: any, uid: number): Promise<any> {
  try {
    const result = await odoo.searchRead(
      'res.users',
      [['id', '=', uid]],
      [
        'id', 'name', 'email', 'login', 'company_id', 'image_1920',
        'country_id', 'lang', 'tz', 'active', 'groups_id', 'phone',
        'mobile', 'function', 'title', 'website', 'partner_id',
        'state_id', 'city', 'street', 'zip', 'birthday'
      ]
    );

    const [user] = result ?? [];

    return user;
  } catch (error) {
    console.error('Error fetching user data from Odoo:', error);

    return null;
  }
}

// Main function to get user profile
export const getCurrentUserOdooProfile = async (): Promise<UserProfile> => {
  // Ambil user Odoo yang sedang login (current session)
  try {
    // Dapatkan user id dari session Odoo
    const { odoo, uid } = await getOdooConnection();

    if (!odoo || !uid) {
      return {
        error: 'User belum login Odoo atau koneksi gagal',
        name: '',
        email: '',
        phone: '',
        country: '',
        avatar: ''
      };
    }

    // Ambil detail user
    const user = await fetchOdooUserData(odoo, uid);

    if (!user) {
      return {
        error: 'User Odoo tidak ditemukan',
        name: '',
        email: '',
        phone: '',
        country: '',
        avatar: ''
      };
    }

    // Mapping ke struktur profile
    return {
      id: user.id,
      name: user.name,
      email: user.email ?? '',
      login: user.login ?? '',
      company: Array.isArray(user.company_id) ? user.company_id[1] : '',
      avatar: user.image_1920 ?? '',
      country: Array.isArray(user.country_id) ? user.country_id[1] : '',
      lang: user.lang ?? '',
      timezone: user.tz ?? '',
      active: Boolean(user.active),
      groups: Array.isArray(user.groups_id) ? user.groups_id : [],
      phone: user.phone ?? '',
      mobile: user.mobile ?? '',
      function: user.function ?? '',
      title: user.title ?? '',
      website: user.website ?? '',
      partner_id: user.partner_id ?? 0,
      state: Array.isArray(user.state_id) ? user.state_id[1] : '',
      city: user.city ?? '',
      street: user.street ?? '',
      zip: user.zip ?? '',
      birthday: user.birthday ?? ''
    };
  } catch (error) {
    console.error('Error fetching Odoo user profile:', error);

    return {
      error: (error as Error).message,
      name: '',
      email: '',
      phone: '',
      country: '',
      avatar: ''
    };
  }
}

export const getProductOdooData = async () => {
  // Ambil data produk dari Odoo (product.template)
  try {
    const products = await OdooAPI.searchRead(
      'product.template',
      [],
      [
        'id',
        'name',
        'default_code',
        'list_price',
        'standard_price',
        'categ_id',
        'type',
        'uom_id',
        'uom_po_id',
        'active',
        'description',
        'image_1920'
      ]
    )

    return products
  } catch (error) {
    console.error('Error fetching products from Odoo:', error);

    return [];
  }
}

export const createProductOdooData = async (values: any) => {
  try {
    const result = await OdooAPI.create('product.template', values)

    return { success: !!result, result }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export const updateProductOdooData = async (id: number, values: any) => {
  try {
    const result = await OdooAPI.update('product.template', id, values)

    return { success: !!result, result }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export const deleteProductOdooData = async (id: number) => {
  try {
    const result = await OdooAPI.delete('product.template', id)

    return { success: !!result, result }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export const isUserProfileComplete = async () => {
  // Ambil profil user Odoo dari session
  try {
    const profile = await getCurrentUserOdooProfile()

    if (!profile || profile.error) {
      return { complete: false, missingFields: ['profile not found'], profile }
    }


    // Field wajib
    const requiredFields = ['name', 'email', 'phone', 'country', 'avatar']
    const missingFields = requiredFields.filter(field => !profile[field] || profile[field] === '')


    return {
      complete: missingFields.length === 0,
      missingFields,
      profile
    }
  } catch (error) {
    return { complete: false, missingFields: ['error'], error: (error as Error).message }
  }
}
