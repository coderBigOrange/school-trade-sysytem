//TODO: 这块的长列表后续可以使用react virtualized进行优化
//TODO: 数据存入store避免切换时多次请求长列表
//TODO GET请求没有拿到数据的问题，后端数据返回条数限制，应该分页 solved
//TODO: useMemory了解一下
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Card from "../../components/ShopCard";
import TabButton from "../../components/TabButton";
import ComponentWrap from "../../components/ComponentWrap";
import {
  SearchBar,
  InfiniteScroll,
  Swiper,
  Tabs,
  Button,
  Toast,
} from 'antd-mobile';
import { useAppSelector, useAppDispatch } from "../../hooks";
import { updateActiveIdx } from "../../store/modules/memory";
import { ComponentState, Shop, sorts } from "../../utils/interface";
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import {EditSFill} from 'antd-mobile-icons'
import { GetShopList } from "../../api/effect";
import s from "./style.module.less";

const { Item } = Swiper;
const { Tab } = Tabs;

const Home: React.FC = () => {
  const [shopList, setShopList] = useState<Shop[]>([]);
  const [hasMore, setHasMore] = useState(true)
  const [activeIndex, setActiveIndex] = useState(1);
  const [pageIdx, setPageIdx] = useState(1);
  const swiperRef = useRef<SwiperRef>(null);
  const [state, setState] = useState<ComponentState>(ComponentState.LODING)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const lastActiveIdx = useAppSelector(state => state.memory.lastActiveIdx)

  const loadMore = async () => {
    const res = await GetShopList({
      shopSort: sorts[activeIndex].value,
      page: pageIdx
    });
    const {
      code,
      data,
      message
    } = res;
    if(code === 200) {
      setShopList([...shopList, ...data])
      setPageIdx(pageIdx+1)
      if(data.length < 5)
      {
        setHasMore(false)
      }
    } else {
      Toast.show(message)
    }
  }
  
  useEffect(() => {
    swiperRef.current?.swipeTo(lastActiveIdx)
  }, [])

  useEffect(() => {
    dispatch(updateActiveIdx(activeIndex));
    (async () => {
      setState(ComponentState.LODING)
      const res = await GetShopList({
        shopSort: sorts[activeIndex].value,
        page: 0
      })
      const {
        code,
        data,
        message
      } = res;
      if(code === 200) {
        setShopList(data)//TODO: 需要一个loading页去缓和未加载时大量的网络请求
        setState(ComponentState.OK)
        if(data.length < 1) {
          setState(ComponentState.EMPTY)
        } else {
          setState(ComponentState.OK)
        }
      } else {
        Toast.show(message)
        setState(ComponentState.ERROR)
      }
    })();
  }, [activeIndex])

  return (
    <div className={s.home}>
      <div className={s.header}>
        <div className={s.navBar}>
          <div className={s.search}>
            <SearchBar 
              style={{ 
                '--background': '#d7d7d7b0',
                '--border-radius': '15px' ,
                '--placeholder-color': '#928b8b'
              }} 
              placeholder="搜索商品" 
            />
          </div>
          <div className={s.publish}>
            <Button 
              color="primary"
              size="small"
              shape="rounded"
              fill="solid"
              onClick={() => { navigate('/publish')}}
            >
              <EditSFill />
              <span className={s.text}>发布</span>
            </Button>
          </div>
        </div>
        <div className={s.sort}>
          <Tabs
              activeKey={sorts[activeIndex].value}
              onChange={key => {
                const index = sorts.findIndex(item => item.value === key)
                setActiveIndex(index)
                swiperRef.current?.swipeTo(index)
              }}
          >
            {
              sorts.map(item => {
                return (
                  <Tab title={item.label} key={item.value}/>
                )
              })
            }
          </Tabs>
        </div>
      </div>
      <Swiper
          direction='horizontal'
          indicator={() => null}
          ref={swiperRef}
          onIndexChange={index => {
            setActiveIndex(index)
          }}
        >
          {
            sorts.map(item => {
              return (
                <Item key={item.value}>
                  <div className={s.body}>
                    <ComponentWrap state={state}>
                      <>
                        {
                          shopList.map(item => {
                            return <Card 
                              key={item.shopId}  
                              {...item}
                            />
                          })
                        }
                        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
                      </>
                    </ComponentWrap>
                  </div>
                </Item>
              )
            })
          }
      </Swiper>
      <TabButton />
    </div>
  );
}; 

export default Home;
