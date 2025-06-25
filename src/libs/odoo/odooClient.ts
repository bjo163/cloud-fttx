import { getServerSession } from 'next-auth'

import { odooConfig } from '@/configs/odooConfig'
import { authOptions } from '@/libs/auth'

const Odoo = require('odoo-await')

export interface OdooClientResult {
  odoo: any
  uid: number | null
  companyId: number | null
}

async function getOdooSessionCredentials() {
  const session = await getServerSession(authOptions)

  return {
    login: session?.user?.login,
    password: (session?.user as any)?.odooPassword
  }
}

async function getOdooClient(username?: string, password?: string): Promise<OdooClientResult> {
  if (!username || !password) {
    const creds = await getOdooSessionCredentials()

    username = creds.login
    password = creds.password
  }

  if (!username || !password) {
    throw new Error('Username and password must be provided')
  }

  const odoo = new Odoo({
    baseUrl: odooConfig.baseUrl,
    port: odooConfig.port,
    db: odooConfig.db,
    username,
    password
  })

  const uid = await odoo.connect()

  if (!uid) return { odoo, uid: null, companyId: null }
  const [me] = await odoo.searchRead('res.users', [['id', '=', uid]], ['company_id'])
  const companyId = me?.company_id?.[0] ?? null

  return { odoo, uid, companyId }
}

export const OdooAPI = {
  async searchRead(model: string, domain: any[] = [], fields: string[] = [], username?: string, password?: string) {
    const { odoo, uid } = await getOdooClient(username, password)

    if (!uid) return []

    return odoo.searchRead(model, domain, fields)
  },
  async create(model: string, values: any, username?: string, password?: string) {
    const { odoo, uid } = await getOdooClient(username, password)

    if (!uid) return null

    return odoo.create(model, values)
  },
  async update(model: string, id: number, values: any, username?: string, password?: string) {
    const { odoo, uid } = await getOdooClient(username, password)

    if (!uid) return null

    return odoo.update(model, [id], values)
  },
  async delete(model: string, id: number, username?: string, password?: string) {
    const { odoo, uid } = await getOdooClient(username, password)

    if (!uid) return null

    return odoo.delete(model, [id])
  },
  getOdooClient // expose for advanced usage
}
