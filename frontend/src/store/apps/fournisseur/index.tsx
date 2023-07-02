// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { http } from 'src/global/http'

const CLASS_NAME = 'Fournisseurs'
interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

function searchFournisseur(params: DataParams, data: any) {
  const { q = ''} = params ?? ''
  const queryLowered = q.toLowerCase()
  const filteredData = data.filter(fournisseur =>
      fournisseur.name.toLowerCase().includes(queryLowered) || fournisseur.email.toLowerCase().includes(queryLowered)
  )

  return {
    fournisseurs: filteredData,
    total: filteredData.length,
    params,
    allData: data
  }
}

// ** Fetch Fournisseurs
export const fetchData = createAsyncThunk('fournisseur/fetchData', async (params: DataParams) => {
 const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+CLASS_NAME).catch(err => err.response)
   if(response.status === 404) {
    
    
   return {
      allData: [],
      fournisseurs: [],
      total: 0,
      params
    }
  }
  

  return searchFournisseur(params, response.data['$values'])
})

// ** Add Fournisseur
export const addFournisseur = createAsyncThunk(
  'fournisseur/addFournisseur',
  async (data: { [key: string]: number | string | Date }, { getState, dispatch }: Redux) => {
    const response = await http.post(process.env.NEXT_PUBLIC_SERVER_URL+CLASS_NAME, {
      ...data,
      
    })
    dispatch(fetchData(getState().fournisseur.params))

    return response.data
  }
)

// ** Delete Fournisseur
export const deleteFournisseur = createAsyncThunk(
  'fournisseur/deleteFournisseur',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete(process.env.NEXT_PUBLIC_SERVER_URL+`${CLASS_NAME}/${
      id
    }`)
    dispatch(fetchData(getState().fournisseur.params))

    return response.data
  }
)

export const updateFournisseur = createAsyncThunk(
  'fournisseur/updateFournisseur',
  async (data: { id: number; fournisseur: { [key: string]: number | string | Date } }, { getState, dispatch }: Redux) => {
     const response = await http.put(process.env.NEXT_PUBLIC_SERVER_URL+`${CLASS_NAME}/${
      data.id
    }`, {
      ...data.fournisseur
    })
    dispatch(fetchData(getState().fournisseur.params))

    return response.data
  }
)

export const fournisseurSlice = createSlice({
  name: 'fournisseur',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.fournisseurs
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default fournisseurSlice.reducer
