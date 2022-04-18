import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { Shop, Comment } from '../../utils/interface';

const initialState: Shop = {
  shopCollect: [],
  shopDescription: '',
  shopId: '',
  createTime: '',
  shopState: 1,
  shopImgs: [],
  shopLike: [],
  shopOwnerEmail: '',
  shopPrice: 0,
  shopSort: '',
  shopTitle: '',
  ShopComment: [],
  userStudentInfo: '',
  userAvatar: '',
  userName: ''
}

export const ShopDetailSlice = createSlice({
  name: 'ShopDetail',
  initialState,
  reducers: {
    updateShopDetail: (state, action: PayloadAction<Shop>) => {
      return action.payload
    },
    insertShopComment: (state, action: PayloadAction<Comment>) => {
      state.ShopComment.unshift(action.payload)
    }
  }
})

export const { updateShopDetail, insertShopComment } = ShopDetailSlice.actions;
export default ShopDetailSlice.reducer;