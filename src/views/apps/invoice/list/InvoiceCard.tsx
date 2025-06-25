'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { InvoiceType } from '@/types/apps/invoiceTypes'

// Vars
interface InvoiceCardProps {
  invoiceData?: InvoiceType[]
}

const InvoiceCard = ({ invoiceData }: InvoiceCardProps) => {
  // Hooks
  const isBelowMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const isBelowSmScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  // Hitung summary dari data Odoo
  const clients = new Set(invoiceData?.map(inv => inv.contact)).size
  const invoices = invoiceData?.length ?? 0

  const paid =
    invoiceData?.filter(inv => inv.invoiceStatus === 'paid').reduce((sum, inv) => sum + Number(inv.total), 0) ?? 0

  const unpaid =
    invoiceData?.filter(inv => inv.invoiceStatus !== 'paid').reduce((sum, inv) => sum + Number(inv.total), 0) ?? 0

  const data = [
    {
      title: clients,
      subtitle: 'Clients',
      icon: 'tabler-user'
    },
    {
      title: invoices,
      subtitle: 'Invoices',
      icon: 'tabler-file-invoice'
    },
    {
      title: `$${paid.toLocaleString()}`,
      subtitle: 'Paid',
      icon: 'tabler-checks'
    },
    {
      title: `$${unpaid.toLocaleString()}`,
      subtitle: 'Unpaid',
      icon: 'tabler-circle-off'
    }
  ]

  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          {data.map((item, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 3 }}
              key={index}
              className={classnames({
                '[&:nth-of-type(odd)>div]:pie-6 [&:nth-of-type(odd)>div]:border-ie':
                  isBelowMdScreen && !isBelowSmScreen,
                '[&:not(:last-child)>div]:pie-6 [&:not(:last-child)>div]:border-ie': !isBelowMdScreen
              })}
            >
              <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                  <Typography variant='h4'>{item.title}</Typography>
                  <Typography>{item.subtitle}</Typography>
                </div>
                <Avatar variant='rounded' className='is-[42px] bs-[42px]'>
                  <i className={classnames(item.icon, 'text-[26px]')} />
                </Avatar>
              </div>
              {isBelowMdScreen && !isBelowSmScreen && index < data.length - 2 && (
                <Divider
                  className={classnames('mbs-6', {
                    'mie-6': index % 2 === 0
                  })}
                />
              )}
              {isBelowSmScreen && index < data.length - 1 && <Divider className='mbs-6' />}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default InvoiceCard
