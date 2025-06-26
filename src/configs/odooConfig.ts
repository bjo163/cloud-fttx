// Odoo Configuration
export const odooConfig = {
  baseUrl: process.env.NEXT_PUBLIC_ODOO_BASE_URL || 'https://yourdomain.odoo.com',
  db: process.env.NEXT_PUBLIC_ODOO_DB || 'odoo_db',

}

export type OdooConfig = typeof odooConfig
