import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { findUpgrade, originalButton } from '../popup/pages/store'
import type { RootState } from './store'
// Define a type for the slice state
interface CounterState {
  value: loading<number>
}
//eee
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
export type loading<T> = T | undefined
// Define the initial state using that type
const initialState: InitalState = {
  value: undefined,
  purchasedUpgrades: [{ name: originalButton.name }],
  equippedUpgrades: [{ name: originalButton.name }],
}
export const setS = async (x: Partial<ChromeStorage>) => {
  let a = await getS()
  if (!a) {
    chrome.storage.sync.set({ data: x }, console.log)
    return;
  }
  console.log("in setS, x is", x, " and a is", a);

  chrome.storage.sync.set({ data: Object.assign(a, x) }, console.log)
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
      if (state.value) {
        state.value += 1
        setS({ value: state.value })
      }
    },
    set: (state, action: PayloadAction<number>) => {
      state.value = action.payload
      setS({ value: state.value })
    },
    setAll: (state, action: PayloadAction<InitalState>) => {
      console.log("setAll recieved payload", action.payload)
      // state = action.payload
      // const e = action.payload.purchasedUpgrades.map(e => ({ name: e.name }))
      // const b = action.payload.equippedUpgrades.map(e => ({ name: e.name }))

      // setS(action.payload)
      // state = action.payload
      // state = Object.assign(state, action.payload)
      state.value = action.payload.value
      state.equippedUpgrades = action.payload.equippedUpgrades
      state.purchasedUpgrades = action.payload.purchasedUpgrades

      console.log("in setAll, state is", state)
    },

    decrement: (state) => {
      if (state.value)
        state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      if (state.value)
        state.value += action.payload
    },
    purchase: (state, item: PayloadAction<storageUpgrade>) => {
      if (state.purchasedUpgrades.some(x => x.name === item.payload.name)) {
        return;
      }
      const i = findUpgrade(item.payload.name)
      if (state.value)
        state.value -= i.cost;
      state.purchasedUpgrades.push({ name: item.payload.name })
      setS({ purchasedUpgrades: [...state.purchasedUpgrades] })
    }
  },
})

export const { increment, decrement, incrementByAmount, set, purchase, setAll } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.money.value

export default counterSlice.reducer