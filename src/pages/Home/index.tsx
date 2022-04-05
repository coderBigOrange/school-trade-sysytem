import React, { useState, useRef } from "react";
import Card from "../../components/Card";
import TabButton from "../../components/TabButton";
import {
  SearchBar,
  InfiniteScroll,
  DotLoading,
  Swiper,
  Tabs,
  Button,
  NavBar,
  Divider
} from 'antd-mobile';
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import {EditSFill} from 'antd-mobile-icons'
import { MockGetShopList } from "../../api/effect";
import s from "./style.module.less";

const { Item } = Swiper;
const { Tab } = Tabs;
const sorts = ['关注', '推荐','学习', '数码','体育','艺术','服饰', '日用品', '食品','其他']

const Home: React.FC = () => {
  const [shopList, setShopList] = useState<number[]>([1,2,3,4,5]);
  const [hasMore, setHasMore] = useState(true)
  const [activeIndex, setActiveIndex] = useState(1);
  const swiperRef = useRef<SwiperRef>(null)
  const loadMore = async () => {
    const arr = await MockGetShopList();
    setShopList([...shopList, ...arr])
  }
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
                        return <Card key={index} />
                      })
                    }
                    <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
                  </div>
                </Item>
              )
            })
          }
      </Swiper>
      <div className={s.footer}>
        <TabButton />
      </div>
    </div>
  );
}; 

export default Home;
