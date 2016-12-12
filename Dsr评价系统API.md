# Dsr评价系统API文档 #

@author lqp





## 绑定 ##

该模块接口用于绑定微信账号和认证电话信息。

- **绑定** 
   
1. 是否绑定微信
   
   ```
     {

    "method":


         "GET&POST"

    "url":
       
         "ScoringSystemServer/Bind.do",

    "params":{

        "method":"isExitWeixin",

        "open_id":"当前用户的OpenId",
      }  return:{
   
         1.{"id":"-1"};
         2.{"id":"1"};
         //id为用户编号，-1表示未绑定过
      }
        
  ```
  
2. 短信验证
   
   ```
 
     {
    "method":


         "GET&POST"

    "url":
       
         "ScoringSystemServer/Bind.do",

    "params":{

        "method":"sendMsg",

        "tel":"将发送短信的电话号码",
      }  return:{
   
         1.{"code":"100","state":"success","reason":"already send"};
         2.{"code":"101","state":"fail","reason":"tel not register"};
         3.{"code":"102","state":"fail","reason":"send fail"};
        
     }  
```

3.验证码校验及绑定

```
     {
    "method":


         "GET&POST"

    "url":
       
         "ScoringSystemServer/Bind.do",

    "params":{

        "method":"VerifyTel",

        "tel":"用户输入的电话号码",

        "Vcode":"用户输入的验证码",

        "openId":"当前用户的OpenId",
      }  return:{
   
         1.{"id":"-1"};
         2.{"id":"1"};
         //id为用户编号，-1表示未绑定过
      }  
```       


- **评价** 
   
        
1. 获取店主信息
  
```
     {
    "method":


         "GET&POST"

    "url":
       
         "ScoringSystemServer/ShopKeeper.do",

    "params":{

        "method":"getShopkeeper",

        "id":"绑定时获得的用户id",

      }  return:{
   
         1.{"id":5,"ShopkeeperTell":"18428360355","weixin_id":"hello","shop_id":"haha","integration":0} 
         2.{"id":-1,"ShopkeeperTell":"NULL","weixin_id":"NULL","shop_id":"NULL","integration":0} 
         //id为用户编号，-1表示未绑定过，此时验证存在异常
      }  

```
        
 2. 获取Dsr信息
  
```
     {
    "method":


         "GET&POST"

    "url":
       
         "ScoringSystemServer/Dsr.do",

    "params":{

        "method":"queryAllDsr",

      }  return:{
   
         1.[{"id":1,"Dsr_Ename":"Ename","Dsr_name":"Name"},{"id":3,"Dsr_Ename":"Ename1","Dsr_name":"Name1"}] 
      }  
```

1. 提交评论
 
 ```

     {
    "method":


         "GET&POST"

    "url":
       
         "ScoringSystemServer/DsrScore.do",

    "params":{

        "method":"addComment",

        "dsr_id":"评价的dsr的id",

        "shopkeeper_id":"评价的店主的id",

        "ArriveTime":"选中的到店时间",
  
        "major_score":"专业",
      
        "replenishment_score":"补货",
     
        "standby_score":"助销",

        "Overall_score":"总体",

        "service_score":"服务",

      }  return:{
   
         1.[{"code":"300","state":"succes","reason":"comment commit"}] 
         2.[{"code":"301","state":"fail","reason":"commit fai"}] 
        
      }
```

## 红包 ##
