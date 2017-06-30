/*��¼����*/

Tms.loginWindow = function(){
	var cp = new Ext.state.CookieProvider();
	Ext.state.Manager.setProvider(cp);

	var loginWin = {};
	loginWin = new Ext.Window({
		title : '��ӭ��¼�������ϵͳ'
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
			,waitTitle : '���ڵ�¼...'
			,items : [{
                name : 'username',
                fieldLabel : '�û���',
                blankText : '�û�������Ϊ��'
            },{
                name : 'password',
                fieldLabel : '�� &nbsp;��',
                blankText : '���벻��Ϊ��',
                inputType : 'password'
            },{
				xtype : 'verifycodefield'
				,name:'verifyCode'
				,id:'verifyCode'
				,fieldLabel:'��֤��'
				,width:58
				,blankText : '��֤�벻��Ϊ��'
				,vcTip : '���ͼƬ������֤��'
				,vcUrl : Tms.URLS.verifyCode
				,vcWidth : '68px'
				,vcHeight : '20px'
				,vcStyle : 'border:1px solid #B5B8C8;border-left-width:0px'
            },{
				xtype: 'checkbox'
				,id : 'keepAC'
				,name : 'keepAC'
				,boxLabel : '��ס�ʺ�'
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
                text:'��¼'
				,id : 'submitBtn'
				,formBind: true
                ,handler : function(button,event){
					var myform = button.ownerCt.ownerCt.getForm();
					if(myform.isValid()){
						myform.submit({
							waitMsg : '���ڵ�¼...'
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
								loginWin.close();//�رյ�¼����
								loginWin = null;
								delete loginWin;
								//Tms.loginWin.destory();//���ٵ�¼������Դ
								
								Tms.workbench();
							}
							,failure : function(form, action) {
								form.reset();
								Ext.getCmp('verifyCode').refresh();
								if (action.failureType == Ext.form.Action.SERVER_INVALID){
									Ext.MessageBox.alert('����', action.result.message);	
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

					//form.findField('verifyCode').focus(true,true);//��Ϊ���������
				}else{
					//form.findField('username').focus(true,true);//��Ϊ���������
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
	//����Ȩ�ޣ����õ�¼�����
	Tms.user.role = buildRole(Tms.user.perm);
	if(Tms.user.role.isHelper||Tms.user.role.isPlanner){//�ƻ�||��ͬ��Ա����ʾ��������ί�С���ť
		Tms.ViewportConfig.items[1].items.push({
			xtype : 'button',
			text : '������ί��',
			handler : function() {
				if(Tms.user.role.isHelper){
					create4helper(Ext.getCmp('tasksGrid'));
				}else if(Tms.user.role.isPlanner){
					create4planner(Ext.getCmp('tasksGrid'));
				}
			}
		});
	}
	if(Tms.user.role.isHelper||Tms.user.role.isPlanner||Tms.user.role.isAssessor){//�ƻ�||��ͬ��Ա||�ܹ���Ӹ����Ҳ�ѯ����
		Tms.ViewportConfig.items[1].items[0].items.push(Tms.ui.chiefDept_combo4query);
		Tms.ViewportConfig.items[1].items[0].items.push(Tms.ui.linkedChiefPerson_combo4query);
	}
	if((Tms.user.role.isDesigner ||Tms.user.role.isBudgeteer) && Tms.user.teamLeader){//����������Σ���Ӱ������Ҳ�ѯ�͸����˲�ѯ
		Tms.ViewportConfig.items[1].items[0].items.push(Tms.ui.chiefPerson_combo4query);//������
	}
	Tms.ViewportConfig.items[1].items[0].items.push({
		xtype : 'checkbox',
		boxLabel : '�������������',
		name : 'completed',
		inputValue : '1'
	},{
		xtype : 'checkbox',
		boxLabel : '�����ѹ�������',
		name : 'overdue',
		inputValue : '1'
	});
	if(Tms.user.role.isAccountant){
	Tms.ViewportConfig.items[1].items[0].items.push({
		xtype : 'checkbox',
		boxLabel : 'ֻ��ʾ���տ�����',
		name : 'collection',
		inputValue : '1'
	});
	}
	//��ʾ��¼�����
	Tms.viewport = new Ext.Viewport(Tms.ViewportConfig);
	
	var qForm = Ext.getCmp('queryForm').getForm();
	qForm.findField('dateType').setValue(0);

	var cpc = qForm.findField('chiefDept_id');
	if(cpc){
		//���ظ�����б�
		cpc.setWidth(150);
	}
};

/*ί�д���*/
Tms.taskWin = function(grid,data){
	if(!Tms.win){
		var create = (data == null);
		Tms.win = new Ext.Window({
			layout:'fit'
			,width:640
			,height:400
			,closeAction:'close'
			,plain: true
			,title : (create) ? '�½���������':'ά����������'
			,items: {xtype:'aideCreateForm',id:'contractForm',isCreated : create}
			
			,buttons: [{
				text:'����'
				,handler: function(){
					var form = Ext.getCmp("contractForm").form;
					if(form.isValid()){
						form.submit({
							method : 'POST'
							,url : Tms.URLS.submitTask
							,success : function(from, action) {
								Ext.Msg.show({
									title : '��ʾ��Ϣ'
									,msg : '����ɹ�'
									,buttons : Ext.Msg.OK
								});
								//form.reset();//���form����
								Tms.win.close();//�رմ���
								Tms.win = null;
								grid.getStore().reload();
								//�����ɹ����Ͽ���ѯ
								//Ext.Direct.getProvider("pollTaskList").disconnect();
								//���¿�ʼ��ѯ����ʱ��ȡ��������
								//Ext.Direct.getProvider("pollTaskList").connect();
							}
							,failure : function(form, action) {
								Ext.Msg.show({
									title : '��ʾ��Ϣ'
									,msg : '����ʧ��'
									,buttons : Ext.Msg.OK
								});
							}
							,waitMsg : '���ڱ������ݣ��Ժ�...'
						});						
					}else {
						Ext.Msg.alert('��ʾ', '����д������ύ!');
					}
				}
			}
			,{
				text: '�ر�',
				handler: function(){
					//Ext.getCmp("contractForm").form.reset();//���form����
					Tms.win.close();//�رմ���
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

/*�ƻ�����*/
Tms.planWin = function(grid,data){
	var Tms_win4plan = {};
		Tms_win4plan = new Ext.Window({
			layout:'fit'
			,width:640
			,height:400
			,closeAction:'close'
			,plain: true
			,title : '���ɹ�������ƻ�'
			,items : {xtype:'planForm',id:'planForm',isCreated : (data==null)}
			
			,buttons: [{
				text:'����'
				,handler: function(){
					var form = Ext.getCmp("planForm").form;
					if(form.isValid()){
						form.submit({
							method : 'POST'
							,url : Tms.URLS.submitPlan
							,success : function(from, action) {
								Ext.Msg.show({
									title : '��ʾ��Ϣ'
									,msg : '����ɹ�'
									,buttons : Ext.Msg.OK
								});

								Tms_win4plan.close();//�رմ���
								Tms_win4plan = null;
								delete Tms_win4plan;
								
								grid.getStore().reload();
								//�����ɹ����Ͽ���ѯ
								//Ext.Direct.getProvider("pollTaskList").disconnect();
								//���¿�ʼ��ѯ����ʱ��ȡ��������
								//Ext.Direct.getProvider("pollTaskList").connect();
							}
							,failure : function(form, action) {
								Ext.Msg.show({
									title : '��ʾ��Ϣ'
									,msg : '����ʧ��'
									,buttons : Ext.Msg.OK
								});
							}
							,waitMsg : '���ڱ������ݣ��Ժ�...'
						});						
					}else {
						Ext.Msg.alert('��ʾ', '����д������ύ!');
					}
				}
			}
			,{
				text: '�ر�',
				handler: function(){
					//this.ownerCt.ownerCt.close();
					Tms_win4plan.close();//�رմ���
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
/*�����δ���*/
Tms.directorWin = function(grid,data){
	var Tms_win4director = {};
		Tms_win4director = new Ext.Window({
			layout:'fit'
			,width:640
			,height:400
			,closeAction:'close'
			,plain: true
			,title : '���ɹ�������ƻ�'
			,items : {xtype:'directorForm',id:'directorForm',isCreated : (data==null)}
			
			,buttons: [{
				text:'����'
				,handler: function(){
					var form = Ext.getCmp("directorForm").form;
					if(form.isValid()){
						form.submit({
							method : 'POST'
							,url : Tms.URLS.submitDirector
							,success : function(from, action) {
								Ext.Msg.show({
									title : '��ʾ��Ϣ'
									,msg : '����ɹ�'
									,buttons : Ext.Msg.OK
								});

								Tms_win4director.close();//�رմ���
								Tms_win4director = null;
								delete Tms_win4director;
								
								grid.getStore().reload();
								//�����ɹ����Ͽ���ѯ
								//Ext.Direct.getProvider("pollTaskList").disconnect();
								//���¿�ʼ��ѯ����ʱ��ȡ��������
								//Ext.Direct.getProvider("pollTaskList").connect();
							}
							,failure : function(form, action) {
								Ext.Msg.show({
									title : '��ʾ��Ϣ'
									,msg : '����ʧ��'
									,buttons : Ext.Msg.OK
								});
							}
							,waitMsg : '���ڱ������ݣ��Ժ�...'
						});						
					}else {
						Ext.Msg.alert('��ʾ', '����д������ύ!');
					}
				}
			}
			,{
				text: '�ر�',
				handler: function(){
					//this.ownerCt.ownerCt.close();
					Tms_win4director.close();//�رմ���
					Tms_win4director = null;
					delete Tms_win4director;
				}
			}]
		});
	
	if(data){
		var form = Ext.getCmp("directorForm").form;

		//��ȡ��ǰ��Ŀ�ܸ�����		
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
		
		//��ȡ��ǰ����������Ա�б�
		var mdStore = Ext.getCmp("chiefPerson_id").store;
		mdStore.on('datachanged',function(store){			
			form.setValues({chiefDept : store.data.items[0].json.depart.deptName});//���ø���칫��			
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
		
		//form.setValues({chiefDept : Tms.user.deptID});//���ø���칫��
		form.loadRecord(data);
	}

	Tms_win4director.show();
};