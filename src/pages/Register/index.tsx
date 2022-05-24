import React, {useState } from 'react';
import {Form, Button, Input, Space, Toast } from 'antd-mobile'
import s from './style.module.less';
import { useNavigate } from 'react-router-dom';
import { validComfirm, validEmail, validPass } from "../../utils";
import { CheckState } from "../../utils/interface";
import { UserRegister } from "../../api/effect";
import { Link } from 'react-router-dom';
const { Item } = Form;

const Register: React.FC = () => {
  const [emailTips, setEmailTips] = useState('');
	const [passwordTips, setPasswordTips] = useState('');
  const [confirmTips, setComfirmTips] = useState('');
	const [isLoading, setIsLoding] = useState(false);
  const navigator = useNavigate();
	const onFinish = async (data) => {
		const { userEmail, password, comfirm} = data;
		const  isValidEmail = validEmail(userEmail);
		const isValidPass = validPass(password);
    const isValidComfirm = validComfirm(password, comfirm);
		if(isValidEmail === CheckState.OK && isValidPass === CheckState.OK && isValidComfirm === CheckState.OK) {
      setIsLoding(true)
			const res = await	UserRegister(data);
      setIsLoding(false)
      console.log(res)
      Toast.show(res.message)
      if(res.code === 200) {
        navigator('/login')
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
      if(isValidComfirm === CheckState.WRONG) {
        setComfirmTips('两次密码不相等')
      }
		}
	}
  return (
    <div className={s.register}>
      <div className={s.image}>
				<img src="https://www.cumtb.edu.cn/images/logo-20191228.png" alt="" />
			</div>
      <div className={s.header}>
				<div className={s.title}>中国矿业大学(北京)二手发布系统</div>
				<div>欢迎注册</div>
			</div>
      <div className={s.body}>
        <Form 
          layout="horizontal"
          onFinish={onFinish}
          footer={
            <Button block type='submit' color='primary' size='large' loading={isLoading}>
              注册
            </Button>
          }
        >
          <Space>
            <Item label="邮箱" name="userEmail" help="邮箱必须为矿大北京学生邮箱">
              <Input placeholder='请输入邮箱' onFocus={() => setEmailTips('')} />
            </Item>
          </Space>
						<p className={s.tips}>{emailTips}</p>
          <Space>
            <Item label="密码" name="password">
              <Input placeholder='请输入密码'  onFocus={() => setPasswordTips('')} type='password'/>
            </Item>
          </Space>
						<p className={s.tips}>{passwordTips}</p>
          <Space>
            <Item label="确认密码" name="comfirm">
              <Input placeholder='请确认密码'  onFocus={() => setComfirmTips('')}  type='password'/>
            </Item>
          </Space>
						<p className={s.tips}>{confirmTips}</p>
        </Form>
      </div>
      <div className={s.footer}>
				<Link className={s.back} to="/login" >返回登录</Link>
			</div>
    </div>
  )
}

export default Register;