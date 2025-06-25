// Odoo Configuration
export const odooConfig = {
  baseUrl: process.env.ODOO_BASE_URL || "https://yourdomain.odoo.com",
  port: process.env.ODOO_PORT ? parseInt(process.env.ODOO_PORT) : undefined,
  db: process.env.ODOO_DB || "odoo_db",
  defaultUsername: process.env.ODOO_USERNAME || "admin",
  defaultPassword: process.env.ODOO_PASSWORD || "admin"
}

export type OdooConfig = typeof odooConfig
