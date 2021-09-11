import { AnyAction, configureStore, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit'
import earn, { InitalState, setS } from "./earn"
const storeActionInChrome = (store: MiddlewareAPI<Dispatch<AnyAction>, { money: InitalState; }>) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    const state = store.getState()
    console.log("storeActionInChrome called", state)
    setS(state.money)
    return next(action)
}

export const makeStore = (preloadedState?: {
    money?: {
        value: number;
        purchasedUpgrades: {
            name: string;
            isButton: boolean;
        }[];
        equippedUpgrades: {
            name: string;
            isButton: boolean;
        }[];
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
