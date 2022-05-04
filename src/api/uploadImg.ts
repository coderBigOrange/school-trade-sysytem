//TODO 了解下formData solved ajax2中用于方便使用XMLRequest来发送数据而提供的一个接口对象
import { GetQiNiuToken } from './effect';
import axios from 'axios';
import { Toast } from 'antd-mobile';

const  uploadImgToQiNiu = async (file: File) => {
  const { data, code} = await GetQiNiuToken();
  if(code === 200) {
    const { key, token } = data;
    const formData = new FormData();
    formData.append('token', token)
    formData.append('key', key);
    formData.append('file', file)
    const response = await axios.post('http://upload-z1.qiniu.com', formData);
    if(response.status === 200) {
      const url = 'rbcv05x6c.hb-bkt.clouddn.com/' + response.data.key;
      return url;
    }
    console.log('上传图片到七牛云失败:', response.statusText)
    Toast.show('上传图片到七牛云失败')
    return '';
  } else {
    throw new Error('获取图片上传token失败')
  }
}

export default uploadImgToQiNiu;