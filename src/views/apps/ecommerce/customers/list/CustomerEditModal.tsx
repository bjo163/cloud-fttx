import { useState, useEffect } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import type { Customer } from '@/types/apps/ecommerceTypes'

interface Props {
  open: boolean
  onClose: () => void
  customer?: Customer
  onSave: (data: Partial<Customer>) => void
}

const CustomerEditModal = ({ open, onClose, customer, onSave }: Props) => {
  const [form, setForm] = useState<Partial<Customer>>(customer || {})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    setForm(customer || {})
  }, [customer])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    if (!form.customer || form.customer.trim() === '') newErrors.customer = 'Name wajib diisi'
    if (!form.email || form.email.trim() === '') newErrors.email = 'Email wajib diisi'
    if (!form.country || form.country.trim() === '') newErrors.country = 'Country wajib diisi'

    // Tambahkan validasi lain jika perlu
    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSave(form)
  }

  if (!customer) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Edit Customer</DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          margin='normal'
          label='Name'
          name='customer'
          value={form.customer || ''}
          onChange={handleChange}
          error={!!errors.customer}
          helperText={errors.customer}
        />
        <TextField
          fullWidth
          margin='normal'
          label='Email'
          name='email'
          value={form.email || ''}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          margin='normal'
          label='Country'
          name='country'
          value={form.country || ''}
          onChange={handleChange}
          error={!!errors.country}
          helperText={errors.country}
        />
        {/* Tambahkan field lain jika perlu */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomerEditModal
