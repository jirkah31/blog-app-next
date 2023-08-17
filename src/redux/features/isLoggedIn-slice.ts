import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { checkIfLoggedIn } from "@/features/checkIfLoggedIn";

interface IsLoggedInState {
  isLoggedIn: boolean
}

const ifLoggedIn = checkIfLoggedIn()

const initialStateIsLoggedIn: IsLoggedInState = { isLoggedIn: ifLoggedIn.isLoggedIn }

export const isLoggedInSLice = createSlice({
  name: "isLoggedIn",
  initialState: { value: initialStateIsLoggedIn },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<IsLoggedInState>) => {
      state.value = action.payload;
    },
  },
});

export const { setIsLoggedIn } = isLoggedInSLice.actions;
export const selectIsLoggedIn = (state: RootState) => state.isLoggedIn.value
export default isLoggedInSLice.reducer;
