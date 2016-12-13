# Scoring System

## API


#### 0. 约定

+ 正常情况 `code: 0`
+ code 的值为 number 类型
+ 数据库错误统一 `code: 0`

#### 1. 发送短信

```
method: POST
path: /api/sendMsg
```

```
// params:
{
  phone: '1833333333',
}
```

```
// return:

{
  code: 0,
  message: '发送短信成功',
}

{
  code: 1001,
  message: '电话号码未填写'
}

{
  code: 1002,
  message: '该手机号对应的店主不存在',
}

{
  code: 1003,
  message: '发送短信失败',
}
```

## 命名约定

+ 数据库使用下划线
+ 代码使用驼峰法
+ 微信 openid `o` 和 `i` 均小写，其余驼峰法
