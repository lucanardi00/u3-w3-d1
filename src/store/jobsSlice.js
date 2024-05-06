import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'https://strive-benchmark.herokuapp.com/api/jobs'

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (query, thunkAPI) => {
    const response = await fetch(`${BASE_URL}?search=${query}&limit=20`)
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`
      throw new Error(message)
    }
    const data = await response.json()
    return data.data
  }
)

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload
        state.loading = false
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default jobsSlice.reducer
