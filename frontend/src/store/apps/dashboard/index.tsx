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
function transformArray(inputArray) {
  const outputArray = [];

  const classObj = {};
  inputArray.forEach((item,index) => {
    const [className, status] = item.key.split(" - ");
    if (!classObj[className]) {
      classObj[className] = {
        id: index + 1,
        class: className,
      };
    }
    classObj[className][status] = item.value;
  });

  for (const className in classObj) {
    // @ts-ignore
    outputArray.push(classObj[className]);
  }

  return outputArray;
}


function handleClassDistribution(params: DataParams, data: any) {
  const { q = ''} = params ?? ''
  const queryLowered = q.toLowerCase()
   const transformedData = transformArray(data.$values);


  const filteredData = transformedData.filter(row =>

  //@ts-ignore
  row.class.toLowerCase().includes(queryLowered)
  )

  return {
    assetsClass: filteredData,
    total: filteredData.length,
    params,
    allData: transformedData
  }
}

// ** Fetch Fournisseurs
export const classDis = createAsyncThunk('dashboard/classDis', async (params: DataParams) => {
 const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+classNames.dashboard+'/actifs/distribution').catch(err => err.response)
   if(response.status === 404) {
    
    
   return {
      allData: [],
      assetsClass: [],
      total: 0,
      params
    }
  }

  return handleClassDistribution(params, response.data)

  
})


export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(classDis.fulfilled, (state, action) => {
      state.data = action.payload.assetsClass
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default dashboardSlice.reducer
