function create4planner(grid) {
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
								items : [ Tms.ui.prjName, Tms.ui.prjType_check,
										Tms.ui.startDate ]
							},
							{
								columnWidth : .5,
								layout : 'form',
								items : [ Tms.ui.prjNumber_readonly,
										Tms.ui.prjState_display ]
							} ]
				}, Tms.ui.remark ]
	};
	var winCfg = {
		layout : 'fit',
		width : 640,
		height : 400,
		closeAction : 'close',
		plain : true,
		title : '新建工作任务',
		items : formCfg,
		buttons : [ {
			text : '保存',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.create4planner,
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
	// 加载数据
	win.show();
}

function update4planner(grid, project) {
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
										Tms.ui.chiefDept_combo,
										Tms.ui.startDate_display,
										Tms.ui.prjPriority_combo ]
							},
							{
								columnWidth : .5,
								layout : 'form',
								items : [ Tms.ui.prjNumber_display,
										Tms.ui.prjState_display,
										Tms.ui.chiefPerson_combo, Tms.ui.endDate ]
							} ]
				}, Tms.ui.remark ]
	};
	var winCfg = {
		layout : 'fit',
		width : 640,
		height : 400,
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
						url : Tms.URLS.update4planner,
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
		//1.获取办公室列表数据
		//2.获取办公室选择数据
		//3.获取负责人列表数据
		//4.获取负责人选择数据

		var chiefPersonStore = form.findField("chiefPerson").store;
		
		var doDataChanged = null;
			doDataChanged = function(store){
				for(var i=0;i<personStore.data.items.length;i++){
					var cp = personStore.data.items[i];
					if(cp.data.sort == 'OFFICER'){
						form.findField("chiefPerson").setValue(cp.data.memberID);
					}
				}
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
		form.loadRecord(project);				
	}	
}