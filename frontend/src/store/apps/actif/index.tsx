// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { classNames } from 'src/global/ClassNames'
import { ActifType } from 'src/types/apps/actifTypes'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

const searchActif = (params: DataParams, data: any) => {
  const { q = ''} = params ?? ''
  const queryLowered = q.toLowerCase()
  
  
  const filteredData = data.filter(
    (actif:ActifType) =>{
      
      
      return  actif.numeroSerie.toLowerCase().includes(queryLowered) || actif.nom.toLowerCase().includes(queryLowered) || actif.numBonCommande?.toLowerCase().includes(queryLowered)
    }
  )


  return {
    actifs: filteredData,
    total: filteredData.length,
    params,
    allData: data.actifs
  }
}

// ** Fetch Products
export const fetchData = createAsyncThunk('actif/fetchData', async (params: DataParams) => {
 const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+classNames.actif).catch(err => err.response)
  
  if(response.status === 404) {
    
    
    return {
      actifs: [],
      total: 0,
      params,
      allData: []
    }
  }

   return  searchActif(params, response.data['$values'])
})
export const deleteActif = createAsyncThunk(
  'actif/deleteActif',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete(process.env.NEXT_PUBLIC_SERVER_URL+classNames.actif+`/${id}`)
    dispatch(fetchData(getState().actif.params))

    return response.data
  }
)
export const actifSlice = createSlice({
  name: 'actif',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.actifs
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default actifSlice.reducer