Tms.role = Ext.extend(Ext.grid.GridPanel,{
	id: 'role_grid',
	store : {
		xtype : 'jsonstore',
		autoLoad : true,
		url : Tms.URLS.roleList,
		root : 'data',
		fields : [ {
			name : 'id'
		}, {
			name : 'roleName'
		}, {
			name : 'profile'
		} ]
	},
	columns : [{
		header : "��λ���",
		menuDisabled : true,
		//width : 100,
		align : "center",
		dataIndex : "id"
	}, {
		header : "��λ����",
		menuDisabled : true,
		//width : 200,
		align : "center",
		dataIndex : 'roleName'
	}, {
		header : "��λ����",
		menuDisabled : true,
		width : 200,
		align : "center",
		dataIndex : 'profile'	
	}, ],
	loadMask : {
		msg : "���ݼ�����...."
	},

	formConfig : {
		xtype : 'form',
		baseCls : "x-plain",
		bodyStyle : "padding:5 0 0 5",
		frame:true,

		labelWidth : 60,
		defaultType : 'textfield',
		items : [ {
			xtype : "hidden",
			name : "id",
			hidden : true,
			hiddenLabel : true
		}, {
			fieldLabel : "��λ����",
			allowBlank : false,
			blankText : "��λ���Ʋ���Ϊ�գ�",
			name : "roleName"
		}, {
			xtype : 'textarea',
			width : 200,
			fieldLabel : "��λ����",
			allowBlank : true,
			//blankText : "��λ��������Ϊ�գ�",
			name : "profile"		
		} ]
	},
	constructor : function(config) {
		Ext.apply(this, config);
		config = Ext.apply({
			tbar : [ {
			/*	text : "���",
				handler : this.addItem,
				scope : this
			}, {*/
				text : "�޸�",
				handler : this.uptItem,
				scope : this
			/*}, {
				text : "ɾ��",
				handler : this.delItem,
				scope : this*/
			} ]
		});
		Tms.formWindow.superclass.constructor.call(this, config);
	},
	onSuccess : function(form, resp){
		this.store.reload();
	},
	doSave : function(ct, form) {
		var myForm = form.getForm();
		if (myForm.isValid()) {
			myForm.submit({
				waitMsg : "���ݱ�����...",
				url : Tms.URLS.roleSubmit,
				timeout : 300,
				method : 'POST',
				params : myForm.getValues(),//bjw ����form����ʱ�����⣬�˴���ֱ�ӻ�ȡformֵ
				success : function(form, resp) {
					Ext.getCmp('role_grid').store.reload();
				},
				failure : function(form, resp) {
					var temp = Ext.util.JSON.decode(resp.response.responseText);
					Ext.Msg.alert("ϵͳ��ʾ��",temp.message);
				}
			});
		}
		ct.close();
	},
	/*addItem : function() {
		var win = Ext.create({
			xtype : 'form-window',
			searchForm : true,
			title : '��Ӹ�λ',
			items : this.formConfig || {}
		});
		win.on('clickOkButton', this.doSave);
		win.show();
	},*/
	uptItem : function() {
		if (this.selModel.hasSelection()) {
			var records = this.selModel.getSelections();// �õ���ѡ����е�����
			var recordsLen = records.length;// �õ�������ĳ���
			if (recordsLen > 1) {
				Ext.Msg.alert("ϵͳ��ʾ��Ϣ", "��ѡ������һ����б༭��");
			} else {
				var record = this.getSelectionModel().getSelected();// ��ȡѡ��ļ�¼��
				var id = record.get("id");
				if (id != '') {
					var win = Ext.create({
						xtype : 'form-window',
						searchForm : true,
						title : 'ά����λ��Ϣ',
						items : this.formConfig || {}
					});
					win.on('clickOkButton', this.doSave);
					win.formLoadRecord(record);
					win.show();
				}
			}
		} else {
			Ext.Msg.alert("��ʾ", "����ѡ��Ҫ�༭����Ϣ!");
		}
	},
	/*delItem : function() {

		if (this.selModel.hasSelection()) {

			Ext.MessageBox.confirm(
				'ϵͳ��ʾ��Ϣ',
				'ȷ��Ҫɾ����ѡ�ļ�¼��?',
				function(btn) {
					if (btn == 'yes') {
						var myCon = new Ext.data.Connection();
						Ext.MessageBox.wait('����ɾ��������, ���Ժ򡭡�');
						myCon.request({
							url : Tms.URLS.roleDelete,
							method : "POST",
							params : {
								'id' : this.selModel.getSelected().data.id
							},
							scope : this,
							callback : function(options, success, response) {
								Ext.MessageBox.hide();
								if (success) {
									if (this.getStore().getCount() == 1) {
										var start = this.getBottomToolbar().cursor - this.getBottomToolbar().pageSize;
										var pageSize = this.getBottomToolbar().pageSize;
										this.getStore().load({
											params : {
												start : start,
												limit : pageSize
											}
										});
									} else {
										this.getStore().remove(this.getSelectionModel().getSelected());
									}
								} else {
									var resp = Ext.util.JSON.decode(response.responseText);
									if (resp.message) {
										Ext.Msg.alert("ϵͳ��ʾ",resp.message);
									} else {
										Ext.Msg.alert("ϵͳ��ʾ",'ɾ��ʧ��');
									}
								}
							}
						}, this);
					}
				}, this);
		} else {
			Ext.Msg.alert("��ʾ", "����ѡ��Ҫɾ������!");
		}
	}*/
});
Ext.reg('tms_role', Tms.role);
