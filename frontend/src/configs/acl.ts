import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete' | 'import'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

type Roles = 'Admin' | 'Responsable' | 'Membre'

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

export const permissions = [
  {
    subject: 'actif',
    Responsable: ['read', 'create', 'update'],
    Membre: ['read']
  },
  {
    subject: 'dashboard',
    Responsable: ['manage'],
    Membre: ['read']
  },
  {
    subject: 'fournisseur',
    Responsable: ['read', 'create', 'update'],
    Membre: ['read']
  },
  {
    subject: 'product',
    Responsable: ['read', 'create', 'update'],
    Membre: ['read']
  },
  {
    subject: 'employee',
    Responsable: ['read', 'create', 'update'],
    Membre: ['read']
  },
  {
    subject: 'emplacement',
    Responsable: ['read', 'create', 'update'],
    Membre: ['read']
  }
]

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)
  if (role === 'Admin') {
    can('manage', 'all')
  } else {
    permissions.forEach(rule => {
      if (rule[role]) {
        can(rule[role], rule.subject)
      }
    })
  }

  return rules
}

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  const ab = new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })

  return ab
}
export const buildAbilites = (role: string) => {
  const abilities = permissions.map(rule => {
    return buildAbilityFor(role, rule.subject)
  })

  return abilities
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
