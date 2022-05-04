school-trade-system
├─.gitignore
├─axios.d.ts
├─config-overrides.js
├─externals.d.ts
├─package-lock.json
├─package.json
├─postcss.config.js
├─README.md
├─system.drawio
├─TODO.md
├─tsconfig.json
├─src
|  ├─App.tsx
|  ├─index.less
|  ├─index.tsx
|  ├─utils
|  |   ├─index.ts
|  |   └interface.ts
|  ├─store
|  |   ├─index.ts
|  |   ├─modules
|  |   |    ├─memory.ts
|  |   |    ├─message.ts
|  |   |    ├─messageList.ts
|  |   |    ├─shopDetail.ts
|  |   |    └user.ts
|  ├─router
|  |   ├─index.tsx
|  |   └PermissionAuth.tsx
|  ├─pages
|  |   ├─UserDetail
|  |   |     ├─index.tsx
|  |   |     └style.module.less
|  |   ├─UserAlter
|  |   |     ├─index.tsx
|  |   |     └style.module.less
|  |   ├─ShopDetail
|  |   |     ├─index.tsx
|  |   |     └style.module.less
|  |   ├─SearchDetail
|  |   |      ├─History.tsx
|  |   |      ├─index.tsx
|  |   |      ├─SearchResult.tsx
|  |   |      └style.module.less
|  |   ├─Register
|  |   |    ├─index.tsx
|  |   |    └style.module.less
|  |   ├─RecieveSubscribe
|  |   |        └index.tsx
|  |   ├─RecievePublish
|  |   |       └index.tsx
|  |   ├─RecieveLike
|  |   |      └index.tsx
|  |   ├─RecieveComment
|  |   |       └index.tsx
|  |   ├─Publish
|  |   |    ├─index.tsx
|  |   |    └style.module.less
|  |   ├─MySubscribe
|  |   |      └index.tsx
|  |   ├─MyShops
|  |   |    └index.tsx
|  |   ├─MyLike
|  |   |   └index.tsx
|  |   ├─MyFans
|  |   |   └index.tsx
|  |   ├─MyComment
|  |   |     └index.tsx
|  |   ├─MyCollect
|  |   |     └index.tsx
|  |   ├─MessageDetail
|  |   |       ├─index.tsx
|  |   |       ├─SingleMessage.tsx
|  |   |       └style.module.less
|  |   ├─Message
|  |   |    ├─index.tsx
|  |   |    └style.module.less
|  |   ├─Me
|  |   | ├─index.tsx
|  |   | └style.module.less
|  |   ├─Login
|  |   |   ├─index.tsx
|  |   |   └style.module.less
|  |   ├─Home
|  |   |  ├─index.tsx
|  |   |  └style.module.less
|  |   ├─FindPassword
|  |   ├─404
|  |   |  └index.tsx
|  ├─hooks
|  |   └index.ts
|  ├─components
|  |     ├─VerticalFlexBox
|  |     |        ├─index.tsx
|  |     |        └style.moduel.less
|  |     ├─UserList
|  |     |    ├─index.tsx
|  |     |    └style.moduel.less
|  |     ├─TabButton
|  |     |     ├─index.tsx
|  |     |     └style.module.less
|  |     ├─ShopList
|  |     |    ├─index.tsx
|  |     |    └style.module.less
|  |     ├─OperatedCardList
|  |     |        ├─index.tsx
|  |     |        └style.module.less
|  |     ├─MessageList
|  |     |      ├─index.tsx
|  |     |      └style.module.less
|  |     ├─IconWrap
|  |     |    ├─index.tsx
|  |     |    └style.module.less
|  |     ├─IconOperation
|  |     |       ├─index.tsx
|  |     |       └style.module.less
|  |     ├─ComponentWrap
|  |     |       ├─index.tsx
|  |     |       └style.module.less
|  |     ├─BasePage
|  |     |    ├─index.tsx
|  |     |    └style.module.less
|  ├─api
|  |  ├─effect.ts
|  |  ├─network.ts
|  |  └uploadImg.ts
├─server
|   ├─.http
|   ├─app.js
|   ├─package-lock.json
|   ├─package.json
|   ├─views
|   |   ├─error.jade
|   |   ├─index.jade
|   |   └layout.jade
|   ├─utils
|   |   ├─drop.js
|   |   ├─index.js
|   |   ├─mock.js
|   |   └socket.js
|   ├─routes
|   |   ├─login.js
|   |   ├─messages.js
|   |   ├─qiniuToken.js
|   |   ├─shops.js
|   |   └users.js
|   ├─public
|   |   ├─stylesheets
|   |   |      └style.css
|   |   ├─javascripts
|   |   ├─images
|   ├─model
|   |   ├─Message.js
|   |   ├─Shop.js
|   |   └User.js
|   ├─middlewares
|   |      └auth.js
|   ├─db
|   | └mongodb.js
|   ├─bin
|   |  └www
├─public
|   ├─favicon.ico
|   ├─index.html
|   ├─logo192.png
|   ├─logo512.png
|   ├─manifest.json
|   └robots.txt