// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
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
    chat,
    email,
    invoice,
    calendar,
    permissions,
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
