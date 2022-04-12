import React from "react";
import TabButton from "../../components/TabButton";
import s from './style.module.less'
import {
	NavBar
} from 'antd-mobile';
import {
	HeartFill,
	MailFill,
	StarFill,
	InformationCircleFill
} from 'antd-mobile-icons';
import IconOperation from "../../components/IconOperation";
import MessageList from "../../components/MessageList";
const users = [
  {
    avatar:
      'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'Novalee Spicer',
    messageBrief: 'Deserunt dolor ea eaque eos',
  }
]
const Message: React.FC = () =>{
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
					<IconOperation
						text="通知"
						style={{
							color: 'rgb(255 255 255 / 79%)',
							backgroundColor: 'rgb(109 161 200)'
						}}
						onClick={() => console.log('通知')}
						Icon={<InformationCircleFill />}
					/>
				</div>
			</div>
			<div className={s.body}>
				<MessageList data={users}/>
			</div>
			<TabButton />
		</div>
	)
}

export default Message;