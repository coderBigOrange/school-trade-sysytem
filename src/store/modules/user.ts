import { 
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { User } from '../../utils/interface'

const initialState: User = {
  userName: '',
  userEmail: '',
  userAvatar: '',
  userGender: 1,
  userStudentInfo: '',
  userIntroduce: '',
  userAddress: '',
  userBirth: '',
  createTime: '',
  userLikeList: [],
  userCollectList: [],
  userCommentList: [],
  userSubscribe: [],
  userBeSubscribed: [],
  userPublishList: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateAll: (state, action: PayloadAction<User>) => {
      Object.assign(state, action.payload)
    },
    addSubScribe: (state, action: PayloadAction<string>) => {
      state.userSubscribe.push(action.payload)
    },
    deleteSubScribe: (state, action: PayloadAction<string>) => {
      const tempdata = state.userSubscribe.filter(item => item !== action.payload);
      state.userSubscribe = tempdata;
    }
  }
})

export const { updateAll, addSubScribe, deleteSubScribe } = userSlice.actions;
export default userSlice.reducer;