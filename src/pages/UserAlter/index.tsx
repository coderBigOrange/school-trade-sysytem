import React, { useState } from "react";
import s from './style.module.less';
import {
  NavBar,
  ImageUploader,
  TextArea,
  Form,
  Input,
  Button,
  Toast,
  Calendar,
  Radio,
} from 'antd-mobile';
import { 
  ImageUploadItem
} from 'antd-mobile/es/components/image-uploader';
import { useNavigate } from "react-router-dom";
import { uploadImg } from '../../utils';
import uploadImgToQiNiu from '../../api/uploadImg';
import { useAppSelector } from "../../hooks";
import { AlterUserInfo } from "../../api/effect";

const { Item } = Form;
const { Group } = Radio;

const UserAlter: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState<ImageUploadItem[]>([])
  const navigate = useNavigate();
  const userEmail = useAppSelector(state => state.user.userEmail)


  const onFinish = async (values) => {
    setIsLoading(true)
    const img: File = values?.userAvatar?.[0]?.extra;
    let userAvatar = '';
    if(img) {
      console.log('img: ',img)
      const url = await uploadImgToQiNiu(img)
      userAvatar =  'http://'+url;
    }
    const data = {
      ...values,
      userAvatar,
      userEmail
    }
    console.log(data)
    const res = await AlterUserInfo(data);
    const {
      code,
      message,
    } = res;
    if(code === 200) {
      setIsLoading(false)
      Toast.show('修改成功')
      navigate('/me')
    } else {
      Toast.show(message)
      setIsLoading(false)
    }
  } 

  return (
    <div className={s.userAlter}>
      <NavBar onBack={() => navigate('/me')}>修改个人信息</NavBar>
      <div className={s.body}>
        <Form
          onFinish={onFinish}
          initialValues={{
            userGender: 1
          }}
          footer={
            <Button 
              block type='submit' 
              color='primary' 
              size='large'
              loading={isLoading}
            >
              完成修改
            </Button>
          }
        >
          <Item name="userName" label="姓名">
            <Input placeholder="输入姓名" />
          </Item>
          <Item name="userGender" label="性别">
            <Group>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Group>
          </Item>
          <Item name="userAvatar" label="上传头像">
            <ImageUploader 
                value={fileList}
                onChange={setFileList}
                style={{ '--cell-size': '100px' }}
                upload={uploadImg}
                maxCount={1}
                deletable={true}
                preview={true}
              />
          </Item>
          <Item name="userStudentInfo" label="学生信息">
            <Input placeholder='年级，学院，专业，班级等信息'/>  
          </Item>
          <Item name="userIntroduce" label="个人介绍">
            <TextArea
                  placeholder='良好的个人介绍有助于他人更好的了解自己喔~'
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />  
          </Item>
          <Item name="userBirth" label="生日">
            <Calendar
              selectionMode='single'
              onChange={val => {
                console.log(val)
              }}
            />
          </Item>
          <Item name="userAddress" label="故乡">
            <Input placeholder="我的家乡" />
          </Item>
        </Form>
      </div>
    </div>
  )
}

export default UserAlter;