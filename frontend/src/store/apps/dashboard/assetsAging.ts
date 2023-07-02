// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { classNames } from 'src/global/ClassNames'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}
type InputObject = {
  [key: string]: {
    [key: string]: number
  }
}

type OutputObject = {
  id: number
  class: string
  values: {
    [key: string]: number
  }
}

function transform(input: InputObject): OutputObject[] {
  const output: OutputObject[] = []
  const classes = Object.keys(input['< 1 yr'])

  classes.forEach((cls, i) => {
    if (cls !== '$id') {
      const item: OutputObject = { id: i + 1, class: cls, values: {} }
      Object.keys(input).forEach(key => {

        if (key !== '$id') {
          item.values[key] = input[key][cls]
        }
      })
      output.push(item)
    }
  })

  return output
}

function handleAssetAging(params: DataParams, data: any) {
  const { q = '' } = params ?? ''
  const queryLowered = q.toLowerCase()
  const transformedData = transform(data)

  const filteredData = transformedData.filter(row => row.class.toLowerCase().includes(queryLowered))

  return {
    assetAging: filteredData,
    total: filteredData.length,
    params,
    allData: transformedData
  }
}

// ** Fetch Fournisseurs
export const assetsAging = createAsyncThunk('dashboard/assetAging', async (params: DataParams) => {
  const response = await axios
    .get(process.env.NEXT_PUBLIC_SERVER_URL + classNames.dashboard + '/actifs/aging')
    .catch(err => err.response)
  if (response.status === 404) {
    return {
      allData: [],
      assetAging: [],
      total: 0,
      params
    }
  }

  return handleAssetAging(params, response.data)
})

export const assetAgingSlice = createSlice({
  name: 'assetAging',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(assetsAging.fulfilled, (state, action) => {
      //@ts-ignore
      state.data = action.payload.assetAging
      state.total = action.payload.total
      state.params = action.payload.params

      //@ts-ignore
      state.allData = action.payload.allData
    })
  }
})

export default assetAgingSlice.reducer
