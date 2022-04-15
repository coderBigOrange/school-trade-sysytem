import React, { useState } from "react";
import { Form, Input, Button, Space,  Toast} from 'antd-mobile';
import { MailOutline, EyeInvisibleOutline,FrownOutline } from  'antd-mobile-icons';
import s from './style.module.less';
import {useNavigate} from 'react-router-dom';
import { UserLogin } from "../../api/effect";
import { validEmail, validPass } from "../../utils";
import { CheckState } from "../../utils/interface";
import { useAppDispatch } from "../../hooks";
import { updateAll } from '../../store/modules/user'

const { Item } = Form;
const Login: React.FC = () =>{
	const [emailTips, setEmailTips] = useState('');
	const [passwordTips, setPasswordTips] = useState('');
	const [isLogin, setIsLogin] = useState(false);
	const dispatch = useAppDispatch();
	const navigator = useNavigate(); 

	//TODO: 登录之后跳转到首页；注册页；找回密码页；
	const onFinish = async (data) => {
		const { userEmail, password} = data;
		const  isValidEmail = validEmail(userEmail);
		const isValidPass = validPass(password);
		if(isValidEmail === CheckState.OK && isValidPass === CheckState.OK) {
			setIsLogin(true)
			const res = await	UserLogin(data);
			setIsLogin(false);
			if(res.code === 200) {
				const {user, token} = res.data;
				const {
					userName,
					userEmail,
					userAvatar
				} = user;
				//将返回的用户信息存入store中
				dispatch(updateAll({
					name: userName,
					email: userEmail,
					avatar: userAvatar,
					}))
					localStorage.setItem('token',token)
				navigator('/home')
			} else {
				Toast.show({
					content: res.message,
					icon: <FrownOutline />
				});
			}
		}	else {
			if(isValidEmail === CheckState.EMPTY) {
				setEmailTips('邮箱不能为空')
			} else if(isValidEmail === CheckState.WRONG){
				setEmailTips('邮箱不合规或者非学生邮箱')
			}
			if(isValidPass === CheckState.EMPTY) {
				setPasswordTips('密码不能为空')
			} else if(isValidPass === CheckState.WRONG){
				setPasswordTips('密码长度不合规,应为8到20位')
			}
		}
	}
	const onRegister = () => {
		navigator('/register')
	}
	const onFindPassword = () => {
		console.log('找回密码')
	}
	return (
		<div className={s.login}>
			<div className={s.image}>
				<img src="https://www.cumtb.edu.cn/images/logo-20191228.png" alt="" />
			</div>
			<div className={s.header}>
				<div className={s.title}>中国矿业大学(北京)二手发布系统</div>
				<div>欢迎登录</div>
			</div>
			<div className={s.body}>
				<div className={s.form}>
					<Form 
						layout="horizontal"
						hasFeedback={true}
						validateTrigger="onChange"
						onFinish={onFinish}
						footer={
							<Button loading={isLogin} block type='submit' color='primary' size='large'>
								登录
							</Button>
						}
					>
						<Space className={s.space}>
							<Item label={<span><MailOutline /></span>} name="userEmail" >
									<Input placeholder='请输入邮箱' onFocus={() => setEmailTips('')}  />
							</Item>
						</Space>
						<p className={s.tips}>{emailTips}</p>
						<Space>
							<Item label={<span><EyeInvisibleOutline /></span>} name="password" >
								<Input placeholder='请输入密码' onFocus={() => setPasswordTips('')}  type='password'/>
							</Item>
						</Space>
						<p className={s.tips}>{passwordTips}</p>
					</Form>
				</div>
			</div>
			<div className={s.footer}>
				<div className={s.regBtn} onClick={onRegister}>注册</div>
				<div className={s.regBtn} onClick={onFindPassword}>找回密码</div>
			</div>
		</div>
	)
}

export default Login;

/**
 * 整个登录过程
 * 用户登录
 * 后端认证后将利用set cookie将token返回
 * 前端通过查验cookie是否携带token判断登录状态,并且重定向
 * 前端向后端请求，后端检查token状态，如果发现token过期返回401， 前端感知后重定向至登录页面刷新token;
 *
 */