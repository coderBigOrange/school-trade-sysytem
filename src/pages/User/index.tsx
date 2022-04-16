//TODO: 这块可以增加一个统计图
//TODO: 或者弹幕标签
import React from "react";
import TabButton from "../../components/TabButton";
import VerticalFlexBox from "../../components/VerticalFlexBox";
import s from './style.module.less';
import { Avatar, Button, List } from "antd-mobile";
import { SetOutline } from 'antd-mobile-icons'
import IconWrap from "../../components/IconWrap";
import { useAppSelector } from "../../hooks";

const { Item } = List;

const User: React.FC = () =>{
	const user = useAppSelector(state => state.user)
	return (
		<div className={s.user}>
			<div className={s.baseInfo}>
				<div className={s.userInfo}>
					<Avatar 
						style={{'--size': '70px', '--border-radius': '50%'}}
						fit='contain'
						src={user.avatar}
					/>
					<div className={s.description}>
						<div className={s.userName}>{user.name}</div>
						<div className={s.otherInfo}>机电学院计算机2班</div>
					</div>
				</div>
				<div className={s.operation}>
					<VerticalFlexBox onClick={() => console.log('我收藏的')}>
						<div className={s.count}>99</div>
						<div className={s.name}>我收藏的</div>
					</VerticalFlexBox>
					<VerticalFlexBox onClick={() => console.log('我浏览的')}>
						<div className={s.count}>99</div>
						<div className={s.name}>我浏览的</div>
					</VerticalFlexBox>
					<VerticalFlexBox onClick={() => console.log('我喜欢的')}>
						<div className={s.count}>99</div>
						<div className={s.name}>我喜欢的</div>
					</VerticalFlexBox>
					<VerticalFlexBox onClick={() => console.log('我评论的')}>
						<div className={s.count}>99</div>
						<div className={s.name}>我评论的</div>
					</VerticalFlexBox>
				</div>
				<div className={s.settingIcon}>
					<SetOutline />
				</div>
			</div> 
			<div className={s.history}>
				<div className={s.title}>基本信息</div>
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
					<VerticalFlexBox onClick={() => console.log('我的关注')}>
						<div className={s.icon}>
							<IconWrap iconName="gouwu"/>
						</div>
						<div className={s.name}>
							<span>我的关注</span>
							<span>0</span>
						</div>
					</VerticalFlexBox>
					<VerticalFlexBox onClick={() => console.log('我的粉丝')}>
						<div className={s.icon}>
							<IconWrap iconName="dingdan"/>
						</div>
						<div className={s.name}>
							<span>我的粉丝</span>
							<span>1</span>
						</div>
					</VerticalFlexBox>
				</div>
			</div>
			{/* <div className={s.setting}>
				<List header={<div className={s.title}>辅助功能</div>}>
					<Item 
						prefix={<IconWrap iconName="diadema"/>}
						onClick={() => {console.log('你好')}}>
							待定
					</Item>
					<Item 
						prefix={<IconWrap iconName="diadema"/>}
						onClick={() => {console.log('你好')}}>
							待定
					</Item>
					<Item 
						prefix={<IconWrap iconName="diadema"/>}
						onClick={() => {console.log('你好')}}>
							待定
					</Item>
					<Item 
						prefix={<IconWrap iconName="diadema"/>}
						onClick={() => {console.log('你好')}}>
							待定
					</Item>
					<Item 
						prefix={<IconWrap iconName="diadema"/>}
						onClick={() => {console.log('你好')}}>
							待定
					</Item>
				</List>
			</div> */}
			<TabButton />
		</div>
	)
}

export default User;