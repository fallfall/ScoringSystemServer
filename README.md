# Scoring System

## Proxy API

#### 0. 约定

+ 所有 code 均为整形（number）

+ 正常情况 `code: 0`
```
{
  code: 0,
  message: 'xx成功',  // 简短的正常消息
}
```
+ 异常情况-服务错误，`code` 统一为 `5000`。如数据库错误、try/catch 异常等
```
{
  code: 5000,
  message: '服务器错误',
  error: e, // object 错误详情
}
```
+ 请求参数给出请求示例，并说明参数含义及类型
```
{
  tel: '183333333', // string 手机号码
  id: 1, // number, // number 用户id
}
```

#### 1. 发送短信验证码

```
method: POST
path: /proxy/sendMsg
```

```
// params
{
  tel: '183333333', // string 手机号码
}
```

```
// return
{
  code: 0,
  message: '发送验证码成功',
}

{
  code: 1002,
  message: '手机号未注册，不能进行登录',
}

{
  code: 1003,
  message: '发送短信验证码失败',
}

```

#### 2. 绑定手机号


```
method: POST
path: /proxy/verifyTel
```

```
// params
{
  tel: '183333333', // string 手机号码
  vCode: '0000', // string 验证码
}
```

```
// return
{
  code: 0,
  message: '绑定手机号成功', // 即将数据写入数据库，已经登录成功。接下来前端可跳转到评论页面
  id: 1, // numebr，当前绑定成功的用户的 ID
}

{
  code: 1004,
  message: '电话号码不能为空',
}

{
  code: 1005,
  message: '验证码不能为空',
}

{
  code: 1006,
  message: '请从微信进入该页面', // openid不存在，提示用户从微信进入该页面
}

{
  code: 1007,
  message: '绑定失败，验证码错误', // 绑定手机号时验证码错误，绑定失败
}

{
  code: 1008,
  message: '绑定失败，请重试', // 绑定出错，可能是数据库错误等未知错误
}

{
  code: 1024,
  message: '评论失败'
}
```

#### 3. 获取店主信息

```
method: POST
path: /proxy/getShopkeeper
```

```
// params
{
  id: 7, // number 想要获取的店主的用户 id (Shopkeeper_tb.id)
}
```

```
// return
{
  code: 0,
  message: '发送验证码成功',
}

{
  code: 1009,
  message: '店主id不存在', // 想要获取的店主用户的id不存在
}

{
  code: 1010,
  message: '该店主尚未绑定微信号', // 可能是店主没有进行登录，没有绑定微信、手机号
}

{
  code: 1011,
  message: '获取店主信息出错', // 不是以上错误，可能是 SQL 错误，也可能是其他未知错误
}
```

#### 4. 获取Dsr信息

```
method: GET
path: /proxy/queryAllDsr
```

```
// params
// null 不需要参数
```

```
// return
{
  code: 0,
  message: '获取DSR列表成功',
  // array DSR 列表
  data: [{  
		"id": 1,
		"Dsr_Ename": "haha",
		"Dsr_name": "haha1"
    },{
		"id": 2,
		"Dsr_Ename": "haha2",
		"Dsr_name": "haha2"
	}]
}

{
  code: 1012,
  message: '获取DSR列表失败，请刷新页面重试', // 获取DSR列表失败，可提示用户请刷新页面重试
}
```

#### 5. 评论

```
method: POST
path: /proxy/addComment
```

```
// params
{
  shopkeeperId: 1, // 发表评论的用户的id
  dsrId: 100, // 被评论的DSR的ID
  dsrArriveTime: '2016-12-12', // DSR 到店日期
  sroceServe: 1, // 服务质量分数
  // 服务质量复选框中选中选项组成的数组
  textServe: [
    '回答店主问题态度急躁',
    '拜访间隔两个月以上'
  ],
  // 专业技能
  sroceSkill: 1,
  textSkill: [
    '产品知识比较陌生',
    '没有介绍新品和促销装',
  ],
  // 补货质量
  sroceSupplement: 1,
  textSupplement: [
    '补货数量略多',
    '补货售出效果一般',
  ],
  // 助销服务
  sroceHelp: 1,
  textHelp: [
    '对产品进行简单调整摆放',
    '安装了一些产品档条',
  ]
}
```

```
// return
{
  code: 0,
  message: '评论成功',
}

{
  code: 1013,
  message: '店主id不存在', // 传递的参数中店主(即发表评论的用户)id不存在
}

{
  code: 1014,
  message: '需要评论的DSR', // 需要评论的DSR，可能是用户没有选择DSR
}

{
  code: 1015,
  message: 'DSR到店日期不存在', // DSR到店日期不存在
}

{
  code: 1016,
  message: '服务质量分数不能为空'
}

{
  code: 1017,
  message: '专业技能分数不能为空'
}

{
  code: 1018,
  message: '补货质量分数不能为空'
}

{
  code: 1019,
  message: '助销服务分数不能为空'
}

{
  code: 1020,
  message: '评论失败'
}

{
  code: 1021,
  message: '总体评价分数不能为空'
}

{
  code: 1022,
  message: '评论成功，红包发送失败'
}

{
  code: 1023,
  message: '评论失败'
}
```
