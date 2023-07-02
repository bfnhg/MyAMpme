import { UsersType } from './userTypes'

export type ProductType = {
  id: number
  nomModele: string
  classe: string
  coutAcquisition: number
  manufacturier: string
  mtbf: number
  numeroModele: string
  periodeGarantie: number
  finVie: Date
  finSupport: Date
  createdAt: Date
  updatedAt: Date
  creator: UsersType
  updater: UsersType
}
