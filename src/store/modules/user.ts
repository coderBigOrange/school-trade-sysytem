import { 
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

interface UserInfo {
  name: string;
  email: string;
  avatar: string;
}

const initialState: UserInfo = {
  name: '',
  email: '',
  avatar: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateAll: (state, action: PayloadAction<{
      name: string;
      email: string;
      avatar: string;
    }>) => {
      Object.assign(state, action.payload)
    }
  }
})

export const { updateAll } = userSlice.actions;
export default userSlice.reducer;