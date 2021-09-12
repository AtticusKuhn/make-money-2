import { AnyAction, configureStore, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit'
import earn, { InitalState, setS, updateTs } from "./earn"
const storeActionInChrome = (store: MiddlewareAPI<Dispatch<AnyAction>, { money: InitalState; }>) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    next(action)
    const state = store.getState()
    console.log("storeActionInChrome called", state)
    if (Math.abs(state.money.lastSaved - new Date().getTime()) > 1000) { // only save once a second
        setS(state.money)
        store.dispatch(updateTs())
    }
    return;
}

export const makeStore = (preloadedState?: {
    money: InitalState
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
