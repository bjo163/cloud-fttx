// Type Imports

export type UnifiedMenuDataType = {
  label: any
  icon?: string
  href?: string
  target?: string
  exactMatch?: boolean
  activeUrl?: string

  disabled?: boolean
  isSection?: boolean
  suffix?: any
  prefix?: any
  children?: UnifiedMenuDataType[]
}

const menuData = (): UnifiedMenuDataType[] => [
  // Dashboards
  {
    label: 'Dashboards',
    icon: 'tabler-smart-home',
    children: [
      {
        label: 'Analytics',
        icon: 'tabler-trending-up',
        href: '/dashboards/analytics'
      },
      {
        label: 'eCommerce',
        icon: 'tabler-shopping-cart',
        href: '/dashboards/ecommerce'
      },
      { label: 'Academy', icon: 'tabler-school', href: '/dashboards/academy' },
      {
        label: 'Logistics',
        icon: 'tabler-truck',
        href: '/dashboards/logistics'
      }
    ]
  },

  {
    label: 'Front Pages',
    icon: 'tabler-files',
    children: [
      {
        label: 'Landing',
        href: '/front-pages/landing-page',
        target: '_blank'
      },
      { label: 'Pricing', href: '/front-pages/pricing', target: '_blank' },
      { label: 'Payment', href: '/front-pages/payment', target: '_blank' },
      { label: 'Checkout', href: '/front-pages/checkout', target: '_blank' },
      {
        label: 'Help Center',
        href: '/front-pages/help-center',
        target: '_blank'
      }
    ]
  },
  {
    label: 'Apps & Pages',
    isSection: true,
    children: [
      {
        label: 'CRM',
        icon: 'tabler-chart-pie-2',
        children: [
          {
            label: 'Subscription',
            icon: 'tabler-credit-card',
            children: [
              {
                label: 'Template',
                icon: 'tabler-template',
                href: '/apps/crm/subscription/template'
              },
              {
                label: 'Subscriber',
                icon: 'tabler-user',
                href: '/apps/crm/subscription/subscriber/list'
              }
            ]
          }
        ]
      },
      {
        label: 'ZMS',
        icon: 'tabler-network',
        children: [
          {
            label: 'Device',
            icon: 'tabler-device-desktop',
            href: '/apps/zms/device'
          },
          {
            label: 'Services',
            icon: 'tabler-settings',
            href: '/apps/zms/services'
          }
        ]
      },
      {
        label: 'eCommerce',
        icon: 'tabler-shopping-cart',
        children: [
          { label: 'Dashboard', href: '/apps/ecommerce/dashboard' },
          {
            label: 'Products',
            children: [
              { label: 'List', href: '/apps/ecommerce/products/list' },
              { label: 'Add', href: '/apps/ecommerce/products/add' },
              { label: 'Category', href: '/apps/ecommerce/products/category' }
            ]
          },
          {
            label: 'Orders',
            children: [
              { label: 'List', href: '/apps/ecommerce/orders/list' },
              {
                label: 'Details',
                href: '/apps/ecommerce/orders/details/5434',
                exactMatch: false,
                activeUrl: '/apps/ecommerce/orders/details'
              }
            ]
          },
          {
            label: 'Customers',
            children: [
              { label: 'List', href: '/apps/ecommerce/customers/list' },
              {
                label: 'Details',
                href: '/apps/ecommerce/customers/details/879861',
                exactMatch: false,
                activeUrl: '/apps/ecommerce/customers/details'
              }
            ]
          },
          { label: 'Manage Reviews', href: '/apps/ecommerce/manage-reviews' },
          { label: 'Referrals', href: '/apps/ecommerce/referrals' },
          { label: 'Settings', href: '/apps/ecommerce/settings' }
        ]
      },
      {
        label: 'Academy',
        icon: 'tabler-school',
        children: [
          { label: 'Dashboard', href: '/apps/academy/dashboard' },
          { label: 'My Courses', href: '/apps/academy/my-courses' },
          { label: 'Course Details', href: '/apps/academy/course-details' }
        ]
      },
      {
        label: 'Logistics',
        icon: 'tabler-truck',
        children: [
          { label: 'Dashboard', href: '/apps/logistics/dashboard' },
          { label: 'Fleet', href: '/apps/logistics/fleet' }
        ]
      },
      {
        label: 'Email',
        icon: 'tabler-mail',
        href: '/apps/email',
        exactMatch: false,
        activeUrl: '/apps/email'
      },
      { label: 'Chat', icon: 'tabler-message-circle-2', href: '/apps/chat' },
      { label: 'Calendar', icon: 'tabler-calendar', href: '/apps/calendar' },
      { label: 'Kanban', icon: 'tabler-copy', href: '/apps/kanban' },
      {
        label: 'Invoice',
        icon: 'tabler-file-description',
        children: [
          { label: 'List', icon: 'tabler-circle', href: '/apps/invoice/list' },
          {
            label: 'Preview',
            icon: 'tabler-circle',
            href: '/apps/invoice/preview/4987',
            exactMatch: false,
            activeUrl: '/apps/invoice/preview'
          },
          {
            label: 'Edit',
            icon: 'tabler-circle',
            href: '/apps/invoice/edit/4987',
            exactMatch: false,
            activeUrl: '/apps/invoice/edit'
          },
          { label: 'Add', icon: 'tabler-circle', href: '/apps/invoice/add' },
          { label: 'Subscription', icon: 'tabler-repeat', href: '/apps/subscription/list' },
          { label: 'Subscription Template', icon: 'tabler-template', href: '/apps/subscription/template/list' }
        ]
      },
      {
        label: 'User',
        icon: 'tabler-user',
        children: [
          { label: 'List', icon: 'tabler-circle', href: '/apps/user/list' },
          { label: 'View', icon: 'tabler-circle', href: '/apps/user/view' }
        ]
      },
      {
        label: 'Roles & Permissions',
        icon: 'tabler-lock',
        children: [
          { label: 'Roles', icon: 'tabler-circle', href: '/apps/roles' },
          { label: 'Permissions', icon: 'tabler-circle', href: '/apps/permissions' }
        ]
      },
      {
        label: 'Pages',
        icon: 'tabler-file',
        children: [
          { label: 'User Profile', icon: 'tabler-user-circle', href: '/pages/user-profile' },
          { label: 'Account Settings', icon: 'tabler-settings', href: '/pages/account-settings' },
          { label: 'FAQ', icon: 'tabler-help-circle', href: '/pages/faq' },
          { label: 'Pricing', icon: 'tabler-currency-dollar', href: '/pages/pricing' },
          {
            label: 'Miscellaneous',
            icon: 'tabler-file-info',
            children: [
              {
                label: 'Coming Soon',
                icon: 'tabler-circle',
                href: '/pages/misc/coming-soon',
                target: '_blank'
              },
              {
                label: 'Under Maintenance',
                icon: 'tabler-circle',
                href: '/pages/misc/under-maintenance',
                target: '_blank'
              },
              {
                label: '404 Not Found',
                icon: 'tabler-circle',
                href: '/pages/misc/404-not-found',
                target: '_blank'
              },
              {
                label: '401 Not Authorized',
                icon: 'tabler-circle',
                href: '/pages/misc/401-not-authorized',
                target: '_blank'
              }
            ]
          }
        ]
      },
      {
        label: 'Auth Pages',
        icon: 'tabler-shield-lock',
        children: [
          {
            label: 'Login',
            icon: 'tabler-circle',
            children: [
              {
                label: 'Login V1',
                icon: 'tabler-circle',
                href: '/pages/auth/login-v1',
                target: '_blank'
              },
              {
                label: 'Login V2',
                icon: 'tabler-circle',
                href: '/pages/auth/login-v2',
                target: '_blank'
              }
            ]
          },
          {
            label: 'Register',
            icon: 'tabler-circle',
            children: [
              {
                label: 'Register V1',
                icon: 'tabler-circle',
                href: '/pages/auth/register-v1',
                target: '_blank'
              },
              {
                label: 'Register V2',
                icon: 'tabler-circle',
                href: '/pages/auth/register-v2',
                target: '_blank'
              },
              {
                label: 'Register Multi Steps',
                icon: 'tabler-circle',
                href: '/pages/auth/register-multi-steps',
                target: '_blank'
              }
            ]
          },
          {
            label: 'Verify Email',
            icon: 'tabler-circle',
            children: [
              {
                label: 'Verify Email V1',
                icon: 'tabler-circle',
                href: '/pages/auth/verify-email-v1',
                target: '_blank'
              },
              {
                label: 'Verify Email V2',
                icon: 'tabler-circle',
                href: '/pages/auth/verify-email-v2',
                target: '_blank'
              }
            ]
          },
          {
            label: 'Forgot Password',
            icon: 'tabler-circle',
            children: [
              {
                label: 'Forgot Password V1',
                icon: 'tabler-circle',
                href: '/pages/auth/forgot-password-v1',
                target: '_blank'
              },
              {
                label: 'Forgot Password V2',
                icon: 'tabler-circle',
                href: '/pages/auth/forgot-password-v2',
                target: '_blank'
              }
            ]
          },
          {
            label: 'Reset Password',
            icon: 'tabler-circle',
            children: [
              {
                label: 'Reset Password V1',
                icon: 'tabler-circle',
                href: '/pages/auth/reset-password-v1',
                target: '_blank'
              },
              {
                label: 'Reset Password V2',
                icon: 'tabler-circle',
                href: '/pages/auth/reset-password-v2',
                target: '_blank'
              }
            ]
          },
          {
            label: 'Two Steps',
            icon: 'tabler-circle',
            children: [
              {
                label: 'Two Steps V1',
                icon: 'tabler-circle',
                href: '/pages/auth/two-steps-v1',
                target: '_blank'
              },
              {
                label: 'Two Steps V2',
                icon: 'tabler-circle',
                href: '/pages/auth/two-steps-v2',
                target: '_blank'
              }
            ]
          }
        ]
      },
      {
        label: 'Wizard Examples',
        icon: 'tabler-dots',
        children: [
          { label: 'Checkout', icon: 'tabler-circle', href: '/pages/wizard-examples/checkout' },
          {
            label: 'Property Listing',
            icon: 'tabler-circle',
            href: '/pages/wizard-examples/property-listing'
          },
          {
            label: 'Create Deal',
            icon: 'tabler-circle',
            href: '/pages/wizard-examples/create-deal'
          }
        ]
      },
      { label: 'Dialog Examples', icon: 'tabler-square', href: '/pages/dialog-examples' },
      {
        label: 'Widget Examples',
        icon: 'tabler-chart-bar',
        children: [
          { label: 'Basic', href: '/pages/widget-examples/basic' },
          { label: 'Advanced', icon: 'tabler-circle', href: '/pages/widget-examples/advanced' },
          {
            label: 'Statistics',
            icon: 'tabler-circle',
            href: '/pages/widget-examples/statistics'
          },
          { label: 'Charts', icon: 'tabler-circle', href: '/pages/widget-examples/charts' },
          { label: 'Actions', href: '/pages/widget-examples/actions' }
        ]
      }
    ]
  },
  {
    label: 'Forms & Tables',
    isSection: true,
    children: [
      { label: 'Form Layouts', icon: 'tabler-layout', href: '/forms/form-layouts' },
      { label: 'Form Validation', icon: 'tabler-checkup-list', href: '/forms/form-validation' },
      { label: 'Form Wizard', icon: 'tabler-git-merge', href: '/forms/form-wizard' },
      { label: 'React Table', icon: 'tabler-table', href: '/react-table' },
      {
        label: 'Form Elements',
        icon: 'tabler-checkbox',
        suffix: 'tabler-external-link',
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements`,
        target: '_blank'
      },
      {
        label: 'MUI Tables',
        icon: 'tabler-layout-board-split',
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/mui-table`,
        suffix: 'tabler-external-link',
        target: '_blank'
      }
    ]
  },
  {
    label: 'Charts & Misc',
    isSection: true,
    children: [
      {
        label: 'Charts',
        icon: 'tabler-chart-donut-2',
        children: [
          { label: 'Apex', icon: 'tabler-chart-ppf', href: '/charts/apex-charts' },
          { label: 'Recharts', icon: 'tabler-chart-sankey', href: '/charts/recharts' }
        ]
      },
      {
        label: 'Foundation',
        icon: 'tabler-cards',
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/foundation`,
        suffix: 'tabler-external-link',
        target: '_blank'
      },
      {
        label: 'Components',
        icon: 'tabler-atom',
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components`,
        suffix: 'tabler-external-link',
        target: '_blank'
      },
      {
        label: 'Menu Examples',
        icon: 'tabler-list-search',
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/menu-examples/overview`,
        suffix: 'tabler-external-link',
        target: '_blank'
      },
      {
        label: 'Raise Support',
        icon: 'tabler-lifebuoy',
        suffix: 'tabler-external-link',
        target: '_blank',
        href: 'https://pixinvent.ticksy.com'
      },
      {
        label: 'Documentation',
        icon: 'tabler-book-2',
        suffix: 'tabler-external-link',
        target: '_blank',
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}`
      },
      {
        label: 'Others',
        icon: 'tabler-menu-2',
        children: [
          {
            suffix: { label: 'New', color: 'info' },
            label: 'Item with Badge',
            icon: 'tabler-notification'
          },
          {
            label: 'External Link',
            icon: 'tabler-link',
            href: 'https://pixinvent.com',
            target: '_blank',
            suffix: 'tabler-external-link'
          },
          {
            label: 'Menu Levels',
            icon: 'tabler-menu-2',
            children: [
              { label: 'Menu Level 2', icon: 'tabler-circle' },
              {
                label: 'Menu Level 2 - 2',
                icon: 'tabler-circle',
                children: [
                  { label: 'Menu Level 3 - 1', icon: 'tabler-circle' },
                  { label: 'Menu Level 3 - 2', icon: 'tabler-circle' }
                ]
              }
            ]
          },
          { label: 'Disabled Menu', disabled: true }
        ]
      }
    ]
  }
]

export default menuData
