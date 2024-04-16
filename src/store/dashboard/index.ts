// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Third-Party Imports
import { Socket } from 'socket.io-client'

interface InitialState {
  socket: Socket | null
  isSocketConnected: boolean
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    socket: null,
    isSocketConnected: false
  } as InitialState,
  reducers: {
    setGlobalSocket: (state, action) => {
      state.socket = action.payload
    },
    setSocketConnection: (state, action) => {
      state.isSocketConnected = action.payload
    }
  }
})

export const { setGlobalSocket, setSocketConnection } = dashboardSlice.actions

export default dashboardSlice.reducer
