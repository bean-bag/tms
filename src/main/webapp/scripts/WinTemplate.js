/*登录窗口*/

Tms.loginWindow = function(){
	var cp = new Ext.state.CookieProvider();
	Ext.state.Manager.setProvider(cp);

	var loginWin = {};
	loginWin = new Ext.Window({
		title : '欢迎登录任务管理系统'
		,width : 320
		,closable : false
		,border : false
		,items : {
			xtype : 'form'
			,defaultType : 'textfield'
			,labelAlign : 'right'
			,labelWidth : 120
			,labelPad : 2
			,monitorValid:true
			,frame : true
			,defaults : {
                allowBlank : false
            }
			,waitTitle : '正在登录...'
			,items : [{
                name : 'username',
                fieldLabel : '用户名',
                blankText : '用户名不能为空'
            },{
                name : 'password',
                fieldLabel : '密 &nbsp;码',
                blankText : '密码不能为空',
                inputType : 'password'
            },{
				xtype : 'verifycodefield'
				,name:'verifyCode'
				,id:'verifyCode'
				,fieldLabel:'验证码'
				,width:58
				,blankText : '验证码不能为空'
				,vcTip : '点击图片更换验证码'
				,vcUrl : Tms.URLS.verifyCode
				,vcWidth : '68px'
				,vcHeight : '20px'
				,vcStyle : 'border:1px solid #B5B8C8;border-left-width:0px'
            },{
				xtype: 'checkbox'
				,id : 'keepAC'
				,name : 'keepAC'
				,boxLabel : '记住帐号'
				,inputValue : '1'
			}],
			keys: [{
				key: [Ext.EventObject.ENTER], 
				handler: function() {
					var btn = Ext.getCmp('submitBtn');
					btn.handler(btn);
				}
			}],
			buttons:[{
                text:'登录'
				,id : 'submitBtn'
				,formBind: true
                ,handler : function(button,event){
					var myform = button.ownerCt.ownerCt.getForm();
					if(myform.isValid()){
						myform.submit({
							waitMsg : '正在登录...'
							,url : Tms.URLS.loginSys
							,timeout : 3000
							,success : function(form, action) {
								if(form.findField('keepAC').getValue()=='1'){
									cp.set('k','1');
									cp.set('u',form.findField('username').getValue());
									cp.set('p',form.findField('password').getValue());
								}else{
									cp.set('k',null);
									cp.set('u',null);
									cp.set('p',null);
								};
								Tms.user = action.result.user;
								Tms.lineStyle = action.result.data;
								loginWin.close();//关闭登录窗口
								loginWin = null;
								delete loginWin;
								//Tms.loginWin.destory();//销毁登录窗口资源
								
								Tms.workbench();
							}
							,failure : function(form, action) {
								form.reset();
								Ext.getCmp('verifyCode').refresh();
								if (action.failureType == Ext.form.Action.SERVER_INVALID){
									Ext.MessageBox.alert('警告', action.result.message);	
								}
							}
						});
					}
				}
            }]
		}
		,listeners : { 
			show : function(win){
				var form = win.items.items[0].getForm();
				if(cp.get('k') === "1"){
					form.findField("username").setValue(cp.get('u') || '');
					form.findField("password").setValue(cp.get('p') || '');
					form.findField("keepAC").setValue('1');

					//form.findField('verifyCode').focus(true,true);//设为焦点输入框
				}else{
					//form.findField('username').focus(true,true);//设为焦点输入框
				}
			}
		}	
		
        });

	loginWin.show();
	
	loginWin.header.setStyle({
		'font-size' : '14px'
		,'padding-top' : '20px'
		,'padding-left' : '15px'
		,'padding-bottom' : '20px'
	});
};

Tms.workbench = function(){
	//依据权限，设置登录后界面
	Tms.user.role = buildRole(Tms.user.perm);
	if(Tms.user.role.isHelper||Tms.user.role.isPlanner){//计划||合同人员，显示“创建新委托”按钮
		Tms.ViewportConfig.items[1].items.push({
			xtype : 'button',
			text : '创建新委托',
			handler : function() {
				if(Tms.user.role.isHelper){
					create4helper(Ext.getCmp('tasksGrid'));
				}else if(Tms.user.role.isPlanner){
					create4planner(Ext.getCmp('tasksGrid'));
				}
			}
		});
	}
	if(Tms.user.role.isHelper||Tms.user.role.isPlanner||Tms.user.role.isAssessor){//计划||合同人员||总工添加负责室查询过滤
		Tms.ViewportConfig.items[1].items[0].items.push(Tms.ui.chiefDept_combo4query);
		Tms.ViewportConfig.items[1].items[0].items.push(Tms.ui.linkedChiefPerson_combo4query);
	}
	if((Tms.user.role.isDesigner ||Tms.user.role.isBudgeteer) && Tms.user.teamLeader){//如果是室主任，添加按负责室查询和负责人查询
		Tms.ViewportConfig.items[1].items[0].items.push(Tms.ui.chiefPerson_combo4query);//负责人
	}
	Tms.ViewportConfig.items[1].items[0].items.push({
		xtype : 'checkbox',
		boxLabel : '隐藏已完成任务',
		name : 'completed',
		inputValue : '1'
	},{
		xtype : 'checkbox',
		boxLabel : '隐藏已过期任务',
		name : 'overdue',
		inputValue : '1'
	});
	if(Tms.user.role.isAccountant){
	Tms.ViewportConfig.items[1].items[0].items.push({
		xtype : 'checkbox',
		boxLabel : '只显示已收款任务',
		name : 'collection',
		inputValue : '1'
	});
	}
	//显示登录后界面
	Tms.viewport = new Ext.Viewport(Tms.ViewportConfig);
	
	var qForm = Ext.getCmp('queryForm').getForm();
	qForm.findField('dateType').setValue(0);

	var cpc = qForm.findField('chiefDept_id');
	if(cpc){
		//加载负责从列表
		cpc.setWidth(150);
	}
};

/*委托窗口*/
Tms.taskWin = function(grid,data){
	if(!Tms.win){
		var create = (data == null);
		Tms.win = new Ext.Window({
			layout:'fit'
			,width:640
			,height:400
			,closeAction:'close'
			,plain: true
			,title : (create) ? '新建工作任务':'维护工作任务'
			,items: {xtype:'aideCreateForm',id:'contractForm',isCreated : create}
			
			,buttons: [{
				text:'保存'
				,handler: function(){
					var form = Ext.getCmp("contractForm").form;
					if(form.isValid()){
						form.submit({
							method : 'POST'
							,url : Tms.URLS.submitTask
							,success : function(from, action) {
								Ext.Msg.show({
									title : '提示信息'
									,msg : '保存成功'
									,buttons : Ext.Msg.OK
								});
								//form.reset();//清空form数据
								Tms.win.close();//关闭窗口
								Tms.win = null;
								grid.getStore().reload();
								//操作成功，断开轮询
								//Ext.Direct.getProvider("pollTaskList").disconnect();
								//重新开始轮询，即时获取最新数据
								//Ext.Direct.getProvider("pollTaskList").connect();
							}
							,failure : function(form, action) {
								Ext.Msg.show({
									title : '提示信息'
									,msg : '保存失败'
									,buttons : Ext.Msg.OK
								});
							}
							,waitMsg : '正在保存数据，稍后...'
						});						
					}else {
						Ext.Msg.alert('提示', '请填写完成再提交!');
					}
				}
			}
			,{
				text: '关闭',
				handler: function(){
					//Ext.getCmp("contractForm").form.reset();//清空form数据
					Tms.win.close();//关闭窗口
					Tms.win = null;
				}
			}]
		});
	}
	if(data){
		Ext.getCmp("contractForm").form.loadRecord(data);
	}
	Tms.win.show();
};

/*计划窗口*/
Tms.planWin = function(grid,data){
	var Tms_win4plan = {};
		Tms_win4plan = new Ext.Window({
			layout:'fit'
			,width:640
			,height:400
			,closeAction:'close'
			,plain: true
			,title : '分派工作任务计划'
			,items : {xtype:'planForm',id:'planForm',isCreated : (data==null)}
			
			,buttons: [{
				text:'保存'
				,handler: function(){
					var form = Ext.getCmp("planForm").form;
					if(form.isValid()){
						form.submit({
							method : 'POST'
							,url : Tms.URLS.submitPlan
							,success : function(from, action) {
								Ext.Msg.show({
									title : '提示信息'
									,msg : '保存成功'
									,buttons : Ext.Msg.OK
								});

								Tms_win4plan.close();//关闭窗口
								Tms_win4plan = null;
								delete Tms_win4plan;
								
								grid.getStore().reload();
								//操作成功，断开轮询
								//Ext.Direct.getProvider("pollTaskList").disconnect();
								//重新开始轮询，即时获取最新数据
								//Ext.Direct.getProvider("pollTaskList").connect();
							}
							,failure : function(form, action) {
								Ext.Msg.show({
									title : '提示信息'
									,msg : '保存失败'
									,buttons : Ext.Msg.OK
								});
							}
							,waitMsg : '正在保存数据，稍后...'
						});						
					}else {
						Ext.Msg.alert('提示', '请填写完成再提交!');
					}
				}
			}
			,{
				text: '关闭',
				handler: function(){
					//this.ownerCt.ownerCt.close();
					Tms_win4plan.close();//关闭窗口
					Tms_win4plan = null;
					delete Tms_win4plan;
				}
			}]
		});
	
	if(data){
		var form = Ext.getCmp("planForm").form;
			form.loadRecord(data);
		
		var gstore = new Ext.data.Store({
				reader:new Ext.data.JsonReader({
					 id:'id'
					//,totalProperty:'totalCount'
					,root:'data'
					,fields:[
						{name: 'chiefDept',mapping :'memberID'}
						,{name: 'sort'}
					]
				})
				,baseParams : {prjID : data.id, kind : 1}
				,proxy:new Ext.data.HttpProxy({url:Tms.URLS.groupList})
			});
		gstore.on('datachanged',function(store){
			//try{
			//data.set('chiefDept',store.data.items[0].data.chiefDept);
			//form.setValues('chiefDept',store.data.items[0].data.chiefDept);
			if(store.data.items.length>0){
				form.setValues({chiefDept:store.data.items[0].data.chiefDept});
			}
			//}catch(e){}
		});	
		
		var mdStore = Ext.getCmp("director_id").store;
			mdStore.on('datachanged',function(store){
				gstore.load();
			});

		mdStore.load();
	}

	Tms_win4plan.show();
};
/*室主任窗口*/
Tms.directorWin = function(grid,data){
	var Tms_win4director = {};
		Tms_win4director = new Ext.Window({
			layout:'fit'
			,width:640
			,height:400
			,closeAction:'close'
			,plain: true
			,title : '分派工作任务计划'
			,items : {xtype:'directorForm',id:'directorForm',isCreated : (data==null)}
			
			,buttons: [{
				text:'保存'
				,handler: function(){
					var form = Ext.getCmp("directorForm").form;
					if(form.isValid()){
						form.submit({
							method : 'POST'
							,url : Tms.URLS.submitDirector
							,success : function(from, action) {
								Ext.Msg.show({
									title : '提示信息'
									,msg : '保存成功'
									,buttons : Ext.Msg.OK
								});

								Tms_win4director.close();//关闭窗口
								Tms_win4director = null;
								delete Tms_win4director;
								
								grid.getStore().reload();
								//操作成功，断开轮询
								//Ext.Direct.getProvider("pollTaskList").disconnect();
								//重新开始轮询，即时获取最新数据
								//Ext.Direct.getProvider("pollTaskList").connect();
							}
							,failure : function(form, action) {
								Ext.Msg.show({
									title : '提示信息'
									,msg : '保存失败'
									,buttons : Ext.Msg.OK
								});
							}
							,waitMsg : '正在保存数据，稍后...'
						});						
					}else {
						Ext.Msg.alert('提示', '请填写完成再提交!');
					}
				}
			}
			,{
				text: '关闭',
				handler: function(){
					//this.ownerCt.ownerCt.close();
					Tms_win4director.close();//关闭窗口
					Tms_win4director = null;
					delete Tms_win4director;
				}
			}]
		});
	
	if(data){
		var form = Ext.getCmp("directorForm").form;

		//获取当前项目总负责人		
		var gstore = new Ext.data.Store({
				reader:new Ext.data.JsonReader({
					 id:'id'
					,root:'data'
					,fields:[
						{name: 'memberID'}
						,{name: 'sort'}
					]
				})
				,baseParams : {prjID : data.id, kind : 3}
				,proxy:new Ext.data.HttpProxy({url:Tms.URLS.groupList})
			});		
		gstore.on('datachanged',function(store){
			if(store.data.items.length>0){
				form.setValues({chiefPerson:store.data.items[0].data.memberID});
			}
		});	
		
		//获取当前部门所有人员列表
		var mdStore = Ext.getCmp("chiefPerson_id").store;
		mdStore.on('datachanged',function(store){			
			form.setValues({chiefDept : store.data.items[0].json.depart.deptName});//设置负责办公室			
			gstore.load();
		});
		mdStore.baseParams = {'deptID' : Tms.user.deptID};
		mdStore.load();
		
		//Ext.getCmp("docs").hide();
		Ext.getCmp("docs").setVisible(false);
		Ext.getCmp("docs").destroy();
		//mdStore.load({params:{'deptID' : Tms.user.deptID}});
		
		/*Ext.Ajax.request({
		   url: Tms.URLS.groupList,
		   sync:true,
		   success: function(resp,action){
		   		var json = Ext.util.JSON.decode(resp.responseText);
		   		form.setValues({chiefPerson : json.data[0].memberID});
		   },
		   failure: Ext.emptyFn,
		   params: {prjID : data.id, kind : 3}
		});*/	
		
		//form.setValues({chiefDept : Tms.user.deptID});//设置负责办公室
		form.loadRecord(data);
	}

	Tms_win4director.show();
};