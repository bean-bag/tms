	Ext.Direct.on({ 
		refresh : function(response) {
			//debugger;
			if(response.success&&(Ext.isArray(response.data)&&response.data.length>0)){
				var chatlog = Ext.getCmp('chatlog');

				new Ext.XTemplate(
					'<tpl for=".">',
					'<font color="{[xindex % 2 === 0 ? "green" : "red"]}" id="{id:this.parseId}"><p>{userName}: {date} </p></font>',
					'<p style="padding:1 1 10 5">{message:this.parseMsg}</p>',
					'</tpl></p>',
					{
						compiled : true,
						parseId : function(id){
							return Ext.Direct.getProvider('pollMessageList').baseParams.mxno = id;
						},
						parseDate : function(date) {
							return Ext.util.Format.date(date, 'Y-m-d H:i:s');
						},
						parseMsg : function(msg) {
							//��ʱ��Ϣ
							return msg;
							//return Ext.util.Format.nl2br(Ext.util.Format.htmlEncode(msg));
						}
				}).append(chatlog.body, response.data);

				chatlog.body.scroll('b', 100000, true);//����Ƶ����ֵײ�
			}
		}
	});

/**
 * ��ʾ��Ϣ����
 * 
 * @param grid, record
 */
function showChatWindow(grid, record) {

	var myPageSize = 20;


	var store = new Ext.data.Store({
		url : Tms.URLS.messageHisList,
		reader : new Ext.data.JsonReader({
			totalProperty : 'total',
			root : 'data'
		}, [ 'id', 'userName', 'message', 'date']),
		baseParams : {
			groupID : record.json.id
		},
		listeners : {
			'load' : function(sd, records, options) {
				new Ext.XTemplate(
					'<tpl for=".">',
					'<font color="{[xindex % 2 === 0 ? "green" : "red"]}"><p>{data:this.parseSender()}: {data:this.parseDate} </p></font>',
					'<p style="padding:1 1 10 5">{data:this.parseMsg}</p>',
					'</tpl></p>'
						, {
						compiled : true,
						parseSender : function(json) {
							return json.userName;
						},
						parseDate : function(json) {
							return json.date;//Ext.util.Format.date(json.date, 'Y-m-d H:i:s');
						},
						parseMsg : function(json) {
							//��ʷ��Ϣ
							return json.message;
							//return Ext.util.Format.nl2br(Ext.util.Format.htmlEncode(json.message));
						}
				}).overwrite(Ext.fly('history'), records);
			},
			'beforeload' : function(sd, options) {
				sd.setBaseParam('page.start', 0);
				sd.setBaseParam('page.limit', myPageSize);
				sd.setBaseParam('date', Ext.getCmp('chatDate').value);
			}
		}
	});

	var page = new Ext.PagingToolbar({
		store : store,
		displayInfo : true,
		pageSize : myPageSize,
        displayInfo:true,   //Ϊtrueʱ����Ĳ���ʾ
        displayMsg:'��{0}������{1}����Ϣ,��{2}��',
        emptyMsg:'û����Ϣ',
        //beforePageText: "��",
		//afterPageText: "ҳ,��{0}ҳ",
        beforePageText: "",
		afterPageText: "",
		paramNames : {
			start : 'page.start',
			limit : 'page.limit'
		}
	});
	page.insert(0, '-');
	page.insert(0, {
		xtype : 'datefield',
		id : 'chatDate',
		format : 'Y-m-d',
		//value : new Date(),
		listeners : {
			'select' : function(el,value) {
				store.setBaseParam('page.start', 0);
				store.setBaseParam('page.limit', myPageSize);
				store.setBaseParam('date', value.format('Y-m-d'));

				store.load();
			}
		}
	});
	var pollA = new Ext.direct.PollingProvider({
		id : 'pollMessageList' 
		,type :'polling'
		,interval : 5000
		,url : Tms.URLS.messageList
		,baseParams : {
			groupID : record.json.id
		} 
	});
	pollA.on('data',function(provider,event){
		//alert(event);
	});
	Ext.Direct.addProvider(pollA);

	/*/������ѯ����-start
	Ext.Direct.addProvider({ 
		id : 'pollMessageList' 
		,type :'polling'
		,interval : 5000
		,url : Tms.URLS.messageList
		,baseParams : {
			groupID : record.json.id
		} 
	}); //��Ӧ������ѯ���ص����� */
	  
	//������ѯ���� -end
	var win = new Ext.Window({
		id : 'chatwin',
		title : record.json.prjName,
		layout : 'fit',
		closeAction : 'close',
		width : 500,
		height : 400,
		resizable : false,
		//minimizable : true,
		items : [ {
			border : false,
			xtype : 'tabpanel',
			activeTab : 0,
			listeners:{
				'tabchange':function(tabPanel, tab){
					var provider = Ext.Direct.getProvider('pollMessageList');
					if(tab.id == 'msgPanel'){
						if(!provider.isConnected())
							provider.connect();
					}else{
						provider.disconnect();
						try{
							page.doRefresh();
						}catch(e){}
					}
				}
			},
			items : [ {
				id : 'msgPanel',
				title : '��ʱ��Ϣ',
				layout : 'border',
				iconCls : 'icon-chat-comments',
				items : [ {
					region : 'center',
					layout : 'border',
					margins : '-1 -1 0 -1',
					items : [ {
						region : 'center',
						margins : '-1 0 -2 -2',
						layout : 'fit',
						items : [ {
							xtype : 'panel',
							id : 'chatlog',
							autoScroll : true,
							border : false,
							style : 'padding:5px'
						} ]
					}, {
						region : 'east',
						title : '������Ա',
						collapsible : true,
						split : true,
						margins : '-1 -1 -1 0',
						tools : [ {
							id : 'refresh',
							handler : function(event, toolEl, panel) {
								panel.items.itemAt(0).getRootNode().reload();
							}
						} ],
						minWidth : 150,
						maxWidth : 200,
						width : 150,
						items : {
							xtype : 'treepanel',
							border : false,
							dataUrl : Tms.URLS.userOnline,
							rootVisible : false,
							root : {
								nodeType : 'async',
								id : 'online'
							}
						}
					} ]
				}, {
					region : 'south',
					layout : 'border',
					border : false,
					split : true,
					minHeight : 50,
					maxHeight : 150,
					height : 70,
					items : [ {
						xtype : 'form'
						,id : 'chatForm'
						,region : 'center'
						,baseCls : "x-plain"// Ӧ�������ؼ�������ɫ
						//,bodyStyle : "padding:5 0 0 5" // ����border��ʽ
						,labelWidth:1
						,monitorValid : true
						,items : [{
							name : 'groupID'
							,xtype:"hidden"
							,hidden:true
							,hiddenLabel:true
							,value : record.json.id
						},{
							xtype : 'textarea',
							margins : Ext.isIE ? '1 0 4 4' : '0 0 4 4',
							id : 'msg',
							name : 'message',
							fieldLabel : '',
							labelSeparator:'',
							anchor : '99%',
							listeners : {
								'render' : function(input) {
									new Ext.KeyMap(input.getEl(), [ {
										key : 13,
										ctrl : true,
										fn : function() {
											sendMessage(this);
										},
										scope : this
									} ]);
								}
							}
						}]
					}, {
						xtype : 'button',
						region : 'east',
						width : 70,
						margins : '0 4 4 4',
						text : '����',
						tooltip : 'CTRL + ENTER',
						handler : function() {
							sendMessage(this);
						}
					} ]
				} ]
			}, {
				title : '��ʷ��Ϣ',
				iconCls : 'icon-chat-record',
				autoScroll : true,
				items : [ {
					xtype : 'displayfield',
					id : 'history',
					style : 'padding:5px;overflow-x:hidden'
				} ],
				bbar : page
			} ]
		} ],
		onEsc : function() {
			Ext.Direct.getProvider('pollMessageList').disconnect();
			this.close();
		},
		listeners : {
			'minimize' : function() {
				Ext.Direct.getProvider('pollMessageList').disconnect();
				this.close();
			},
			'close' : function() {
				Ext.Direct.getProvider('pollMessageList').disconnect();
				//this.close();
			}
		}
	});

	win.show();
}

// ����������Ϣ
function sendMessage(cmp) {
	//var el = cmp.ownerCt.el;
	//el.mask('Sending...', 'x-mask-loading');
	var myform = Ext.getCmp('chatForm').getForm();
	if (myform.isValid()) {
		myform.submit({
			waitMsg : '������Ϣ...',
			url : Tms.URLS.messageSubmit,
			timeout : 3000,
			success : function(form, action) {
				//el.unmask();
				form.reset();
				form.findField('message').focus();
			},
			failure : function(form, action) {
				form.reset();
			}			
		});
	}
	var textarea = cmp.ownerCt.items.first();	
	textarea.focus();
};
