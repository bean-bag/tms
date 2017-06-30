Tms.person = Ext.extend(Ext.grid.GridPanel,{
	id: 'person_grid',
	store : {
		xtype : 'jsonstore',
		autoLoad : true,
		url : Tms.URLS.personList,
		root : 'data',
		fields : [ {
			name : 'id'
		}, {
			name : 'userName'
		}, {
			name : 'userCode'
		}, {
			name : 'password'
		}, {
			name : 'depart'
		}, {
			name : 'teamLeader'
		}, {
			name : 'role'
		} ]
	},
	columns : [{
		header : "��Ա���",
		menuDisabled : true,
		//width : 100,
		align : "center",
		dataIndex : "id"
	}, {
		header : "��Ա����",
		menuDisabled : true,
		//width : 200,
		align : "center",
		dataIndex : 'userName'
	}, {
		header : "��¼�˺�",
		menuDisabled : true,
		//width : 200,
		align : "center",
		dataIndex : 'userCode'
	}, {
		header : "��¼����",
		menuDisabled : true,
		//width : 200,
		align : "center",
		dataIndex : 'password'
	}, {
		header : "��������",
		menuDisabled : true,
		//width : 300,
		align : "center",
		dataIndex : 'depart',
		renderer : function(v){
			return (v&&v.deptName)?v.deptName:v;
		}
	}, {
		header : "��������",
		menuDisabled : true,
		//width : 300,
		align : "center",
		dataIndex : 'teamLeader',
		renderer : function(v){
			return v == '1'?'��':'��';
		}
	}, {
		header : "��λ��ɫ",
		menuDisabled : true,
		//width : 300,
		align : "center",
		dataIndex : 'role',
		renderer : function(v){
			return (v&&v.roleName)? v.roleName:v;
		}
	}, ],
	loadMask : {
		msg : "���ݼ�����...."
	},

	formConfig : {
		xtype : 'form',
		baseCls : "x-plain",
		bodyStyle : "padding:5 0 0 5",
		frame:true,

		labelWidth : 80,
		defaultType : 'textfield',
		items : [ {
			xtype : "hidden",
			name : "id",
			hidden : true,
			hiddenLabel : true
		}, {
			fieldLabel : "��Ա����",
			allowBlank : false,
			blankText : "��Ա���Ʋ���Ϊ�գ�",
			name : "userName"
		}, {
			fieldLabel : "��¼�˺�",
			allowBlank : false,
			blankText : "��Ա���Ʋ���Ϊ�գ�",
			name : "userCode"
		}, {
			fieldLabel : "��¼����",
			allowBlank : false,
			blankText : "��Ա���Ʋ���Ϊ�գ�",
			name : "password"
		}, {
			xtype : 'combo'
			,id : 'detpID_combo'
			,hiddenName : 'deptID'
			,fieldLabel : '��������'
			,emptyText : '��ѡ���������� ...'
			,forceSelection : true
			,listWidth : 100
			,valueField : 'id'
			,displayField : 'deptName'
			,editable: false
			//,readOnly:true
			,typeAhead : true
			,triggerAction : 'all'
			,selectOnFocus : true
			,allowBlank : true
			,mode : 'remote'//Զ��
			,store : {
				xtype : 'store'
				,url : Tms.URLS.departList
				,reader : new Ext.data.JsonReader({
					root : 'data'
					,fields : [{name : 'id'},{name: 'deptName'}]
				})			
			}
		}, {			
			xtype : 'radiogroup'
			,id : 'prjType'
			,fieldLabel : '��������'
			//,fieldRequired : true
			,allowBlank : false
			,isFormField : true
			,labelWidth : 1
			,columns : 2
			,items : [{
				name : 'teamLeader', boxLabel : '��', labelSeparator : '', inputValue : '0',checked : true
			},{
				name : 'teamLeader', boxLabel : '��', labelSeparator : '', inputValue : '1'
			}]	
		}, {
			xtype : 'combo'
			,id : 'role_combo'
			,hiddenName : 'role'
			,fieldLabel : '��λ��ɫ'
			,emptyText : '��ѡ���λ��ɫ ...'
			,forceSelection : true
			,listWidth : 100
			,valueField : 'id'
			,displayField : 'roleName'
			,editable: false
			//,readOnly:true
			,typeAhead : true
			,typeAheadDelay:3000
			,triggerAction : 'all'
			,selectOnFocus : true
			,allowBlank : true
			,mode : 'remote'//Զ��
			,store : {
				xtype : 'store'
				,url : Tms.URLS.roleList
				,reader : new Ext.data.JsonReader({
					root : 'data'
					,fields : [{name : 'id'},{name: 'roleName'}]
				})
			}
		/*}, {
			fieldLabel : "��λ��ɫ",
			allowBlank : false,
			blankText : "��Ա���Ʋ���Ϊ�գ�",
			name : "role"*/
		} ]
	},
	constructor : function(config) {
		Ext.apply(this, config);
		config = Ext.apply({
			tbar : [ {
				text : "���",
				handler : this.addItem,
				scope : this
			}, {
				text : "�޸�",
				handler : this.uptItem,
				scope : this
			}, {
				text : "ɾ��",
				handler : this.delItem,
				scope : this
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
				url : Tms.URLS.personSubmit,
				timeout : 300,
				method : 'POST',
				params : myForm.getValues(),//bjw ����form����ʱ�����⣬�˴���ֱ�ӻ�ȡformֵ
				success : function(form, resp) {
					Ext.getCmp('person_grid').store.reload();
				},
				failure : function(form, resp) {
					var temp = Ext.util.JSON.decode(resp.response.responseText);
					Ext.Msg.alert("ϵͳ��ʾ��",temp.message);
				}
			});
		}
		ct.close();
	},
	addItem : function() {
		var win = Ext.create({
			xtype : 'form-window',
			searchForm : true,
			title : '�����Ա',
			items : this.formConfig || {}
		});
		win.on('clickOkButton', this.doSave);
		win.show();
	},
	uptItem : function() {
		if (this.selModel.hasSelection()) {
			var records = this.selModel.getSelections();// �õ���ѡ����е�����
			var recordsLen = records.length;// �õ�������ĳ���
			if (recordsLen > 1) {
				Ext.Msg.alert("ϵͳ��ʾ��Ϣ", "��ѡ������һ����б༭��");
			} else {
				var record = this.getSelectionModel().getSelected();// ��ȡѡ��ļ�¼��
				var id = record.get("id");
				if(id == 0){
					Ext.Msg.alert('��ʾ','�����޸ĳ�������Ա��');
				}else if (id != '') {
					var win = Ext.create({
						xtype : 'form-window',
						searchForm : true,
						title : 'ά����Ա��Ϣ',
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
	delItem : function() {

		if (this.selModel.hasSelection()) {
			if(this.selModel.getSelected().data.id == 0){
				Ext.Msg.alert('��ʾ','����ɾ����������Ա��');
			}else
			Ext.MessageBox.confirm(
				'ϵͳ��ʾ��Ϣ',
				'ȷ��Ҫɾ����ѡ�ļ�¼��?',
				function(btn) {
					if (btn == 'yes') {
						var myCon = new Ext.data.Connection();
						Ext.MessageBox.wait('����ɾ��������, ���Ժ򡭡�');
						myCon.request({
							url : Tms.URLS.personDelete,
							method : "POST",
							params : {
								'id' : this.selModel.getSelected().data.id
							},
							scope : this,
							callback : function(options, success, response) {
								Ext.MessageBox.hide();
								if (success) {
									if (this.getStore().getCount() == 1) {
										var start = 0;//this.getBottomToolbar().cursor - this.getBottomToolbar().pageSize;
										var pageSize = 99;//this.getBottomToolbar().pageSize;
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
	}
});
Ext.reg('tms_person', Tms.person);
