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

            {"code":4000,
             "message":"comment ok redpack ok"}

             {"code":4001,         
              "message":"comment fail"} //评论失败不会发红包     

             {"code":4002,            
              "message":""comment ok redpack:红包失败原因"}

             {"code":4003, 
              "message":"comment ok redpack Api error"}


   4.Excel导出 
 
  
            method: GET&POST
            url:ScoringSystemServer/Excel.do
   //params

            startDate："1994-9-14"
            endDate:"2016-12-18"


           //return

           获取文件流，由浏览器解析

 5. 给Manager发短信
 
  
            method: GET
            url:ScoringSystemServer/ManagerLogin.do
     //params

            method："sendMsg"
            managerTel:"18428360355"
     //return

            {"code":1500,
             "message":"sendMsg ok"}

             {"code":1501,         
              "message":"sendMsg API error"}    

             {"code":1502,            
              "message":""not Manager"}

             {"code":1503, 
              "message":"method null"}

             {"code":1504, 
              "message":"managerTel null"}

 6. 身份校验
 
  
            method: GET
            url:ScoringSystemServer/ManagerLogin.do
     //params

            method："vertify"
            managerTel:"18428360355"
            vcode："255708"
     //return

            {"code":1600,
             "message":"login ok"}

             {"code":1602,         
              "message":"vcode wrong"}    

             {"code":1601,            
              "message":"vcode null"}
           
              {"code":1603,            
              "message":"vertify error"}

             {"code":1503, 
              "message":"method null"}

             {"code":1504, 
              "message":"managerTel null"}

 7. 增加DSR
 
  
            method: POST
            url:ScoringSystemServer/ManageDsr.do
     //params

            dsrName："lqp"
            dsrEname:"110123" //此处为Dsr编号
            vcode："255708"
     //return

            {"code":1200,
             "message":"addDsr ok"}

             {"code":1201,         
              "message":"dsrName null"}    

             {"code":1202,            
              "message":"dsrEname null"}
           
              {"code":1203,            
              "message":"addDsr error"}

 8. 删除DSR
 
  
            method: delete
            url:ScoringSystemServer/ManageDsr.do
     //params
            dsrId：1   
         
     //return

            {"code":1300,
             "message":"deleteDsr ok"}

             {"code":1301,         
              "message":"dsrId null"}    

             {"code":1302,            
              "message":"dsrId must be int"}
           
              {"code":1303,            
              "message":"deleteDsr error"}

 9. DSR修改
 
  
            method: put
            url:ScoringSystemServer/ManageDsr.do
     //params
            dsrId：1   
            dsrName："lqp"
            dsrEname:"110123" //此处为Dsr编号
     //return

            {"code":1400,
             "message":"updateDsr ok"}

             {"code":1401,         
              "message":"dsrName null"}    

             {"code":1402,            
              "message":"dsrEname null"}
           
              {"code":1403,            
              "message":"dsrId null"}

              {"code":1404,            
              "message":"updateDsr error"}

 10. 添加店主
 
  
            method: post
            url:ScoringSystemServer/ManageShopKeeper.do
     //params
            shopkeeperTel：1333333333   
            shopName："lqpdedian"

     //return

            {"code":1200,
             "message":"add shopkeeper ok"}

             {"code":1201,         
              "message":"shopkeeperTel null"}    

             {"code":1202,            
              "message":"："shopName null"}

 10. 删除店主
 
  
            method: delete
            url:ScoringSystemServer/ManageShopKeeper.do
     //params
                   
              shopkeeperId：1  
            

     //return

            {"code":1100,
             "message":"delete  ok"}

             {"code":1101,         
              "message":"shopkeeperId null"}    

             {"code":1102,            
              "message":"："delete error try again"}
    
10. 获取店主
 
  
            method: get
            url:ScoringSystemServer/ManageShopKeeper.do
     //params
                    
            

     //return

			{
				"aList": [
					{
						"id": 5,
						"ShopkeeperTel": "18428360355",
						"weixing_id": "oCqd0wwCox7mfNC2sBp1FZRxFY4Q",
						"shop_name": "haha",
						"integration": 21
					}
				],
				"code": 1300,
				"message": "getAll ok"
			}

           {"code":1300,            
              "message":"："get error "} 







