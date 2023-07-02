// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { http } from 'src/global/http'
import { RoleType } from 'src/types/apps/roleTypes'

interface DataParams {
  q: string
}
const searchRoles = (params: DataParams, data: any) => {
  const { q = '' } = params ?? ''
  const queryLowered = q.toLowerCase()

  const filteredData = data.filter((role: RoleType) => role.name.toLowerCase().includes(queryLowered))

  return {
    roles: filteredData,
    total: filteredData.length,
    params,
    allData: data
  }
}

// ** Fetch Invoices
export const fetchData = createAsyncThunk('roles/fetchData', async (params: DataParams) => {
  const response = await http.get(process.env.NEXT_PUBLIC_SERVER_URL + 'Roles')

  return searchRoles(params, response.data['$values'])
})

export const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.roles
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.total
    })
  }
})

export default rolesSlice.reducer
