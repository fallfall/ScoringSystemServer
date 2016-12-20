# 接口文档

## 需求


#### 奖品设置

三种奖品类型，管理员在后台进行设置

+ 红包（抽中后，后端直接发送红包）
+ 卡券（抽中后，发送文字消息）
+ 谢谢参与



## API


#### 1.1 奖品list

```
method:  GET
path: /list
```

```
// params
```

```
// return
{
  code: 0,
  message: '获取抽奖列表成功',
  list: [
    {
      name: '红包1元', // string 奖品名称
      id: 1, // number 奖品编号
    },
  ], // array 奖品列表
}
```

#### 1.2. 抽奖事件

用户点击抽奖按钮，触发抽奖事件。

向后端发送 HTTP 请求。

后端返回抽奖结果，待前端抽奖动画结束后，显示给用户。

```
method: GET
path: /lottery
```

```
// params
{
  shopkeeperId: 10, // 店主Id
}
```

```
// return
{
  code: 0,
  message: '抽奖成功',
  id: 3, // 抽中的奖品id
}
```


## 后台管理

#### 2.1 发送手机短信（登录状态）

添加 manage 表。

+ token
+ session/cookie


```
method: POST
path: /sendMsg
```

```
// params
{
  tel: '18333333333', // string 手机号
}
```

```
// return
{
  code: 0,
  message: '发送成功',
}
```

#### 2.2 验证手机号和短信号码

```
method: POST
path: /verify
```

```
// params
{
  tel: '18333333333', // string 手机号
  code: '0000', // string 手机短信验证码
}
```

```
// return
{
  code: 0,
  message: '登录成功',
  token: 'xxxxxxxxxxxxxxxxxxxxx',
}
```

#### 2.3 修改奖品基本信息(奖品设置，不包含奖品概率)

奖品表(prize)：

+ id 奖品id
+ name 奖品名称
+ type  int(1/2/3) 奖品类型,红包（1）／卡券（2）／谢谢参与（3）
+ rate 奖品概率
+ redpack_priace 红包钱数目（单位：元）
+ number 奖品数目
+ time 奖品添加时间

奖品记录表：

+ id 奖品记录表id
+ prize_id 奖品id
+ recieve_status 领取状态
+ time 发送奖品时间
+ shopkeeperId 店主id（领取奖品的人）



```
method: POST
path: /setPrize
```

```
// params
{
  id: 1, // number 奖品编号
  name: '红包1元', // 奖品名称，显示给用户看的文字
  type: 1, // 红包类型
  redpack_priace: 1, // 如果产品类型是红包，则设置红包数目，以元为单位 
  number: 10, // 奖品数目
}
```

```
// return 
{
	code: 0,
	message: '奖品设置成功'
}
```

#### 2.4 修改奖品概率(奖品设置，奖品概率)

```
method: POST
path: /setPrizeRate
```

```
// parmas
[
	{
		id: 1,
		rate: 5,
	},
	{
		id: 2,
		rate: 15,
	},
	{
		id: 3,
		rate: 10,
	},
	// ...... 
	// 单位（%），总概率加起来等于 100
]
```

```
// return
{
	code: 0,
	message: '概率设置成功',
}
```


#### 2.5 添加 DSR (DSR 管理)

```
method: POST
path: /addDsr
```

```
// params
{
	
}
```

#### 2.6 删除 DSR (DSR 管理)

```
method: DELETE
path: /deleteDsr
```

```
{
	dsrId: 1, // DSR 的 ID
}
```

```
// return
{
	code: 0,
	message: '删除成功',
}
```

#### 2.7 修改 DSR (DSR 管理)

```
method: PUT
path: /deleteDsr
```

```
{
	dsrId: 1, // DSR 的 ID
	
}
```

```
// return
{
	code: 0,
	message: '删除成功',
}
```

#### 2.8 删除店主 (店主管理)

```
method: DELETE
path: /deleteShopkeeper
```

```
{
	shopkeeperId: 1, // 店主 的 ID
	
}
```

```
// return
{
	code: 0,
	message: '删除成功',
}
```

#### 2.8 添加店主 (店主管理)

```
method: POST
path: /addShopkeeper
```

```
{
	shopkeeperId: 1, // 店主 的 ID
	
}
```

```
// return
{
	code: 0,
	message: '删除成功',
}
```

## 历史评论
