import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TRegisterFormState = {
  username: string | null,
  email: string | null,
  password: string | null,
  confirmPassword: string | null,
  nickname: string | null,
  invite: string | null,
};

const initialState: TRegisterFormState = {
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
  nickname: null,
  invite: null,
};

const registerFormSubSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    changeUsernameRegister: (
      state,
      action: PayloadAction<string>,
    ) => ({ ...state, username: action.payload }),
    changeEmailRegister: (
      state,
      action : PayloadAction<string>,
    ) => ({ ...state, email: action.payload }),
    changePasswordRegister: (state, action: PayloadAction<string>) => ({
      ...state, password: action.payload,
    }),
    changeConfirmPasswordRegister: (state, action: PayloadAction<string>) => ({
      ...state, confirmPassword: action.payload,
    }),
    changeNicknameRegister: (state, action: PayloadAction<string>) => ({
      ...state, nickname: action.payload,
    }),
    changeInviteRegister: (state, action: PayloadAction<string>) => ({
      ...state, invite: action.payload,
    }),
    resetFormRegister: (state) => ({
      ...state, ...initialState,
    }),
  },
});

const registerReducer = registerFormSubSlice.reducer;
export const {
  changeUsernameRegister,
  changeEmailRegister,
  changePasswordRegister,
  changeConfirmPasswordRegister,
  changeNicknameRegister,
  resetFormRegister,
  changeInviteRegister,
} = registerFormSubSlice.actions;
export default registerReducer;
