'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { ThemeColor } from '@core/types'
import type { Customer } from '@/types/apps/ecommerceTypes'
import type { Locale } from '@configs/i18n'

// Component Imports
import AddCustomerDrawer from './AddCustomerDrawer'
import CustomAvatar from '@core/components/mui/Avatar'
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'
import { useCustomerTable } from './useCustomerTable'
import CustomerDetailModal from './CustomerDetailModal'
import CustomerEditModal from './CustomerEditModal'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'
import { OdooAPI } from '@/libs/odoo'
import { updateCustomerOdooData, deleteCustomerOdooData } from '@/app/server/actions'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type PayementStatusType = {
  text: string
  color: ThemeColor
}

type StatusChipColorType = {
  color: ThemeColor
}

export const paymentStatus: { [key: number]: PayementStatusType } = {
  1: { text: 'Paid', color: 'success' },
  2: { text: 'Pending', color: 'warning' },
  3: { text: 'Cancelled', color: 'secondary' },
  4: { text: 'Failed', color: 'error' }
}

export const statusChipColor: { [key: string]: StatusChipColorType } = {
  Delivered: { color: 'success' },
  'Out for Delivery': { color: 'primary' },
  'Ready to Pickup': { color: 'info' },
  Dispatched: { color: 'warning' }
}

type ECommerceOrderTypeWithAction = Customer & {
  action?: string
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Column Definitions
const columnHelper = createColumnHelper<ECommerceOrderTypeWithAction>()

const CustomerListTable = ({ initialData }: { initialData: Customer[] }) => {
  const { data, setData, rowSelection, setRowSelection, globalFilter, setGlobalFilter } = useCustomerTable(initialData)
  const [customerUserOpen, setCustomerUserOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selected, setSelected] = useState<Customer | undefined>(undefined)

  // Hooks
  const { lang: locale } = useParams()

  // Ambil data customer dari OdooAPI (res.partner)
  useEffect(() => {
    async function fetchCustomers() {
      const fields = ['id', 'name', 'email', 'country_id', 'customer_rank']
      const odooData = await OdooAPI.searchRead('res.partner', [], fields)

      // Mapping ke type Customer
      const mapped = odooData.map((item: any) => ({
        id: item.id,
        customer: item.name,
        customerId: String(item.id),
        email: item.email,
        country: Array.isArray(item.country_id) ? item.country_id[1] : '',
        countryCode: '',
        countryFlag: '',
        order: item.customer_rank || 0,
        totalSpent: 0,
        avatar: '',
        status: '',
        contact: ''
      }))

      setData(mapped)
    }

    fetchCustomers()
  }, [])

  const columns = useMemo<ColumnDef<ECommerceOrderTypeWithAction, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('customer', {
        header: 'Customers',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            {getAvatar({ avatar: row.original.avatar, customer: row.original.customer })}
            <div className='flex flex-col items-start'>
              <Typography
                component={Link}
                color='text.primary'
                href={getLocalizedUrl(`/apps/ecommerce/customers/details/${row.original.customerId}`, locale as Locale)}
                className='font-medium hover:text-primary'
              >
                {row.original.customer}
              </Typography>
              <Typography variant='body2'>{row.original.email}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('customerId', {
        header: 'Customer Id',
        cell: ({ row }) => <Typography color='text.primary'>#{row.original.customerId}</Typography>
      }),
      columnHelper.accessor('country', {
        header: 'Country',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <img src={row.original.countryFlag} height={22} />
            <Typography>{row.original.country}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('order', {
        header: 'Orders',
        cell: ({ row }) => <Typography>{row.original.order}</Typography>
      }),
      columnHelper.accessor('totalSpent', {
        header: 'Total Spent',
        cell: ({ row }) => (
          <Typography className='font-medium' color='text.primary'>
            ${row.original.totalSpent.toLocaleString()}
          </Typography>
        )
      }),
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex gap-2'>
            <Button size='small' variant='outlined' color='info' onClick={() => handleView(row.original)}>
              <i className='tabler-eye' />
            </Button>
            <Button size='small' variant='outlined' color='warning' onClick={() => handleEdit(row.original)}>
              <i className='tabler-pencil' />
            </Button>
            <Button size='small' variant='outlined' color='error' onClick={() => handleDelete(row.original)}>
              <i className='tabler-trash' />
            </Button>
          </div>
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: data as Customer[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const getAvatar = (params: Pick<Customer, 'avatar' | 'customer'>) => {
    const { avatar, customer } = params

    if (avatar) {
      return <CustomAvatar src={avatar} skin='light' size={34} />
    } else {
      return (
        <CustomAvatar skin='light' size={34}>
          {getInitials(customer as string)}
        </CustomAvatar>
      )
    }
  }

  // Handler aksi (dummy, bisa diisi modal/detail/edit sesuai task 4-6)
  const handleView = (row: Customer) => {
    setSelected(row)
    setDetailOpen(true)
  }

  const handleEdit = (row: Customer) => {
    setSelected(row)
    setEditOpen(true)
  }

  // Refactor: handler delete terpisah
  const handleDelete = async (row: Customer) => {
    // Integrasi OdooAPI.delete
    const res = await deleteCustomerOdooData(Number(row.id))

    if (res.success) {
      setData(data.filter(d => d.id !== row.id))

      // TODO: tampilkan notifikasi sukses
    } else {
      // TODO: tampilkan notifikasi gagal
      alert('Delete gagal: ' + (res.error || 'Unknown error'))
    }
  }

  const handleEditSave = async (data: Partial<Customer>) => {
    if (!selected) return

    // Mapping data ke format Odoo
    const values: any = {
      name: data.customer,
      email: data.email

      // country_id: ... // mapping jika country_id diperlukan
      // Tambahkan mapping field lain sesuai kebutuhan
    }

    const res = await updateCustomerOdooData(Number(selected.id), values)

    if (res.success) {
      // Update state lokal
      setData(prev => prev.map(c => (c.id === selected.id ? { ...c, ...data } : c)))
      setEditOpen(false)

      // TODO: tampilkan notifikasi sukses
    } else {
      // TODO: tampilkan notifikasi gagal
      alert('Update gagal: ' + (res.error || 'Unknown error'))
    }
  }

  return (
    <>
      <Card>
        <CardContent className='flex justify-between flex-wrap max-sm:flex-col sm:items-center gap-4'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search'
            className='max-sm:is-full'
          />
          <div className='flex max-sm:flex-col items-start sm:items-center gap-4 max-sm:is-full'>
            <CustomTextField
              select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className='is-full sm:is-[70px]'
            >
              <MenuItem value='10'>10</MenuItem>
              <MenuItem value='25'>25</MenuItem>
              <MenuItem value='50'>50</MenuItem>
              <MenuItem value='100'>100</MenuItem>
            </CustomTextField>
            <Button
              variant='tonal'
              className='max-sm:is-full'
              color='secondary'
              startIcon={<i className='tabler-upload' />}
            >
              Export
            </Button>
            <Button
              variant='contained'
              color='primary'
              className='max-sm:is-full'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setCustomerUserOpen(!customerUserOpen)}
            >
              Add Customer
            </Button>
          </div>
        </CardContent>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
      <AddCustomerDrawer
        open={customerUserOpen}
        handleClose={() => setCustomerUserOpen(!customerUserOpen)}
        setData={setData}
        customerData={data}
      />
      <CustomerDetailModal open={detailOpen} onClose={() => setDetailOpen(false)} customer={selected} />
      <CustomerEditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        customer={selected}
        onSave={handleEditSave}
      />
    </>
  )
}

export default CustomerListTable
