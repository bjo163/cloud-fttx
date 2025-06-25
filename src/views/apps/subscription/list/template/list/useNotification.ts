import React, { useCallback, useState } from 'react'

import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

// AlertColor type from MUI
export type AlertColor = 'success' | 'info' | 'warning' | 'error'

const Alert = React.forwardRef<HTMLDivElement, any>(function Alert(props, ref) {
  return React.createElement(MuiAlert, { elevation: 6, ref, variant: 'filled', ...props })
})

export function useNotification() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<AlertColor>('success')

  const notify = useCallback((msg: string, sev: AlertColor = 'success') => {
    setMessage(msg)
    setSeverity(sev)
    setOpen(true)
  }, [])

  const Notification = (
    React.createElement(Snackbar, { open, autoHideDuration: 3000, onClose: () => setOpen(false) },
      React.createElement(Alert, { onClose: () => setOpen(false), severity, sx: { width: '100%' } }, message)
    )
  )

  return { notify, Notification }
}
