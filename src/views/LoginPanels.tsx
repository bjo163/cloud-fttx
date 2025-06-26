import { useState, useRef, useEffect } from 'react'

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

  const primaryColor = theme.palette.primary.main

  // Dynamic Pollinations AI image
  const pollinationsPrompt = encodeURIComponent(
    `isometric login page ui, professional, clean, minimal, color scheme ${primaryColor}, digital, 3d, trending on dribbble, png, transparent background, alpha channel, no background, isolated, no text, no watermark`
  )

  const pollinationsUrl = `https://image.pollinations.ai/prompt/${pollinationsPrompt}.png`
  const [imgSrc, setImgSrc] = useState(pollinationsUrl)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasUrl, setCanvasUrl] = useState<string | null>(null)

  useEffect(() => {
    const img = new window.Image()

    img.crossOrigin = 'Anonymous'
    img.src = imgSrc

    img.onload = () => {
      const canvas = canvasRef.current

      if (!canvas) return
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')

      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        // Jika pixel putih (atau sangat terang), buat transparan
        if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) {
          data[i + 3] = 0
        }
      }

      ctx.putImageData(imageData, 0, 0)
      setCanvasUrl(canvas.toDataURL('image/png'))
    }

    img.onerror = () => setCanvasUrl(null)
  }, [imgSrc])

  const handleImgError = () => setImgSrc(characterIllustration)

  return (
    <div
      className={classnames(
        'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
        {
          'border-ie': settings.skin === 'bordered'
        }
      )}
    >
      {/* Hidden canvas for processing transparency */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {canvasUrl ? (
        <LoginIllustration src={canvasUrl} alt='character-illustration' />
      ) : (
        <LoginIllustration src={imgSrc} alt='character-illustration' onError={handleImgError} />
      )}
      {!hidden && <MaskImg alt='mask' src={authBackground} />}
    </div>
  )
}

export function LoginRightPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
      <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
        <Logo />
      </div>
      <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-8 sm:mbs-11 md:mbs-0'>
        <div className='flex flex-col gap-1'>
          <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
          <Typography>Please sign-in to your account and start the adventure</Typography>
        </div>
        <Alert icon={false} className='bg-[var(--mui-palette-primary-lightOpacity)]'>
          <Typography variant='body2' color='primary.main'>
            Email: <span className='font-medium'>admin@vuexy.com</span> / Pass:{' '}
            <span className='font-medium'>admin</span>
          </Typography>
        </Alert>
        {children}
      </div>
    </div>
  )
}
