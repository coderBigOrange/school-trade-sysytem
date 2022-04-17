import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { Shop } from '../../utils/interface';

const initialState: Shop = {
  shopCollect: [],
  shopDescription: '',
  shopId: '',
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
    }
  }
})

export const { updateShopDetail } = ShopDetailSlice.actions;
export default ShopDetailSlice.reducer;