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
		title : '�½���������',
		items : formCfg,
		buttons : [ {
			text : '����',
			handler : function(ct,e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.create4helper,
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
								buttons : Ext.Msg.OK
							});
						},
						waitMsg : '���ڱ������ݣ��Ժ�...'
					});
				} else {
					Ext.Msg.alert('��ʾ', '����д������ύ!');
				}
			}
		}, {
			text : '�ر�',
			handler : function() {
				win.close();
			}
		} ]
	};

	var win = new Ext.Window(winCfg);
	// ��������
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
			title : '�޸Ĺ�������',
			items : formCfg,
			buttons : [ {
				text : '����',
				handler : function(ct,e) {
					var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
					if (form.isValid()) {
						form.submit({
							method : 'POST',
							url : Tms.URLS.update4helper,
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
									buttons : Ext.Msg.OK
								});
							},
							waitMsg : '���ڱ������ݣ��Ժ�...'
						});
					} else {
						Ext.Msg.alert('��ʾ', '����д������ύ!');
					}
				}
			}, {
				text : '�ر�',
				handler : function() {
					win.close();
				}
			} ]
		};

		var win = new Ext.Window(winCfg);
		// ��������
		if(data){
			var form = win.findByType('form')[0].form;
			form.loadRecord(data);
		}
		win.show();
}