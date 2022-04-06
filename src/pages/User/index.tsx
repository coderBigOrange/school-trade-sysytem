//TODO: 这块可以增加一个统计图
//TODO: 或者弹幕标签
import React from "react";
import TabButton from "../../components/TabButton";
import VerticalFlexBox from "../../components/VerticalFlexBox";
import s from './style.module.less';
import { Avatar, List } from "antd-mobile";
import { SetOutline } from 'antd-mobile-icons'
import IconWrap from "../../components/IconWrap";

const { Item } = List;

const User: React.FC = () =>{
	return (
		<div className={s.user}>
			<div className={s.baseInfo}>
				<div className={s.userInfo}>
					<Avatar 
						style={{'--size': '70px', '--border-radius': '50%'}}
						fit='contain'
						src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
					/>
					<div className={s.description}>
						<div className={s.userName}>埃隆马斯克</div>
						<div className={s.otherInfo}>机电学院计算机2班</div>
					</div>
				</div>
				<div className={s.operation}>
					<VerticalFlexBox onClick={() => console.log('我的收藏')}>
						<div className={s.count}>99</div>
						<div className={s.name}>我的收藏</div>
					</VerticalFlexBox>
					<VerticalFlexBox onClick={() => console.log('历史浏览')}>
						<div className={s.count}>99</div>
						<div className={s.name}>历史浏览</div>
					</VerticalFlexBox>
					<VerticalFlexBox onClick={() => console.log('我的关注')}>
						<div className={s.count}>99</div>
						<div className={s.name}>我的关注</div>
					</VerticalFlexBox>
					<VerticalFlexBox onClick={() => console.log('我的粉丝')}>
						<div className={s.count}>99</div>
						<div className={s.name}>我的粉丝</div>
					</VerticalFlexBox>
				</div>
				<div className={s.settingIcon}>
					<SetOutline />
				</div>
			</div> 
			<div className={s.history}>
				<div className={s.title}>我的交易</div>
				<div className={s.saleHistory}>
					<VerticalFlexBox onClick={() => console.log('我发布的')}>
						<div className={s.icon}>
							<IconWrap iconName="biaoqian"/>
						</div>
						<div className={s.name}>
							<span>我发布的</span>
							<span>0</span>
						</div>
					</VerticalFlexBox>
					<VerticalFlexBox onClick={() => console.log('我卖出的')}>
						<div className={s.icon}>
							<IconWrap iconName="gouwu"/>
						</div>
						<div className={s.name}>
							<span>我卖出的</span>
							<span>0</span>
						</div>
					</VerticalFlexBox>
					<VerticalFlexBox onClick={() => console.log('我购买的')}>
						<div className={s.icon}>
							<IconWrap iconName="dingdan"/>
						</div>
						<div className={s.name}>
							<span>我购买的</span>
							<span>1</span>
						</div>
					</VerticalFlexBox>
				</div>
			</div>
			<div className={s.setting}>
				<List header={<div className={s.title}>辅助功能</div>}>
					<Item 
						prefix={<IconWrap iconName="diadema"/>}
						onClick={() => {console.log('你好')}}>
							你好
					</Item>
					<Item 
						prefix={<IconWrap iconName="diadema"/>}
						onClick={() => {console.log('你好')}}>
							你好
					</Item>
					<Item 
						prefix={<IconWrap iconName="diadema"/>}
						onClick={() => {console.log('你好')}}>
							你好
					</Item>
					<Item 
						prefix={<IconWrap iconName="diadema"/>}
						onClick={() => {console.log('你好')}}>
							你好
					</Item>
					<Item 
						prefix={<IconWrap iconName="diadema"/>}
						onClick={() => {console.log('你好')}}>
							你好
					</Item>
				</List>
			</div>
			<TabButton />
		</div>
	)
}

export default User;