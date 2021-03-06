# online_complier
## TODO List
- [ ] 登录/注册模块
    *  完成了一个demo，需要细化
    * 前端可能需要做一些正则表达式（匹配邮箱）
    - [x] 支持邮箱登录
    - [x] 支持邮箱注册
    - [x] 支持支持退出登录
    - [ ] 数据库添加用户id字段
- [ ] 面试题模块
    - [ ] 面试官可填写面试题
    - [ ] 每个面试题有固定链接
    - [ ] 支持新建面试题和修改面试题目
    - [ ] 支持邀请一个候选人编程
    - [ ] 面试题目支持富文本格式
- [ ] 在线编程模块
    - [ ] 候选人可在线编写代码
    - [ ] 代码支持多种语言高亮
    - [ ] 候选人侧提交最终编程代码
        * 无脑eval()?
    - [ ] 面试官侧刷新能看到最终代码
- [ ] ~~在线留言模块~~聊天模块
* 问题：聊天模块需要包含什么具体信息，人数？头像？时间？
    - [x] 候选人可以通过文字给面试官聊天
    - [x] 面试官可以回复
    - [ ] 留言内容长期保存
    * 问题：保存给谁看
    * 问题：保存的记录在哪里看
    * 问题：保存的记录格式是什么？
    - [x] 留言模块自动刷新
    * 以监听事件的方式刷新

- [ ] API TODO
    - [x] 登录
    - [x] 注册
    - [ ] 基于socket的实时文字聊天
        - [x] 问题：面试官退出，所有人的聊天连接断开，怎么处理
        * 面试官（房间创始人）如果退出，会向相同房间的连接发出通知，其他连接接到通知后异步刷新组件，退出连接。
        - [x] 问题：面试官退出，编程页面怎么处理
        * 处理方法同上
        - [x] 问题：多个聊天室同时运行怎么处理，后端单个端口listen所有聊天室请求？如何向特定连接广播消息？
        * 通过websocket分组（room）功能实现，每个连接socket请求时会携带所属的房间号。服务端会根据房间号进行广播。
        - [x] 问题：面试官能申请连接（房间），应聘者必须需要携带房间号去申请连接
        * 根据设计思路，面试官可以创建房间，应聘者只能以邀请码（房间号）的形式参与聊天。
    - [ ] 基于socket+mongodb的在线编程模块
    - [ ] 题库富文本，处理图片，不如把题目以html格式保存
    - [ ] 题库：增
    - [ ] 题库：改
    - [ ] 题库：删
    - [ ] 题库：查（是所有面试官共享一个大题库呢？还是面试官独自呢）
    - [ ] 还有啥？
    
---
- [ ] 【挑战⭐️】在线编程模块支持自动刷新
    - [ ] 候选人侧代码支持自动保存
    - [ ] 面试官侧代码自动刷新
- [x] 【挑战⭐️⭐️】在线留言模块改成实时文字聊天
    - [x] 候选人和面试官可实时文字聊天
    - [x] 其他获得链接的人都可参与文字聊天
- [ ] 【挑战⭐️⭐️⭐️】在线语音聊天模块

    - [ ] 候选人和面试官可实时语音聊天

- [ ] 【挑战⭐️⭐️⭐️⭐️⭐️】在线编程模块支持运行 JS 代码

    - [ ] 候选人和面试官可在线运行 JS 代码并查看输出

- [ ] 【挑战⭐️⭐️⭐️⭐️⭐️】在线编程模块支持协同编辑

    - [ ] 候选人和面试官可实时协作编程

## To Fix List



## 前端

### 登录/注册模块



$\vdots$


## 后端API

[api 文档]( ./server/README.md)