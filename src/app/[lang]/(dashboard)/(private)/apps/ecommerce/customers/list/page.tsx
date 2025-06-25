import CustomerListTable from '@views/apps/ecommerce/customers/list/CustomerListTable'
import { getCustomerOdooData } from '@/app/server/actions'

const CustomerListTablePage = async () => {
  const data = await getCustomerOdooData()

  return <CustomerListTable initialData={data} />
}

export default CustomerListTablePage
