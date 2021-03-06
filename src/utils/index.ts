import { CheckState } from "./interface";

export function validEmail(val: string | undefined) {
  if(!val) {
    return CheckState.EMPTY;
  } else {
    let isOk =  /^[0-9a-zA-Z_]+@student.cumtb.edu.cn$/.test(val);
    return isOk ? CheckState.OK : CheckState.WRONG;
  }
}

export function validPass(val: string | undefined) {
  if(!val) {
    return CheckState.EMPTY;
  } else {
    let isOk =  /^\w{8,20}$/.test(val);
    return isOk ? CheckState.OK : CheckState.WRONG;
  }
}

export function validComfirm(password: string|undefined, confirmword: string|undefined) {
  return password === confirmword ? CheckState.OK : CheckState.WRONG
}

export function validPhone(val) {
  return /^1[3456789]\d{9}$/.test(val);
}


export function validUserName(name) {
  return validEmail(name) || validPhone(name);
}

export function validCode(val) {
  return /^[0-9]{6}$/.test(val);
}

export function userName(str) {
  const re = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
  return re.test(str);
}

export function validateMainName2(name) {
  const re = /^[a-zA-Z0-9_-]{1,19}$/
  return re.test(name);
}

export function validateNickName(name) {
  const re = /^[a-zA-Z0-9\u4E00-\u9FA5]{2,10}$/
  return re.test(name);
}

export function formatDate(value) {
  if (!value) {
    return '';
  }
  let d = new Date(value);
  let year = d.getFullYear();
  let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
  let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
  return  year + '-' + month + '-' + day;
}

export function formatTime(value) {
  if (!value) {
    return '';
  }
  let d = new Date(value);
  // let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
  let hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
  // let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
  // let seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
  return  `${month}月${day}日 ${hour}时`;
}

export function formatHour(value) {
  if (!value) {
    return '';
  }
  let d = new Date(value);
  // let year = d.getFullYear();
  // let month = d.getMonth() + 1;
  // let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
  let hour = d.getHours();
  return  hour;
}

export function timeFromNow(value) {
  let currentDate = Date.now();
  let timestamp = currentDate - value;
  switch (true) {
    case timestamp > 86400000:
      return `${Math.floor(timestamp / 86400000)}天前`;
    case timestamp > 3600000:
      return `${Math.floor(timestamp / 3600000)}小时前`;
    case timestamp > 60000:
      return `${Math.floor(timestamp / 60000)}分钟前`;
    case timestamp > 1000:
      return `${Math.floor(timestamp / 1000)}秒钟前`;
    default:
      // do nothing
  }
}

export async function uploadImg(file: File) {
  console.log(file)
  await new Promise(resolve => {
    setTimeout(() => {
      resolve('ok');
    },1000)
  })
  return {
    url: URL.createObjectURL(file),
    extra: file,
  }
}