// Component Imports
import UserList from '@views/apps/user/list'

// Data Imports
import { OdooAPI } from '@/libs/odoo'

export default async function UserListApp() {
  // Ambil data user Odoo langsung dari OdooAPI
  const odooUsers = await OdooAPI.searchRead(
    'res.users',
    [],
    [
      'id',
      'name',
      'login',
      'email',
      'groups_id',
      'active',
      'company_id',
      'phone',
      'mobile',
      'login_date',
      'create_date',
      'write_date',
      'partner_id',
      'image_1920',
      'job_title',
      'lang',
      'tz',
      'signature'
    ]
  )

  console.log('Odoo Users (res.users):', odooUsers)

  // Mapping ke UsersType agar sesuai kebutuhan komponen
  const data = odooUsers.map((user: any) => {
    return {
      id: user.id,
      name: user.name ?? '',
      login: user.login ?? '',
      email: user.email ?? '',
      active: user.active ? 'Active' : 'Inactive',
      company_id: Array.isArray(user.company_id) ? user.company_id[1] : '',
      phone: user.phone ?? '',
      mobile: user.mobile ?? '',
      login_date: user.login_date ?? '',
      create_date: user.create_date ?? '',
      write_date: user.write_date ?? '',
      partner_id: Array.isArray(user.partner_id) ? user.partner_id[1] : '',
      image_1920: user.image_1920 ?? '',
      job_title: user.job_title ?? '',
      lang: user.lang ?? '',
      tz: user.tz ?? '',
      signature: user.signature ?? ''
    }
  })

  return <UserList userData={data} />
}
