function create4designer(grid, record) {
	Ext.Ajax.request({
		url : Tms.URLS.canDesign,
		success : function(response,options) {
			var json = Ext.util.JSON.decode(response.responseText);
			if(json.success){
/*start:{*/
	var formCfg = {
		xtype : 'form',
		frame : true,
		labelWidth : 60,
		items : [ 
			Tms.ui.prjID,
			Tms.ui.endDate_hidden, 
			Tms.ui.subImgName, 
			Tms.ui.prjType_readonly,
			Tms.ui.subprj_combo,
			Tms.ui.imgtype_combo,
			Tms.ui.imgnum,
			Tms.ui.imgsize_combo,
			Tms.ui.checkDate,
			Tms.ui.accomplishment_combo
		]
	};
	var winCfg = {
		layout : 'fit',
		width : 300,
		height : 290,
		closeAction : 'close',
		plain : true,
		title : '��������',
		items : formCfg,
		buttons : [ {
			text : '����',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.create4designer,
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
	if (record) {
		var form = win.findByType('form')[0].form;
		// ������������

		/*Ext.Ajax.request({
			url : Tms.URLS.evalElapsed,
			success : function(t) {
				if (t && t.responseText) {
					var json = Ext.util.JSON.decode(t.responseText);
					if (json && json.success) {
						form.findField('checkDate').setValue(json.message);
					}
				}
			},
			params : {
				date : record.data.endDate
			}
		});*/
		var cDate = record.data.checkDate || new Date();
		if(record.data.endDate){
			form.findField('checkDate').setValue(Math.floor(record.data.endDate.getElapsed(cDate)/1000/3600/24));
		}

		form.findField("prjID").setValue(record.data.id);
		form.findField("prjType").setValue(record.data.prjType);
		form.findField("endDate").setValue(record.data.endDate);
		//form.findField("subImgName").setValue(Tms.user.deptName);
		//form.findField("subImgName").setReadOnly(true);

		var form4 = form.findField('accomplishment');
			form4.setValue(form4.getStore().data.items.first().data.id);
	}
/*}end*/
			}else{
				Ext.Msg.alert('��ʾ',json.message);
			}
		},
		failure : function() {
			Ext.Msg.alert('��ʾ', '����ͨ��ʧ�ܣ������ԣ�');
		},
		timeout : 30000,
		params : {id:record.data.id}
	});
}

function update4designer(grid, record) {
	Ext.Ajax.request({
		url : Tms.URLS.canDesign,
		success : function(response,options) {
			var json = Ext.util.JSON.decode(response.responseText);
			if(json.success){
/*start:{*/
	var fdg = Tms.ui.fileUploadGrid;
		fdg.store.baseParams = {
			category : 'design',
			prjID : record.get('prjID'),
			subID : record.get('id')
		};
		//fdg.store.baseParams.category = 'design';
		//fdg.store.baseParams.prjID = record.get('prjID');
		//fdg.store.baseParams.subID = record.get('id');

	var formCfg = {
		xtype : 'form',
		id : 'designerForm',
		frame : true,
		labelWidth : 60,
		fileUpload: true,
        //defaults: {anchor: '95%'},
		items : [
				Tms.ui.id,
				Tms.ui.prjID,
				Tms.ui.endDate_hidden,
				Tms.ui.subImgName,
				Tms.ui.prjType_readonly,
				Tms.ui.subprj_combo,
				Tms.ui.imgtype_combo,
				Tms.ui.imgnum,
				Tms.ui.imgsize_combo,
				Tms.ui.checkDate,
				Tms.ui.accomplishment_combo,
				{
					xtype : 'FilesUploadField',
					id : 'form-file',
					emptyText : 'ѡ��Ҫ�ϴ����ĵ�',
					fieldLabel : '�����ĵ�',
					name : 'upfile',
					isFormField : false,
					browseButtonText : '���',
					uploadButtonText : '�ϴ�',
					anchor : '95%',
					uploadHandler : function() {
						var form = Ext.getCmp('designerForm').getForm();
						if (form.isValid()) {
							form.submit({
								url : Tms.URLS.fileUpload,
								params: {
									category: 'design'
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
		title : 'ά������',
		items : formCfg,
		buttons : [ {
			text : '����',
			handler : function(ct, e) {
				var form = ct.ownerCt.ownerCt.findByType('form')[0].form;
				if (form.isValid()) {
					form.submit({
						method : 'POST',
						url : Tms.URLS.update4designer,
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
	if (record) {
		var form = win.findByType('form')[0].form;
		// ������������

		/*Ext.Ajax.request({
			url : Tms.URLS.evalElapsed,
			success : function(t) {
				if (t && t.responseText) {
					var json = Ext.util.JSON.decode(t.responseText);
					if (json && json.success) {
						form.findField('checkDate').setValue(json.message);
					}
				}
			},
			params : {
				date : record.data.endDate
			}
		});*/
		var cDate = record.data.checkDate || new Date();
		if(record.data.endDate){
			form.findField('checkDate').setValue(Math.floor(record.data.endDate.getElapsed(cDate)/1000/3600/24));
		}
		var form4 = form.findField('accomplishment');
			form4.setValue(form4.getStore().data.items.first().data.id);

		form.loadRecord(record);

		var form1 = form.findField('subprj');form1.getStore().load({callback:function(){ form1.setValue(record.data['subprj']);}});
		var form2 = form.findField('imgtype');form2.getStore().load({callback:function(){ form2.setValue(record.data['imgtype']);}});
		var form3 = form.findField('imgsize');form3.getStore().load({callback:function(){ form3.setValue(record.data['imgsize']);}});

		Ext.StoreMgr.map.main_list_store.each(function(rec) {
			if (rec && rec.data && rec.data.id == record.data.prjID) {
				form.findField("prjID").setValue(rec.data.id);
				form.findField("prjType").setValue(rec.data.prjType);
				form.findField("endDate").setValue(rec.data.endDate);
			}
		});
	}


/*}end*/
			}else{
				Ext.Msg.alert('��ʾ',json.message);
			}
		},
		failure : function() {
			Ext.Msg.alert('��ʾ', '����ͨ��ʧ�ܣ������ԣ�');
		},
		timeout : 30000,
		params : {id:record.data.prjID}
	});
}
/*У�����*/
function check4designer(grid,record){
	Ext.Ajax.request({
		url : Tms.URLS.canCheck,
		success : function(response,options) {
			var json = Ext.util.JSON.decode(response.responseText);
			if(json.success){
/*start{{*/

	var formCfg = {
		xtype : 'form',
		frame : true,
		labelWidth : 60,
		items : [ 
			Tms.ui.id,
			Tms.ui.prjID,
			Tms.ui.prjName_display,
			Tms.ui.subImgName,
			{
				xtype : 'radiogroup'
				,id : 'proofed'
				,name : 'proofed'
				,fieldLabel : 'У�Խ��'
				,allowBlank : false
				,isFormField : true
				,labelWidth : 1
				//,columns : 2
				,items : [{
					name : 'proofed', boxLabel : '��ͨ��', labelSeparator : '', inputValue : '0'
				},{
					name : 'proofed', boxLabel : 'ͨ��', labelSeparator : '', inputValue : '1'
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
	if (record) {
		var form = win.findByType('form')[0].form;

		form.loadRecord(record);
		Ext.StoreMgr.map.main_list_store.each(function(rec) {
			if (rec && rec.data && rec.data.id == record.data.prjID) {
				form.findField("prjID").setValue(rec.data.id);
				form.findField("prjName").setValue(rec.data.prjName);
			}
		});
	}

/*}}end*/
			}else{
				Ext.Msg.alert('��ʾ',json.message);
			}
		},
		failure : function() {
			Ext.Msg.alert('��ʾ', '����ͨ��ʧ�ܣ������ԣ�');
		},
		timeout : 30000,
		params : {id:record.data.prjID}
	});
}