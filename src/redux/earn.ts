import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { originalButton, findUpgrade } from '../upgrades/buttons'
import type { RootState } from './store'
// Define a type for the slice state
interface CounterState {
  value: number;
}
//eee
interface UpgradeState {
  purchasedUpgrades: storageUpgrade[];
  equippedUpgrades: storageUpgrade[];
}
export type InitalState = CounterState & UpgradeState
export type storageUpgrade = {
  name: string,
  isButton: boolean,
}
type ChromeStorage = {
  value: number,
  purchasedUpgrades: storageUpgrade[],
  equippedUpgrades: storageUpgrade[],
  equippedButton: storageUpgrade[],
}
// Define the initial state using that type
const initialState: InitalState = {
  value: 1239712398,
  purchasedUpgrades: [{ name: originalButton.name, isButton: true }],
  equippedUpgrades: [{ name: originalButton.name, isButton: true }],
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
      console.log("increment called")
      if (state.value) {
        state.value += 1
      }
    },
    earn: (state, action?: PayloadAction<number>) => {
      state.value ?
        state.value += action?.payload || 1 : state
    },
    set: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
    setAll: (state, action: PayloadAction<InitalState>) => {
      state.value = action.payload.value
      state.equippedUpgrades = action.payload.equippedUpgrades
      state.purchasedUpgrades = action.payload.purchasedUpgrades;
    },
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
      console.log("in purchase, using i", i)
      state.purchasedUpgrades.push({ name: item.payload.name, isButton: item.payload.isButton })
      getS().then((b) => {
        const x = b.purchasedUpgrades || []
        x.push({ name: item.payload.name, isButton: item.payload.isButton })
        console.log("in purchase, x", x)
      })
    },
    reset: (state) => {
      state.value = 1;
      state.equippedUpgrades = [{ name: "default button", isButton: true }]
      state.purchasedUpgrades = [{ name: "default button", isButton: true }]
    },
    equip: (state, e: PayloadAction<storageUpgrade>) => {
      const equpping = e.payload
      console.log("equipping", e.payload.name)
      if (state.equippedUpgrades.some(b => b.name === e.payload.name))
        return;
      if (equpping.isButton)
        state.equippedUpgrades = state.equippedUpgrades.filter(upgrades => !upgrades.isButton)
      state.equippedUpgrades.push(equpping)
      console.log("in equip, after equpping, the equipped upgrades are", state.equippedUpgrades)
    },
    unequip: (state, e: PayloadAction<storageUpgrade>) => {
      console.log("unequipping", e.payload.name)
      const equpping = e.payload
      if (equpping.isButton)
        return;
      state.equippedUpgrades = state.equippedUpgrades.filter(x => x.name !== equpping.name)
    }
  },
})

export const { reset, increment, incrementByAmount, set, purchase, setAll, equip, unequip, earn } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.money.value

export default counterSlice.reducer