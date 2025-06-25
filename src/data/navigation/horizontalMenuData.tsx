// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes'
import type { UnifiedMenuDataType } from './menuData'
import menuData from '../../data/navigation/menuData'

// Helper: mapping dari unified ke horizontal jika perlu
function mapToHorizontalMenu(data: UnifiedMenuDataType[]): HorizontalMenuDataType[] {
  return data.map(item => {
    const { children, exactMatch, ...rest } = item

    // Hanya masukkan exactMatch jika true, karena tipe horizontal tidak menerima false
    const mapped: any = {
      ...rest,
      ...(exactMatch === true ? { exactMatch } : {})
    }

    // Tambahkan mapping suffix seperti vertical
    if (item.label && item.label === rest.label && rest.icon === 'tabler-smart-home' && children) {
      mapped.suffix = { label: '5', color: 'error' }
    }

    if (children && children.length > 0) {
      mapped.children = mapToHorizontalMenu(children)
    }

    return mapped
  })
}

const horizontalMenuData = menuData()

export default horizontalMenuData
