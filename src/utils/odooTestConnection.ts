// Odoo Connection Test Utility
import { odooAuthService } from './odooAuth'

export async function testOdooConnection(username: string, password: string) {
    console.log('Testing Odoo connection...')

    try {
        const result = await odooAuthService.authenticate(username, password)

        if (result.success) {
            console.log('✅ Odoo connection successful!')
            console.log('User Info:', result.user)

            return result.user
        } else {
            console.log('❌ Odoo connection failed:', result.error)

            return null
        }
    } catch (error) {
        console.error('❌ Odoo connection error:', error)

        return null
    }
}

// For testing in browser console or development
if (typeof window !== 'undefined') {
    ; (window as any).testOdooConnection = testOdooConnection
}
