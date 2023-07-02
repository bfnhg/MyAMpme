import { EmplacementType } from './emplacementType'
import { EmployeeType } from './employeeType'
import { Etat } from './Etat'
import { FournisseurType } from './fournisseurType'
import { ProductType } from './productType'
import { UsersType } from './userTypes'

export type ActifLayoutProps = {
  id: string | undefined
}

export type ActifUsersType = {
  nom: string
  prenom: string
  carteAccess: string
  role: string
  groupe: string
  telephone: string
  email: string
}

export type ActifType = {
  id: number
  etiquette: string
  nom: string
  prochaineMaintenance: Date
  assignedAt: Date
  assignedTo: EmployeeType
  managedBy: EmployeeType
  ownedBy: EmployeeType
  user: UsersType
  updater: UsersType
  createdAt: Date
  installedAt?: Date
  dateRecu: Date
  heureUtilisation: number
  numeroSerie: string
  updatedAt: Date
  etat: Etat
  emplacement: EmplacementType
  fonction: string
  fournisseur: FournisseurType
  groupe: string
  finGarantie: Date
  produit: ProductType
  maintenanceEffectueLe?: Date
  dateChangement: Date
  numBonCommande: string
  dateAchat: Date
}
