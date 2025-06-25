// Odoo Authentication Service
import { OdooAPI } from './odooClient'

export interface OdooAuthResult {
  success: boolean
  user?: {
    id: number
    name: string
    email: string
    login: string
  }
  error?: string
}

export class OdooAuthService {
  async authenticate(username: string, password: string): Promise<OdooAuthResult> {
    try {
      const user = await OdooAPI.getCurrentUser(username, password)

      if (!user) {
        return {
          success: false,
          error: 'Invalid credentials'
        }
      }

      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email ?? '',
          login: user.login
        }
      }
    } catch (error: any) {
      console.error('Odoo authentication error:', error)

      return {
        success: false,
        error: error.message ?? 'Authentication failed'
      }
    }
  }

  async validateSession(username: string, password: string): Promise<boolean> {
    try {
      const user = await OdooAPI.getCurrentUser(username, password)

      return !!user
    } catch (error) {
      console.error('Session validation error:', error)

      return false
    }
  }
}

export const odooAuthService = new OdooAuthService()
