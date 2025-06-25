import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import type { Customer } from '@/types/apps/ecommerceTypes'

interface Props {
  open: boolean
  onClose: () => void
  customer?: Customer
}

const CustomerDetailModal = ({ open, onClose, customer }: Props) => {
  if (!customer) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Customer Detail</DialogTitle>
      <DialogContent dividers>
        <Typography variant='subtitle1'>Name: {customer.customer}</Typography>
        <Typography>Email: {customer.email}</Typography>
        <Typography>Country: {customer.country}</Typography>
        <Typography>Order: {customer.order}</Typography>
        <Typography>Total Spent: {customer.totalSpent}</Typography>
        {/* Tambahkan field lain jika perlu */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomerDetailModal
