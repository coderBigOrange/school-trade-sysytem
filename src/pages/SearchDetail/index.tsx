import React, { useRef, useState } from 'react';
import s from './style.module.less';
import {
  NavBar, 
  SearchBar,
  Tabs,
  Toast
} from 'antd-mobile';
import { SearchBarRef } from 'antd-mobile/es/components/search-bar'
import { useNavigate } from 'react-router-dom';
import { addHistorySearch, deleteHistorySearch } from '../../store/modules/memory';
import { useAppDispatch} from '../../hooks';
import History from './History';
import { GetSearch } from '../../api/effect';
import { SearchType, Shop, User } from '../../utils/interface';
import SearchResult from './SearchResult';

const { Tab } = Tabs;

const SearchDetail = () => {
  const navigate = useNavigate();
  const searchRef = useRef<SearchBarRef>(null);
  const dispatch = useAppDispatch();
  const [isShowHistory, setIsShowHistory] = useState(true)
  const [isShowSkeleton, setIsShowSkeleton] = useState(false)
  const [ type, setType ] = useState<SearchType>(SearchType.SHOP);
  const [ result, setResult ] = useState<User[] | Shop[]>([]);
  const [content, setContent] = useState('');

  const onSearch = (value?: string) => {
    setIsShowSkeleton(true)
    if(value) {
      setContent(value);
      (async () => {
        const res = await GetSearch({
          value,
          type
        })
        const {
          code,
          data,
          message
        } = res;
        if(code === 200) {
          setResult(data)
          setIsShowSkeleton(false)
        } else {
          Toast.show(message)
        }
      })();
      dispatch(addHistorySearch(value))
      searchRef.current?.clear();
      setIsShowHistory(false)
    } else {
      searchRef.current?.focus();
    }
  }
  const onChange = (type: string) => {
    setResult([])
    setType(type as SearchType);
    (async () => {
      const res = await GetSearch({
        value: content,
        type: type as SearchType
      })
      const {
        code,
        data,
        message
      } = res;
      if(code === 200) {
        setResult(data)
        setIsShowSkeleton(false)
      } else {
        Toast.show(message)
      }
    })();
  }
  return (
    <div className={s.searchDetail}>
      <NavBar
        right={
          <div 
            className={s.searchBtn}
            onClick={() => onSearch(searchRef.current?.nativeElement?.value)}
          >
            搜索
          </div>
        }
        onBack={() => navigate(-1)}
        style={{
          'paddingTop': '10px'
        }}
      >
        <SearchBar 
          ref={searchRef} 
          placeholder='请输入搜索内容' />
      </NavBar>
      <div className={s.body}>
        {
          isShowHistory ? (
            <History onSearch={onSearch} />
          ) : (
            <>
              <Tabs
                activeKey={type}
                onChange={onChange}
              >
                <Tab title="商品" key={SearchType.SHOP} />
                <Tab title="用户" key={SearchType.USER} />
              </Tabs>
              <SearchResult data={result} isShowSkeleton={isShowSkeleton} type={type} />
            </>
          )
        }
      </div>
    </div>
  )
}

export default SearchDetail;