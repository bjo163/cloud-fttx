'use client'

// React Imports
import { useEffect, useMemo, useState, useCallback } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import type { TextFieldProps } from '@mui/material/TextField'

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
import type { Locale } from '@configs/i18n'
import type { ProductType } from '@/types/apps/ecommerceTypes'

// Component Imports
import TableFilters from './TableFilters'
import CustomAvatar from '@core/components/mui/Avatar'
import CustomTextField from '@core/components/mui/TextField'
import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'
import ProductFormModal from './ProductFormModal'
import { createProductOdooData, updateProductOdooData, deleteProductOdooData } from '@/app/server/actions'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

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

type ProductWithActionsType = ProductType & {
  actions?: string
}

type ProductCategoryType = {
  [key: string]: {
    icon: string
    color: ThemeColor
  }
}

type productStatusType = {
  [key: string]: {
    title: string
    color: ThemeColor
  }
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

// Vars
const productCategoryObj: ProductCategoryType = {
  Accessories: { icon: 'tabler-headphones', color: 'error' },
  'Home Decor': { icon: 'tabler-smart-home', color: 'info' },
  Electronics: { icon: 'tabler-device-laptop', color: 'primary' },
  Shoes: { icon: 'tabler-shoe', color: 'success' },
  Office: { icon: 'tabler-briefcase', color: 'warning' },
  Games: { icon: 'tabler-device-gamepad-2', color: 'secondary' }
}

const productStatusObj: productStatusType = {
  Scheduled: { title: 'Scheduled', color: 'warning' },
  Published: { title: 'Publish', color: 'success' },
  Inactive: { title: 'Inactive', color: 'error' }
}

// Column Definitions
const columnHelper = createColumnHelper<ProductWithActionsType>()

function getProductTableColumns({
  handleEdit,
  handleDelete,
  productCategoryObj,
  productStatusObj,
  columnHelper,
  data,
  filteredData
}) {
  return [
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
    columnHelper.accessor('productName', {
      header: 'Product',
      cell: ({ row }) => (
        <div className='flex items-center gap-4'>
          <img src={row.original.image || undefined} width={38} height={38} className='rounded bg-actionHover' />
          <div className='flex flex-col'>
            <Typography className='font-medium' color='text.primary'>
              {row.original.productName}
            </Typography>
            <Typography variant='body2'>{row.original.productBrand}</Typography>
          </div>
        </div>
      )
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ row }) => {
        const cat = productCategoryObj[row.original.category] ?? { icon: 'tabler-box', color: 'default' }

        return (
          <div className='flex items-center gap-4'>
            <CustomAvatar skin='light' color={cat.color} size={30}>
              <i className={classnames(cat.icon, 'text-lg')} />
            </CustomAvatar>
            <Typography color='text.primary'>{row.original.category}</Typography>
          </div>
        )
      }
    }),
    columnHelper.accessor('stock', {
      header: 'Stock',
      cell: ({ row }) => <Switch defaultChecked={row.original.stock} />,
      enableSorting: false
    }),
    columnHelper.accessor('sku', {
      header: 'SKU',
      cell: ({ row }) => <Typography>{row.original.sku}</Typography>
    }),
    columnHelper.accessor('price', {
      header: 'Price',
      cell: ({ row }) => <Typography>{row.original.price}</Typography>
    }),
    columnHelper.accessor('qty', {
      header: 'QTY',
      cell: ({ row }) => <Typography>{row.original.qty}</Typography>
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => {
        const stat = productStatusObj[row.original.status] ?? { title: row.original.status, color: 'default' }

        return <Chip label={stat.title} variant='tonal' color={stat.color} size='small' />
      }
    }),
    columnHelper.accessor('actions', {
      header: 'Actions',
      cell: ({ row }) => (
        <div className='flex items-center'>
          <IconButton onClick={() => handleEdit(row.original)}>
            <i className='tabler-edit text-textSecondary' />
          </IconButton>
          <OptionMenu
            iconButtonProps={{ size: 'medium' }}
            iconClassName='text-textSecondary'
            options={[
              {
                text: 'Delete',
                icon: 'tabler-trash',
                menuItemProps: { onClick: () => handleDelete(row.original.id) }
              }
            ]}
          />
        </div>
      ),
      enableSorting: false
    })
  ]
}

function ProductTableFilterBar({ globalFilter, setGlobalFilter, table, handleAdd }) {
  return (
    <div className='flex flex-wrap justify-between gap-4 p-6'>
      <DebouncedInput
        value={globalFilter ?? ''}
        onChange={value => setGlobalFilter(String(value))}
        placeholder='Search Product'
        className='max-sm:is-full'
      />
      <div className='flex flex-wrap items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>
        <CustomTextField
          select
          value={table.getState().pagination.pageSize}
          onChange={e => table.setPageSize(Number(e.target.value))}
          className='flex-auto is-[70px] max-sm:is-full'
        >
          <MenuItem value='10'>10</MenuItem>
          <MenuItem value='25'>25</MenuItem>
          <MenuItem value='50'>50</MenuItem>
        </CustomTextField>
        <Button
          color='secondary'
          variant='tonal'
          className='max-sm:is-full is-auto'
          startIcon={<i className='tabler-upload' />}
        >
          Export
        </Button>
        <Button
          variant='contained'
          className='max-sm:is-full is-auto'
          startIcon={<i className='tabler-plus' />}
          onClick={handleAdd}
        >
          Add Product
        </Button>
      </div>
    </div>
  )
}

function ProductTableHeader({ table, classnames, flexRender }) {
  return (
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
  )
}

function ProductTableBody({ table, classnames, flexRender }) {
  if (table.getFilteredRowModel().rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
            No data available
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {table
        .getRowModel()
        .rows.slice(0, table.getState().pagination.pageSize)
        .map(row => (
          <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
    </tbody>
  )
}

function ProductListTableMain({
  data,
  globalFilter,
  setGlobalFilter,
  handleAdd,
  handleSubmit,
  modalOpen,
  setModalOpen,
  modalInitial,
  categories,
  modalMode,
  notif,
  table,
  classnames,
  flexRender
}) {
  return (
    <>
      <Card>
        <CardHeader title='Filters' />
        <TableFilters setData={setGlobalFilter} productData={data} />
        <Divider />
        <ProductTableFilterBar
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          table={table}
          handleAdd={handleAdd}
        />
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <ProductTableHeader table={table} classnames={classnames} flexRender={flexRender} />
            <ProductTableBody table={table} classnames={classnames} flexRender={flexRender} />
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
      <ProductFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={modalInitial}
        categories={categories}
        mode={modalMode}
      />
      {notif && <div className='text-success p-2'>{notif}</div>}
    </>
  )
}

const ProductListTable = ({ productData }: { productData?: ProductType[] }) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(...[productData])
  const [filteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [modalInitial, setModalInitial] = useState<Partial<ProductType> | undefined>(undefined)
  const [notif, setNotif] = useState<string>('')

  // Kategori unik dari data
  const categories = useMemo(() => Array.from(new Set((data || []).map(p => p.category).filter(Boolean))), [data])

  // Handler CRUD
  const handleAdd = useCallback(() => {
    setModalMode('add')
    setModalInitial(undefined)
    setModalOpen(true)
  }, [])

  const handleEdit = useCallback((row: ProductType) => {
    setModalMode('edit')
    setModalInitial(row)
    setModalOpen(true)
  }, [])

  const handleDelete = useCallback(async (id: number) => {
    const res = await deleteProductOdooData(id)

    if (res.success) {
      setData(data => data?.filter(product => product.id !== id))
      setNotif('Produk berhasil dihapus')
    } else {
      setNotif('Gagal hapus produk')
    }
  }, [])

  const handleSubmit = useCallback(
    async (values: Partial<ProductType>) => {
      if (modalMode === 'add') {
        const res = await createProductOdooData({
          name: values.productName,
          categ_id: categories.indexOf(values.category || '') !== -1 ? undefined : values.category,
          default_code: values.sku,
          list_price: values.price,
          active: values.status === 'active'
        })

        if (res.success) {
          setData(data => [
            ...(data || []),
            { ...values, id: res.result, stock: values.status === 'active' } as ProductType
          ])
          setNotif('Produk berhasil ditambah')
          setModalOpen(false)
        } else {
          setNotif('Gagal tambah produk')
        }
      } else if (modalMode === 'edit' && modalInitial?.id) {
        const res = await updateProductOdooData(modalInitial.id, {
          name: values.productName,
          categ_id: categories.indexOf(values.category || '') !== -1 ? undefined : values.category,
          default_code: values.sku,
          list_price: values.price,
          active: values.status === 'active'
        })

        if (res.success) {
          setData(data => (data || []).map(p => (p.id === modalInitial.id ? { ...p, ...values } : p)))
          setNotif('Produk berhasil diupdate')
          setModalOpen(false)
        } else {
          setNotif('Gagal update produk')
        }
      }
    },
    [categories, modalInitial, modalMode]
  )

  const columns = useMemo<ColumnDef<ProductWithActionsType, any>[]>(
    () =>
      getProductTableColumns({
        handleEdit,
        handleDelete,
        productCategoryObj,
        productStatusObj,
        columnHelper,
        data,
        filteredData
      }),
    [data, filteredData, handleEdit, handleDelete]
  )

  const table = useReactTable({
    data: filteredData as ProductType[],
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
    enableRowSelection: true,
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

  return (
    <ProductListTableMain
      data={data}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      handleAdd={handleAdd}
      handleSubmit={handleSubmit}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      modalInitial={modalInitial}
      categories={categories}
      modalMode={modalMode}
      notif={notif}
      table={table}
      classnames={classnames}
      flexRender={flexRender}
    />
  )
}

export default ProductListTable
