import { AnyAction, configureStore, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import earn, { InitialState, setS, updateTs } from "./earn"
const storeActionInChrome = (store: MiddlewareAPI<Dispatch<AnyAction>, { money: InitialState; }>) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    next(action)
    const state = store.getState()
    // console.log("storeActionInChrome called", state)
    if (Math.abs(state.money.lastSaved - new Date().getTime()) > 300) { // only save once a second
        setS(state.money)
        store.dispatch(updateTs())
    }
    return;
}

export const makeStore = (preloadedState?: {
    money: InitialState
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
export const useDisp = () => useDispatch<AppDispatch>()
export const useSel: TypedUseSelectorHook<RootState> = useSelector
