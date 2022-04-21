const express = require('express')
const {getQiNiuToken} = require('../utils')
const router = express.Router();

router.get('/token', (req, res, next) => {
    const uploadToken = getQiNiuToken();
    const key = +new Date() + Math.random().toString(16).slice(2)+'.jpg'; 
    res.status(200).send({
      code: 200,
      messge: '获取七牛token成功',
      data: {
        token: uploadToken,
        key
      }
    })
})

module.exports = router;