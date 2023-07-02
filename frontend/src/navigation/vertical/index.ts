// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: 'mdi:home-outline',
      path: '/dashboards',
      action: 'read',
      subject: 'dashboard'
    },
    {
      sectionTitle: 'Apps & Pages',
      subject: 'actif',
      action: 'read'
    },
    {
      title: 'Assets',
      icon: 'mdi:file-document-outline',
      children: [
        {
          title: 'List',
          path: '/apps/actif/list',
          action: 'read',
          subject: 'actif'
        },
        {
          title: 'Add',
          path: '/apps/actif/add',
          action: 'create',
          subject: 'actif'
        }
      ]
    },
    {
      title: 'Products',
      icon: 'mdi:package',
      children: [
        {
          title: 'List',
          path: '/apps/product/list',
          action: 'read',
          subject: 'product'
        },
        {
          title: 'Add',
          path: '/apps/product/add',
          action: 'create',
          subject: 'product'
        }
      ]
    },
    {
      title: 'Employees',
      icon: 'mdi:account-group-outline',
      path: '/apps/employees',
      action: 'read',
      subject: 'employee'
    },

    {
      title: 'Suppliers',
      icon: 'mdi:truck-fast-outline',
      path: '/apps/fournisseurs',
      action: 'read',
      subject: 'fournisseur'
    },
    {
      title: 'Locations',
      icon: 'mdi:map-marker',
      path: '/apps/emplacements',
      action: 'read',
      subject: 'emplacement'
    },

    {
      sectionTitle: 'Super Admin'
    },
    {
      title: 'Users',
      icon: 'mdi:account-outline',
      path: '/apps/user/list'
    }
  ]
}

export default navigation
