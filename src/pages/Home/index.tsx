//TODO: 这块的长列表后续可以使用react virtualized进行优化
//TODO: 数据存入store避免切换时多次请求长列表
//TODO GET请求没有拿到数据的问题，后端数据返回条数限制，应该分页 solved
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Card from "../../components/Card";
import TabButton from "../../components/TabButton";
import {
  SearchBar,
  InfiniteScroll,
  Swiper,
  Tabs,
  Button,
} from 'antd-mobile';
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import {EditSFill} from 'antd-mobile-icons'
import { GetShopList } from "../../api/effect";
import s from "./style.module.less";

const { Item } = Swiper;
const { Tab } = Tabs;
const sorts = ['关注', '推荐','学习', '数码','体育','艺术','服饰', '日用品', '食品','其他']

const Home: React.FC = () => {
  const [shopList, setShopList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true)
  const [activeIndex, setActiveIndex] = useState(1);
  const [pageIdx, setPageIdx] = useState(1);
  const swiperRef = useRef<SwiperRef>(null)
  const navigate = useNavigate();

  const loadMore = async () => {
    const res = await GetShopList({
      shopSort: activeIndex,
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
      console.log(message)
      setHasMore(false)
    }
  }
  useEffect(() => {
    (async () => {
      const res = await GetShopList({
        shopSort:activeIndex,
        page: 0
      })
      if(res.code === 200) {
        setShopList(res.data)//TODO: 需要一个loading页去缓和未加载时大量的网络请求
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
              activeKey={sorts[activeIndex]}
              onChange={key => {
                const index = sorts.findIndex(item => item === key)
                setActiveIndex(index)
                swiperRef.current?.swipeTo(index)
              }}
          >
            {
              sorts.map(item => {
                return (
                  <Tab title={item} key={item}/>
                )
              })
            }
          </Tabs>
        </div>
      </div>
      <Swiper
          direction='horizontal'
          loop
          indicator={() => null}
          ref={swiperRef}
          defaultIndex={activeIndex}
          onIndexChange={index => {
            setActiveIndex(index)
          }}
        >
          {
            sorts.map(item => {
              return (
                <Item key={item}>
                  <div className={s.body}>
                    {
                      shopList.map((item, index) => {
                        return <Card 
                          key={index}  
                          {...item}
                        />
                      })
                    }
                    <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
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
