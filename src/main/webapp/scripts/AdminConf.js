var BranchGrid = Ext.extend(Ext.grid.GridPanel, { // ��Ext.grid.GridPanel�м̳�
	AddBranch : null, // ����Window���
	constructor : function() {// ������
		this.AddBranch = new AddBranchWindow();// ���� window���
		this.store = new Ext.data.Store({ // ����Դ
			// autoLoad:true,//Ϊ��true���Զ���������
			url : Tms.URLS.departList,// ������������
			reader : new Ext.data.JsonReader({
				root : "data",
				totalProperty : "totalCount"
			}, [ {
				name : "id"
			}, {
				name : "deptName"
			} ])
		});

		BranchGrid.superclass.constructor.call(this, { // �Ը����ʼ��
			title : "������Ϣ",
			renderTo : Ext.getBody(),
			width : 410,
			height : 350,
			store : this.store, // ��������Դ
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : true
			}),
			// ����ѡ��ģʽ��singleSelect��Ϊtrueʱֻ�ܵ�ѡ��Ĭ��Ϊfalse
			columns : [ new Ext.grid.RowNumberer(), {
				header : "���ű��",
				dataIndex : "id",
				align : "center"
			}, {
				header : "��������",
				dataIndex : "brname"
			} ],
			loadMask : {
				msg : "���ݼ�����...."
			},
			tbar : [ {
				text : "���",
				handler : this.showAdd,
				scope : this
			}, "-", {
				text : "�޸�"
			}, "-", {
				text : "ɾ��",
				handler : this.deleteBranch,
				scope : this
			} ],
			bbar : new Ext.PagingToolbar({
				pageSize : 3,
				store : this.store, // ��������Դ
				displayInfo : true,
				displayMsg : "��ǰ {0}-{1} ����¼ /�� {2} ����¼",
				emptyMsg : "����ʾ����"
			})
		});

		this.getStore().load({
			params : {
				start : 0,
				limit : 3
			}
		});

		this.AddBranch.on("OnButtonClick", this.OnButtonClick, this);// ����AddBranchWindow�е�OnButtonClick�¼�
	},
	showAdd : function() {
		this.AddBranch.show();
	},
	OnButtonClick : function(win) { // OnButtonClick�¼�������
		win.addFormPanel.getForm().submit(
				{ // ����AJAX����
					waitMsg : "���ݱ�����...",
					url : "AddBranch.ashx",
					success : function(form, response) { // ��successΪtrueʱִ�еĻص�����
						var temp = Ext.util.JSON.decode(response.response.responseText);
						Ext.Msg.show({
							title : "ϵͳ��ʾ��", 
							msg : temp.msg,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
						if (temp.msg == "���������ظ���") {
							return;
						}
						// var currentPageNum=this.getBottomToolbar().getPageData().activePage;//�õ���ǰ�ǵڼ�ҳ
						// var limitNum=this.getBottomToolbar().getPageData().pages;//�õ���ҳ��
						var start = this.getBottomToolbar().cursor; // �õ���ǰ��¼ָ��
						var limit = this.getBottomToolbar().pageSize; // �õ�ÿҳҪ��ʾ�ļ�¼��
						this.getStore().load({
							params : {
								start : start,
								limit : limit
							}
						});
						win.addFormPanel.getForm().reset();
					},
					scope : this
				});
	},
	deleteBranch : function() {
		var br = this.getSelectionModel().getSelected().data;
		Ext.Ajax.request({
			url : Tms.URLS.deptDelete,
			success : function(response) {
				Ext.Msg.show({
					title : "ϵͳ��ʾ",
					msg : Ext.util.JSON.decode(response.responseText).msg,
					buttons : Ext.Msg.OK,
					icon : Ext.Msg.INFO
				});
				if (this.getStore().getCount() == 1)// �����ǰstore�����ݼ�¼������1��ô�ʹӷ������˼������ݣ������store��ɾ��ѡ����Record
				{
					// var cursor=this.getBottomToolbar().cursor;
					var start = this.getBottomToolbar().cursor - this.getBottomToolbar().pageSize;
					var pageSize = this.getBottomToolbar().pageSize;
					this.getStore().load({
						params : {
							start : start,
							limit : pageSize
						}
					});
					return;
				}
				this.getStore().remove(this.getSelectionModel().getSelected());
				// var cursor=this.getBottomToolbar().cursor;
				// this.getStore().load({params:{start:cursor-1,limit:this.getBottomToolbar().pageSize}});
			},
			scope : this,
			params : {
				branch : Ext.util.JSON.encode(br)
			}
		});
	}
});
/** ****************��ӱ�FormPanel�ؼ�******************************************** */
/*AddBranchFormPanel = Ext.extend(Ext.form.FormPanel, {
	constructor : function() {
		AddBranchFormPanel.superclass.constructor.call(this, {
			defaultType : "textfield",
			baseCls : "x-plain",// Ӧ�������ؼ�������ɫ
			bodyStyle : "padding:5 0 0 5", // ����border��ʽ
			// frame:true,
			labelWidth : 55,
			defaults : {
				anchor : "98%"
			}, // ʹ��ê�㲼������ȱʡ�ؼ����
			items : [ {
				fieldLabel : "��������",
				allowBlank : false, // �ǿ���֤
				blankText : "�������Ʋ���Ϊ�գ�",// Ϊ��ʱ��ʾ����ʾ��Ϣ
				name : "deptName" // name����һ��Ҫ��������˶����Request["brname"]һ�£���Ȼ�������˵ò�������
			} ]
		});
	}
});*/
/** ****************��ӱ�Window�ؼ�********************************************* */
AddBranchWindow = Ext.extend(Ext.Window, {
	constructor : function() {
		//this.addFormPanel = new AddBranchFormPanel();
		AddBranchWindow.superclass.constructor.call(this, {
			title : "��Ӳ�����Ϣ",
			width : 300,
			height : 100,
			//renderTo : Ext.getBody(),
			plain : true,
			closeAction : "hide",// ʹ�ر�ģʽΪ���أ�hide��
			mode : true,
			items : {
				xtype : 'form'
				,width : 300
				,defaultType : 'textfield'
				,baseCls : "x-plain"// Ӧ�������ؼ�������ɫ
				,bodyStyle : "padding:5 0 0 5" // ����border��ʽ
				// ,frame:true,
				,labelWidth : 55
				,defaults : {
					anchor : "98%"
				} // ʹ��ê�㲼������ȱʡ�ؼ����
				,items : [ {
					fieldLabel : "��������",
					allowBlank : false, // �ǿ���֤
					blankText : "�������Ʋ���Ϊ�գ�",// Ϊ��ʱ��ʾ����ʾ��Ϣ
					name : "deptName" // name����һ��Ҫ��������˶����Request["brname"]һ�£���Ȼ�������˵ò�������
				} ]
			}
			,buttons : [ {
				text : "ȷ��",
				handler : this.addBranchRecord,
				scope : this
			}, {
				text : "�ر�",
				handler : this.hide(),
				scope : this
			} ]
		});
		this.addEvents("OnButtonClick");// ����Զ���OnButtonClick�¼���Ϊ�ⲿ����ṩ�ӿ�
	},
	addBranchRecord : function() {
		this.fireEvent("OnButtonClick", this); // �ڵ���ȷ����ťʱ����OnButtonClick�¼�
	}
});