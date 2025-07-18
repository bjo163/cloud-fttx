// Next Imports
import type { Metadata } from 'next'

// Component Imports
import ForgotPassword from '@/views/forgot-password'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Forgotten Password to your account'
}

const ForgotPasswordPage = async () => {
  // Vars
  const mode = await getServerMode()

  return <ForgotPassword mode={mode} />
}

export default ForgotPasswordPage
