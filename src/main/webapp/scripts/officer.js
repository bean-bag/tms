function officerSwitch(grid, project,majorFun,minorFun){
	Ext.Ajax.request({
		url : Tms.URLS.isMajorDepart,
		success : function(response,options) {
			var json = Ext.util.JSON.decode(response.responseText);
			if(json.success){
				if(json.message == 'true'){
					majorFun(grid,project);
				}else{
					minorFun(grid,project);
				}
			}else{
				Ext.Msg.alert('提示',json.message);
			}
		},
		failure : function() {
			Ext.Msg.alert('提示', '网络通信失败，请重试！');
		},
		timeout : 30000,
		params : {prjID:project.get("id"),deptID:Tms.user.deptID}
	});
}

function update4officer(grid, project) {
	
	var formCfg = {
		xtype : 'form',
		frame : true,
		labelWidth : 60,
		items : [
				Tms.ui.id,
				{
					layout : 'column',
					items : [
							{
								columnWidth : .5,
								layout : 'form',
								items : [ Tms.ui.prjName_display,
										Tms.ui.prjType_display,
										Tms.ui.chiefDept_combo]
							},
							{
								columnWidth : .5,
								layout : 'form',
								items : [ Tms.ui.prjNumber_display,
										Tms.ui.prjState_display,
										Tms.ui.chiefPerson_combo]
							} ]
				}, 
				Tms.ui.designer,
				Tms.ui.corrector,
				{
					layout : 'column',
					items : [
							{
								columnWidth : .5,
								layout : 'form',
								items : [Tms.ui.startDate_display,
										Tms.ui.prjPriority_combo ]
							},
							{
								columnWidth : .5,
								layout : 'form',
								items : [Tms.ui.endDate_display,
										Tms.ui.accomplishment_combo ]
							} ]
				/*}, {// 上传条件图
					xtype : 'uploaddisplayfield',
					id : 'docs',
					name : 'docs',
					fieldLabel : '条件图'*/
				}, Tms.ui.remark ]
	};
	var winCfg = {
		layout : 'fit',
		width : 640,
		height : 450,
		closeAction : 'close',
		plain : true,
		title : '修改工作任务',
		items : formCfg,
		buttons : [ {
			text : '保存',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.update4officer,
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
								buttons : Ext.Msg.OK
							});
						},
						waitMsg : '正在保存数据，稍后...'
					});
				} else {
					Ext.Msg.alert('提示', '请填写完成再提交!');
				}
			}
		}, {
			text : '关闭',
			handler : function() {
				win.close();
			}
		} ]
	};

	var win = new Ext.Window(winCfg);
		win.show();
	if (project) {
		var form = win.findByType('form')[0].form;
		var chiefPersonStore = form.findField("chiefPerson").store;
		
		var doDataChanged = null;
			doDataChanged = function(store){
				if(store.data.items.length >0){
					form.findField("designer").store = store;
					form.findField("corrector").store = store;
				}
				var aryD = [];
				var aryC = [];
				for(var i=0;i<personStore.data.items.length;i++){
					var cp = personStore.data.items[i];
					if(cp.data.sort == 'OFFICER'){
						form.findField("chiefPerson").setValue(cp.data.memberID);
						/*放开负责人设置控制，让室主任可以选择负责人*/
						//form.findField("chiefPerson").setReadOnly(true);
					}else if(cp.data.sort == 'DESIGNER'){
						aryD.push(cp.data.memberID);
					}else if(cp.data.sort == 'PROOFREADER'){
						aryC.push(cp.data.memberID);
					}
				}

				form.findField("designer").setValue(aryD);
				form.findField("corrector").setValue(aryC);

				//TODO bjw 设置设计人员和校对人员数据集
				chiefPersonStore.un('datachanged',doDataChanged);//第一次加载成功后，就卸载此监听
			};
			chiefPersonStore.on('datachanged',doDataChanged);

		var personStore = new Ext.data.Store({
				reader:new Ext.data.JsonReader({
					 id:'id'
					,root:'data'
					,fields:[
						{name: 'memberID'}
						,{name: 'sort'}
					]
				})
				,proxy:new Ext.data.HttpProxy({url:Tms.URLS.groupList})
			});
			personStore.on('datachanged',function(store){
				if(store.data.items.length>0){
					var member = store.data.items[0].data;
					if(member.sort == 'MAJORDEPART'){//主要负责办公室
						var these = form.findField("chiefDept");
						these.setValue(member.memberID);
						these.setReadOnly(true);
						
						//var _deptID = these.findRecord(these.valueField, these.value).json.depart.id;
						var _deptID = member.memberID;
						chiefPersonStore.load({params : {deptID : _deptID}});
					}
				}
			});

		form.findField("chiefDept").store.on('datachanged',function(store){
			personStore.load({params : {prjID : project.id}});	
		});

		//加载其它数据
		//form.findField("prjPriority").store.on('datachanged',function(store){
		var form4 = form.findField('accomplishment');
			form4.setValue(form4.getStore().data.items.first().data.id);

			form.loadRecord(project);
			form.findField("prjPriority").setReadOnly(true);
			form.findField("accomplishment_id").setReadOnly(true);
		//});	
	}
}
/*
再分派任务室主任编辑窗口
*/
function update4officer_ii(grid, project) {
	
	var formCfg = {
		xtype : 'form',
		frame : true,
		labelWidth : 60,
		items : [
				Tms.ui.id,
				{
					layout : 'column',
					items : [
							{
								columnWidth : .5,
								layout : 'form',
								items : [ Tms.ui.prjName_display,
										Tms.ui.prjType_display,
										{
											xtype : 'textfield'
											,id : 'minorDept'
											,name : 'minorDept'
											,fieldLabel : '责任部门'
											,readOnly : true
											,allowBlank : true
										}]/*辅助责任部门*/
							},
							{
								columnWidth : .5,
								layout : 'form',
								items : [ Tms.ui.prjNumber_display,
										Tms.ui.prjState_display,
										Tms.ui.minorPerson_combo]/*辅助责任人员*/
							} ]
				}, 
				Tms.ui.designer,
				Tms.ui.corrector,
				{
					layout : 'column',
					items : [
							{
								columnWidth : .5,
								layout : 'form',
								items : [Tms.ui.startDate_display,
										Tms.ui.prjPriority_combo ]
							},
							{
								columnWidth : .5,
								layout : 'form',
								items : [Tms.ui.endDate_display,
										Tms.ui.accomplishment_combo ]
							} ]
				}, Tms.ui.remark ]
	};
	var winCfg = {
		layout : 'fit',
		width : 640,
		height : 450,
		closeAction : 'close',
		plain : true,
		title : '修改再分派的工作任务',
		items : formCfg,
		buttons : [ {
			text : '保存',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.update4officer,
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
								buttons : Ext.Msg.OK
							});
						},
						waitMsg : '正在保存数据，稍后...'
					});
				} else {
					Ext.Msg.alert('提示', '请填写完成再提交!');
				}
			}
		}, {
			text : '关闭',
			handler : function() {
				win.close();
			}
		} ]
	};

	var win = new Ext.Window(winCfg);
		win.show();
	if (project) {
		var selectedPersonStore = new Ext.data.Store({
				reader:new Ext.data.JsonReader({
					 id:'id'
					,root:'data'
					,fields:[
						{name: 'memberID'}
						,{name: 'sort'}
					]
				})
				,proxy:new Ext.data.HttpProxy({url:Tms.URLS.groupList})
			});
			selectedPersonStore.on('datachanged',function(store){
				if(store.data.items.length>0){
					var aryD = [];
					var aryC = [];
					for(var i=0;i<store.data.items.length;i++){
						var cp = store.data.items[i];
						if(cp.data.sort == 'MINOROFFICER'){
							form.findField("minorPerson").setValue(cp.data.memberID);
							/*放开负责人设置控制，让室主任可以选择负责人*/
							//form.findField("minorPerson").setReadOnly(true);
						}else if(cp.data.sort == 'DESIGNER'){
							aryD.push(cp.data.memberID);
						}else if(cp.data.sort == 'PROOFREADER'){
							aryC.push(cp.data.memberID);
						}
					}

					form.findField("designer").setValue(aryD);
					form.findField("corrector").setValue(aryC);
				}
			});

		var form = win.findByType('form')[0].form;

		var minorPersonStore = form.findField("minorPerson").store;
			minorPersonStore.on('datachanged',function(store){
				if(store.data.items.length >0){
					form.findField("designer").store = store;
					form.findField("corrector").store = store;
				}
				
				selectedPersonStore.load({params : {prjID : project.id}});//加载项目已设置人员分配信息
			});		

		form.findField('minorDept').setValue(Tms.user.deptName);//把室主任所在部门显示为再分派任务负责部门
		minorPersonStore.load({params : {deptID : Tms.user.deptID}});//加载当前部门人员列表（次要负责人列表）

		//加载其它数据
		var form4 = form.findField('accomplishment');
			form4.setValue(form4.getStore().data.items.first().data.id);

			form.loadRecord(project);
			form.findField("prjPriority").setReadOnly(true);
			form.findField("accomplishment_id").setReadOnly(true);
	}
}