function filterAry(arySrc,aryIdx){
	var ary = [];
	for(var i=0;i<aryIdx.length;i++){
		ary.push(arySrc[aryIdx[i]]);
	}
	return ary;
}

/**状态列操作*/
Tms.stateActions = [ {
			getStyle : function(value,cell,record){
				//项目是已审核状态，角色是设计师、室主任，才显示完成确认操作。
				return (record.data.complete)?'greenText':(/*record.data.audit&& */Tms.user.role.isDesigner && Tms.user.teamLeader)?'href':'text';
			},
			getData : function(value,cell,record) {
				return (record.data.complete)?'已完成':'未完成';
			},
			handler : function(grid, record, rowIndex, col) {
				updatePrjCompletionState(grid,record);
			}
		}, {
			getStyle : function(value,cell,record){
				//计划和总工都可进行审核
				return (record.data.audit)?'greenText':((record.data.complete)&&(Tms.user.role.isPlanner||Tms.user.role.isAssessor))?'href':'text';
			},
			getData : function(value,cell,record) {
				return (record.data.audit)?'已审核':'未审核';
			},
			handler : function(grid, record, rowIndex, col) {
				updatePrjAuditState(grid,record);
			}
		}, {
			getStyle : function(value,cell,record){
				return (record.data.contract)?'greenText':(Tms.user.role.isHelper)?'href':'text';
			},
			getData : function(value,cell,record) {
				return (record.data.contract)?'已签合同':'未签合同';
			},
			handler : function(grid, record, rowIndex, col) {
				updatePrjState(grid,record, '3','工程已签合同？');
			}
		}, {
			getStyle : function(value,cell,record){
				return (record.data.collection)?'greenText':(Tms.user.role.isHelper)?'href':'text';
			},
			getData : function(value,cell,record) {
				return (record.data.collection)?'已收款':'未收款';
			},
			handler : function(grid, record, rowIndex, col) {
				updatePrjState(grid,record, '4','工程已收款？');
			}
		}, {
			getStyle : function(value,cell,record){
				return (record.data.deposit)?'greenText':(Tms.user.role.isHelper)?'href':'text';
			},
			getData : function(value,cell,record) {
				return (record.data.deposit)?'已付定金':'未付定金';
			},
			handler : function(grid, record, rowIndex, col) {
				updatePrjState(grid,record, '5','工程已付定金？');
			}
		} ];
/*操作列动作*/
Tms.operateActions = [{
			idx : 0,
			iconCls : 'icon-bulb',
			qtip : '即时消息'
		},{
			idx : 1,
			iconCls : 'icon-form-edit',
			qtip : '编辑项目'
		},{
			idx : 2,
			iconCls : 'icon-delete',
			qtip : '删除项目'
		},{
			idx : 3,
			iconCls : 'icon-form-add',
			qtip : '新建子项'
		},{
			idx : 4,
			iconCls : 'icon-check',
			qtip : '总工审核'
		},{
			idx : 5,
			iconCls : 'icon-go-tab',
			qtip : '分派预算任务'
		},{
			idx : 6,
			iconCls : 'icon-calculator',
			qtip : '项目预算'
		},{
			idx : 7,
			iconCls : 'icon-save-table',
			qtip : '项目出图'
		},{
			idx : 8,
			iconCls : 'icon-lock-go',
			qtip : '项目归档'
		},{
			idx : 9,
			iconCls : 'icon-coins',
			qtip : '收款确认'
		},{
			idx : 10,
			iconCls : 'icon-info',
			qtip : '维护项目信息'
		},{
			idx : 11,
			iconCls : 'icon-task-dispath',
			qtip : '委派项目任务'
		},{
			idx : 12,
			iconCls : 'icon-group',
			qtip : '项目组成员'
		},{
			idx : 13,
			iconCls : 'icon-files',
			qtip : '子项文档'
		},{
			idx : 14,
			iconCls : 'icon-doc-info',
			qtip : '档案信息'
		} ];

/**
 * 任务表格组件
 */
Tms.tasksGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	initComponent : function() {
		var rowExpander = new Ext.ux.grid.RowExpander({
			expandOnDblClick : false,
			expandOnEnter : false,
			tpl : new Ext.XTemplate('<div class="detailData">', '', '</div>')
		});

		rowExpander.on("expand", function(rowExpander, r, body, rowIndex) {
			window.testEle = body;
			if (Ext.DomQuery.select("div.x-panel-bwrap", body).length == 0) {
				var store = new Ext.data.Store({
					id : 'sub_list_store',
					reader : new Ext.data.JsonReader({
						id : 'id',
						root : 'data',
						fields : [ {
							name : 'id'
						}, {
							name : 'subImgName'
						}, {
							name : 'strSubprj'
						}, {
							name : 'strImgtype'
						}, {
							name : 'strImgsize'
						}, {
							name : 'strAccomplishment'
						}, {
							name : 'subprj'
						}, {
							name : 'imgtype'
						}, {
							name : 'imgsize'
						}, {
							name : 'imgnum'
						}, {
							name : 'accomplishment'
						}, {
							name : 'checkDate'
						}, {
							name : 'proofed'
						}, {
							name : 'prjID'
						}  ]
					}),
					proxy : new Ext.data.HttpProxy({
						url : Tms.URLS.subimgList
					}),
					baseParams : {
						prjID : r.json.id
					},
					autoLoad : true
				});
				
				var subActions = [{
						iconCls : 'icon-edit-record',
						qtip : '维护子项'
					},{
						iconCls : 'icon-check',
						qtip : '校对子项'					
					}];
				var cm_subImg = new Ext.grid.ColumnModel([ {
					header : "子项名称",
					id : 'subImgName',
					dataIndex : 'subImgName',
					width : 130,
					hideable : false,
					sortable : false,
					menuDisabled : true,
					cellActions : filterAry(subActions,Tms.user.roleAction.subActionIcon)
				}, {
					header : "项目",
					dataIndex : 'strSubprj',
					width : 130,
					hideable : false,
					sortable : false,
					menuDisabled : true,
					fixed : true
				}, {
					header : "张数",
					dataIndex : 'imgnum',
					width : 130,
					hideable : false,
					sortable : false,
					menuDisabled : true,
					fixed : true,
					renderer : function(v){return v+'张';}
				}, {
					header : "审核天数",
					dataIndex : 'checkDate',
					width : 130,
					hideable : false,
					sortable : false,
					menuDisabled : true,
					fixed : true,
					renderer : function(v){
						if (v && v != '') {
							if (v > 0) {
								return '还差' + v + '天';
							} else {
								return '逾期' + (0 - v) + '天';
							}
						} else {
							return '';
						}
					}
				}, {
					header : "类型",
					dataIndex : 'strImgtype',
					width : 130,
					hideable : false,
					sortable : false,
					menuDisabled : true,
					fixed : true
				}, {
					header : "图幅",
					dataIndex : 'strImgsize',
					width : 130,
					hideable : false,
					sortable : false,
					menuDisabled : true,
					fixed : true
				} ]);
				Ext.DomQuery.select("div.detailData")[0];
				new Ext.grid.GridPanel({
					store : store,
					cm : cm_subImg,
					renderTo : Ext.DomQuery.select("div.detailData", body)[0],
					autoHeight : true,
					loadMask : true,
					autoWidth : true,
					//autoScroll : true,
					disableSelection : true,
					cellEditGrid : false,
					defaultCellEdit : false,
					autoExpandColumn :'subImgName',
					stripeRows : true,
					plugins : [new Ext.ux.grid.CellActions({
						callbacks : {
							'icon-edit-record' : function(grid, record, action, value) {
								update4designer(grid, record);
							},
							'icon-check' : function(grid, record, action, value) {//校对子项
								check4designer(grid, record);
							}
						},
						align : 'right'
					})],
					viewConfig : {
						emptyText : '暂未创建子项'
					},
					listeners : {
						//render : function(grid) {
						//	grid.getView().el.select('.x-grid3-header').setStyle('display', 'none');
						//}
					}
				});
			}
		});

		var cellActions = new Ext.ux.grid.CellActions({
			callbacks : {
				'icon-bulb' : function(grid, record, action, value) {
					showChatWindow(grid, record);
				},
				'icon-form-add' : function(grid, record, action, value) {
					if (Tms.user.role.isOfficer||Tms.user.role.isDesigner) {
						create4designer(grid, record);
					}
				},
				'icon-form-edit' : function(grid, record, action, value) {
					if (Tms.user.role.isHelper) {//计划人员
						update4helper(grid, record);
					} else if (Tms.user.role.isPlanner) {//设计人员
						update4planner(grid, record);
					} else if (Tms.user.role.isDesigner && Tms.user.teamLeader) {//设计室主任						
						officerSwitch(grid, record,update4officer,update4officer_ii);
					} else if (Tms.user.role.isLeader) {//项目负责人
						update4leader(grid, record);
					}
				},
				'icon-delete' : function(grid, record, action, value) {
					if (Tms.user.role.isHelper  || Tms.user.role.isPlanner) {
						Ext.Ajax.request({
							url : Tms.URLS.deleteTask,
							success : function() {
								grid.getStore().reload();
							},
							failure : function() {
								Ext.Msg.show({
									title : '提示',
									msg : '删除失败！',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							},
							timeout : 30000,
							params : record.data
						});
					}
				},
				'icon-check' : function(grid, record, action, value) {//总工审核
					updatePrjAuditState(grid, record);
				},
				'icon-go-tab' : function(grid, record, action, value) {//分派预算任务
					if(Tms.user.role.isBudgeteer){
						budgetOfficer(grid,record);
					}
				},
				'icon-calculator' : function(grid, record, action, value) {//项目预算
					if(Tms.user.role.isBudgeteer){
						budgeteer(grid,record);
					}
				},
				'icon-save-table' : function(grid, record, action, value) {//项目出图
					if(Tms.user.role.isOutprint){
						outprint(grid, record);
					}
				},
				'icon-lock-go' : function(grid, record, action, value) {//项目归档
					if(Tms.user.role.isArchive||Tms.user.role.isHelper){
						archive(grid, record);
					}
				},
				'icon-coins' : function(grid, record, action, value) {//收款
					if(Tms.user.role.isAccountant){
						accountant(grid, record);
					}
				},
				'icon-info' : function(grid, record, action, value) {//项目信息
					prjInfo(grid, record);
				},
				'icon-task-dispath' : function(grid, record, action, value){//项目任务重新委派
					dispathTask(grid, record);
				},
				'icon-files' : function(grid, record, action, value){//查看子项文档
					viewDoc(grid, record);
				},
				'icon-group' : function(grid, record, action, value){//显示项目组成员
					viewGroup(grid, record);
				},
				'icon-doc-info' : function(grid, record, action, value){//显示项目档案信息
					if(Tms.user.role.isHelper){
						archive(grid, record);
//						viewPrjDoc(grid, record);
					}
				}
			},
			align : 'right'
		});

		var stateColumn = new Ext.grid.ActionsColumn({
			header : '任务状态',
			dataIndex : 'prjState',
			//autoWidth : true,
			fixed : true,
			width : 104, 
			actions : filterAry(Tms.stateActions,Tms.user.roleAction.stateActionOper)
		});
		var budgetColumn = new Ext.grid.ActionsColumn({
			header : '项目预算',
			dataIndex : 'budgetFlag',
			//autoWidth : true,
			fixed : true,
			width : 120, 
			actions : filterAry([{
				getStyle : function(value,cell,record, row, col, store){
					return (value)?'greenText text-fixed-width':'href';
				},
				getData : function(value,cell,record, row, col, store) {
					return (value)?((record.data.budgetAmount==0)?'预算中...': ((Tms.user.role.isDesigner)? '已提交预算': record.data.budgetAmount)):'预算请求';
				},
				handler : function(grid, record, rowIndex, col) {
					if(!record.data.budgetFlag){
						submitBudget(grid,record);
					}
				}
			},{
				getStyle : function(value,cell,record, row, col, store){
					return (value && (record.data.budgetAmount > 0))?'href':'greenText';
				},
				getData : function(value,cell,record, row, col, store) {
					return (value && (record.data.budgetAmount > 0))?'文档':'';
				},
				handler : function(grid, record, rowIndex, col) {
					downloadBudgetDoc(grid,record);
				}
			}],
			Tms.user.roleAction.budgetActionOper)
		});
		Ext.apply(this, {
			store : new Ext.data.Store({
				id : 'main_list_store',
				reader : new Ext.data.JsonReader({
					id : 'id',
					totalProperty : 'total',
					root : 'data',
					fields : [ {
						name : 'id'
					}, , {
						name : 'prjName'
					}, {
						name : 'prjType'
					}, {
						name : 'prjNumber'
					}, {
						name : 'prjStage'
					}, {
						name : 'prjState',
						convert : function(v,record) {
							if(record.complete){
								v = "1";
							}
							if(record.audit){
								v +=(v.length>0)?',2':'2';
							}
							if(record.contract){
								v +=(v.length>0)?',3':'3';
							}
							if(record.collection){
								v +=(v.length>0)?',4':'4';
							}
							if(record.deposit){
								v +=(v.length>0)?',5':'5';
							}
							return v;
						}
					}, {
						name : 'prjPriority',
						convert : function(v) {
							return v == 0 ? null : v;
						}
					}, {
						name : 'startDate',
						type : 'date', dateFormat : 'Y-m-d H:i:s'
					}, {
						name : 'endDate',
						type : 'date', dateFormat : 'Y-m-d H:i:s'
					}, {
						name : 'contract'
					}, {
						name : 'deposit'
					}, {
						name : 'collection'
					}, {
						name : 'audit'
					}, {
						name : 'complete'
					}, {
						name : 'docNO'
					}, {
						name : 'budgetFlag'
					}, {
						name : 'budgetAmount',type : 'number'
					}, {
						name : 'docNO'
					}, {
						name : 'remark'
					}, {
						name : 'feeFlag'
					} ]
				}),
				proxy : new Ext.data.HttpProxy({
					url : Tms.URLS.taskList
				}),
				listeners : {
					'beforeload' : function(store,options){
						//Ext.apply(store.baseParams,Ext.getCmp('queryForm').getForm().getValues());
						store.baseParams = Ext.getCmp('queryForm').getForm().getValues();
					},
					'load' : function(store,options){
						var myGrid = Ext.getCmp('tasksGrid');
						var view = myGrid.getView(); 
						var rowIndex=0; 
						store.each(function(r){
							var prjID = r.get('id');
							for(var i=0;i<Tms.lineStyle.length;i++){
								if(prjID == Tms.lineStyle[i].prjID){
									view.addRowClass(rowIndex, Tms.lineStyle[i].lineStyle);	
								}
							}
							rowIndex++;
						});

					}
				}
			}),
			sm : new Ext.grid.CheckboxSelectionModel({
				singleSelect : false,
				checkOnly : true
			}),
			columns : [ rowExpander// 加载插件
			, new Ext.grid.CheckboxSelectionModel(), {
				header : "工程名称",
				width : 150,
				sortable : false,
				menuDisabled : true,
				dataIndex : 'prjName',
				renderer : function(value, p ,record){return String.format("<span class='x-grid3-dync-tip-cell'>{0}</span>",value);},
				cellActions : filterAry(Tms.operateActions,Tms.user.roleAction.actionIcon)
			}, {
				header : "项目类型",
				width : 80,
				align : 'center',
				sortable : false,
				fixed : true,
				menuDisabled : true,
				dataIndex : 'prjType',
				renderer : function(v) {
					return Tms.projectTypes[v];
				}
			}, {
				header : "工程编号",
				width : 80,
				align : 'center',
				sortable : false,
				fixed : true,
				menuDisabled : true,
				dataIndex : 'prjNumber'
			}, {
				header : "委托日期",
				width : 80,
				align : 'center',
				sortable : false,
				fixed : true,
				menuDisabled : true,
				dataIndex : 'startDate',
				renderer : Ext.util.Format.dateRenderer('Y-m-d')
			}, {
				header : "截止日期",
				width : 80,
				align : 'center',
				sortable : false,
				fixed : true,
				menuDisabled : true,
				dataIndex : 'endDate',
				renderer : Ext.util.Format.dateRenderer('Y-m-d')
			}
			, stateColumn
			, budgetColumn
			, {
				header : "档案编号",
				width : 80,
				sortable : false,
				fixed : true,
				hidden : true,
				menuDisabled : true,
				dataIndex : 'docNO'
			}
			,{
				header : "确认收款",
				width : 70,
				sortable : false,
				fixed : true,
				hidden : true,
				align : 'center',
				menuDisabled : true,
				dataIndex : 'feeFlag',
				renderer : function(v,r){
					if(v){
						return "<image src='icon/ok16.png'>";
					}else{
						return "<image src='icon/drop-no.gif'>";
					}
				}
			}
			]
			, plugins : [ cellActions, stateColumn,budgetColumn, rowExpander ]
			, viewConfig : {
				autoFill : true,
				forceFit : true,
				emptyText : '没有新项目',
				getRowClass : function(record, rowIndex, p, store) {
					// CSS class name to add to the row.获得一行的css样式
					if (this.showPreview) {
						p.body = '<p>' + record.data.excerpt + '</p>';
						return 'x-grid3-row-expanded';
					}
					return 'x-grid3-row-collapsed';
				}
			},
			loadMask : true,
			//autoWidth : true,
			autoScroll : true,
			disableSelection : true,
			stripeRows : true
		}); // eo apply
		this.pageSize = 20;
		// add paging toolbar
		this.bbar = new Ext.PagingToolbar({
            pageSize: this.pageSize,
            store: this.store,
            displayInfo: true,
			firstText : '首页',
			prevText : '上页',
			lastText : '尾页',
			nextText : '下页',
			refreshText : '刷新',
            displayMsg: '第 {0} - {1} 个项目任务，总共 {2} 个项目任务 &nbsp;&nbsp;',
            emptyMsg: "没有工程项目记录"/*,
            items:[
                '-', {
                pressed: true,
                enableToggle:true,
                text: 'Show Preview',
                cls: 'x-btn-text-icon details',
                toggleHandler: function(btn, pressed){
                    var view = grid.getView();
                    view.showPreview = pressed;
                    view.refresh();
                }
            }]*/
        });
		// call parent
		Tms.tasksGrid.superclass.initComponent.apply(this, arguments);
	},
	onRender : function() {
		// dync update grid config
		var CM = this.colModel;
		var units = Tms.user.roleAction.stateActionOper.length;
		
		CM.setColumnWidth(7,52*units,true);//设置状态列宽度
		
		if(Tms.user.roleAction.budgetActionOper.length == 0){
			CM.setHidden(8, true);// 隐藏预算列
		}else if(Tms.user.roleAction.budgetActionOper.length == 1){
			CM.setColumnWidth(8,80,true);//设置预算列宽度
		}else {
			CM.setColumnWidth(8,150,true);//设置预算列宽度
		}
		if(Tms.user.role.isArchive){//档案人员，显示档案列
			CM.setHidden(9, false);
		}
		if(Tms.user.role.isAccountant){//财务人员，显示财务确认收款列
			CM.setHidden(10, false);
		}
		// call parent
		Tms.tasksGrid.superclass.onRender.apply(this, arguments);
		// add tip
		   var store = this.getStore();
		   var view = this.getView();
		   this.tip = new Ext.ToolTip({
			   target: view.mainBody,        
			   delegate: '.x-grid3-dync-tip-cell',
			   trackMouse: true,       
			   renderTo: document.body,
			   listeners: {
				   beforeshow: function updateTipBody(tip) {
						var rowIndex = view.findRowIndex(tip.triggerElement);     
						var record = store.getAt(rowIndex);
						var prjName = record.get('prjName');
						var prjID = record.get('id');
						Ext.Ajax.request({
							url : Tms.URLS.getPrjInfo,
							params: {'prjName': prjName, 'prjID': prjID },
							success : function(resp){
								var info = Ext.util.JSON.decode(resp.responseText);
								var strTpl = "项目名称：{prjName}<br>项目位置：{location}<br/>项目规模：{scale}<br/>给水方式：{watersupply}<br/>项目管线：{pipeline}<br/>项目工艺：{construction}<br/>项目电气：{electric}<br/>联系人：{contact}<br/>建造方：{builder}";
								if(Tms.user.role.isArchive){
									strTpl += "<br/>档案编号：{docNo}";
								}
								var tpl = new Ext.XTemplate(strTpl);
								tip.body.dom.innerHTML = tpl.apply(info.data);
							}
						});
				   }     
			   }     
		   });

		// load the store
		this.store.load({
			params : {
				start : 0,
				limit : this.pageSize
			}
		});

		if(this.bottomToolbar){
			this.bottomToolbar.insertButton(0,'-');
			this.bottomToolbar.insertButton(0,{
				tooltip : ' ',
				text : ' '
			});
			this.bottomToolbar.insertButton(0,{
				tooltip : '标记为',
				text : '标记为',
				scope : this,
				menu : [ {
					text : '标为红色',
					icon : 'icon/flag-red.png',
					scope : this,
					handler : function() {
						setLineStyle(this,'line_style_red');
					}
				}, {
					text : '其它颜色',
					icon : 'icon/flag-other.png',
					menu : [ {
						text : '绿色',
						icon : 'icon/flag-green.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_green');
						}
					}, {
						text : '橙色',
						icon : 'icon/flag-orange.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_orange');
						}
					}, {
						text : '蓝色',
						icon : 'icon/flag-blue.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_blue');
						}
					}, {
						text : '黄色',
						icon : 'icon/flag-yellow.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_yellow');
						}
					}, {
						text : '青色',
						icon : 'icon/flag-cyan.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_cyan');
						}
					}, {
						text : '紫色',
						icon : 'icon/flag-purple.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_purple');
						}
					}, {
						text : '灰色',
						icon : 'icon/flag-gray.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_gray');
						}
					}, {
						text : '粉色',
						icon : 'icon/flag-pink.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_pink');
						}
					} ]
				}, {
					text : '取消颜色',
					// iconCls: 'edit',
					icon : 'icon/delete.gif',
					scope : this,
					handler : function() {
						setLineStyle(this,null);
					}
				} ]
			});
			var items = this.bottomToolbar.items.items;
			for(var i=5;i<10;i++){
				items[i].hide();
			}
			items[12].hide();
			
			var hidx = [3,4,10,11,13];
			for(var i=0;i<hidx.length;i++){
				items[hidx[i]].iconCls = null;
				items[hidx[i]].text = items[hidx[i]].overflowText;			
			}
		}
		/*
		//轮询同步更新的数据 
		Ext.Direct.addProvider({
			id : 'pollTaskList' 
			,type :'polling'
			,interval : 90000
			,url : Tms.URLS.taskList
			,baseParams : {
				no : 1
				,name : 'Ralph' 
			} 
		}); //响应处理轮询返回的数据 
		  
		Ext.Direct.on({ 
			scope :this
			,refresh : function(e) {
				if(e.success)
					this.store.loadData(e);
				else 
					Ext.Msg.alert("提示消息",e.message); 
			}
			,error : function(e){
				Ext.Msg.alert("提示消息",e.message); 
			} 
		});
		*/
		 
	}
});
Ext.reg('tasksGrid', Tms.tasksGrid);

function setLineStyle(grid, newStyle) {
	var rows = grid.getSelectionModel().getSelections();
	if (rows.length == 0) {
		Ext.Msg.show({
			title : '提示',
			msg : '未选中行',
			buttons : Ext.Msg.OK,
			icon : Ext.Msg.INFO
		});
	} else {
		var prjIDs = new Array();
		for(var i=0;i<rows.length;i++){
			prjIDs.push(rows[i].id);
		}
		Ext.Ajax.request({
			url : Tms.URLS.lineStyle,
			scope : grid,
			params : {
				prjID : prjIDs,
				style : newStyle
			},
			success : function(response) {
				var msg = Ext.util.JSON.decode(response.responseText).message;
				if (msg == 'delete') {
					for(var i=0;i<rows.length;i++){	
						delLineStyle({
							prjID : rows[i].id,
							userID : Tms.user.id, 
							lineStyle : newStyle
						});
						//var rowIndex = this.store.indexOfId(rows[i].id);
						//this.getView().removeRowClass(rowIndex, newStyle);
					}			
				} else if (msg == 'update') {
					for(var i=0;i<rows.length;i++){
						var style = {
								prjID : rows[i].id,
								userID : Tms.user.id, 
								lineStyle : newStyle
							};
						delLineStyle(style);
						Tms.lineStyle.push(style);
						//var rowIndex = this.store.indexOfId(rows[i].id);
						//this.getView().addRowClass(rowIndex, newStyle);
					}			
				}
				//this.getView().refresh(true);
				this.bottomToolbar.doRefresh();
				this.getSelectionModel().clearSelections();
			}
		});
	}
}
function delLineStyle(style){
	for(var i=0;i<Tms.lineStyle.length;i++){
		tls = Tms.lineStyle[i];
		if(tls.prjID == style.prjID&&tls.userID == style.userID){
			Tms.lineStyle.remove(tls);break;
		}
	}
}
// -------------------------------------------------------------

Tms.ViewportConfig = {
	layout : 'border',
	items : [
			{
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
											self.location.href = 'index.html';
										};
									},
									failure : function(response, action) {
										Tms.user = null;
										// 界面级跳到登录界面
										self.location.href = 'index.html';
									},
									timeout : 30000
								});
							}
						}, '-' ])
			},{
				id : 'feed-tree',
				region : 'west',
				split : true,
				minSize : 235,
				maxSize : 400,
				collapsible : true,
				margins : '0 0 0 3',// 展开时
				cmargins : '0 3 0 3',// 收起后
				lines : false,
				autoScroll : true,
		xtype : 'panel',
		title : '任务查询',
		width : '235',
		frame : true,
		items : [{
			xtype : 'form',
			id : 'queryForm',
			labelWidth : 55,
			frame : true,
			labelPad : 2,
			items :
			[{
				xtype : 'combo',
				mode: 'local',
				hiddenName : 'prjType',
				fieldLabel : '项目类型',
				width : 150,
				store: {
					xtype : 'arraystore',
					fields: ['id', 'name'],
					autoDestroy: true,
				    data : [[0,'全部'],[1,'投招标'],[2,'规划'],[3,'可研'],[4,'初设'],[5,'施工图']]
				},
				displayField:'name',
				valueField : 'id',
				typeAhead: true,
				forceSelection: true,
				triggerAction: 'all',
				emptyText:'请选择项目类型',
				editable : false,
				selectOnFocus:false
			},{
				xtype : 'combo',
				id : 'dateType_id',
				mode: 'local',
				hiddenName : 'dateType',
				fieldLabel : '查询日期',
				width : 150,
				store: {
					xtype : 'arraystore',
					fields: ['val', 'text'],
					autoDestroy: true,
					data : [[0,'自定义'],[1,'本周'],[2,'本月']]
				},
				defaultValue : 0,
				displayField:'text',
				valueField : 'val',
				typeAhead: true,
				editable : false,
				forceSelection: true,
				triggerAction: 'all',
				emptyText:'请选择查询日期',
				selectOnFocus:false,
				listeners: {
					select: function(el, store, val) {
						if(val === 0){
							Ext.getCmp('sd').itemCt.show();
							Ext.getCmp('ed').itemCt.show();
						}else{
							Ext.getCmp('sd').itemCt.hide();
							Ext.getCmp('ed').itemCt.hide();
						}
					}
				}
			}, {
				id : 'sd',
				xtype : 'datefield',
				fieldLabel : '开始时间',
				name : 'startDate',
				format : 'Y-m-d',
				editable : false,
				width : 150
			},{
				id : 'ed',
				xtype : 'datefield',
				fieldLabel : '截止日间',
				name : 'endDate',
				format : 'Y-m-d',
				editable : false,
				width : 150
			}, {
				xtype : 'textfield',
				fieldLabel : '工程编号',
				name : 'prjNumber',
				width : 150
			}, {
				xtype : 'textfield',
				fieldLabel : '工程名称',
				name : 'prjName',
				width : 150
			} 
			],
			buttonAlign: 'center',
			buttons :[{
				text : '重置',
				handler : function(ct,event) {
					ct.ownerCt.ownerCt.getForm().reset();
				}
			},{
				text : '查询',
				handler : function(ct,event) {
					var grid = Ext.getCmp('tasksGrid');
					grid.bottomToolbar.doRefresh();
				}
			}			
			]
		}]
			}, {
				id : 'mainPanel',
				region : 'center',
				xtype : 'panel',
				title : '项目任务',
				collapsible : false,
				frame : false,
				layout : 'fit',
				items : {
					xtype : 'tasksGrid',
					id : 'tasksGrid'
				}
			} ]
};

// -------------------------------------------------------------
Ext.onReady(function() {

	Ext.QuickTips.init();

	Ext.Ajax.request({
		url : Tms.URLS.isLogon,
		success : function(response, opts) {
			var resp = Ext.decode(response.responseText);
			if(resp.success === true){
				Tms.user = resp.user;
				Tms.lineStyle = resp.data;
	
				Tms.workbench();//已登陆，显示工作桌面
			}else{
				new Tms.loginWindow();// 显示登录窗口
			}
		},
		failure : function(response, opts) {
			new Tms.loginWindow();// 显示登录窗口
		},
		timeout : 30000
	});	
});
// -------------------------------------------------------------
