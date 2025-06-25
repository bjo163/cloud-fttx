// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'
import type { UnifiedMenuDataType } from './menuData'
import menuData from './menuData'

// Helper: mapping dari unified ke vertical jika perlu
function mapToVerticalMenu(data: UnifiedMenuDataType[]): VerticalMenuDataType[] {
  return data.map(item => {
    const { children, ...rest } = item

    // Contoh: jika ingin icon bulat di semua children dashboard
    const mapped = { ...rest } as any

    if (item.label && item.label === rest.label && rest.icon === 'tabler-smart-home' && children) {
      mapped.suffix = { label: '5', color: 'error' }
    }

    if (children && children.length > 0) {
      mapped.children = mapToVerticalMenu(children)
    }

    return mapped
  })
}

const verticalMenuData = (): VerticalMenuDataType[] => {
  const unified = menuData()

  // Jika ingin filter/transform khusus vertical, lakukan di sini
  return mapToVerticalMenu(unified)
}

export default verticalMenuData
