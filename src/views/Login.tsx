'use client'

// React Imports
import { useState } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import { signIn } from 'next-auth/react'
import type { SubmitHandler } from 'react-hook-form'

// Type Imports
import type { SystemMode } from '@core/types'
import type { Locale } from '@/configs/i18n'
import type { ErrorType, FormData } from './LoginFormParts'

// Component Imports
import { LoginForm, useLoginForm } from './LoginFormParts'
import { LoginLeftPanel, LoginRightPanel } from './LoginPanels'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const Login = ({ mode }: { mode: SystemMode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState<ErrorType | null>(null)
  const [loading, setLoading] = useState(false)

  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()
  const { lang: locale } = useParams()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useLoginForm()

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setLoading(true)

    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    setLoading(false)

    if (res && res.ok && res.error === null) {
      const redirectURL = searchParams.get('redirectTo') ?? '/'

      router.replace(getLocalizedUrl(redirectURL, locale as Locale))
    } else {
      if (res?.error) {
        const error = JSON.parse(res.error)

        setErrorState(error)
      }
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <LoginLeftPanel mode={mode} />
      <LoginRightPanel>
        <LoginForm
          control={control}
          errors={errors}
          errorState={errorState}
          setErrorState={setErrorState}
          isPasswordShown={isPasswordShown}
          handleClickShowPassword={handleClickShowPassword}
          locale={locale}
          loading={loading}
          onSubmit={handleSubmit(onSubmit)}
        />
      </LoginRightPanel>
    </div>
  )
}

export default Login
