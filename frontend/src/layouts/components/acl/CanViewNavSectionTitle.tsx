// ** React Imports
import { ReactNode, useContext } from 'react'

// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Types
import { NavSectionTitle } from 'src/@core/layouts/types'
import { permissions } from 'src/configs/acl'
import { useAuth } from 'src/hooks/useAuth'

interface Props {
  children: ReactNode
  navTitle?: NavSectionTitle
}

const can = (action: string|undefined, subject: string|undefined , user: any|undefined) => {
  const permission = permissions.find((p) => p.subject === subject)
  if(user && user.role === 'Admin') return true
  
  return user && action && permission && permission[user.role].includes(action)
}
const CanViewNavSectionTitle = (props: Props) => {
  // ** Props
  const { children, navTitle } = props

  // ** Hook
  const auth = useAuth()

  return navTitle && can(navTitle.action, navTitle.subject, auth.user) ? <>{children}</> : null
}

export default CanViewNavSectionTitle
