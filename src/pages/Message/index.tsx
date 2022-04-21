import React, { useEffect, useState } from "react";
import TabButton from "../../components/TabButton";
import s from './style.module.less'
import {
	NavBar, Toast
} from 'antd-mobile';
import {
	HeartFill,
	MailFill,
	StarFill,
	InformationCircleFill
} from 'antd-mobile-icons';
import IconOperation from "../../components/IconOperation";
import MessageList from "../../components/MessageList";
import { GetMessageList } from "../../api/effect";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { MessageType } from "../../utils/interface";
import ComponentWrap from "../../components/ComponentWrap";
import { ComponentState } from "../../utils/interface";
import { updateAll } from "../../store/modules/user";

const Message: React.FC = () =>{
	const userEmail = useAppSelector(state => state.user.userEmail)
	const [messageList, setMessaeList] = useState<MessageType[]>([])
	const dispatch = useAppDispatch();
  const [state, setState] = useState<ComponentState>(ComponentState.LODING)

	useEffect(() => {
		(async () => {
			setState(ComponentState.LODING)
			const res = await GetMessageList({userEmail})
			const {	
				code,
				message,
				data
			} = res;
			if(code === 200) {
				setMessaeList(data)
				if(data.length < 1) {
					setState(ComponentState.EMPTY)
				} else {
					setState(ComponentState.OK)
				}
			} else if(code === 401){
				Toast.show('身份认证过期，请重新登录')
				setState(ComponentState.ERROR)
				// dispatch(updateAll({
				// 	name: '',
				// 	avatar: '',
				// 	email: '',
				// }))
			} else {
				Toast.show(message)
				setState(ComponentState.ERROR)
			}
		})();
	}, [userEmail])
	return (
		<div className={s.message}>
			<div className={s.header}>
				<NavBar
					back={null}
				>
					<span className={s.title}>消息</span>
				</NavBar>
				<div className={s.operation}>
					<IconOperation 
						text="点赞" 
						style={{
							color: '#ff19197d',
							backgroundColor: '#ffc6c6'
						}}
						onClick={() => console.log('点赞')} 
						Icon={<HeartFill />}
					/>
					<IconOperation 
						text="评论" 
						style={{
							color: 'rgb(231 223 236)',
							backgroundColor: 'rgb(115 84 232 / 89%)'
						}}
						onClick={() => console.log('评论')} 
						Icon={<MailFill />}
					/>
					<IconOperation 
						text="关注" 
						style={{
							color: '#fdff81',
							backgroundColor: 'rgb(66 202 185 / 63%)'
						}}
						onClick={() => console.log('关注')} 
						Icon={<StarFill />}
					/>
				</div>
			</div>
			<div className={s.body}>
				<ComponentWrap state={state}>
					<MessageList data={messageList}/>
				</ComponentWrap>
			</div>
			<TabButton />
		</div>
	)
}

export default Message;