import React, { useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import type { ProfileData } from '@/libs/odoo/profileValidation'
import { isProfileComplete } from '@/libs/odoo/profileValidation'

interface ProfileIncompleteModalProps {
  open: boolean
  initialProfile: ProfileData
  onSave: (profile: ProfileData) => void
}

const ProfileIncompleteModal: React.FC<ProfileIncompleteModalProps> = ({ open, initialProfile, onSave }) => {
  const [profile, setProfile] = useState<ProfileData>(initialProfile)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    if (!isProfileComplete(profile)) {
      setError('Semua field wajib harus diisi!')

      return
    }

    setError(null)
    onSave(profile)
  }

  return (
    <Dialog open={open} disableEscapeKeyDown>
      <DialogTitle>Lengkapi Data Profile</DialogTitle>
      <DialogContent>
        <TextField
          margin='dense'
          label='Nama Lengkap'
          name='name'
          value={profile.name || ''}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          margin='dense'
          label='Email'
          name='email'
          value={profile.email || ''}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          margin='dense'
          label='No. Telepon'
          name='phone'
          value={profile.phone || ''}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          margin='dense'
          label='Negara'
          name='country'
          value={profile.country || ''}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          margin='dense'
          label='Foto Profil (URL atau base64)'
          name='image'
          value={profile.image ?? ''}
          onChange={handleChange}
          fullWidth
          required
        />
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} variant='contained' color='primary'>
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProfileIncompleteModal
