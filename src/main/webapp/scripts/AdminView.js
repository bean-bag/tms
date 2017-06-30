Tms.AdminViewportConfig = {
	layout : 'border',
	items : [ {
				xtype : 'panel',
				id : 'title',
				region : 'north',
				collapsible : false,
				tbar : new Ext.Toolbar([
						{
							xtype : 'tbtext',
							text : new Date().format('Y��m��d�� D')
						},
						'->',
						{
							xtype : 'tms_tbtext'
						},
						'-',
						{
							text : '�˳�ϵͳ',
							handler : function() {
								Ext.Ajax.request({
									url : Tms.URLS.logoutSys,
									success : function(response, action) {
										Tms.user = null;
										// ������¼����
										try {
											self.location = eval('('
													+ response.responseText
													+ ')').message;
										} catch (e) {
											self.location.href = 'admin.html';
										}
									},
									failure : function(response, action) {
										Tms.user = null;
										// ���漶������¼����
										self.location.href = 'admin.html';
									},
									timeout : 30000
								});
							}
						}, '-' ])
			}, {
				id : 'menu_panel',
				region : 'west',
				split : true,
				width : 175,
				minSize : 175,
				maxSize : 400,
				collapsible : true,
				margins : '0 0 0 5',// չ��ʱ
				cmargins : '0 5 0 5',// �����
				lines : false,
				autoScroll : true,
				title : '�˵����',
				xtype : 'menupanel',
				menu : {
					plain : true,
					items : [ {
						text : '������Ϣ',
						handler : function() {
							var container = Tms.viewport.findById('workPanel');
							container.removeAll(true);
							container.add({xtype : 'tms_dept'});
							container.doLayout();
						}
					}, {
						text : '��Ա��Ϣ',
						handler : function() {
							var container = Tms.viewport.findById('workPanel');
							container.removeAll(true);
							container.add({xtype : 'tms_person'});
							container.doLayout();
						}
					}, {
						text : '��λ��Ϣ',
						handler : function() {
							var container = Tms.viewport.findById('workPanel');
							container.removeAll(true);
							container.add({xtype : 'tms_role'});
							container.doLayout();
						}
					}, {
						text : '��������',
						handler : function() {
							var container = Tms.viewport.findById('workPanel');
							container.removeAll(true);
							container.add({xtype : 'tms_subprj'});
							container.doLayout();				
						}
					}, {
						text : 'ͼ�����',
						handler : function() {
							var container = Tms.viewport.findById('workPanel');
							container.removeAll(true);
							container.add({xtype : 'tms_imgtype'});
							container.doLayout();				
						}
					}, {
						text : 'ͼ������',
						handler : function() {
							var container = Tms.viewport.findById('workPanel');
							container.removeAll(true);
							container.add({xtype : 'tms_imgsize'});
							container.doLayout();				
						}
					/*}, {
						text : '����3',
						menu : {
		                    items: [
		                            // stick any markup in a menu
		                            '<b class="menu-title">Choose a Theme</b>',
		                            {
		                                text: 'Aero Glass',
		                                checked: true,
		                                group: 'theme'
		                            }, {
		                                text: 'Vista Black',
		                                checked: false,
		                                group: 'theme'
		                            }, {
		                                text: 'Gray Theme',
		                                checked: false,
		                                group: 'theme'
		                            }, {
		                                text: 'Default Theme',
		                                checked: false,
		                                group: 'theme'
		                            }
		                        ]							
						}*/
					} ]
				}
			}, {
				id : 'workPanel'
				, region : 'center'
				, xtype : 'panel'
				, title : 'ά�����'
				, collapsible : false
				, frame : false
				, layout : 'fit'
				//, items : { xtype : 'panel' }
			} ]
};
// -------------------------------------------------------------
Ext.onReady(function() {

	Ext.QuickTips.init();

	var loginWin = {};
	loginWin = new Ext.Window(
			{
				title : '��ӭ��¼�������ϵͳ'
				,width : 320
				,closable : false
				,mode : true
				
				,items : {
					xtype : 'form'
					,id : 'loginForm'
					,baseCls : "x-plain"// Ӧ�������ؼ�������ɫ
					//,bodyStyle : "padding:5 0 0 5" // ����border��ʽ
					,defaultType : 'textfield'
					,labelAlign : 'right'
					,labelWidth : 120
					,labelPad : 2
					,monitorValid : true
					//,frame : true
					,defaults : {
						allowBlank : false
						//,anchor : "98%"// ʹ��ê�㲼������ȱʡ�ؼ����
					}
					,waitTitle : '���ڵ�¼...'
					,items : [
							{
								name : 'username',
								fieldLabel : '�û���',
								blankText : '�û�������Ϊ��'
							},
							{
								name : 'password',
								fieldLabel : '�� &nbsp;��',
								blankText : '���벻��Ϊ��',
								inputType : 'password'
							},
							{
								xtype : 'verifycodefield',
								name : 'verifyCode',
								id : 'verifyCode',
								fieldLabel : '��֤��',
								width : 58,
								blankText : '��֤�벻��Ϊ��',
								vcTip : '���ͼƬ������֤��',
								vcUrl : Tms.URLS.verifyCode,
								vcWidth : '68px',
								vcHeight : '20px',								
								vcStyle : 'border:1px solid #B5B8C8;border-left-width:0px'
							} ]
				},
				buttons : [ {
					text : '��¼',
					id : 'submitBtn',
					formBind : true,
					handler : function() {
						var myform = Ext.getCmp('loginForm').getForm();
						if (myform.isValid()) {
							myform.submit({
								waitMsg : '���ڵ�¼...',
								url : Tms.URLS.loginSys,
								timeout : 3000,
								success : function(form, action) {
									Tms.user = action.result.data;
									loginWin.close();// �رյ�¼����
									loginWin = null;
									delete loginWin;

									Tms.viewport = new Ext.Viewport(Tms.AdminViewportConfig);
								},
								failure : function(form, action) {
									form.reset();

									Ext.getCmp('verifyCode').refresh();

									if (action.failureType == Ext.form.Action.SERVER_INVALID) {
										Ext.MessageBox.alert('����', action.result.message);
									}
								}
							});
						}
					}
				} ],
				keys: [{
					key: [Ext.EventObject.ENTER], 
					handler: function() {					
						Ext.getCmp('submitBtn').handler();
					}
				}]

			});

	loginWin.show();

	loginWin.header.setStyle({
		'font-size' : '14px',
		'padding-top' : '20px',
		'padding-left' : '15px',
		'padding-bottom' : '20px'
	});
});
// -------------------------------------------------------------
