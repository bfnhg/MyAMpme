// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Entreprises
export const fetchData = createAsyncThunk('appEntreprises/fetchData', async (params: DataParams) => {
  const response = await axios.get('/apps/entreprises/list', {
    params
  })

  return response.data
})

// ** Add Entreprise
export const addEntreprise = createAsyncThunk(
  'appEntreprises/addEntreprise',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await axios.post('/apps/entreprises/add-entreprise', {
      data
    })
    dispatch(fetchData(getState().entreprise.params))

    return response.data
  }
)

// ** Delete Entreprise
export const deleteEntreprise = createAsyncThunk(
  'appEntreprises/deleteEntreprise',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete('/apps/entreprises/delete', {
      data: id
    })
    dispatch(fetchData(getState().entreprise.params))

    return response.data
  }
)

export const appEntreprisesSlice = createSlice({
  name: 'appEntreprises',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.entreprises
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appEntreprisesSlice.reducer
