/*
 * If you change the following items in the config object, you will not see any effect in the local development server
 * as these are stored in the cookie (cookie has the highest priority over the themeConfig):
 * 1. mode
 * 2. skin
 * 3. semiDark
 * 4. layout
 * 5. navbar.contentWidth
 * 6. contentWidth
 * 7. footer.contentWidth
 *
 * To see the effect of the above items, you can click on the reset button from the Customizer
 * which is on the top-right corner of the customizer besides the close button.
 * This will reset the cookie to the values provided in the config object below.
 *
 * Another way is to clear the cookie from the browser's Application/Storage tab and then reload the page.
 */

// Third-party Imports
import type { ToastPosition } from 'react-toastify'

// Type Imports
import type { Mode, Skin, Layout, LayoutComponentPosition, LayoutComponentWidth } from '@core/types'

type Navbar = {
  type: LayoutComponentPosition
  contentWidth: LayoutComponentWidth
  floating: boolean
  detached: boolean
  blur: boolean
}

type Footer = {
  type: LayoutComponentPosition
  contentWidth: LayoutComponentWidth
  detached: boolean
}

export type Config = {
  templateName: string
  templateTitle?: string
  templateDescription?: string
  templateVersion?: string
  templateWebsite?: string
  templateDocumentation?: string
  templateSupport?: string
  HeroTagline?: string[]
  homePageUrl: string
  settingsCookieName: string
  mode: Mode
  skin: Skin
  semiDark: boolean
  layout: Layout
  layoutPadding: number
  navbar: Navbar
  contentWidth: LayoutComponentWidth
  compactContentWidth: number
  footer: Footer
  disableRipple: boolean
  toastPosition: ToastPosition
}

const themeConfig: Config = {
  templateName: 'ZMS',
  templateTitle: 'Zero Management System',
  templateDescription: 'Zero Management System is a modern and powerful management system built with Vue.js and MUI.',
  templateVersion: '1.0.0',
  templateWebsite: 'https://zero-management-system.com',
  templateDocumentation: 'https://docs.zero-management-system.com',
  templateSupport: 'https://support.zero-management-system.com',
  HeroTagline: [
    'Kelola Bisnis Lebih Mudah, Cepat, dan Aman',
    'Satu Dashboard, Semua Solusi Manajemen',
    'Automasi Proses, Maksimalkan Produktivitas',
    'Data Real-Time, Keputusan Lebih Cerdas',
    'Sistem Modern untuk Bisnis Masa Kini',
    'Integrasi Mudah, Kolaborasi Tanpa Batas',
    'Akses Dimana Saja, Kapan Saja',
    'Keamanan Data Terjamin, Privasi Terjaga',
    'Tingkatkan Efisiensi, Kurangi Biaya Operasional',
    'Solusi Manajemen All-in-One untuk Anda'
  ],
  homePageUrl: '/dashboards/crm',
  settingsCookieName: 'vuexy-mui-next-demo-1',
  mode: 'dark', // 'system', 'light', 'dark'
  skin: 'default', // 'default', 'bordered'
  semiDark: false, // true, false
  layout: 'vertical', // 'vertical', 'collapsed', 'horizontal'
  layoutPadding: 24, // Common padding for header, content, footer layout components (in px)
  compactContentWidth: 1440, // in px
  navbar: {
    type: 'fixed', // 'fixed', 'static'
    contentWidth: 'compact', // 'compact', 'wide'
    floating: true, //! true, false (This will not work in the Horizontal Layout)
    detached: true, //! true, false (This will not work in the Horizontal Layout or floating navbar is enabled)
    blur: true // true, false
  },
  contentWidth: 'compact', // 'compact', 'wide'
  footer: {
    type: 'static', // 'fixed', 'static'
    contentWidth: 'compact', // 'compact', 'wide'
    detached: true //! true, false (This will not work in the Horizontal Layout)
  },
  disableRipple: false, // true, false
  toastPosition: 'top-right' // 'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'
}

export default themeConfig
