# Dsr评价系统API文档 #

@author lqp





## 绑定 ##

该模块接口用于绑定微信账号和认证电话信息。

- **绑定**
   1. 是否绑定微信



            method: GET&POST
            url:ScoringSystemServer/IsExitWeixin.do      

          //params

            openId:"当前用户的openId"



         //return

             {"id":7,  //id为用户ID
            "message":"weiXin already bind",
            "code":1000}

	         {"id":-1,
	          "message":"weiXin not bind",
	          "code":1001}

	        {"id":0,
	          "message":"openId null",
	          "code":1002}

	        {"id":0,
	          "message":"error try again",
	          "code":5000}
      }

   2. 短信验证


            method: GET&POST
            url:ScoringSystemServer/SendMsg.do     

          //params

            tel:"18428360355"



         //return

             {"code":2000,
              "message":"send message"}

	         {"code":2001,
              "message":"tel not register"}

	        {"code":2002,
              "message":"send fail"}

	        {"code":2003,
              "message":"tel null"}

            {"code":2004,
              "message":"API error try again"}
      }


   3. 验证码校验及绑定



            method: GET&POST
            url:ScoringSystemServer/Bind.do     
         //params

            tel:"18428360355"
            vCode："483651"
            openId："oCqd0wwCox7mfNC2sBp1FZRxFY4Q"


         //return

             {"code":3000,
              "message":"band success"}

	         {"code":3001,
              "message":"Vcode or tel wrong"}

	        {"code":3002,
              "message":"Vcode lose efficacy"}

	        {"code":3003,
              "message":"tel null"}

            {"code":3004,
              "message":"vCode null"}

            {"code":3005,
              "message":"openId null"}

            {"code":3006,
              "message":"error try again"}

      }

- **评价**


   1. 获取店主信息

            method: GET&POST
            url:ScoringSystemServer/ShopKeeper.do
         //params

            shopkeeperId:"5"

           //return

           //查询成功

            {"id":7,"ShopkeeperTell":"18428360355","weixin_id":"oCqd0wwCox7mfNC2sBp1FZRxFY4Q","shop_id":"","integration":0}
      }  

        //不存在该Id的店主


            {"id":-1,"ShopkeeperTell":"NULL","weixin_id":"NULL","shop_id":"NULL","integration":0}


   2. 获取Dsr信息

            method: GET&POST
            url:ScoringSystemServer/Dsr.do
         //params

            method:"queryAllDsr"

           //return

            {"id":1,"Dsr_Ename":"haha","Dsr_name":"haha1"},{"id":2,"Dsr_Ename":"haha2","Dsr_name":"haha2"},{"id":3,"Dsr_Ename":"haha3","Dsr_name":"haha3"},{"id":4,"Dsr_Ename":"haha4","Dsr_name":"haha4"}
      }  

   1. 提交评论


            method: GET&POST
            url:ScoringSystemServer/DsrScore.do?
         //params

            dsrId:1(int)
            shopkeeperId:5(int)
            overallScore:1(int)
            standbyScore:1(int)
            serviceScore:1(int)
            majorScore:1(int)
            replenishmentScore:1(int)
            overallComment:string
            standbyComment:string
            majorComment:string
            replenishmentComment:string
            arriveTime="1994-9-14"


           //return

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
