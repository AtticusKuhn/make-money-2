import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { upgradeType } from '../types'
import { findUpgrade } from '../upgrades'
import { originalButton } from '../upgrades/buttons'
import { UTous } from '../utils'
import type { RootState } from './store'
// Define a type for the slice state
interface CounterState {
  value: number;
  income: number;
}
//eee
interface UpgradeState {
  purchasedUpgrades: storageUpgrade[];
  purchasedItems: storageUpgrade[];
  equippedUpgrades: storageUpgrade[];
  equippedButton: storageUpgrade;
}
interface Misc {
  lastSaved: number;
}
export type InitalState = CounterState & UpgradeState & Misc

export type storageUpgrade = {
  name: string,
  type: upgradeType,
  cost: number;
}
// type ChromeStorage = {
//   value: number,
//   purchasedUpgrades: storageUpgrade[],
//   purchasedItems: storageUpgrade[],
//   equippedUpgrades: storageUpgrade[],
// }
// Define the initial state using that type
const ob = { name: "original button", type: upgradeType.button, cost: 1 }

export const initialState: InitalState = {
  value: 1,
  income: 1,
  purchasedUpgrades: [ob],
  purchasedItems: [],
  equippedUpgrades: [ob],
  equippedButton: ob,
  lastSaved: new Date().getTime(),
}
export const setS = async (x: Partial<InitalState>) => {
  let a = await getS()
  if (!a) {
    chrome.storage.sync.set({ data: x }, console.log)
    return;
  }
  chrome.storage.sync.set({ data: Object.assign(a, x) }, console.log)
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
      console.log("increment called")
      if (state.value) {
        state.value += 1
      }
    },
    earn: (state, action?: PayloadAction<number>) => {
      const amount = action?.payload || 1
      state.value += amount * state.income
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
      state.purchasedUpgrades.push({ name: item.payload.name, type: item.payload.type, cost: item.payload.cost })
      getS().then((b) => {
        const x = b.purchasedUpgrades || []
        x.push({ name: item.payload.name, type: item.payload.type, cost: item.payload.cost })
        console.log("in purchase, x", x)
      })
    },
    reset: (state) => {
      // state = initialState;
      const t = UTous(originalButton)
      state.value = 1;
      state.equippedUpgrades = [t]
      state.purchasedUpgrades = [t]
      state.equippedButton = t;
      state.income = 1
    },
    equip: (state, e: PayloadAction<storageUpgrade>) => {
      const equpping = e.payload
      console.log("equipping", e.payload.name)
      if (state.equippedUpgrades.some(b => b.name === e.payload.name))
        return;
      if (equpping.type === upgradeType.button) {
        state.equippedUpgrades = state.equippedUpgrades.filter(upgrades => upgrades.type === upgradeType.button)
        state.equippedButton = equpping;
      }
      state.equippedUpgrades.push(equpping)
      console.log("in equip, after equpping, the equipped upgrades are", state.equippedUpgrades)
    },
    unequip: (state, e: PayloadAction<storageUpgrade>) => {
      console.log("unequipping", e.payload.name)
      const equpping = e.payload
      if (equpping.type === upgradeType.button)
        return;
      state.equippedUpgrades = state.equippedUpgrades.filter(x => x.name !== equpping.name)
    },
    updateTs: (state) => {
      state.lastSaved = new Date().getTime();
    },
    prestige: (state) => {
      const t = UTous(originalButton)
      state.income = state.value * 0.1
      state.value = 1;
      state.equippedUpgrades = [t]
      state.purchasedUpgrades = [t]
      state.equippedButton = t;
    }
  },
})

export const { reset, increment, incrementByAmount, set, purchase, setAll, equip, unequip, earn, updateTs, prestige } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.money.value

export default counterSlice.reducer