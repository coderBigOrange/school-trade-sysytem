import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import {
  NavBar,
  ImageUploader,
  TextArea,
  Form,
  Input,
  Button,
  Picker,
  Toast
} from 'antd-mobile';
import { FormInstance } from 'antd-mobile/es/components/form'
import { 
  ImageUploadItem
} from 'antd-mobile/es/components/image-uploader';
import { uploadImg } from '../../utils';
import uploadImgToQiNiu from '../../api/uploadImg';
import { PublishShop } from '../../api/effect'
import { sorts } from "../../utils/interface";
import { useAppSelector } from '../../hooks';
import s from './style.module.less'

const { Item } = Form;

const Publish: React.FC = () => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([])
  const navigate = useNavigate();
  const [isLoding, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false)
  const formRef = React.createRef<FormInstance>()
  const userInfo = useAppSelector(state => state.user)
  
  const onFinish = async (values) => {
    //首先将图片上传值七牛云，获得图片的url，之后再将所有数据上传至数据库
    setIsLoading(true)
		const imgs: File[] = values.shopImgs.map(item => item.extra);
    const promises = imgs.map(img => uploadImgToQiNiu(img))
    const res = await Promise.all(promises);
    const imgUrls = res.map(item => 'http://'+item)
    console.log(imgUrls)
    const data = {
      ...values,
      shopPrice: parseFloat(values.shopPrice),
      shopImgs: imgUrls,
      shopSort: values.shopSort[0],
      shopOwnerEmail: userInfo.userEmail
    }
    const result =  await PublishShop(data);
    if(result.code === 200) {
      setIsLoading(false)
      Toast.show('发布成功')
      navigate('/home')
    } else {
      setIsLoading(false)
      Toast.show(result.message)
    }
	}
  return (
    <div className={s.publish}>
      <NavBar
        onBack={() => navigate(-1)}
      >
        <span>发布</span>
      </NavBar>
      <div className={s.body}>
        <Form
          ref={formRef}
          onFinish={onFinish}
          footer={
            <Button 
              block type='submit' 
              color='primary' 
              size='large'
              loading={isLoding}
            >
              发布
            </Button>
          }
        >
          <Item name="shopTitle" label="标题" rules={[{ required: true }]}>
            <Input placeholder='请输入商品标题' />
          </Item>
          <Item name="shopDescription" label="详情" rules={[{ required: true }]}>
            <TextArea
              placeholder='买家都关心品牌型号，入手渠道，转手原因...'
              autoSize={{ minRows: 3, maxRows: 5 }}
            />  
          </Item>
          <Item name="shopImgs" label="图片" rules={[{ required: true }]} >
            <ImageUploader 
              value={fileList}
              onChange={setFileList}
              style={{ '--cell-size': '100px' }}
              upload={uploadImg}
              deletable={true}
              preview={true}
            />
          </Item>
          <Item 
            name="shopSort" 
            label="种类" 
            layout='horizontal'
            onClick={() => setIsVisible(true)}
            rules={[{ required: true }]}
          >
            <Picker
              columns={[sorts.slice(2)]}
              visible={isVisible}
              onClose={() => setIsVisible(false)}
              onConfirm={(value) => {
                formRef.current?.setFieldsValue({shopSort: value});
              }}
            >
              {items => {
                if (items.every(item => item === null)) {
                  return '未选择'
                } else {
                  return items.map(item => item?.label ?? '未选择')
                }
              }}
            </Picker>
          </Item>
          <Item  
            name="shopPrice"  
            layout='horizontal'
            label="价格"
            rules={[{ required: true }]}
          >
            <Input 
              placeholder='请输入价格'
            />
          </Item>
        </Form>
      </div>
    </div>
  )
}

export default Publish;