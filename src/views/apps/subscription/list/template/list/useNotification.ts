import { useCallback, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import React from 'react'

export function useNotification() {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success')

    const notify = useCallback((msg: string, sev: typeof severity = 'success') => {
        setMessage(msg)
        setSeverity(sev)
        setOpen(true)
    }, [])

    const Notification = (
        <Snackbar open= { open } autoHideDuration = { 3000} onClose = {() => setOpen(false)
}>
    <Alert onClose={ () => setOpen(false) } severity = { severity } sx = {{ width: '100%' }}>
        { message }
        </Alert>
        </Snackbar>
  )

return { notify, Notification }
}
