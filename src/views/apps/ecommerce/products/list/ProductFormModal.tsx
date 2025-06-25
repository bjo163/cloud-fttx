import { useEffect, useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import type { ProductType } from '@/types/apps/ecommerceTypes'

type ProductFormModalProps = {
  open: boolean
  onClose: () => void
  onSubmit: (values: Partial<ProductType>) => void
  initialData?: Partial<ProductType>
  categories: string[]
  mode: 'add' | 'edit'
}

const defaultState: Partial<ProductType> = {
  productName: '',
  category: '',
  sku: '',
  price: '',
  status: 'active',
  stock: true
}

const ProductFormModal = ({ open, onClose, onSubmit, initialData, categories, mode }: ProductFormModalProps) => {
  const [form, setForm] = useState<Partial<ProductType>>(defaultState)
  const [error, setError] = useState('')

  useEffect(() => {
    setForm(initialData || defaultState)
    setError('')
  }, [open, initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.productName || !form.category || !form.price) {
      setError('Nama, kategori, dan harga wajib diisi')

      return
    }

    setError('')
    onSubmit(form)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle>{mode === 'add' ? 'Tambah Produk' : 'Edit Produk'}</DialogTitle>
      <DialogContent className='flex flex-col gap-4'>
        <TextField
          label='Nama Produk'
          name='productName'
          value={form.productName}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          select
          label='Kategori'
          name='category'
          value={form.category}
          onChange={handleChange}
          fullWidth
          required
        >
          {categories.map(cat => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <TextField label='SKU' name='sku' value={form.sku} onChange={handleChange} fullWidth type='number' />
        <TextField
          label='Harga'
          name='price'
          value={form.price}
          onChange={handleChange}
          fullWidth
          required
          type='number'
        />
        <TextField select label='Status' name='status' value={form.status} onChange={handleChange} fullWidth>
          <MenuItem value='active'>Aktif</MenuItem>
          <MenuItem value='inactive'>Nonaktif</MenuItem>
        </TextField>
        {error && <div className='text-error'>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button onClick={handleSubmit} variant='contained'>
          {mode === 'add' ? 'Tambah' : 'Simpan'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductFormModal
