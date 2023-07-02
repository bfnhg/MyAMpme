// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { http } from 'src/global/http'

const CLASS_NAME = 'Employes'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

function searchEmployee(params: DataParams, data: any) {
  const { q = ''} = params ?? ''
  const queryLowered = q.toLowerCase()
  const filteredData = data.filter(employee =>
      employee.fullName.toLowerCase().includes(queryLowered) || employee.email.toLowerCase().includes(queryLowered))

  return {
    employees: filteredData,
    total: filteredData.length,
    params,
    allData: data
  }
}

// ** Fetch Employees
export const fetchData = createAsyncThunk('employee/fetchData', async (params: DataParams) => {
  const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+CLASS_NAME).catch(err => err.response)
  
  if(response.status === 404) {
    
    
    return {
      employees: [],
      total: 0,
      params,
      allData: []
    }
  }

   return  searchEmployee(params, response.data['$values'])

})

// ** Add Employee
export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (data: { [key: string]: number | string | Date }, { getState, dispatch }: Redux) => {
    
    const response = await http.post(process.env.NEXT_PUBLIC_SERVER_URL+CLASS_NAME, {
      ...data,
      
    })
    dispatch(fetchData(getState().employee.params))

    return response.data
  }
)

// ** Delete Employee
export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete(process.env.NEXT_PUBLIC_SERVER_URL+`${CLASS_NAME}/${
      id
    }`)
    dispatch(fetchData(getState().employee.params))

    return response.data
  }
)

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async (data: { id: number; employee: { [key: string]: number | string | Date } }, { getState, dispatch }: Redux) => {
    const response = await http.put(process.env.NEXT_PUBLIC_SERVER_URL+`${CLASS_NAME}/${
      data.id
    }`, {
      ...data.employee
    })
    dispatch(fetchData(getState().employee.params))

    return response.data
  }
)

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.employees
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default employeeSlice.reducer
