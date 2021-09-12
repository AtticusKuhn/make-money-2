import { AnyAction, configureStore, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit'
import earn, { InitalState, setS, storageUpgrade } from "./earn"
const storeActionInChrome = (store: MiddlewareAPI<Dispatch<AnyAction>, { money: InitalState; }>) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    next(action)
    const state = store.getState()
    console.log("storeActionInChrome called", state)
    setS(state.money)
    return;
}

export const makeStore = (preloadedState?: {
    money: {
        value: number;
        purchasedUpgrades: storageUpgrade[];
        equippedUpgrades: storageUpgrade[];
    }
}) => configureStore({
    reducer: {
        money: earn,
    },
    preloadedState,
    middleware: [storeActionInChrome]
});
const store = makeStore()

// export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
