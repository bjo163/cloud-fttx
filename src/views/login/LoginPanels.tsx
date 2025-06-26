import { useEffect, useState } from 'react'

import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import classnames from 'classnames'

import Typography from '@mui/material/Typography'

import Alert from '@mui/material/Alert'

import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import Logo from '@components/layout/shared/Logo'
import themeConfig from '@configs/themeConfig'

import type { SystemMode } from '@core/types'

const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

export function LoginLeftPanel({ mode }: { mode: SystemMode }) {
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  return (
    <div
      className={classnames(
        'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
        {
          'border-ie': settings.skin === 'bordered'
        }
      )}
    >
      <LoginIllustration src={characterIllustration} alt='character-illustration' />
      {!hidden && <MaskImg alt='mask' src={authBackground} />}
    </div>
  )
}

export function LoginRightPanel({ children }: { children: React.ReactNode }) {
  // Pilih tagline random hanya di client untuk menghindari hydration mismatch
  const [tagline, setTagline] = useState('')

  useEffect(() => {
    if (Array.isArray(themeConfig.HeroTagline) && themeConfig.HeroTagline.length > 0) {
      const idx = Math.floor(Math.random() * themeConfig.HeroTagline.length)

      setTagline(themeConfig.HeroTagline[idx])
    }
  }, [])

  return (
    <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
      <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
        <Logo />
      </div>
      <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-8 sm:mbs-11 md:mbs-0'>
        <div className='flex flex-col gap-1'>
          <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
          {tagline && <Typography className='text-primary font-semibold'>{tagline}</Typography>}
        </div>
        <Alert icon={false} className='bg-[var(--mui-palette-primary-lightOpacity)]'>
          <Typography variant='body2' color='primary.main'>
            Email: <span className='font-medium'>admin@vuexy.com</span> / Pass:{' '}
            <span className='font-medium'>admin</span>
          </Typography>
        </Alert>
        {children}
        {/* Informasi tambahan dari themeConfig */}
        <div className='mt-8 text-center text-xs text-disabled'>
          {themeConfig.templateDescription && <div>{themeConfig.templateDescription}</div>}
          <div className='mt-1'>
            <span className='font-semibold'>{themeConfig.templateName}</span>
            {themeConfig.templateVersion && <span> v{themeConfig.templateVersion}</span>}
          </div>
          <div className='flex justify-center gap-2 mt-1'>
            {themeConfig.templateDocumentation && (
              <a
                href={themeConfig.templateDocumentation}
                target='_blank'
                rel='noopener noreferrer'
                className='underline text-primary'
              >
                Dokumentasi
              </a>
            )}
            {themeConfig.templateDocumentation && themeConfig.templateSupport && <span>|</span>}
            {themeConfig.templateSupport && (
              <a
                href={themeConfig.templateSupport}
                target='_blank'
                rel='noopener noreferrer'
                className='underline text-primary'
              >
                Support
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
