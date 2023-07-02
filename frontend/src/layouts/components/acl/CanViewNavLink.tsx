// ** React Imports
import { ReactNode, useContext } from 'react'

// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Types
import { NavLink } from 'src/@core/layouts/types'
import { permissions } from 'src/configs/acl'
import { useAuth } from 'src/hooks/useAuth'

interface Props {
  navLink?: NavLink
  children: ReactNode
}
const can = (action: string|undefined, subject: string|undefined , user: any|undefined) => {
  const permission = permissions.find((p) => p.subject === subject)
  if(user && user.role === 'Admin') return true

  return subject && user && action && permission && permission[user.role].includes(action)
}

const CanViewNavLink = (props: Props) => {
  // ** Props
  const { children, navLink } = props

  // ** Hook
  const auth = useAuth()

  return navLink && can(navLink.action, navLink.subject, auth.user) ? <>{children}</> : null
}

export default CanViewNavLink
