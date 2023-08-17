import { configureStore } from "@reduxjs/toolkit";
import accessTokenReducer from "@/redux/features/accessToken-slice"
import isLoggedInReducer from "@/redux/features/isLoggedIn-slice"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    isLoggedIn: isLoggedInReducer,
  }
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
