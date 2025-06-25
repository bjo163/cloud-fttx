// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import ProductListTable from '@views/apps/ecommerce/products/list/ProductListTable'
import ProductCard from '@views/apps/ecommerce/products/list/ProductCard'

// Data Imports
import { getProductOdooData } from '@/app/server/actions'
import type { ProductType } from '@/types/apps/ecommerceTypes'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/ecommerce` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getEcommerceData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/ecommerce`)

  if (!res.ok) {
    throw new Error('Failed to fetch ecommerce data')
  }

  return res.json()
} */

const mapOdooProductToProductType = (odooProduct: any): ProductType => ({
  id: odooProduct.id,
  productName: odooProduct.name ?? '-',
  category: Array.isArray(odooProduct.categ_id) ? odooProduct.categ_id[1] : '-',
  stock: Boolean(odooProduct.active),
  sku: odooProduct.default_code ?? '',
  price: odooProduct.list_price?.toString() ?? '0',
  qty: 0, // Odoo product.template tidak punya qty, perlu ambil dari stock.quant jika ingin real stock
  status: odooProduct.active ? 'active' : 'inactive',
  image: odooProduct.image_1920 ? `data:image/png;base64,${odooProduct.image_1920}` : '',
  productBrand: '' // Tidak ada field brand di product.template default
})

const eCommerceProductsList = async () => {
  // Ambil data produk dari Odoo
  const odooProducts = await getProductOdooData()
  const products: ProductType[] = Array.isArray(odooProducts) ? odooProducts.map(mapOdooProductToProductType) : []

  // Summary
  const total = products.length
  const active = products.filter(p => p.stock).length
  const inactive = products.filter(p => !p.stock).length
  const categories = [...new Set(products.map(p => p.category))].length

  const summary = [
    { title: 'Total Produk', value: total.toString(), icon: 'tabler-box', desc: 'Produk' },
    { title: 'Aktif', value: active.toString(), icon: 'tabler-check', desc: 'Aktif' },
    { title: 'Nonaktif', value: inactive.toString(), icon: 'tabler-x', desc: 'Nonaktif' },
    { title: 'Kategori', value: categories.toString(), icon: 'tabler-category', desc: 'Kategori' }
  ]

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ProductCard summary={summary} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <ProductListTable productData={products} />
      </Grid>
    </Grid>
  )
}

export default eCommerceProductsList
