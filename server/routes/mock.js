//该接口仅用于向数据库时候插入一些假mock数据(之后会封装成一个接口)
const Mock = require('mockjs');
const { User } = require('../model/User')
const { Shop } = require('../model/Shop');

const { Random, mock } = Mock;
Random.extend({
  shopImg: function() {
    let count = Math.floor(Math.random()*3) + 1;
    const imgs = [
      'https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/104762/2/26167/217207/624d6536E9b0afc89/3a672cf5fe0057e9.jpg!q70.dpg.webp',
      'https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/195950/1/9974/100935/60d43f00Ee39f5f85/f444f32128648a2b.jpg!q70.dpg.webp',
      'https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/137366/20/21705/79029/622b00d2E103d1aca/70510d5956945bbf.jpg!q70.dpg.webp',
      'https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/109745/34/26535/320636/624c7e57E4a1f6f09/fa9aa9518cffb559.jpg!q70.dpg.webp',
      'https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/102458/5/25523/113600/6239f6a4Ef9a42ff3/253755858a674286.jpg!q70.dpg.webp',
    ];
    const res = [];
    for (let i = 0; i < count; i++) {
      res.push(this.pick(imgs))
    }
    return res;
  },
  userEmail: function() {
    const emails = [
      '1810410221@student.cumtb.edu.cn',
      '1710410221@student.cumtb.edu.cn'
    ]
    return this.pick(emails)
  },
  userAvatar: function() {

  }
})

//商品列表
const data = mock({
  "shopList|10" : [
    {
      shopTitle: "@csentence(8,18)",
      shopDescription: "@cparagraph(8,18)",
      shopImg: "@shopImg",
      shopSort: '@natural(0,10)',
      shopPrice: '@float(10,1000,0,2)',
      shopOwnerEmail: '@userEmail',
    }
  ],
})

// Shop.insertMany(data.shopList, function(err, res){
//   if(err) {console.log(err)}
//   console.log('插入成功', res.length)
// });

// Shop.deleteMany({}, function(err, res) {
//   if(err) {console.log(err)};
//   console.log('删除成功',res)
// })


// User.create({
//   userName: '橘子',
//   userAvatar: 'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
//   userEmail: '1710410221@student.cumtb.edu.cn',
//   password: '123456789',
//   userGender: 1,
//   userStudentInfo: '机电学院计算机18-2',
// },function(err, res) {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log(res)
//   }
// })

// User.updateOne(
//   {userEmail: '1710410221@student.cumtb.edu.cn'},
//   {
//     // userName: '橙子',
//     // userAvatar: 'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
//     // userGender: 1,
//     userStudentInfo: '机电学院计算机17-2',
//   },
//   function(err, res) {
//     if(err) {
//       console.log(err)
//     } else {
//       console.log(res)
//     }
//   }
// )
