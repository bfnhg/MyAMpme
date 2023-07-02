// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { http } from 'src/global/http'

const CLASS_NAME = 'Emplacements'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

function searchEmplacement(params: DataParams, data: any) {
  const { q = ''} = params ?? ''
  const queryLowered = q.toLowerCase()
  const filteredData = data.filter(emplacement =>
      emplacement.nomEmp.toLowerCase().includes(queryLowered) || emplacement.employe?.fullName.toLowerCase().includes(queryLowered)
  )

  return {
    emplacements: filteredData,
    total: filteredData.length,
    params,
    allData: data
  }
}

// ** Fetch Emplacements
export const fetchData = createAsyncThunk('emplacement/fetchData', async (params: DataParams) => {
 const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+CLASS_NAME).catch(err => err.response)
   if(response.status === 404) {
    
    
   return {
      allData: [],
      emplacements: [],
      total: 0,
      params
    }
  }

  return searchEmplacement(params, response.data['$values'])
})

// ** Add Emplacement
export const addEmplacement = createAsyncThunk(
  'emplacement/addEmplacement',
  async (data: { [key: string]: number | string | Date }, { getState, dispatch }: Redux) => {
    
     const response = await http.post(process.env.NEXT_PUBLIC_SERVER_URL+CLASS_NAME, {
      ...data,
      
    })
    dispatch(fetchData(getState().emplacement.params))

    return response.data
  }
)

// ** Delete Emplacement
export const deleteEmplacement = createAsyncThunk(
  'emplacement/deleteEmplacement',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete(process.env.NEXT_PUBLIC_SERVER_URL+`${CLASS_NAME}/${
      id
    }`)
    dispatch(fetchData(getState().emplacement.params))

    return response.data
  }
)

export const updateEmplacement = createAsyncThunk(
  'emplacement/updateEmplacement',
  async (data: { id: number; emplacement: { [key: string]: number | string | Date } }, { getState, dispatch }: Redux) => {
    const response = await http.put(process.env.NEXT_PUBLIC_SERVER_URL+`${CLASS_NAME}/${
      data.id
    }`, {
      ...data.emplacement
    })
    dispatch(fetchData(getState().emplacement.params))

    return response.data
  }
)

export const emplacementSlice = createSlice({
  name: 'emplacement',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.emplacements
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default emplacementSlice.reducer
