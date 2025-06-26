'use client'

// React Imports
import { useState, useEffect } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import dynamic from 'next/dynamic'

import { signIn } from 'next-auth/react'
import type { SubmitHandler } from 'react-hook-form'

// Type Imports
import type { SystemMode } from '@core/types'
import type { Locale } from '@/configs/i18n'
import type { ErrorType, FormData } from '@/types/pages/loginTypes'

// Component Imports
import { LoginForm, useLoginForm } from './LoginFormParts'
import { LoginLeftPanel, LoginRightPanel } from './LoginPanels'

const ProfileIncompleteModal = dynamic(() => import('@/components/dialogs/ProfileIncompleteModal'), { ssr: false })

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import type { ProfileData } from '@/libs/odoo/profileValidation'
import { isProfileComplete } from '@/libs/odoo/profileValidation'
import { OdooAPI } from '@/libs/odoo/odooClient'
import { isUserProfileComplete } from '@/app/server/actions'

// Pisahkan handleLoginSubmit dari komponen utama agar <80 baris
const handleLoginSubmit: SubmitHandler<FormData> = async (
  data,
  { setLoading, setProfileData, setPartnerId, setProfileIncomplete, setErrorState, router, searchParams, locale }
) => {
  setLoading(true)
  console.log('LOGIN SUBMIT:', data)

  const res = await signIn('credentials', {
    email: data.email,
    password: data.password,
    redirect: false
  })

  console.log('SIGNIN RESULT:', res)
  setLoading(false)

  if (res && res.ok && res.error === null) {
    try {
      // Cek kelengkapan profil via server action
      const profileStatus = await isUserProfileComplete()

      console.log('PROFILE STATUS (server action):', profileStatus)

      if (!profileStatus.complete) {
        setProfileData(profileStatus.profile)
        setProfileIncomplete(true)

        return
      }

      const user = await OdooAPI.getCurrentUser(data.email, data.password)

      console.log('USER:', user)

      if (user && user.id) {
        const partners = await OdooAPI.searchRead(
          'res.partner',
          [['email', '=', user.email]],
          ['id', 'name', 'email', 'phone', 'country_id', 'image_1920']
        )

        console.log('PARTNERS:', partners)
        const partner = partners && partners.length > 0 ? partners[0] : null

        console.log('PARTNER:', partner)

        if (partner) {
          const profile: ProfileData = {
            name: partner.name,
            email: partner.email,
            phone: partner.phone,
            country: Array.isArray(partner.country_id) ? partner.country_id[1] : '',
            image: partner.image_1920
          }

          console.log('PROFILE DATA:', profile)
          setProfileData(profile)
          setPartnerId(partner.id)

          if (!isProfileComplete(profile)) {
            console.log('PROFILE INCOMPLETE:', profile)
            setProfileIncomplete(true)

            return
          }
        }
      }
    } catch (e) {
      console.error('ERROR FETCH PROFILE:', e)
    }

    const redirectURL = searchParams.get('redirectTo') ?? '/'

    console.log('REDIRECT TO:', redirectURL)
    router.replace(getLocalizedUrl(redirectURL, locale as Locale))
  } else {
    if (res?.error) {
      let error: ErrorType = { message: ['Terjadi kesalahan saat login.'] }

      try {
        const parsed = JSON.parse(res.error)

        if (parsed && parsed.message) {
          error = parsed
        }
      } catch (e) {
        error = { message: [typeof res.error === 'string' ? res.error : 'Terjadi kesalahan saat login.'] }
      }

      setErrorState(error)
      console.error('LOGIN ERROR:', error)
    }
  }
}

const Login = ({ mode }: { mode: SystemMode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState<ErrorType | null>(null)
  const [loading, setLoading] = useState(false)
  const [profileIncomplete, setProfileIncomplete] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [partnerId, setPartnerId] = useState<number | null>(null)

  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()
  const { lang: locale } = useParams()

  useEffect(() => {
    if (profileIncomplete) {
      router.replace(getLocalizedUrl('/pages/user-profile', locale as Locale))
    }
  }, [profileIncomplete, router, locale])

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useLoginForm()

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<FormData> = data =>
    handleLoginSubmit(data, {
      setLoading,
      setProfileData,
      setPartnerId,
      setProfileIncomplete,
      setErrorState,
      router,
      searchParams,
      locale
    })

  const handleSaveProfile = async (profile: ProfileData) => {
    if (!partnerId) return

    // Update ke Odoo
    await OdooAPI.update('res.partner', partnerId, {
      name: profile.name,
      email: profile.email,
      phone: profile.phone

      // country_id: ... (jika perlu mapping ID negara)
    })
    setProfileIncomplete(false)
    setProfileData(profile)

    // Optional: redirect atau reload halaman
  }

  if (profileIncomplete) return null

  return (
    <>
      {profileIncomplete && (
        <ProfileIncompleteModal
          open={profileIncomplete}
          initialProfile={profileData || {}}
          onSave={handleSaveProfile}
        />
      )}
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
    </>
  )
}

export default Login
