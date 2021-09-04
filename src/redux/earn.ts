import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { chromeStorage } from '../types'
import type { RootState } from './store'

// Define a type for the slice state
interface CounterState {
  value: number
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
}
export const setS = (x: chromeStorage) => {
  console.log("seteing chome money to", x);
  chrome.storage.sync.set({ data: x })
}
export const getS = (): Promise<chromeStorage> => new Promise(resolve => chrome.storage.sync.get("data", (x) => {
  resolve(x.data as chromeStorage)
}))
export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
      setS({ money: state.value })
    },
    set: (state, action: PayloadAction<number>) => {
      state.value = action.payload
      setS({ money: state.value })
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount, set } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.money.value

export default counterSlice.reducer