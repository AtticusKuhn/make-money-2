import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { upgradeType } from '../types'
import { findUpgrade } from '../upgrades'
import { itemToIncome } from '../utils'
import type { RootState } from './store'

interface CounterState {
  value: number;
  income: number;
  bonusClicks: number;
}
interface UpgradeState {
  purchasedUpgrades: storageUpgrade[];
  purchasedItems: storageUpgrade[];
  equippedUpgrades: storageUpgrade[];
  equippedButton: storageUpgrade;
}
interface Misc {
  lastSaved: number;
}
export type InitialState = CounterState & UpgradeState & Misc

export type storageUpgrade = {
  name: string,
  type: upgradeType,
  cost: number;
}

const ob = { name: "original button", type: upgradeType.button, cost: 1 }

export const initialState: InitialState = {
  value: 1,
  income: 1,
  purchasedUpgrades: [ob],
  purchasedItems: [],
  equippedUpgrades: [ob],
  equippedButton: ob,
  lastSaved: new Date().getTime(),
  bonusClicks: 0,
}
export const setS = async (x: Partial<InitialState>) => {
  let a = await getS()
  if (!a) {
    chrome.storage.sync.set({ data: x }, console.log)
    return;
  }
  chrome.storage.sync.set({ data: Object.assign(a, x) }, console.log)
}
export const getS = (): Promise<InitialState> => new Promise(resolve => chrome.storage.sync.get("data", (x) => {
  resolve(x.data as InitialState)
}))

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    earn: (state, action: PayloadAction<number>) => {
      state.value += action.payload * state.income;
      if (state.equippedUpgrades.some(x => x.name === "bonus clicks")) {
        state.bonusClicks += 0.01;
      }
    },
    simpleEarn: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    set: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
    setAll: (state, action: PayloadAction<InitialState>) => {
      state.value = action.payload.value
      state.equippedUpgrades = action.payload.equippedUpgrades
      state.purchasedUpgrades = action.payload.purchasedUpgrades;
    },
    purchase: (state, item: PayloadAction<storageUpgrade>) => {
      if (state.purchasedUpgrades.some(x => x.name === item.payload.name)) {
        return;
      }
      console.log("in purchase, the item type is", item.payload.type)
      if (item.payload.type === upgradeType.item) {
        state.income += itemToIncome(item.payload.cost)
        state.value -= item.payload.cost;
        state.purchasedItems.push(item.payload);
        return;
      }
      const i = findUpgrade(item.payload.name)
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
      state.value = 1;
      state.equippedUpgrades = [ob]
      state.purchasedUpgrades = [ob]
      state.equippedButton = ob;
      state.purchasedItems = []
      state.income = 1
    },
    equip: (state, e: PayloadAction<storageUpgrade>) => {
      const equipping = e.payload
      console.log("equipping", equipping)
      if (state.equippedUpgrades.some(b => b.name === e.payload.name))
        return;
      if (equipping.type === upgradeType.button) {
        state.equippedUpgrades = state.equippedUpgrades.filter(upgrades => upgrades.type !== upgradeType.button)
        state.equippedButton = equipping;
      }
      state.equippedUpgrades.push(equipping)
      console.log("in equip, after equipping, the equipped upgrades are", state.equippedUpgrades)
    },
    unequip: (state, e: PayloadAction<storageUpgrade>) => {
      const equipping = e.payload
      if (equipping.type === upgradeType.button)
        return;
      state.equippedUpgrades = state.equippedUpgrades.filter(x => x.name !== equipping.name)
    },
    updateTs: (state) => {
      state.lastSaved = new Date().getTime();
    },
    prestige: (state) => {
      state.income += Math.sqrt(state.value) * 0.0001;
      state.value = 1;
      state.equippedUpgrades = [ob]
      state.purchasedUpgrades = [ob]
      state.purchasedItems = []
      state.equippedButton = ob;
    }
  },
})

export const { reset, set, purchase, setAll, equip, unequip, earn, updateTs, prestige, simpleEarn } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.money.value

export default counterSlice.reducer