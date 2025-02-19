import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './features/menu/menuSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        menu: menuReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']