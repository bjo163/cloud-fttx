import { useState } from 'react'

import Link from 'next/link'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import {
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  IconButton,
  InputAdornment,
  Alert
} from '@mui/material'

import { signIn } from 'next-auth/react'

import { object, string, minLength, email, pipe, nonEmpty } from 'valibot'

import type { FormData, ErrorType } from '@/types/pages/loginTypes'

import CustomTextField from '@core/components/mui/TextField'

import { getLocalizedUrl } from '@/utils/i18n'
import type { Locale } from '@/configs/i18n'

import type { SystemMode } from '@core/types'

export const schema = object({
  email: pipe(string(), minLength(1, 'Email wajib diisi'), email('Format email tidak valid')),
  password: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(6, 'Password must be at least 6 characters long')
  )
})

export function useLoginForm() {
  return useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: 'admin@vuexy.com',
      password: 'admin'
    },
    mode: 'onChange'
  })
}

function EmailInput({ control, errors, errorState, setErrorState }: any) {
  return (
    <Controller
      name='email'
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <CustomTextField
          {...field}
          autoFocus
          fullWidth
          type='email'
          label='Email'
          placeholder='Masukkan email anda'
          onChange={e => {
            field.onChange(e.target.value)
            errorState !== null && setErrorState(null)
          }}
          error={Boolean(errors.email) || Boolean(errorState)}
          helperText={errors.email?.message || (!errors.email && errorState?.message[0]) || ''}
        />
      )}
    />
  )
}

function PasswordInput({ control, errors, errorState, setErrorState, isPasswordShown, handleClickShowPassword }: any) {
  return (
    <Controller
      name='password'
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <CustomTextField
          {...field}
          fullWidth
          label='Password'
          placeholder='············'
          id='login-password'
          type={isPasswordShown ? 'text' : 'password'}
          onChange={e => {
            field.onChange(e.target.value)
            errorState !== null && setErrorState(null)
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                    <i className={isPasswordShown ? 'tabler-eye' : 'tabler-eye-off'} />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
          {...(errors.password && { error: true, helperText: errors.password.message })}
        />
      )}
    />
  )
}

function SocialLoginButton() {
  return (
    <Button
      color='secondary'
      className='self-center text-textPrimary'
      startIcon={<img src='/images/logos/google.png' alt='Google' width={22} />}
      sx={{ '& .MuiButton-startIcon': { marginInlineEnd: 3 } }}
      onClick={() => signIn('google')}
    >
      Sign in with Google
    </Button>
  )
}

export function LoginForm({
  control,
  errors,
  errorState,
  setErrorState,
  isPasswordShown,
  handleClickShowPassword,
  locale
}: {
  control: any
  errors: any
  errorState: ErrorType | null
  setErrorState: (e: ErrorType | null) => void
  isPasswordShown: boolean
  handleClickShowPassword: () => void
  locale: string | string[] | undefined
}) {
  return (
    <form noValidate autoComplete='off' action={() => {}} className='flex flex-col gap-6'>
      <EmailInput control={control} errors={errors} errorState={errorState} setErrorState={setErrorState} />
      <PasswordInput
        control={control}
        errors={errors}
        errorState={errorState}
        setErrorState={setErrorState}
        isPasswordShown={isPasswordShown}
        handleClickShowPassword={handleClickShowPassword}
      />
      <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
        <FormControlLabel control={<Checkbox defaultChecked />} label='Remember me' />
        <Typography
          className='text-end'
          color='primary.main'
          component={Link}
          href={getLocalizedUrl('/forgot-password', locale as Locale)}
        >
          Forgot password?
        </Typography>
      </div>
      <Button fullWidth variant='contained' type='submit'>
        Login
      </Button>
      <div className='flex justify-center items-center flex-wrap gap-2'>
        <Typography>New on our platform?</Typography>
        <Typography component={Link} href={getLocalizedUrl('/register', locale as Locale)} color='primary.main'>
          Create an account
        </Typography>
      </div>
      <Divider className='gap-2'>or</Divider>
      <SocialLoginButton />
    </form>
  )
}
