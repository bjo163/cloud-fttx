// MUI Imports
import React, { useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'

import type { SubscriptionTemplateType } from '@/types/apps/subscriptionTypes'

interface Props {
  open: boolean
  onClose: () => void
  template?: SubscriptionTemplateType
  onSave: (data: Partial<SubscriptionTemplateType>) => void
}

// Fungsi validasi form
const validateForm = (form: Partial<SubscriptionTemplateType>) => {
  const errors: Record<string, string> = {}

  if (!form.name || form.name.trim() === '') errors.name = 'Name wajib diisi'

  if (!form.numberOfDays || isNaN(Number(form.numberOfDays))) errors.numberOfDays = 'Days wajib angka'

  if (form.totalAmount === undefined || form.totalAmount === null || isNaN(Number(form.totalAmount)))
    errors.totalAmount = 'Total wajib angka'

  return errors
}

const SubscriptionTemplateEditModal = ({ open, onClose, template, onSave }: Props) => {
  const [form, setForm] = useState<Partial<SubscriptionTemplateType>>(template || {})
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Sync form with template changes
  React.useEffect(() => {
    setForm(template || {})
    setErrors({})
  }, [template])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    const validation = validateForm(form)

    setErrors(validation)

    if (Object.keys(validation).length === 0) {
      onSave(form)
    }
  }

  if (!template) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        Edit Template
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <i className='tabler-x' />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          margin='normal'
          label='Name'
          name='name'
          value={form.name || ''}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          margin='normal'
          label='Days'
          name='numberOfDays'
          value={form.numberOfDays || ''}
          onChange={handleChange}
          error={!!errors.numberOfDays}
          helperText={errors.numberOfDays}
        />
        <TextField
          fullWidth
          margin='normal'
          label='Total'
          name='totalAmount'
          value={form.totalAmount || ''}
          onChange={handleChange}
          error={!!errors.totalAmount}
          helperText={errors.totalAmount}
        />
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

export default SubscriptionTemplateEditModal
