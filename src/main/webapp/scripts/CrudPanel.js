/*
 *CRUD������,�̳���EXT��Panel
 */
Tms.CrudPanel = Ext.extend(Ext.Panel,{
	gridPanel : null,
	gridViewConfig : {},
	toolbar : {},
	cm : new Ext.grid.CheckboxSelectionModel(),
	sm : new Ext.grid.RowSelectionModel({singleSelect : true}),// -��ѡ��ģʽ
	store : null,
	storeMapping : null,
	pageSize : 20,
	addtooltip : "",
	modifytooltip : "",
	deletetooltip : "",
	refreshtooltip : "",
	addtitle : "���",
	modifytitle : "�޸�",
	//render_div : null,

	dbclickEdit : false,

	// ������
	constructor : function(config) {

		if (this.store == null) {
			this.store = new Ext.data.JsonStore({
				url : this.listUrl,
				root : "data",
				//totalProperty : "total",
				remoteSort : true,
				fields : this.storeMapping
			});
		}

		this.cm.defaultSortable = true;

		var viewConfig = Ext.apply({
			forceFit : true,
			emptyText : '�Բ���,û������������Ҫ������,������������Χ!'
		}, this.gridViewConfig);

		var originaltoolbar = [ {
				id : 'addButton',
				text : '���',
				iconCls : 'add',
				tooltip : this.addtooltip,
				handler : this.doCreate,
				scope : this
			}, '-', {
				id : 'editButton',
				text : '�༭',
				iconCls : 'modify',
				tooltip : this.modifytooltip,
				handler : this.doEdit,
				scope : this
			}, '-', {
				text : 'ɾ��',
				iconCls : 'delete',
				tooltip : this.deletetooltip,
				handler : this.doDelete,
				scope : this
			}, '-', {
				text : 'ˢ��',
				iconCls : 'refresh',
				tooltip : this.refreshtooltip,
				handler : this.refreshGrid,
				scope : this
			} ];
		
		/*if (!this.nodblclick) {
			this.listeners = {
				'celldblclick' : {// ˫��ʱִ���޸�
					fn : this.doEdit,
					scope : this
				},
				'contextmenu' : function(e) {
					e.stopEvent();
				}
			};
		} else {*/
		this.listeners = {'contextmenu' : function(e) {e.stopEvent();}};
		if(this.dbclickEdit){
			this.listeners.celldblclick = {fn : this.doEdit()};
		}
		//}
		this.gridPanel = new Ext.grid.GridPanel({
			//id : Ext.id(),
			store : this.store,
			cm : this.cm,
			sm : this.sm,
			trackMouseOver : true,
			stripeRows : true,
			loadMask : true,
			autoHeight : true,
			// �������ȴ��Զ�������
			autoScroll : true,
			border : false,
			collapsible : true,
			animCollapse : false,
			enableColumnMove : false,
			viewConfig : viewConfig,
			listeners : this.listeners,
			tbar : [ originaltoolbar, this.toolbar ],
			// ��ҳ
			bbar : new Ext.PagingToolbar({
				pageSize : this.pageSize,
				store : this.store,
				displayInfo : true,
				displayMsg : '��ʾ�� {0} ���� {1} ����¼��һ�� {2} ��',
				emptyMsg : "û�м�¼"
			})
		});

		if (this.view) {
			Ext.apply(this.gridPanel, {
				view : this.view
			});
		}

		this.store.load({
			params : {
				start : 0,
				limit : 20
			}
		});

		var configs = Ext.apply({
			closable : true,
			autoScroll : true,
			border : false,
			layout : "fit",
			//renderTo : this.render_div,
			items : [ this.gridPanel ],
			/**
			 * ��Ⱦ����
			 */
			// ����
			linkRenderer : function(v) {
				if (!v)
					return "";
				else
					return String.format("<a href='{0}' target='_blank'>{0}</a>",v);
			},
			// ʱ��
			dateRender : function(format) {
				format = format || "Y-m-d h:i";
				return Ext.util.Format.dateRenderer(format);
			}
		}, config);

		// ���ø���Ĺ�����
		Tms.CrudPanel.superclass.constructor.call(this, configs);
	},

	/**
	 * �¼�
	 */

	// ˢ��
	refreshGrid : function() {
		this.store.removeAll();
		this.store.reload();
	},
	// ��ʼ�����ڣ������������޸�ʱ��,�̳к���createWin�е��ø÷�����ʾ����
	initWin : function(width, height, status) {
		var win = new Ext.Window({
			title : status,
			width : width,
			height : height,
			modal : true,
			shadow : true,
			iconCls : status,
			// ����������ı��С
			resizable : false,
			// �Ƿ�����϶�
			draggable : false,
			defaultType : "textfield",
			labelWidth : 100,
			collapsible : true, // ����������
			closeAction : 'hide',
			closable : false,
			plain : true,
			// ����ģ̬����
			modal : 'true',
			buttonAlign : "center",
			bodyStyle : "padding:10px 0 0 15px",

			items : [ this.fp ],
			buttons : [ {
				text : "����",
				handler : this.onSave,
				scope : this
			}, {
				text : "�ر�",
				handler : this.closeWin,
				scope : this
			} ]
		});
		return win;
	},

	// ��ʾ������/�޸ģ�����
	buildWin : function() { // createForm()��Ҫ�ڼ̳�ʱ�ṩ���÷��������Ǵ�����
		if (!this.win) {
			if (!this.fp) {
				this.fp = this.createForm(status);
			}
			this.win = this.createWin();
			if (status == 'add') {
				this.win.setTitle(this.addtitle);
				this.win.setIconClass('grid-win-addicon');
			} else {
				this.win.setTitle(this.modifytitle);
				this.win.setIconClass('grid-win-modifyicon');
			}
		}
		return this.win;
		// ���ڹر�ʱ���������¼���
		//this.win.show();
	},
	// ����������/�޸ģ�����
	doCreate : function() {
		this.buildWin().show();
		this.win.setTitle(this.addtitle);
		this.win.setIconClass('grid-win-addicon');
		this.fp.form.reset();
	},

	// ���ݱ���[������/�޸ģ�����]
	onSave : function() {
		//var id = this.fp.form.findField("id").getValue();
		if (this.fp.form.isValid()) {
			this.fp.form.submit({
				waitMsg : '���ڱ��档����',
				url : this.saveUrl,
				method : 'POST',
				success : function() {
					this.closeWin();
					this.refreshGrid();
				},
				failure : function(form, action) {
					Ext.Msg.show({
						title : "������Ϣ",
						msg : "�����ظ�",
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
				},
				scope : this
			});
		}
	},
	closeWin : function() {
		if (this.win)
			this.win.close();
		this.win = null;
		this.fp = null;
	},
	// �޸ģ�˫���У���ѡ��һ�е���޸ģ�
	doEdit : function() {
		if (this.gridPanel.selModel.hasSelection()) {
			var records = this.gridPanel.selModel.getSelections();// �õ���ѡ����е�����
			var recordsLen = records.length;// �õ�������ĳ���
			if (recordsLen > 1) {
				Ext.Msg.alert("ϵͳ��ʾ��Ϣ", "��ѡ������һ����б༭��");
			}// һ��ֻ���༭һ��
			else {
				var record = this.gridPanel.getSelectionModel().getSelected();// ��ȡѡ��ļ�¼��
				var id = record.get("id");
				if (id != '') {
					this.buildWin().show();
					this.fp.form.loadRecord(record); // ������fp.form����������
				}
			}
		} else {
			Ext.Msg.alert("��ʾ", "����ѡ��Ҫ�༭����!");
		}
	},
	// ɾ��,deleteIdsΪ����ֵ
	doDelete : function() {
		var store = this.store;
		var deleteUrl = this.deleteUrl;
		if (this.gridPanel.selModel.hasSelection()) {
			var records = this.gridPanel.selModel.getSelections();// �õ���ѡ����е�����
			var recordsLen = records.length;// �õ�������ĳ���
			var deleteIds = [];
			for ( var i = 0; i < recordsLen; i++) {
				var id = records[i].get('id');
				if (Ext.isEmpty(id))
					continue;
				deleteIds.push(id);
			}

			Ext.MessageBox.confirm(
				'ϵͳ��ʾ��Ϣ',
				'ȷ��Ҫɾ����ѡ�ļ�¼��?',
				function(btn) {
					if (btn == 'yes') {
						var myCon = new Ext.data.Connection();
						Ext.MessageBox.wait('����ɾ��������, ���Ժ򡭡�'); // ����һ���ȴ���
						myCon.request({
							url : deleteUrl,
							method : "POST",
							params : {
								'deleteIds' : deleteIds
							},
							callback : function(options, success, response) {
								Ext.MessageBox.hide();
								successmsg = Ext.util.JSON.decode(response.responseText).success;
								if (successmsg) {
									Ext.Msg.alert("��ʾ��Ϣ","�ɹ�ɾ������!",function() {store.reload();},this);
								} else {
									num = Ext.util.JSON.decode(response.responseText).num;
									Ext.MessageBox.alert("ϵͳ��ʾ��Ϣ","����ɾ������,��Ϊ��<font color=red>" + num + "</font>�ֲ�Ʒ������ϵ!<br>��Ҫɾ��,����ɾ��������ϵ�Ĳ�Ʒ.");
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

Ext.reg('crudpanel', Tms.CrudPanel);