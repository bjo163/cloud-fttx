// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import type { SubscriptionTemplateType } from '@/types/apps/subscriptionTypes'

interface Props {
  open: boolean
  onClose: () => void
  template?: SubscriptionTemplateType
}

const SubscriptionTemplateDetailModal = ({ open, onClose, template }: Props) => {
  if (!template) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        Detail Template
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <i className='tabler-x' />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant='subtitle1'>
          <b>ID:</b> {template.id}
        </Typography>
        <Typography variant='subtitle1'>
          <b>Name:</b> {template.name}
        </Typography>
        <Typography variant='subtitle1'>
          <b>Active:</b> {template.active ? 'Yes' : 'No'}
        </Typography>
        <Typography variant='subtitle1'>
          <b>Company:</b> {template.company}
        </Typography>
        <Typography variant='subtitle1'>
          <b>Note:</b> <span dangerouslySetInnerHTML={{ __html: template.note }} />
        </Typography>
        <Typography variant='subtitle1'>
          <b>Days:</b> {template.numberOfDays}
        </Typography>
        <Typography variant='subtitle1'>
          <b>Require Signature:</b> {template.requireSignature ? 'Yes' : 'No'}
        </Typography>
        <Typography variant='subtitle1'>
          <b>Require Payment:</b> {template.requirePayment ? 'Yes' : 'No'}
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default SubscriptionTemplateDetailModal
