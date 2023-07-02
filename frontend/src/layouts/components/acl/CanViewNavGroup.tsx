// ** React Imports
import { ReactNode, useContext } from 'react'

// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Types
import { NavGroup, NavLink } from 'src/@core/layouts/types'
import { useAuth } from 'src/hooks/useAuth'
import { permissions } from 'src/configs/acl'

interface Props {
  navGroup?: NavGroup
  children: ReactNode
}

const can = (action: string|undefined, subject: string|undefined , user: any|undefined) => {
  const permission = permissions.find((p) => p.subject === subject)
  if(user && user.role === 'Admin') return true

  return user && action && permission && permission[user.role].includes(action)
}

const CanViewNavGroup = (props: Props) => {
  // ** Props
  const { children, navGroup } = props

  // ** Hook
  const auth = useAuth()
  const canViewMenuGroup = (item: NavGroup) => {
    const hasAnyVisibleChild =
      item.children && item.children.some((i: NavLink) => 

can(i.action, i.subject, auth.user))

    if (!(item.action && item.subject)) {
      return hasAnyVisibleChild
    }

    return can(item.action, item.subject, auth.user)  && hasAnyVisibleChild
  
  }

  return navGroup && canViewMenuGroup(navGroup) ? <>{children}</> : null
}

export default CanViewNavGroup
