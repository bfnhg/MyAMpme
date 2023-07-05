// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/store/apps/user'
import product from 'src/store/apps/product'
import employee from 'src/store/apps/employee'
import actif from 'src/store/apps/actif'
import fournisseur from './apps/fournisseur'
import emplacement from './apps/emplacement'
import entreprise from './apps/entreprise'
import dashboard from './apps/dashboard'
import assetAging from './apps/dashboard/assetsAging'
import role from './apps/role'

export const store = configureStore({
  reducer: {
    user,
    product,
    employee,
    fournisseur,
    role,
    emplacement,
    entreprise,
    dashboard,
    assetAging,
    actif
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
