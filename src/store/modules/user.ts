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
    }
  }
})

export const { updateAll } = userSlice.actions;
export default userSlice.reducer;