// Import all Horizontal Nav components and export them
import Menu from '../components/horizontal-menu/Menu'
import SubMenu from '../components/horizontal-menu/SubMenu'
import MenuItem from '../components/horizontal-menu/MenuItem'
import HorizontalNav from '../components/horizontal-menu/HorizontalNav'
import type { MenuProps } from '../components/horizontal-menu/Menu'
import type { SubMenuProps } from '../components/horizontal-menu/SubMenu'
import type { MenuItemProps } from '../components/horizontal-menu/MenuItem'
import type { HorizontalNavProps } from '../components/horizontal-menu/HorizontalNav'
import { GenerateHorizontalMenu } from '@components/GenerateMenu'

export default HorizontalNav
export { Menu, MenuItem, SubMenu, GenerateHorizontalMenu }
export type { HorizontalNavProps, MenuProps, MenuItemProps, SubMenuProps }
