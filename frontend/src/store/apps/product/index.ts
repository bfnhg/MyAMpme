// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { ProductType } from 'src/types/apps/productType'
import { http } from 'src/global/http'

const CLASS_NAME = 'Produits'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}
function searchProducts(params: DataParams, data: any) {
  const { q = '' } = params ?? ''
  const queryLowered = q.toLowerCase()

  const filteredData = data.filter(
    (product: ProductType) =>
      product.numeroModele.toString().toLowerCase().includes(queryLowered) ||
      product.nomModele.toLowerCase().includes(queryLowered)
  )

  return {
    products: filteredData,
    total: filteredData.length,
    params,
    allData: data
  }
}

// ** Fetch Products
export const fetchData = createAsyncThunk('product/fetchData', async (params: DataParams) => {
  const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + CLASS_NAME).catch(err => err.response)

  if (response.status === 404) {
    return {
      products: [],
      total: 0,
      params,
      allData: []
    }
  }

  return searchProducts(params, response.data['$values'])
})

// ** Add Product
export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (data: { [key: string]: number | string | Date }, { getState, dispatch }: Redux) => {
    const response = await http.post(process.env.NEXT_PUBLIC_SERVER_URL + CLASS_NAME, {
      ...data
    })
    dispatch(fetchData(getState().product.params))

    return response.data
  }
)

// ** Delete Product
export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete(process.env.NEXT_PUBLIC_SERVER_URL + CLASS_NAME + '/' + id)
    dispatch(fetchData(getState().product.params))

    return response.data
  }
)

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (data: { id: number; product: { [key: string]: number | string | Date } }, { getState, dispatch }: Redux) => {
    const response = await axios.patch('/apps/product/update', {
      data
    })
    dispatch(fetchData(getState().product.params))

    return response.data
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.products
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default productSlice.reducer
