import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Upgrade } from '../popup/pages/store'
import { chromeStorage } from '../types'
import type { RootState } from './store'

// Define a type for the slice state
interface CounterState {
  value: number
}
interface UpgradeState {
  purchasedUpgrades: Upgrade[];
  equippedUpgrades: Upgrade[];
}
type InitalState = CounterState & UpgradeState
// Define the initial state using that type
const initialState: InitalState = {
  value: 0,
  purchasedUpgrades: [],
  equippedUpgrades: [],
}
export const setS = (x: Partial<InitalState>) => {
  console.log("seteing chome money to", x);
  chrome.storage.sync.set({ data: x })
}
export const getS = (): Promise<InitalState> => new Promise(resolve => chrome.storage.sync.get("data", (x) => {
  resolve(x.data as InitalState)
}))
export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
      setS({ value: state.value })
    },
    set: (state, action: PayloadAction<number>) => {
      state.value = action.payload
      setS({ value: state.value })
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    purchase: (state, item: PayloadAction<Upgrade>) => {
      if (state.purchasedUpgrades.some(x => x.name === item.payload.name)) {
        return;
      }
      state.value -= item.payload.cost;
      state.purchasedUpgrades.push(item.payload)
    }
  },
})

export const { increment, decrement, incrementByAmount, set, purchase } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.money.value

export default counterSlice.reducer