import { useState } from 'react'

import type { Customer } from '@/types/apps/ecommerceTypes'

export function useCustomerTable(initialData: Customer[] = []) {
  const [data, setData] = useState<Customer[]>(initialData)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  // Tidak perlu fetch lagi, data sudah dari server

  return {
    data,
    setData,
    rowSelection,
    setRowSelection,
    globalFilter,
    setGlobalFilter
  }
}
