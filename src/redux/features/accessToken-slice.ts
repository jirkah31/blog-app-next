import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { checkIfLoggedIn } from "@/features/checkIfLoggedIn";

interface AccessTokenState {
  accessToken: string
}
const ifLoggedIn = checkIfLoggedIn()

const initialStateAccessToken: AccessTokenState = { accessToken: ifLoggedIn.accessToken }

export const accessTokenSLice = createSlice({
  name: "accessToken",
  initialState: { value: initialStateAccessToken },
  reducers: {
    setAccessToken: (state, action: PayloadAction<AccessTokenState>) => {
      state.value = action.payload;
    },
  },
});

export const { setAccessToken } = accessTokenSLice.actions;
export const selectAccessToken = (state: RootState) => state.accessToken.value
export default accessTokenSLice.reducer;
