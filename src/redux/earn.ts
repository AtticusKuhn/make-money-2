import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Upgrade } from '../popup/pages/store'
import type { RootState } from './store'
import { originalButton } from "../popup/pages/store"
// Define a type for the slice state
interface CounterState {
  value: number
}
interface UpgradeState {
  purchasedUpgrades: storageUpgrade[];
  equippedUpgrades: storageUpgrade[];
}
type InitalState = CounterState & UpgradeState
export type storageUpgrade = {
  name: string
}
type ChromeStorage = {
  value: number,
  purchasedUpgrades: storageUpgrade[],
  equippedUpgrades: storageUpgrade[],
}
// Define the initial state using that type
const initialState: InitalState = {
  value: 0,
  purchasedUpgrades: [{ name: originalButton.name }],
  equippedUpgrades: [{ name: originalButton.name }],
}
export const setS = (x: Partial<ChromeStorage>) => {
  console.log("seteing chome money to", x);
  chrome.storage.sync.set({ data: x })
}
export const getS = (): Promise<ChromeStorage> => new Promise(resolve => chrome.storage.sync.get("data", (x) => {
  resolve(x.data as ChromeStorage)
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
    setAll: (state, action: PayloadAction<InitalState>) => {
      state = action.payload
      const e = action.payload.purchasedUpgrades.map(e => ({ name: e.name }))
      const b = action.payload.equippedUpgrades.map(e => ({ name: e.name }))

      setS({ ...action.payload, equippedUpgrades: b, purchasedUpgrades: e, })
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
      state.purchasedUpgrades.push({ name: item.payload.name })
      setS({ purchasedUpgrades: state.purchasedUpgrades })
    }
  },
})

export const { increment, decrement, incrementByAmount, set, purchase, setAll } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.money.value

export default counterSlice.reducer