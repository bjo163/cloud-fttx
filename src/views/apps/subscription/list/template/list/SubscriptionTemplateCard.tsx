// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import classnames from 'classnames'

import type { SubscriptionTemplateType } from '@/types/apps/subscriptionTypes'

interface Props {
  templateData?: SubscriptionTemplateType[]
}

const SubscriptionTemplateCard = ({ templateData }: Props) => {
  const total = templateData?.length ?? 0
  const active = templateData?.filter(t => t.active).length ?? 0
  const inactive = templateData?.filter(t => !t.active).length ?? 0

  const data = [
    { title: total, subtitle: 'Total Templates', icon: 'tabler-template' },
    { title: active, subtitle: 'Active', icon: 'tabler-checks' },
    { title: inactive, subtitle: 'Inactive', icon: 'tabler-circle-off' }
  ]

  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          {data.map((item, index) => (
            <Grid size={{ xs: 12, sm: 4 }} key={index}>
              <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                  <Typography variant='h4'>{item.title}</Typography>
                  <Typography>{item.subtitle}</Typography>
                </div>
                <Avatar variant='rounded' className='is-[42px] bs-[42px]'>
                  <i className={classnames(item.icon, 'text-[26px]')} />
                </Avatar>
              </div>
              {index < data.length - 1 && <Divider className='mbs-6' />}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SubscriptionTemplateCard
