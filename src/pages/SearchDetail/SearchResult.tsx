import React from "react";
import s from './style.module.less';
import { 
  User, 
  Shop, 
  SearchType,
  ComponentState
} from '../../utils/interface';
import {
  Skeleton,
} from 'antd-mobile';
import ShopList from "../../components/ShopList";
import UserList from "../../components/UserList";
import ComponentWrap from "../../components/ComponentWrap";

type ResultProps = {
  data: User[] | Shop[];
  isShowSkeleton: boolean;
  type: SearchType;
}

const SearchResult:React.FC<ResultProps> = (props) => {
  const { data = [], isShowSkeleton, type } = props;
  return (
    <div className={s.searchResult}>
      {
        isShowSkeleton ? (
          <Skeleton.Paragraph animated lineCount={30} />
        ) : (
          <>
            {
              type === SearchType.SHOP ? (
                <ComponentWrap state={data.length > 0 ? ComponentState.OK : ComponentState.EMPTY}>
                  <ShopList shopList={data as Shop[]} />
                </ComponentWrap>
              ) : (
                <ComponentWrap state={data.length > 0 ? ComponentState.OK : ComponentState.EMPTY}>
                  <UserList userList={data as User[]} />
                </ComponentWrap>
              )
            }
          </>
        )
      }
    </div>
  )
}

export default SearchResult;