import { configureStore } from '@reduxjs/toolkit'
import earn from "./earn"
const store = configureStore({
    reducer: {
        money: earn,
    },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
    