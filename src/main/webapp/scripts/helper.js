function create4helper(grid) {
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
								items : [ Tms.ui.prjNumber,
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
			handler : function(ct,e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.create4helper,
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

function update4helper(grid, data) {
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
									items : [ Tms.ui.prjName, Tms.ui.prjType_radio, Tms.ui.endDate_hidden,
											Tms.ui.startDate ]
								},
								{
									columnWidth : .5,
									layout : 'form',
									items : [ Tms.ui.prjNumber,
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
			title : '修改工作任务',
			items : formCfg,
			buttons : [ {
				text : '保存',
				handler : function(ct,e) {
					var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
					if (form.isValid()) {
						form.submit({
							method : 'POST',
							url : Tms.URLS.update4helper,
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
		if(data){
			var form = win.findByType('form')[0].form;
			form.loadRecord(data);
		}
		win.show();
}