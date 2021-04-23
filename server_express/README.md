# API 文档
# Done
## 登录api
* api地址 http://localhost:3000/reqLogin
### request格式（post）
```json
{
    
    "username": "String",//用户名
    "password": "String",//密码
    "type": "Number",// 0-普通应聘者，1-面试官
}
```
### response格式
```json
{
    "status": "String",// 返回状态 0-请求成功 1-请求失败或请求成功但是账号密码错误
    "msg": "String",// 返回请求成功/错误的详细信息
    "result": {
        "username": "String"// 返回查询到的用户名
    }
}
```

***
# TO DO

## 注册api
* api地址 http://localhost:3000/reqSignIn
### request格式（post）
```json
{
}
```
### response格式
```json
{
}
```

## api
* api地址 
### request格式（post）
```json
{
}
```
### response格式
```json
{
}
```

## api
* api地址 
### request格式（post）
```json
{
}
```
### response格式
```json
{
}
```

## api
* api地址 
### request格式（post）
```json
{
}
```
### response格式
```json
{
}
```

## api
* api地址 
### request格式（post）
```json
{
}
```
### response格式
```json
{
}
```