// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { classNames } from 'src/global/ClassNames'
import { http } from 'src/global/http'

interface DataParams {
  q: string
  role: string
  status: string
  currentPlan: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

const searchUsers = (params: DataParams, data: any) => {
  const { q = '', role = null, status = null } = params ?? ''

  const queryLowered = q.toLowerCase()
  const booleanToString = (value: boolean) => (value ? 'true' : 'false')

  const users = data.map((user: any) => {
    return {
      ...user,
      role: user.roles.$values[0]
    }
  })

  const filteredData = users.filter(
    user =>
      (user.fullName.toLowerCase().includes(queryLowered) || user.email.toLowerCase().includes(queryLowered)) &&
      (role ? user.role.toLowerCase() === role : true) &&
      (status ? booleanToString(user.active) === status : true)
  )

  return {
    users: filteredData,
    total: filteredData.length,
    params,
    allData: data
  }
}

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async (params: DataParams) => {
  const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + classNames.users).catch(err => err.response)

  if (response.status === 404) {
    return {
      users: [],
      total: 0,
      params,
      allData: []
    }
  }

  return searchUsers(params, response.data['$values'])
})

// ** Add User
export const addUser = createAsyncThunk(
  'appUsers/addUser',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await axios.post('/apps/users/add-user', {
      data
    })
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

// ** Delete User
export const deleteUser = createAsyncThunk(
  'appUsers/deleteUser',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await http.delete(`Users/${id}`)
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appUsersSlice.reducer
