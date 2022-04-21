import React, { useEffect } from "react";
import TabButton from "../../components/TabButton";
import VerticalFlexBox from "../../components/VerticalFlexBox";
import s from './style.module.less';
import { Avatar, List, Toast, Dialog } from "antd-mobile";
import IconWrap from "../../components/IconWrap";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { GetUserInfo } from "../../api/effect";
import { updateAll, deleteUser } from "../../store/modules/user";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils";

const { Item } = List;

const Me: React.FC = () =>{
	const user = useAppSelector(state => state.user)
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		if(user.userEmail && dispatch) {
			(async () => {
				const res = await GetUserInfo({
					email: user.userEmail
				})
				const {
					code,
					data,
					message
				} = res;
				if(code === 200) {
					dispatch(updateAll(data))
				} else {
					Toast.show(message)
				}
			})();
		}
	}, [user.userEmail, dispatch])
	const userLogout = async () => {
		const res = await Dialog.confirm({
			content: '是否要注销登录?'
		})
		if(res === true) {
			localStorage.setItem('token', '');
			dispatch(deleteUser({}))
			navigate('/login')
		}
	}
	return (
		<div className={s.user}>
			<div className={s.baseInfo}>
				<div className={s.topInfo}>
					<Avatar 
						style={{'--size': '70px', '--border-radius': '50%'}}
						fit='cover'
						src={user.userAvatar}
					/>
					<div className={s.description}>
						<div className={s.userName}>{user.userName}</div>
						<div className={s.otherInfo}>{user.userStudentInfo}</div>
					</div>
				</div>
				<div className={s.middleInfo}>
          {
						user.userGender && (
							<div className={s.gender}>
                <span>性别：</span>
                {user.userGender === 1 ? '男' : '女'}
              </div>
            )
          }
          {
						user.userBirth && (
							<div className={s.birth}>
                <span>生日： </span>
                {formatDate(user.userBirth)}
              </div>
            )
          }
          {
						user.userAddress && (
							<div className={s.address}>
                <span>家乡: </span>
                {user.userAddress}
              </div>
            )
          }
					<div className={s.introduce}>{user.userIntroduce}</div>
				</div>
				<div className={s.footerInfo}>
					<VerticalFlexBox onClick={() => console.log('我收藏的')}>
						<div className={s.count}>{user.userCollectList.length}</div>
						<div className={s.name}>我收藏的</div>
					</VerticalFlexBox>
					<VerticalFlexBox onClick={() => console.log('我喜欢的')}>
						<div className={s.count}>{user.userLikeList.length}</div>
						<div className={s.name}>我喜欢的</div>
					</VerticalFlexBox>
					<VerticalFlexBox onClick={() => console.log('我评论的')}>
						<div className={s.count}>{user.userCommentList.length}</div>
						<div className={s.name}>我评论的</div>
					</VerticalFlexBox>
				</div>
			</div> 
			<div className={s.history}>
				<div className={s.title}>基本信息</div>
				<div className={s.saleHistory}>
					<VerticalFlexBox onClick={() => console.log('我发布的')}>
						<div className={s.icon}>
							<IconWrap iconName="icon-biaoqian"/>
						</div>
						<div className={s.name}>
							<span>我发布的</span>
							<span>{user.userPublishList.length}</span>
						</div>
					</VerticalFlexBox>
					<VerticalFlexBox onClick={() => console.log('我的关注')}>
						<div className={s.icon}>
							<IconWrap iconName="icon-shoucang"/>
						</div>
						<div className={s.name}>
							<span>我的关注</span>
							<span>{user.userSubscribe.length}</span>
						</div>
					</VerticalFlexBox>
					<VerticalFlexBox onClick={() => console.log('我的粉丝')}>
						<div className={s.icon}>
							<IconWrap iconName="icon-dianzan"/>
						</div>
						<div className={s.name}>
							<span>我的粉丝</span>
							<span>{user.userBeSubscribed.length}</span>
						</div>
					</VerticalFlexBox>
				</div>
			</div>
			<div className={s.setting}>
				<List header={<div className={s.title}>其他操作</div>}>
					<Item 
						prefix={<IconWrap iconName="diadema"/>}
						onClick={() => {navigate('/alter')}}>
							修改个人信息
					</Item>
					<Item 
						prefix={<IconWrap iconName="diadema"/>}
						onClick={userLogout}>
							注销登录
					</Item>
				</List>
			</div>
			<TabButton />
		</div>
	)
}

export default Me;