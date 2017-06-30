/*校对窗口*/
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
				,fieldLabel : '校对结果'
				,allowBlank : false
				,isFormField : true
				,labelWidth : 1
				,columns : 2
				,items : [{
					name : 'result', boxLabel : '不通过', labelSeparator : '', inputValue : '0'
				},{
					name : 'result', boxLabel : '通过', labelSeparator : '', inputValue : '1'
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
		title : '校对子项',
		items : formCfg,
		buttons : [ {
			text : '保存',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.correctorAction,
						success : function(from, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存成功',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存失败',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
						},
						waitMsg : '正在保存数据，稍后...'
					});
				} else {
					Ext.Msg.show({
						title : '提示',
						msg : '请填写完成再提交!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '关闭',
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

/*预算室主任窗口*/
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
				,fieldLabel : '预算负责人'
				,emptyText : '请选择预算负责人...'
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
				,fieldLabel: '预算人员'
				,emptyText : '请选择预算人员 ...'
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
		title : '预算任务分派窗口',
		items : formCfg,
		buttons : [ {
			text : '保存',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.budgetOfficer,
						success : function(from, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存成功',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存失败',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
						},
						waitMsg : '正在保存数据，稍后...'
					});
				} else {
					Ext.Msg.show({
						title : '提示',
						msg : '请填写完成再提交!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '关闭',
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
			/*克隆store*/
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
					//,kind : 'BUDGETEER'//预算人员
				}
			});
		}});	
}
/*预算窗口*/
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
				,fieldLabel : '预算金额'
				,emptyText : '请输入预算金额...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'FilesUploadField',
				id : 'form-file',
				emptyText : '选择要上传的文档',
				fieldLabel : '预算文档',
				name : 'upfile',
				isFormField : false,
				browseButtonText : '浏览',
				uploadButtonText : '上传',
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
		title : '预算窗口',
		items : formCfg,
		buttons : [ {
			text : '保存',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.budgeteerAction,
						success : function(from, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存成功',
								buttons : Ext.Msg.OK
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存失败',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
						},
						waitMsg : '正在保存数据，稍后...'
					});
				} else {
					Ext.Msg.show({
						title : '提示',
						msg : '请填写完成再提交!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '关闭',
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
					title : '提示',
					msg :json.message,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO
				});
			}
		},
		failure : function() {
			Ext.Msg.show({
				title : '提示', 
				msg : '网络通信失败，请重试！',
				buttons : Ext.Msg.OK,
				icon : Ext.Msg.INFO
			});
		},
		timeout : 30000,
		params : {id:record.data.id}
	});
}
/**提交预算任务窗口**/
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
			title : '确认提示',
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
						text : '提交预算任务？',
						style : 'text-align:center;'
					}
				]
			}],
			buttons : [ {
				text : '确认',
				handler : function(ct, e) {
					var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
					if (form.isValid()) {
						form.submit({
							method : 'POST',
							url : Tms.URLS.updateBudgetFlag,
							success : function(from, action) {
								Ext.Msg.show({
									title : '提示信息',
									msg : '操作成功',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
								win.close();
								grid.getStore().reload();
							},
							failure : function(form, action) {
								Ext.Msg.show({
									title : '提示信息',
									msg : '操作失败',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							},
							waitMsg : '正在提交数据，稍后...'
						});
					} else {
						Ext.Msg.show({
							title : '提示', 
							msg : '请填写完成再提交!',
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
					}
				}
			}, {
				text : '取消',
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
					title : '提示',
					msg :json.message,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO
				});
			}
		},
		failure : function() {
			Ext.Msg.show({
				title : '提示', 
				msg : '网络通信失败，请重试！',
				buttons : Ext.Msg.OK,
				icon : Ext.Msg.INFO
			});
		},
		timeout : 30000,
		params : {id:record.data.id}
	});
}
/**下载预算文档*/
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
			title : '预算文档下载页面',
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
				text : '关闭',
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
/*总工*/
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
				,fieldLabel : '审核结果'
				,allowBlank : false
				,isFormField : true
				,labelWidth : 1
				,columns : 2
				,items : [{
					name : 'result', boxLabel : '不通过', labelSeparator : '', inputValue : '0'
				},{
					name : 'result', boxLabel : '通过', labelSeparator : '', inputValue : '1'
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
		title : '项目审核窗口',
		items : formCfg,
		buttons : [ {
			text : '保存',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.assessorAction,
						success : function(from, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存成功',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存失败',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
						},
						waitMsg : '正在保存数据，稍后...'
					});
				} else {
					Ext.Msg.show({
						title : '提示',
						msg : '请填写完成再提交!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '关闭',
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
/*财务确认收款*/
function accountant(grid, record){
	if(Tms.user.role.isAccountant){
		if(!record.data.feeFlag){
			setPrjState(grid,record,'6','该项目已收款？');
		}
	//}else{
		//
	}
}
/*维护项目信息*/
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
				,fieldLabel : '项目位置'
				,emptyText : '请输入项目位置...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'textfield'
				,name : 'scale'
				,fieldLabel : '项目规模'
				,emptyText : '请输入项目规模...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'textfield'
				,name : 'watersupply'
				,fieldLabel : '给水方式'
				,emptyText : '请输入给水方式...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'textfield'
				,name : 'pipeline'
				,fieldLabel : '项目管线'
				,emptyText : '请输入项目管线...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'textfield'
				,name : 'construction'
				,fieldLabel : '项目工艺'
				,emptyText : '请输入项目工艺...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'textfield'
				,name : 'electric'
				,fieldLabel : '项目电气'
				,emptyText : '请输入项目电气...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'textfield'
				,name : 'contact'
				,fieldLabel : '联系人'
				,emptyText : '请输入联系人...'
				,isFormField : true
				,allowBlank : false
			},
			{
				xtype : 'textfield'
				,name : 'builder'
				,fieldLabel : '建造方'
				,emptyText : '请输入建造方...'
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
		title : '维护项目信息',
		items : formCfg,
		buttons : [ {
			text : '保存',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.updatePrjInfo,
						success : function(from, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存成功',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存失败',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.ERROR
							});
						},
						waitMsg : '正在保存数据，稍后...'
					});
				} else {
					Ext.Msg.show({
						title : '提示',
						msg : '请填写完成再提交!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '关闭',
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
					title : '提示',
					msg : json.message,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO
				});
			}
		},
		failure : function() {
			Ext.Msg.show({
				title : '提示', 
				msg : '网络通信失败，请重试！',
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
				,fieldLabel : '受托部门'
				,emptyText : '请输入受托部门...'
				,forceSelection : true
				,listWidth : 200
				,displayField : 'deptName'
				,valueField : 'id'
				,editable: false
				,typeAhead : true
				,triggerAction : 'all'
				,selectOnFocus : true
				,allowBlank : false 
				,mode : 'remote'//远程
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
		title : '项目任务重新委派',
		items : formCfg,
		buttons : [ {
			text : '保存',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.update4leader,
						success : function(from, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存成功',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存失败',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
						},
						waitMsg : '正在保存数据，稍后...'
					});
				} else {
					Ext.Msg.show({
						title : '提示', 
						msg : '请填写完成再提交!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '关闭',
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
					title : '提示',
					msg : json.message,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO
				});
			}
		},
		failure : function() {
			Ext.Msg.show({
				title : '提示',
				msg : '网络通信失败，请重试！',
				buttons : Ext.Msg.OK,
				icon : Ext.Msg.ERROR
			});
		},
		timeout : 30000,
		params : {id:record.get("id")}
	});
}

/*总裁*/
function ceo(grid, record){

}

/*出图*/
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
				,fieldLabel : '出图状态'
				,allowBlank : false
				,isFormField : true
				,labelWidth : 1
				,columns : 2
				,items : [{
					name : 'result', boxLabel : '未出图', labelSeparator : '', inputValue : '0'
				},{
					name : 'result', boxLabel : '已出图', labelSeparator : '', inputValue : '1'
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
		title : '校对子项',
		items : formCfg,
		buttons : [ {
			text : '保存',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.outprintAction,
						success : function(from, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存成功',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存失败',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
						},
						waitMsg : '正在保存数据，稍后...'
					});
				} else {
					Ext.Msg.show({
						title : '提示',
						msg : '请填写完成再提交!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '关闭',
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
/*档案*/
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
				,fieldLabel : '归档'
				,emptyText : '请输入归档编号...'
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
		title : '工程归档',
		items : formCfg,
		buttons : [ {
			text : '保存',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.archiveAction,
						success : function(from, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存成功',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							win.close();
							grid.getStore().reload();
						},
						failure : function(form, action) {
							Ext.Msg.show({
								title : '提示信息',
								msg : '保存失败',
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.ERROR
							});
						},
						waitMsg : '正在保存数据，稍后...'
					});
				} else {
					Ext.Msg.show({
						title : '提示', 
						msg : '请填写完成再提交!',
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			}
		}, {
			text : '关闭',
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

/*查看子项文档*/
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
			title : '查看子项文档页面',
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
						html : '子项文档<br>'
					},*/
					fdg
				]
			}],
			buttons : [ {
				text : '关闭',
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
/*显示项目组成员*/
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
		        //title: '项目组成员列表',
				lines:false,
				borderWidth: Ext.isBorderBox ? 0 : 2, // the combined left/right border for each cell
				cls:'x-column-tree',
		        
		        columns:[{
		            header:'部门分工',
		            width:128,
		            dataIndex:'name',
					renderer : function(v, r){
						if('OFFICER' === v) return '项目负责人';
						if('CAREERMAN' === v) return '专业负责';
						if('DESIGNER' === v) return '设计人员';
						if('PROOFREADER' === v) return '校对人员';
						if('BUDGETEER' === v) return '预算人员';
						if('MAJORBUDGETEER' === v) return '预算负责人';
						if('MINOROFFICER' === v) return '项目辅助负责人';
						return v;
					}
		        },{
		            header:'成员',
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
		        root: new Ext.tree.AsyncTreeNode({text:'项目组成员'})
			},
			buttons : [ {
				text : '关闭',
				handler : function(target,event) {
					target.ownerCt.ownerCt.close();
				}
			} ]
	}).show();	
}

/*维护项目是否已完成状态*/
function updatePrjCompletionState(grid,record){
	if(Tms.user.role.isDesigner && Tms.user.teamLeader){
		Ext.Ajax.request({
			url : Tms.URLS.isMajorDepart,
			success : function(response,options) {
				var json = Ext.util.JSON.decode(response.responseText);
				if(json.success){
					if(json.message == 'true'){
						setPrjState(grid,record,'1','请确认所有图纸已上传到档案服务器!');
					}else{
						Ext.Msg.show({
							title : '提示',
							msg : "主负责的室主任才可以维护项目完成状态",
							buttons : Ext.Msg.OK,
							icon: Ext.Msg.INFO
						});
					}
				}else{
					Ext.Msg.show({
						title:'提示',
						msg: json.message,
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
				}
			},
			failure : function() {
				Ext.Msg.show({
					title : '提示',
					msg : '网络通信失败，请重试！',
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO
				});
			},
			timeout : 30000,
			params : {prjID:record.get("id"),deptID:Tms.user.deptID}
		});		
	}else{
		Ext.Msg.show({
			title : '提示',
			msg : "只有室主任可以维护项目完成状态",
			buttons : Ext.Msg.OK,
			icon : Ext.Msg.INFO
		});
	}
}
/*
审核操作
*/
function updatePrjAuditState(grid,record){
	if(record.data.complete){
		if(Tms.user.role.isPlanner || Tms.user.role.isAssessor){
			assessor(grid,record);
		}else{
			Ext.Msg.show({
				title : '提示',
				msg : "只有计划人员和总工可以进行项目审核",
				buttons : Ext.Msg.OK,
				icon: Ext.Msg.INFO
			});
		}
	}else{
		Ext.Msg.show({
			title : '提示信息',
			msg : '项目处于完成状态才可审核！',
			buttons : Ext.Msg.OK,
			icon: Ext.Msg.INFO
		});
	}
}

/*维护项目状态*/
function updatePrjState(grid,record,state,msg){
	if(Tms.user.role.isHelper){
		setPrjState(grid,record,state,msg);
	}else{
		Ext.Msg.show({
			title:'提示',
			msg : "只有合同人员可以维护项目状态",
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
			title : '确认提示',
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
				text : '确认',
				handler : function(ct, e) {
					var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
					if (form.isValid()) {
						form.submit({
							method : 'POST',
							url : Tms.URLS.updatePrjState,
							success : function(from, action) {
								Ext.Msg.show({
									title : '提示信息',
									msg : '操作成功',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
								win.close();
								grid.getStore().reload();
							},
							failure : function(form, action) {
								Ext.Msg.show({
									title : '提示信息',
									msg : '操作失败',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							},
							waitMsg : '正在提交数据，稍后...'
						});
					} else {
						Ext.Msg.show({
							title : '提示', 
							msg : '请填写完成再提交!',
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
					}
				}
			}, {
				text : '取消',
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
