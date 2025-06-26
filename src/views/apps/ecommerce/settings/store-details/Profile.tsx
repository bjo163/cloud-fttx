// MUI Imports
import { useState } from 'react'

import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Alert from '@mui/material/Alert'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const Profile = () => {
  const [fields, setFields] = useState({
    storeName: '',
    phone: '',
    email: '',
    senderEmail: ''
  })

  const [errors, setErrors] = useState({
    storeName: '',
    phone: '',
    email: '',
    senderEmail: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors: typeof errors = { storeName: '', phone: '', email: '', senderEmail: '' }

    if (!fields.storeName) newErrors.storeName = 'Store name wajib diisi'
    if (!fields.phone) newErrors.phone = 'Phone wajib diisi'
    if (!fields.email) newErrors.email = 'Email wajib diisi'
    if (!fields.senderEmail) newErrors.senderEmail = 'Sender email wajib diisi'
    setErrors(newErrors)

    return Object.values(newErrors).every(v => !v)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    if (validate()) {
      // TODO: submit ke backend/odoo
      alert('Profile valid dan siap disimpan!')
    }
  }

  return (
    <Card>
      <CardHeader title='Profile' />
      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                fullWidth
                label='Store name'
                placeholder='ABCD'
                name='storeName'
                value={fields.storeName}
                onChange={handleChange}
                error={!!errors.storeName && submitted}
                helperText={submitted && errors.storeName}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                fullWidth
                label='Phone'
                placeholder='+(123) 456-7890'
                name='phone'
                value={fields.phone}
                onChange={handleChange}
                error={!!errors.phone && submitted}
                helperText={submitted && errors.phone}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                fullWidth
                label='Store contact email'
                placeholder='johndoe@email.com'
                name='email'
                value={fields.email}
                onChange={handleChange}
                error={!!errors.email && submitted}
                helperText={submitted && errors.email}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                fullWidth
                label='Sender email'
                placeholder='johndoe@email.com'
                name='senderEmail'
                value={fields.senderEmail}
                onChange={handleChange}
                error={!!errors.senderEmail && submitted}
                helperText={submitted && errors.senderEmail}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Alert severity='warning' icon={<i className='tabler-bell' />} className='font-medium text-lg'>
                Confirm that you have access to johndoe@gmail.com in sender email settings.
              </Alert>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <button type='submit' style={{ marginTop: 16, padding: '8px 24px', fontWeight: 600 }}>
                Simpan Profile
              </button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Profile
