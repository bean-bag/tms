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
		title : '�½���������',
		items : formCfg,
		buttons : [ {
			text : '����',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.create4planner,
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
		title : '�޸Ĺ�������',
		items : formCfg,
		buttons : [ {
			text : '����',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.update4planner,
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
	win.show();
	if (project) {
		var form = win.findByType('form')[0].form;
		//1.��ȡ�칫���б�����
		//2.��ȡ�칫��ѡ������
		//3.��ȡ�������б�����
		//4.��ȡ������ѡ������

		var chiefPersonStore = form.findField("chiefPerson").store;
		
		var doDataChanged = null;
			doDataChanged = function(store){
				for(var i=0;i<personStore.data.items.length;i++){
					var cp = personStore.data.items[i];
					if(cp.data.sort == 'OFFICER'){
						form.findField("chiefPerson").setValue(cp.data.memberID);
					}
				}
				chiefPersonStore.un('datachanged',doDataChanged);//��һ�μ��سɹ��󣬾�ж�ش˼���
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
					if(member.sort == 'MAJORDEPART'){//��Ҫ����칫��
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

		//������������
		form.loadRecord(project);				
	}	
}