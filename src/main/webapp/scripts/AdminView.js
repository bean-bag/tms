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
							text : new Date().format('Y年m月d日 D')
						},
						'->',
						{
							xtype : 'tms_tbtext'
						},
						'-',
						{
							text : '退出系统',
							handler : function() {
								Ext.Ajax.request({
									url : Tms.URLS.logoutSys,
									success : function(response, action) {
										Tms.user = null;
										// 跳到登录界面
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
										// 界面级跳到登录界面
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
				margins : '0 0 0 5',// 展开时
				cmargins : '0 5 0 5',// 收起后
				lines : false,
				autoScroll : true,
				title : '菜单面板',
				xtype : 'menupanel',
				menu : {
					plain : true,
					items : [ {
						text : '部门信息',
						handler : function() {
							var container = Tms.viewport.findById('workPanel');
							container.removeAll(true);
							container.add({xtype : 'tms_dept'});
							container.doLayout();
						}
					}, {
						text : '人员信息',
						handler : function() {
							var container = Tms.viewport.findById('workPanel');
							container.removeAll(true);
							container.add({xtype : 'tms_person'});
							container.doLayout();
						}
					}, {
						text : '岗位信息',
						handler : function() {
							var container = Tms.viewport.findById('workPanel');
							container.removeAll(true);
							container.add({xtype : 'tms_role'});
							container.doLayout();
						}
					}, {
						text : '子项名称',
						handler : function() {
							var container = Tms.viewport.findById('workPanel');
							container.removeAll(true);
							container.add({xtype : 'tms_subprj'});
							container.doLayout();				
						}
					}, {
						text : '图别分类',
						handler : function() {
							var container = Tms.viewport.findById('workPanel');
							container.removeAll(true);
							container.add({xtype : 'tms_imgtype'});
							container.doLayout();				
						}
					}, {
						text : '图幅分类',
						handler : function() {
							var container = Tms.viewport.findById('workPanel');
							container.removeAll(true);
							container.add({xtype : 'tms_imgsize'});
							container.doLayout();				
						}
					/*}, {
						text : '测试3',
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
				, title : '维护面板'
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
				title : '欢迎登录任务管理系统'
				,width : 320
				,closable : false
				,mode : true
				
				,items : {
					xtype : 'form'
					,id : 'loginForm'
					,baseCls : "x-plain"// 应用容器控件背景颜色
					//,bodyStyle : "padding:5 0 0 5" // 设置border样式
					,defaultType : 'textfield'
					,labelAlign : 'right'
					,labelWidth : 120
					,labelPad : 2
					,monitorValid : true
					//,frame : true
					,defaults : {
						allowBlank : false
						//,anchor : "98%"// 使用锚点布局设置缺省控件宽度
					}
					,waitTitle : '正在登录...'
					,items : [
							{
								name : 'username',
								fieldLabel : '用户名',
								blankText : '用户名不能为空'
							},
							{
								name : 'password',
								fieldLabel : '密 &nbsp;码',
								blankText : '密码不能为空',
								inputType : 'password'
							},
							{
								xtype : 'verifycodefield',
								name : 'verifyCode',
								id : 'verifyCode',
								fieldLabel : '验证码',
								width : 58,
								blankText : '验证码不能为空',
								vcTip : '点击图片更换验证码',
								vcUrl : Tms.URLS.verifyCode,
								vcWidth : '68px',
								vcHeight : '20px',								
								vcStyle : 'border:1px solid #B5B8C8;border-left-width:0px'
							} ]
				},
				buttons : [ {
					text : '登录',
					id : 'submitBtn',
					formBind : true,
					handler : function() {
						var myform = Ext.getCmp('loginForm').getForm();
						if (myform.isValid()) {
							myform.submit({
								waitMsg : '正在登录...',
								url : Tms.URLS.loginSys,
								timeout : 3000,
								success : function(form, action) {
									Tms.user = action.result.data;
									loginWin.close();// 关闭登录窗口
									loginWin = null;
									delete loginWin;

									Tms.viewport = new Ext.Viewport(Tms.AdminViewportConfig);
								},
								failure : function(form, action) {
									form.reset();

									Ext.getCmp('verifyCode').refresh();

									if (action.failureType == Ext.form.Action.SERVER_INVALID) {
										Ext.MessageBox.alert('警告', action.result.message);
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
