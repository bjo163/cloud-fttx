'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'

// Type Imports
import type { SubscriptionTemplateType } from '@/types/apps/subscriptionTypes'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import SubscriptionTemplateCard from './SubscriptionTemplateCard'
import SubscriptionTemplateDetailModal from './SubscriptionTemplateDetailModal'
import SubscriptionTemplateEditModal from './SubscriptionTemplateEditModal'
import SubscriptionTemplateTable from './SubscriptionTemplateTable'
import SubscriptionTemplateCreateModal from './SubscriptionTemplateCreateModal'

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

  return itemRank.passed
}

const columnHelper = createColumnHelper<SubscriptionTemplateType>()

const SubscriptionTemplateList = ({ templateData }: { templateData?: SubscriptionTemplateType[] }) => {
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(templateData ?? [])
  const [globalFilter, setGlobalFilter] = useState('')
  const [detailOpen, setDetailOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [selected, setSelected] = useState<SubscriptionTemplateType | undefined>(undefined)

  useEffect(() => {
    setData(templateData ?? [])
  }, [templateData])

  const handleView = (tpl: SubscriptionTemplateType) => {
    setSelected(tpl)
    setDetailOpen(true)
  }

  const handleEdit = (tpl: SubscriptionTemplateType) => {
    setSelected(tpl)
    setEditOpen(true)
  }

  const handleDelete = (tpl: SubscriptionTemplateType) => {
    if (window.confirm('Delete template ' + tpl.name + '?')) {
      setData(data.filter(d => d.id !== tpl.id))

      // TODO: Call OdooAPI.delete
    }
  }

  const handleSave = (form: Partial<SubscriptionTemplateType>) => {
    if (selected) {
      setData(data.map(d => (d.id === selected.id ? { ...d, ...form } : d)))
      setEditOpen(false)

      // TODO: Call OdooAPI.update
    }
  }

  const handleCreate = async (form: Partial<SubscriptionTemplateType>) => {
    // TODO: Integrasi OdooAPI.create
    setData(prev => [...prev, { ...form, id: Date.now().toString() } as SubscriptionTemplateType])
    setCreateOpen(false)

    // TODO: Tambah notifikasi sukses/gagal
  }

  const columns = useMemo<ColumnDef<SubscriptionTemplateType, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type='checkbox'
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type='checkbox'
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },
      columnHelper.accessor('id', { header: 'ID', cell: info => info.getValue() }),
      columnHelper.accessor('name', { header: 'Name', cell: info => info.getValue() }),
      columnHelper.accessor('active', { header: 'Active', cell: info => (info.getValue() ? 'Yes' : 'No') }),
      columnHelper.accessor('company', { header: 'Company', cell: info => info.getValue() }),
      columnHelper.accessor('numberOfDays', { header: 'Days', cell: info => info.getValue() }),
      columnHelper.accessor('requireSignature', {
        header: 'Signature',
        cell: info => (info.getValue() ? 'Yes' : 'No')
      }),
      columnHelper.accessor('requirePayment', { header: 'Payment', cell: info => (info.getValue() ? 'Yes' : 'No') }),
      columnHelper.accessor('totalAmount', { header: 'Total', cell: info => info.getValue() }),
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex gap-2'>
            <button title='View' onClick={() => handleView(row.original)}>
              <i className='tabler-eye' />
            </button>
            <button title='Edit' onClick={() => handleEdit(row.original)}>
              <i className='tabler-pencil' />
            </button>
            <button title='Delete' onClick={() => handleDelete(row.original)}>
              <i className='tabler-trash' />
            </button>
          </div>
        )
      }
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    initialState: { pagination: { pageSize: 10 } }
  })

  return (
    <Card>
      <CardContent>
        <SubscriptionTemplateCard templateData={templateData} />
        <Button variant='contained' onClick={() => setCreateOpen(true)} sx={{ mb: 2 }}>
          + Create Template
        </Button>
        <SubscriptionTemplateTable table={table} />
        <SubscriptionTemplateDetailModal open={detailOpen} onClose={() => setDetailOpen(false)} template={selected} />
        <SubscriptionTemplateEditModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          template={selected}
          onSave={handleSave}
        />
        <SubscriptionTemplateCreateModal
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          onCreate={handleCreate}
        />
      </CardContent>
    </Card>
  )
}

export default SubscriptionTemplateList
