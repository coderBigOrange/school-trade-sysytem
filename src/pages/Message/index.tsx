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
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
    name: 'Sara Koivisto',
    messageBrief: 'Animi eius expedita, explicabo',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'Marco Gregg',
    messageBrief: 'Ab animi cumque eveniet ex harum nam odio omnis',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'Edith Koenig',
    messageBrief: 'Commodi earum exercitationem id numquam vitae',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'orange1',
    messageBrief: 'Commodi earum exercitationem id numquam vitae',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'orange2',
    messageBrief: 'Commodi earum exercitationem id numquam vitae',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'orange3',
    messageBrief: 'Commodi earum exercitationem id numquam vitae',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'orange4',
    messageBrief: 'Commodi earum exercitationem id numquam vitae',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'orange5',
    messageBrief: 'Commodi earum exercitationem id numquam vitae',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'orange6',
    messageBrief: 'Commodi earum exercitationem id numquam vitae',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'orange7',
    messageBrief: 'Commodi earum exercitationem id numquam vitae',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'orange8',
    messageBrief: 'Commodi earum exercitationem id numquam vitae',
  },
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