/*У�Դ���*/
function corrector(grid, record){
	var formCfg = {
		xtype : 'form',
		frame : true,
		labelWidth : 60,
		items : [
			Tms.ui.prjID, 
			Tms.ui.id, 
			Tms.ui.prjName_display2,
			Tms.ui.prjType_readonly,
			Tms.ui.subImgName,
			{
				xtype : 'radiogroup'
				,id : 'result'
				,fieldLabel : 'У�Խ��'
				,allowBlank : false
				,isFormField : true
				,labelWidth : 1
				,columns : 2
				,items : [{
					name : 'result', boxLabel : '��ͨ��', labelSeparator : '', inputValue : '0'
				},{
					name : 'result', boxLabel : 'ͨ��', labelSeparator : '', inputValue : '1'
				}]
			},
			Tms.ui.remark
		]
	};
	
	var winCfg = {
		layout : 'fit',
		width : 640,
		height : 450,
		closeAction : 'close',
		plain : true,
		title : 'У������',
		items : formCfg,
		buttons : [ {
			text : '����',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.correctorAction,
						success : function(from, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ɹ�',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ʧ��',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
						},
						waitMsg : '���ڱ������ݣ��Ժ�...'
					});
				} else {
					Ext.Msg.show({
						title : '��ʾ',
						msg : '����д������ύ!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '�ر�',
			handler : function(target,event) {
				target.ownerCt.ownerCt.close();
			}
		} ]
	};

	var win = new Ext.Window(winCfg);
	win.show();
	if (record) {
		var form = win.findByType('form')[0].form;

		form.loadRecord(record);
		Ext.StoreMgr.map.main_list_store.each(function(rec) {
			if (rec && rec.data && rec.data.id == record.data.prjID) {
				form.findField("prjID").setValue(rec.data.id);
				form.findField("prjName").setValue(rec.data.prjType);
			}
		});
	}
}

/*Ԥ�������δ���*/
function budgetOfficer(grid, record){
	var formCfg = {
		xtype : 'form',
		frame : true,
		labelWidth : 65,
		labelAlign : 'right',
		anchor:'95%',
		items : [ 
			Tms.ui.id, 
			Tms.ui.prjName_display2,
			Tms.ui.prjType_readonly,
			{
				xtype : 'combo'
				,hiddenName : 'majorBudgeteer'
				,fieldLabel : 'Ԥ�㸺����'
				,emptyText : '��ѡ��Ԥ�㸺����...'
				,forceSelection : true
				,anchor:'95%'
				,listWidth : 200
				,valueField : 'id'
				,displayField : 'userName'
				,editable: false
				,typeAhead : true
				,triggerAction : 'all'
				,selectOnFocus : true
				,allowBlank : false
				,mode : 'local'				
			},{
				xtype:'superboxselect'
				,name: 'budgeteer'
				,fieldLabel: 'Ԥ����Ա'
				,emptyText : '��ѡ��Ԥ����Ա ...'
				,allowBlank:false
				,resizable: true
				,anchor:'95%'
				,mode: 'local'
				,displayField: 'userName'
				,valueField: 'id'
				,navigateItemsWithTab: false						
			}
		]
	};
	var winCfg = {
		layout : 'fit',
		width : 400,
		height : 250,
		closeAction : 'close',
		plain : true,
		title : 'Ԥ��������ɴ���',
		items : formCfg,
		buttons : [ {
			text : '����',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.budgetOfficer,
						success : function(from, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ɹ�',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ʧ��',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
						},
						waitMsg : '���ڱ������ݣ��Ժ�...'
					});
				} else {
					Ext.Msg.show({
						title : '��ʾ',
						msg : '����д������ύ!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '�ر�',
			handler : function(target,event) {
				target.ownerCt.ownerCt.close();
			}
		} ]
	};

	var win = new Ext.Window(winCfg);
	win.show();
	
	var form = win.findByType('form')[0].form;
	if (record) {
		form.loadRecord(record);
	}
	var store = new Ext.data.Store({
			reader:new Ext.data.JsonReader({
				id:'id'
				,root:'data'
				,fields:[{name: 'id'},{name: 'userName'}]
			})
			,proxy : new Ext.data.HttpProxy({url:Tms.URLS.personListByDept})
			,baseParams : {deptID : '4'}
		});	
		
		store.load({callback : function(){
			var budgeteerField = form.findField('budgeteer');
			var mBudgeteerField = form.findField('majorBudgeteer');
			budgeteerField.store = store;
			/*��¡store*/
			var store2 = new Ext.data.Store({recordType: store.recordType});
				store2.add(store.getRange());
			
			/*var records = [];
			store.each(function(r){
				records.push(r.copy());
			});
			var store2 = new Ext.data.Store({
				recordType: store.recordType
			});
			store2.add(records);*/

			mBudgeteerField.store = store2;

			Ext.Ajax.request({
				url : Tms.URLS.groupList,
				success : function(t) {
					if (t && t.responseText) {
						var json = Ext.util.JSON.decode(t.responseText);
						if (json && json.data) {
							var members = [];
							json.data.forEach(function (v){
								if(v.sort === 'MAJORBUDGETEER'){
									mBudgeteerField.setValue(v.memberID);
								}else if(v.sort === 'BUDGETEER'){
									members.push(v.memberID);
								}
							});
							budgeteerField.setValue(members);
						}
					}
				},
				params : {
					prjID : record.get('id')
					//,kind : 'BUDGETEER'//Ԥ����Ա
				}
			});
		}});	
}
/*Ԥ�㴰��*/
function budgeteer(grid, record){
	Ext.Ajax.request({
		url : Tms.URLS.canBudget,
		success : function(response,options) {
			var json = Ext.util.JSON.decode(response.responseText);
			if(json.success){
/*start:{*/
	var fdg = Tms.ui.fileUploadGrid;
	fdg.store.baseParams = {
		category : 'budget',
		prjID : record.get('id')
	};

	var formCfg = {
		xtype : 'form',
		id : 'budgetForm',
		frame : true,
		labelWidth : 60,
		fileUpload: true,
		items : [ 
			Tms.ui.id, 
			Tms.ui.prjName_display2,
			Tms.ui.prjType_readonly,
			{
				xtype : 'numberfield'
				,name : 'budgetAmount'
				,fieldLabel : 'Ԥ����'
				,emptyText : '������Ԥ����...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'FilesUploadField',
				id : 'form-file',
				emptyText : 'ѡ��Ҫ�ϴ����ĵ�',
				fieldLabel : 'Ԥ���ĵ�',
				name : 'upfile',
				isFormField : false,
				browseButtonText : '���',
				uploadButtonText : '�ϴ�',
				anchor : '95%',
				uploadHandler : function() {
					var form = Ext.getCmp('budgetForm').getForm();
					if (form.isValid()) {
						form.submit({
							url : Tms.URLS.fileUpload,
							params: {
								category: 'budget'
							},
							success : function(_form, o) {
								if (o.result.success) {
									Ext.getCmp('filesGrid').getStore().add( new Ext.form.FileRecord(o.result.fileInfo));
									_form.findField("form-file").reset();
								}
							}
						});
					}
				}
			},
			fdg
		]
	};

	var winCfg = {
		layout : 'fit',
		width : 640,
		height : 450,
		closeAction : 'close',
		plain : true,
		title : 'Ԥ�㴰��',
		items : formCfg,
		buttons : [ {
			text : '����',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.budgeteerAction,
						success : function(from, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ɹ�',
								buttons : Ext.Msg.OK
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ʧ��',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
						},
						waitMsg : '���ڱ������ݣ��Ժ�...'
					});
				} else {
					Ext.Msg.show({
						title : '��ʾ',
						msg : '����д������ύ!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '�ر�',
			handler : function(target,event) {
				target.ownerCt.ownerCt.close();
			}
		} ]
	};

	var win = new Ext.Window(winCfg);
	win.show();
	if (record) {
		win.findByType('form')[0].form.loadRecord(record);
	}
/*}end*/
			}else{
				Ext.Msg.show({
					title : '��ʾ',
					msg :json.message,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO
				});
			}
		},
		failure : function() {
			Ext.Msg.show({
				title : '��ʾ', 
				msg : '����ͨ��ʧ�ܣ������ԣ�',
				buttons : Ext.Msg.OK,
				icon : Ext.Msg.INFO
			});
		},
		timeout : 30000,
		params : {id:record.data.id}
	});
}
/**�ύԤ�����񴰿�**/
function submitBudget(grid,record){
	Ext.Ajax.request({
		url : Tms.URLS.canSubmitBudget,
		success : function(response,options) {
			var json = Ext.util.JSON.decode(response.responseText);
			if(json.success){
/*start:{*/

		var win ={};win = new Ext.Window({
			layout : 'fit',
			width : 400,
			height : 200,
			closeAction : 'close',
			plain : true,
			title : 'ȷ����ʾ',
			items : [{
				xtype : 'form',
				frame : true,
				labelWidth : 60,
				items : [ 
					Tms.ui.id, 
					Tms.ui.prjName_display2,
					Tms.ui.prjType_readonly,
					{
						xtype : 'label',
						html : '<br>'
					},
					{
						xtype : 'label',
						text : '�ύԤ������',
						style : 'text-align:center;'
					}
				]
			}],
			buttons : [ {
				text : 'ȷ��',
				handler : function(ct, e) {
					var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
					if (form.isValid()) {
						form.submit({
							method : 'POST',
							url : Tms.URLS.updateBudgetFlag,
							success : function(from, action) {
								Ext.Msg.show({
									title : '��ʾ��Ϣ',
									msg : '�����ɹ�',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
								win.close();
								grid.getStore().reload();
							},
							failure : function(form, action) {
								Ext.Msg.show({
									title : '��ʾ��Ϣ',
									msg : '����ʧ��',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							},
							waitMsg : '�����ύ���ݣ��Ժ�...'
						});
					} else {
						Ext.Msg.show({
							title : '��ʾ', 
							msg : '����д������ύ!',
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
					}
				}
			}, {
				text : 'ȡ��',
				handler : function(target,event) {
					target.ownerCt.ownerCt.close();
				}
			} ]
		});
		win.show();
		if (record) {
			win.findByType('form')[0].form.loadRecord(record);
		}
/*}end*/
			}else{
				Ext.Msg.show({
					title : '��ʾ',
					msg :json.message,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO
				});
			}
		},
		failure : function() {
			Ext.Msg.show({
				title : '��ʾ', 
				msg : '����ͨ��ʧ�ܣ������ԣ�',
				buttons : Ext.Msg.OK,
				icon : Ext.Msg.INFO
			});
		},
		timeout : 30000,
		params : {id:record.data.id}
	});
}
/**����Ԥ���ĵ�*/
function downloadBudgetDoc(grid,record){
	var fdg = Tms.ui.fileDownloadGrid;
	fdg.store.baseParams = {
		category : 'budget',
		prjID : record.get('id')
	};

	var win ={};win = new Ext.Window({
			layout : 'fit',
			width : 450,
			height : 300,
			closeAction : 'close',
			plain : true,
			title : 'Ԥ���ĵ�����ҳ��',
			items : [{
				xtype : 'form',
				frame : true,
				labelWidth : 60,
				items : [
					Tms.ui.id, 
					Tms.ui.prjName_display2,
					Tms.ui.prjType_readonly,
					fdg
				]
			}],
			buttons : [ {
				text : '�ر�',
				handler : function(target,event) {
					target.ownerCt.ownerCt.close();
				}
			} ]
		});
		win.show();
		if (record) {
			win.findByType('form')[0].form.loadRecord(record);
		}
}
/*�ܹ�*/
function assessor(grid, record){
	var _prjName = Tms.ui.prjName_display2;
		//_prjName.width = 400;
	var formCfg = {
		xtype : 'form',
		frame : true,
		labelWidth : 60,
		items : [ 
			Tms.ui.id, 
			_prjName,
			Tms.ui.prjType_readonly,
			{
				xtype : 'radiogroup'
				,id : 'result'
				,fieldLabel : '��˽��'
				,allowBlank : false
				,isFormField : true
				,labelWidth : 1
				,columns : 2
				,items : [{
					name : 'result', boxLabel : '��ͨ��', labelSeparator : '', inputValue : '0'
				},{
					name : 'result', boxLabel : 'ͨ��', labelSeparator : '', inputValue : '1'
				}]
			},
			Tms.ui.remark
		]
	};
	var winCfg = {
		layout : 'fit',
		width : 640,
		height : 300,
		closeAction : 'close',
		plain : true,
		title : '��Ŀ��˴���',
		items : formCfg,
		buttons : [ {
			text : '����',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.assessorAction,
						success : function(from, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ɹ�',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ʧ��',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
						},
						waitMsg : '���ڱ������ݣ��Ժ�...'
					});
				} else {
					Ext.Msg.show({
						title : '��ʾ',
						msg : '����д������ύ!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '�ر�',
			handler : function(target,event) {
				target.ownerCt.ownerCt.close();
			}
		} ]
	};
	
	var win = new Ext.Window(winCfg);
	win.show();
	if (record) {
		win.findByType('form')[0].form.loadRecord(record);
	}
}
/*����ȷ���տ�*/
function accountant(grid, record){
	if(Tms.user.role.isAccountant){
		if(!record.data.feeFlag){
			setPrjState(grid,record,'6','����Ŀ���տ');
		}
	//}else{
		//
	}
}
/*ά����Ŀ��Ϣ*/
function prjInfo(grid,record){
	Ext.Ajax.request({
		url : Tms.URLS.isOfficer,
		success : function(response,options) {
			var json = Ext.util.JSON.decode(response.responseText);
			if(json.success){


	var formCfg = {
		xtype : 'form',
		frame : true,
		labelWidth : 60,
		items : [
			Tms.ui.prjID,
			Ext.apply(Tms.ui.prjName,{readOnly : true,anchor : '100%'}),
			{
				xtype : 'textfield'
				,name : 'location'
				,fieldLabel : '��Ŀλ��'
				,emptyText : '��������Ŀλ��...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'textfield'
				,name : 'scale'
				,fieldLabel : '��Ŀ��ģ'
				,emptyText : '��������Ŀ��ģ...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'textfield'
				,name : 'watersupply'
				,fieldLabel : '��ˮ��ʽ'
				,emptyText : '�������ˮ��ʽ...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'textfield'
				,name : 'pipeline'
				,fieldLabel : '��Ŀ����'
				,emptyText : '��������Ŀ����...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'textfield'
				,name : 'construction'
				,fieldLabel : '��Ŀ����'
				,emptyText : '��������Ŀ����...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'textfield'
				,name : 'electric'
				,fieldLabel : '��Ŀ����'
				,emptyText : '��������Ŀ����...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'textfield'
				,name : 'contact'
				,fieldLabel : '��ϵ��'
				,emptyText : '��������ϵ��...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'textfield'
				,name : 'builder'
				,fieldLabel : '���췽'
				,emptyText : '�����뽨�췽...'
				,isFormField : true
				,allowBlank : false
			}]
	};
	var winCfg = {
		layout : 'fit',
		width : 300,
		height : 350,
		closeAction : 'close',
		plain : true,
		title : 'ά����Ŀ��Ϣ',
		items : formCfg,
		buttons : [ {
			text : '����',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.updatePrjInfo,
						success : function(from, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ɹ�',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ʧ��',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.ERROR
							});
						},
						waitMsg : '���ڱ������ݣ��Ժ�...'
					});
				} else {
					Ext.Msg.show({
						title : '��ʾ',
						msg : '����д������ύ!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '�ر�',
			handler : function(target,event) {
				target.ownerCt.ownerCt.close();
			}
		} ]
	};

	var win = new Ext.Window(winCfg);
		win.show();
	if (record) {
		var form = win.findByType('form')[0].form;
		form.findField("prjID").setValue(record.get('id'));
		form.load({
			url:Tms.URLS.getPrjInfo,
			params: { prjName: record.get("prjName") }
		});
	}
			
			}else{
				Ext.Msg.show({
					title : '��ʾ',
					msg : json.message,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO
				});
			}
		},
		failure : function() {
			Ext.Msg.show({
				title : '��ʾ', 
				msg : '����ͨ��ʧ�ܣ������ԣ�',
				buttons : Ext.Msg.OK,
				icon : Ext.Msg.INFO
			});
		},
		timeout : 30000,
		params : {id:record.get("id")}
	});
}
function dispathTask(grid, record){
	Ext.Ajax.request({
		url : Tms.URLS.isOfficer,
		success : function(response,options) {
			var json = Ext.util.JSON.decode(response.responseText);
			if(json.success){

	var formCfg = {
		xtype : 'form',
		frame : true,
		labelWidth : 60,
		items : [ 
			Tms.ui.id, 
			Tms.ui.prjName_display2,
			Tms.ui.prjNumber_readonly,
			Tms.ui.prjType_readonly,
			{
				xtype : 'combo'
				,id : 'minorDepart_id'
				,hiddenName : 'minorDepart'
				,fieldLabel : '���в���'
				,emptyText : '���������в���...'
				,forceSelection : true
				,listWidth : 200
				,displayField : 'deptName'
				,valueField : 'id'
				,editable: false
				,typeAhead : true
				,triggerAction : 'all'
				,selectOnFocus : true
				,allowBlank : false 
				,mode : 'remote'//Զ��
				,store : {
					xtype : 'store'
					,proxy:new Ext.data.HttpProxy({url : Tms.URLS.minorDepartList})
					,autoLoad: true
					,listeners : {
						'beforeload' : function(store,options){
							store.baseParams = {'prjID' : record.get('id')};
						}
					}
					,reader : new Ext.data.JsonReader({
						root : 'data'
						,fields : [{name : 'id'},{name: 'deptName'}]
					})
				}
			}
		]
	};
	var winCfg = {
		layout : 'fit',
		width : 640,
		height : 300,
		closeAction : 'close',
		plain : true,
		title : '��Ŀ��������ί��',
		items : formCfg,
		buttons : [ {
			text : '����',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.update4leader,
						success : function(from, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ɹ�',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ʧ��',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
						},
						waitMsg : '���ڱ������ݣ��Ժ�...'
					});
				} else {
					Ext.Msg.show({
						title : '��ʾ', 
						msg : '����д������ύ!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '�ر�',
			handler : function(target,event) {
				target.ownerCt.ownerCt.close();
			}
		} ]
	};

	var win = new Ext.Window(winCfg);
	win.show();
	if (record) {
		win.findByType('form')[0].form.loadRecord(record);
	}

			}else{
				Ext.Msg.show({
					title : '��ʾ',
					msg : json.message,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO
				});
			}
		},
		failure : function() {
			Ext.Msg.show({
				title : '��ʾ',
				msg : '����ͨ��ʧ�ܣ������ԣ�',
				buttons : Ext.Msg.OK,
				icon : Ext.Msg.ERROR
			});
		},
		timeout : 30000,
		params : {id:record.get("id")}
	});
}

/*�ܲ�*/
function ceo(grid, record){

}

/*��ͼ*/
function outprint(grid, record){
	var formCfg = {
		xtype : 'form',
		frame : true,
		labelWidth : 60,
		items : [ 
			Tms.ui.id, 
			Tms.ui.prjName_display2,
			Tms.ui.prjType_readonly,
			/*{
				xtype : 'radiogroup'
				,id : 'result'
				,fieldLabel : '��ͼ״̬'
				,allowBlank : false
				,isFormField : true
				,labelWidth : 1
				,columns : 2
				,items : [{
					name : 'result', boxLabel : 'δ��ͼ', labelSeparator : '', inputValue : '0'
				},{
					name : 'result', boxLabel : '�ѳ�ͼ', labelSeparator : '', inputValue : '1'
				}]
			},*/
			Tms.ui.remark
		]
	};
	var winCfg = {
		layout : 'fit',
		width : 640,
		height : 450,
		closeAction : 'close',
		plain : true,
		title : 'У������',
		items : formCfg,
		buttons : [ {
			text : '����',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.outprintAction,
						success : function(from, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ɹ�',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ʧ��',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
						},
						waitMsg : '���ڱ������ݣ��Ժ�...'
					});
				} else {
					Ext.Msg.show({
						title : '��ʾ',
						msg : '����д������ύ!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '�ر�',
			handler : function(target,event) {
				target.ownerCt.ownerCt.close();
			}
		} ]
	};

	var win = new Ext.Window(winCfg);
	win.show();
	if (record) {
		win.findByType('form')[0].form.loadRecord(record);
	}
}
/*����*/
function archive(grid, record){
	var formCfg = {
		xtype : 'form',
		frame : true,
		labelWidth : 60,
		items : [ 
			Tms.ui.id, 
			Tms.ui.prjName_display2,
			Tms.ui.prjType_readonly,
			{
				xtype : 'textfield'
				,name : 'docNO'
				,fieldLabel : '�鵵'
				,emptyText : '������鵵���...'
				,isFormField : true
				,allowBlank : false
			},
			Tms.ui.remark
		]
	};
	var winCfg = {
		layout : 'fit',
		width : 640,
		height : 300,
		closeAction : 'close',
		plain : true,
		title : '���̹鵵',
		items : formCfg,
		buttons : [ {
			text : '����',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.archiveAction,
						success : function(from, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ɹ�',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '��ʾ��Ϣ',
								msg : '����ʧ��',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.ERROR
							});
						},
						waitMsg : '���ڱ������ݣ��Ժ�...'
					});
				} else {
					Ext.Msg.show({
						title : '��ʾ', 
						msg : '����д������ύ!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '�ر�',
			handler : function(target,event) {
				target.ownerCt.ownerCt.close();
			}
		} ]
	};

	var win = new Ext.Window(winCfg);
	win.show();
	if (record) {
		win.findByType('form')[0].form.loadRecord(record);
	}
}

/*�鿴�����ĵ�*/
function viewDoc(grid, record){
	var fdg = Tms.ui.fileDownloadGrid;
		fdg.store.baseParams = {
			category : 'design',
			prjID : record.get('id')
		};

	var win ={};win = new Ext.Window({
			layout : 'fit',
			width : 450,
			height : 300,
			closeAction : 'close',
			plain : true,
			title : '�鿴�����ĵ�ҳ��',
			items : [{
				xtype : 'form',
				frame : true,
				labelWidth : 60,
				items : [
					Tms.ui.id, 
					Tms.ui.prjName_display2,
					Tms.ui.prjType_readonly,
					/*{
						xtype : 'label',
						html : '�����ĵ�<br>'
					},*/
					fdg
				]
			}],
			buttons : [ {
				text : '�ر�',
				handler : function(target,event) {
					target.ownerCt.ownerCt.close();
				}
			} ]
		});
		win.show();
		if (record) {
			win.findByType('form')[0].form.loadRecord(record);
		}
}
/*��ʾ��Ŀ���Ա*/
function viewGroup(grid, record){
	new Ext.Window({
			layout : 'fit',
			width : 450,
			height : 300,
			closeAction : 'close',
			plain : true,
			title : record.get('prjName'),
			items : {
				xtype : 'treepanel',
		        autoHeight:true,
		        rootVisible:false,
		        frame : true,
		        autoScroll:true,
		        //title: '��Ŀ���Ա�б�',
				lines:false,
				borderWidth: Ext.isBorderBox ? 0 : 2, // the combined left/right border for each cell
				cls:'x-column-tree',
		        
		        columns:[{
		            header:'���ŷֹ�',
		            width:128,
		            dataIndex:'name',
					renderer : function(v, r){
						if('OFFICER' === v) return '��Ŀ������';
						if('CAREERMAN' === v) return 'רҵ����';
						if('DESIGNER' === v) return '�����Ա';
						if('PROOFREADER' === v) return 'У����Ա';
						if('BUDGETEER' === v) return 'Ԥ����Ա';
						if('MAJORBUDGETEER' === v) return 'Ԥ�㸺����';
						if('MINOROFFICER' === v) return '��Ŀ����������';
						return v;
					}
		        },{
		            header:'��Ա',
		            //width:auto,
		            dataIndex:'member',
					renderer : function(v, r){
						var ary = [];
						forEach(v, function(Q) { ary.push(Q.userName); });
						return ary.join(', ');
					}
		        }],

		        loader: new Ext.tree.TreeLoader({
		            dataUrl : Tms.URLS.personListByPrj,
		            baseParams : {
		            	prjID : record.get('id')
		            },
		            uiProviders : {
		                'col': Ext.tree.ColumnNodeUI
		            }
		        }),
		        root: new Ext.tree.AsyncTreeNode({text:'��Ŀ���Ա'})
			},
			buttons : [ {
				text : '�ر�',
				handler : function(target,event) {
					target.ownerCt.ownerCt.close();
				}
			} ]
	}).show();	
}

/*ά����Ŀ�Ƿ������״̬*/
function updatePrjCompletionState(grid,record){
	if(Tms.user.role.isDesigner && Tms.user.teamLeader){
		Ext.Ajax.request({
			url : Tms.URLS.isMajorDepart,
			success : function(response,options) {
				var json = Ext.util.JSON.decode(response.responseText);
				if(json.success){
					if(json.message == 'true'){
						setPrjState(grid,record,'1','��ȷ������ͼֽ���ϴ�������������!');
					}else{
						Ext.Msg.show({
							title : '��ʾ',
							msg : "������������βſ���ά����Ŀ���״̬",
							buttons : Ext.Msg.OK,
							icon: Ext.Msg.INFO
						});
					}
				}else{
					Ext.Msg.show({
						title:'��ʾ',
						msg: json.message,
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			},
			failure : function() {
				Ext.Msg.show({
					title : '��ʾ',
					msg : '����ͨ��ʧ�ܣ������ԣ�',
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO
				});
			},
			timeout : 30000,
			params : {prjID:record.get("id"),deptID:Tms.user.deptID}
		});		
	}else{
		Ext.Msg.show({
			title : '��ʾ',
			msg : "ֻ�������ο���ά����Ŀ���״̬",
			buttons : Ext.Msg.OK,
			icon : Ext.Msg.INFO
		});
	}
}
/*
��˲���
*/
function updatePrjAuditState(grid,record){
	if(record.data.complete){
		if(Tms.user.role.isPlanner || Tms.user.role.isAssessor){
			assessor(grid,record);
		}else{
			Ext.Msg.show({
				title : '��ʾ',
				msg : "ֻ�мƻ���Ա���ܹ����Խ�����Ŀ���",
				buttons : Ext.Msg.OK,
				icon: Ext.Msg.INFO
			});
		}
	}else{
		Ext.Msg.show({
			title : '��ʾ��Ϣ',
			msg : '��Ŀ�������״̬�ſ���ˣ�',
			buttons : Ext.Msg.OK,
			icon: Ext.Msg.INFO
		});
	}
}

/*ά����Ŀ״̬*/
function updatePrjState(grid,record,state,msg){
	if(Tms.user.role.isHelper){
		setPrjState(grid,record,state,msg);
	}else{
		Ext.Msg.show({
			title:'��ʾ',
			msg : "ֻ�к�ͬ��Ա����ά����Ŀ״̬",
			buttons : Ext.Msg.OK,
			icon: Ext.Msg.INFO
		});
	}
}
function setPrjState(grid,record,state,msg){
	if(record.data.prjState.indexOf(state)==-1){
		var win ={};win = new Ext.Window({
			layout : 'fit',
			width : 400,
			height : 200,
			closeAction : 'close',
			plain : true,
			title : 'ȷ����ʾ',
			items : [{
				xtype : 'form',
				frame : true,
				labelWidth : 60,
				items : [ 
					Tms.ui.id, 
					Tms.ui.prjName_display2,
					Tms.ui.prjType_readonly,
					{
						xtype : 'label',
						html : '<br>'
					},
					{
						xtype : 'label',
						text : msg,
						style : 'text-align:center;'
					},
					{
						xtype:"hidden"
						,name:"state"
						,hidden:true
						,hiddenLabel:true
						,value : state
					}
				]
			}],
			buttons : [ {
				text : 'ȷ��',
				handler : function(ct, e) {
					var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
					if (form.isValid()) {
						form.submit({
							method : 'POST',
							url : Tms.URLS.updatePrjState,
							success : function(from, action) {
								Ext.Msg.show({
									title : '��ʾ��Ϣ',
									msg : '�����ɹ�',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
								win.close();
								grid.getStore().reload();
							},
							failure : function(form, action) {
								Ext.Msg.show({
									title : '��ʾ��Ϣ',
									msg : '����ʧ��',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							},
							waitMsg : '�����ύ���ݣ��Ժ�...'
						});
					} else {
						Ext.Msg.show({
							title : '��ʾ', 
							msg : '����д������ύ!',
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
					}
				}
			}, {
				text : 'ȡ��',
				handler : function() {
					win.close();
				}
			} ]
		});
		win.show();
		if (record) {
			win.findByType('form')[0].form.loadRecord(record);
		}
	}
}
