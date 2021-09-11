import { AnyAction, configureStore, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit'
import earn, { InitalState, setS } from "./earn"
const storeActionInChrome = (store: MiddlewareAPI<Dispatch<AnyAction>, { money: InitalState; }>) => (_next: Dispatch<AnyAction>) => (_action: AnyAction) => {
    const state = store.getState()
    console.log("storeActionInChrome called")
    setS(state.money)
    // return result
}

const store = configureStore({
    reducer: {
        money: earn,
    },
    middleware: [storeActionInChrome]
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
