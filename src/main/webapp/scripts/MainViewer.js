function filterAry(arySrc,aryIdx){
	var ary = [];
	for(var i=0;i<aryIdx.length;i++){
		ary.push(arySrc[aryIdx[i]]);
	}
	return ary;
}

/**״̬�в���*/
Tms.stateActions = [ {
			getStyle : function(value,cell,record){
				//��Ŀ�������״̬����ɫ�����ʦ�������Σ�����ʾ���ȷ�ϲ�����
				return (record.data.complete)?'greenText':(/*record.data.audit&& */Tms.user.role.isDesigner && Tms.user.teamLeader)?'href':'text';
			},
			getData : function(value,cell,record) {
				return (record.data.complete)?'�����':'δ���';
			},
			handler : function(grid, record, rowIndex, col) {
				updatePrjCompletionState(grid,record);
			}
		}, {
			getStyle : function(value,cell,record){
				//�ƻ����ܹ����ɽ������
				return (record.data.audit)?'greenText':((record.data.complete)&&(Tms.user.role.isPlanner||Tms.user.role.isAssessor))?'href':'text';
			},
			getData : function(value,cell,record) {
				return (record.data.audit)?'�����':'δ���';
			},
			handler : function(grid, record, rowIndex, col) {
				updatePrjAuditState(grid,record);
			}
		}, {
			getStyle : function(value,cell,record){
				return (record.data.contract)?'greenText':(Tms.user.role.isHelper)?'href':'text';
			},
			getData : function(value,cell,record) {
				return (record.data.contract)?'��ǩ��ͬ':'δǩ��ͬ';
			},
			handler : function(grid, record, rowIndex, col) {
				updatePrjState(grid,record, '3','������ǩ��ͬ��');
			}
		}, {
			getStyle : function(value,cell,record){
				return (record.data.collection)?'greenText':(Tms.user.role.isHelper)?'href':'text';
			},
			getData : function(value,cell,record) {
				return (record.data.collection)?'���տ�':'δ�տ�';
			},
			handler : function(grid, record, rowIndex, col) {
				updatePrjState(grid,record, '4','�������տ');
			}
		}, {
			getStyle : function(value,cell,record){
				return (record.data.deposit)?'greenText':(Tms.user.role.isHelper)?'href':'text';
			},
			getData : function(value,cell,record) {
				return (record.data.deposit)?'�Ѹ�����':'δ������';
			},
			handler : function(grid, record, rowIndex, col) {
				updatePrjState(grid,record, '5','�����Ѹ�����');
			}
		} ];
/*�����ж���*/
Tms.operateActions = [{
			idx : 0,
			iconCls : 'icon-bulb',
			qtip : '��ʱ��Ϣ'
		},{
			idx : 1,
			iconCls : 'icon-form-edit',
			qtip : '�༭��Ŀ'
		},{
			idx : 2,
			iconCls : 'icon-delete',
			qtip : 'ɾ����Ŀ'
		},{
			idx : 3,
			iconCls : 'icon-form-add',
			qtip : '�½�����'
		},{
			idx : 4,
			iconCls : 'icon-check',
			qtip : '�ܹ����'
		},{
			idx : 5,
			iconCls : 'icon-go-tab',
			qtip : '����Ԥ������'
		},{
			idx : 6,
			iconCls : 'icon-calculator',
			qtip : '��ĿԤ��'
		},{
			idx : 7,
			iconCls : 'icon-save-table',
			qtip : '��Ŀ��ͼ'
		},{
			idx : 8,
			iconCls : 'icon-lock-go',
			qtip : '��Ŀ�鵵'
		},{
			idx : 9,
			iconCls : 'icon-coins',
			qtip : '�տ�ȷ��'
		},{
			idx : 10,
			iconCls : 'icon-info',
			qtip : 'ά����Ŀ��Ϣ'
		},{
			idx : 11,
			iconCls : 'icon-task-dispath',
			qtip : 'ί����Ŀ����'
		},{
			idx : 12,
			iconCls : 'icon-group',
			qtip : '��Ŀ���Ա'
		},{
			idx : 13,
			iconCls : 'icon-files',
			qtip : '�����ĵ�'
		},{
			idx : 14,
			iconCls : 'icon-doc-info',
			qtip : '������Ϣ'
		} ];

/**
 * ���������
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
						qtip : 'ά������'
					},{
						iconCls : 'icon-check',
						qtip : 'У������'					
					}];
				var cm_subImg = new Ext.grid.ColumnModel([ {
					header : "��������",
					id : 'subImgName',
					dataIndex : 'subImgName',
					width : 130,
					hideable : false,
					sortable : false,
					menuDisabled : true,
					cellActions : filterAry(subActions,Tms.user.roleAction.subActionIcon)
				}, {
					header : "��Ŀ",
					dataIndex : 'strSubprj',
					width : 130,
					hideable : false,
					sortable : false,
					menuDisabled : true,
					fixed : true
				}, {
					header : "����",
					dataIndex : 'imgnum',
					width : 130,
					hideable : false,
					sortable : false,
					menuDisabled : true,
					fixed : true,
					renderer : function(v){return v+'��';}
				}, {
					header : "�������",
					dataIndex : 'checkDate',
					width : 130,
					hideable : false,
					sortable : false,
					menuDisabled : true,
					fixed : true,
					renderer : function(v){
						if (v && v != '') {
							if (v > 0) {
								return '����' + v + '��';
							} else {
								return '����' + (0 - v) + '��';
							}
						} else {
							return '';
						}
					}
				}, {
					header : "����",
					dataIndex : 'strImgtype',
					width : 130,
					hideable : false,
					sortable : false,
					menuDisabled : true,
					fixed : true
				}, {
					header : "ͼ��",
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
							'icon-check' : function(grid, record, action, value) {//У������
								check4designer(grid, record);
							}
						},
						align : 'right'
					})],
					viewConfig : {
						emptyText : '��δ��������'
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
					if (Tms.user.role.isHelper) {//�ƻ���Ա
						update4helper(grid, record);
					} else if (Tms.user.role.isPlanner) {//�����Ա
						update4planner(grid, record);
					} else if (Tms.user.role.isDesigner && Tms.user.teamLeader) {//���������						
						officerSwitch(grid, record,update4officer,update4officer_ii);
					} else if (Tms.user.role.isLeader) {//��Ŀ������
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
									title : '��ʾ',
									msg : 'ɾ��ʧ�ܣ�',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							},
							timeout : 30000,
							params : record.data
						});
					}
				},
				'icon-check' : function(grid, record, action, value) {//�ܹ����
					updatePrjAuditState(grid, record);
				},
				'icon-go-tab' : function(grid, record, action, value) {//����Ԥ������
					if(Tms.user.role.isBudgeteer){
						budgetOfficer(grid,record);
					}
				},
				'icon-calculator' : function(grid, record, action, value) {//��ĿԤ��
					if(Tms.user.role.isBudgeteer){
						budgeteer(grid,record);
					}
				},
				'icon-save-table' : function(grid, record, action, value) {//��Ŀ��ͼ
					if(Tms.user.role.isOutprint){
						outprint(grid, record);
					}
				},
				'icon-lock-go' : function(grid, record, action, value) {//��Ŀ�鵵
					if(Tms.user.role.isArchive||Tms.user.role.isHelper){
						archive(grid, record);
					}
				},
				'icon-coins' : function(grid, record, action, value) {//�տ�
					if(Tms.user.role.isAccountant){
						accountant(grid, record);
					}
				},
				'icon-info' : function(grid, record, action, value) {//��Ŀ��Ϣ
					prjInfo(grid, record);
				},
				'icon-task-dispath' : function(grid, record, action, value){//��Ŀ��������ί��
					dispathTask(grid, record);
				},
				'icon-files' : function(grid, record, action, value){//�鿴�����ĵ�
					viewDoc(grid, record);
				},
				'icon-group' : function(grid, record, action, value){//��ʾ��Ŀ���Ա
					viewGroup(grid, record);
				},
				'icon-doc-info' : function(grid, record, action, value){//��ʾ��Ŀ������Ϣ
					if(Tms.user.role.isHelper){
						archive(grid, record);
//						viewPrjDoc(grid, record);
					}
				}
			},
			align : 'right'
		});

		var stateColumn = new Ext.grid.ActionsColumn({
			header : '����״̬',
			dataIndex : 'prjState',
			//autoWidth : true,
			fixed : true,
			width : 104, 
			actions : filterAry(Tms.stateActions,Tms.user.roleAction.stateActionOper)
		});
		var budgetColumn = new Ext.grid.ActionsColumn({
			header : '��ĿԤ��',
			dataIndex : 'budgetFlag',
			//autoWidth : true,
			fixed : true,
			width : 120, 
			actions : filterAry([{
				getStyle : function(value,cell,record, row, col, store){
					return (value)?'greenText text-fixed-width':'href';
				},
				getData : function(value,cell,record, row, col, store) {
					return (value)?((record.data.budgetAmount==0)?'Ԥ����...': ((Tms.user.role.isDesigner)? '���ύԤ��': record.data.budgetAmount)):'Ԥ������';
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
					return (value && (record.data.budgetAmount > 0))?'�ĵ�':'';
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
			columns : [ rowExpander// ���ز��
			, new Ext.grid.CheckboxSelectionModel(), {
				header : "��������",
				width : 150,
				sortable : false,
				menuDisabled : true,
				dataIndex : 'prjName',
				renderer : function(value, p ,record){return String.format("<span class='x-grid3-dync-tip-cell'>{0}</span>",value);},
				cellActions : filterAry(Tms.operateActions,Tms.user.roleAction.actionIcon)
			}, {
				header : "��Ŀ����",
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
				header : "���̱��",
				width : 80,
				align : 'center',
				sortable : false,
				fixed : true,
				menuDisabled : true,
				dataIndex : 'prjNumber'
			}, {
				header : "ί������",
				width : 80,
				align : 'center',
				sortable : false,
				fixed : true,
				menuDisabled : true,
				dataIndex : 'startDate',
				renderer : Ext.util.Format.dateRenderer('Y-m-d')
			}, {
				header : "��ֹ����",
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
				header : "�������",
				width : 80,
				sortable : false,
				fixed : true,
				hidden : true,
				menuDisabled : true,
				dataIndex : 'docNO'
			}
			,{
				header : "ȷ���տ�",
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
				emptyText : 'û������Ŀ',
				getRowClass : function(record, rowIndex, p, store) {
					// CSS class name to add to the row.���һ�е�css��ʽ
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
			firstText : '��ҳ',
			prevText : '��ҳ',
			lastText : 'βҳ',
			nextText : '��ҳ',
			refreshText : 'ˢ��',
            displayMsg: '�� {0} - {1} ����Ŀ�����ܹ� {2} ����Ŀ���� &nbsp;&nbsp;',
            emptyMsg: "û�й�����Ŀ��¼"/*,
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
		
		CM.setColumnWidth(7,52*units,true);//����״̬�п��
		
		if(Tms.user.roleAction.budgetActionOper.length == 0){
			CM.setHidden(8, true);// ����Ԥ����
		}else if(Tms.user.roleAction.budgetActionOper.length == 1){
			CM.setColumnWidth(8,80,true);//����Ԥ���п��
		}else {
			CM.setColumnWidth(8,150,true);//����Ԥ���п��
		}
		if(Tms.user.role.isArchive){//������Ա����ʾ������
			CM.setHidden(9, false);
		}
		if(Tms.user.role.isAccountant){//������Ա����ʾ����ȷ���տ���
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
								var strTpl = "��Ŀ���ƣ�{prjName}<br>��Ŀλ�ã�{location}<br/>��Ŀ��ģ��{scale}<br/>��ˮ��ʽ��{watersupply}<br/>��Ŀ���ߣ�{pipeline}<br/>��Ŀ���գ�{construction}<br/>��Ŀ������{electric}<br/>��ϵ�ˣ�{contact}<br/>���췽��{builder}";
								if(Tms.user.role.isArchive){
									strTpl += "<br/>������ţ�{docNo}";
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
				tooltip : '���Ϊ',
				text : '���Ϊ',
				scope : this,
				menu : [ {
					text : '��Ϊ��ɫ',
					icon : 'icon/flag-red.png',
					scope : this,
					handler : function() {
						setLineStyle(this,'line_style_red');
					}
				}, {
					text : '������ɫ',
					icon : 'icon/flag-other.png',
					menu : [ {
						text : '��ɫ',
						icon : 'icon/flag-green.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_green');
						}
					}, {
						text : '��ɫ',
						icon : 'icon/flag-orange.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_orange');
						}
					}, {
						text : '��ɫ',
						icon : 'icon/flag-blue.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_blue');
						}
					}, {
						text : '��ɫ',
						icon : 'icon/flag-yellow.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_yellow');
						}
					}, {
						text : '��ɫ',
						icon : 'icon/flag-cyan.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_cyan');
						}
					}, {
						text : '��ɫ',
						icon : 'icon/flag-purple.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_purple');
						}
					}, {
						text : '��ɫ',
						icon : 'icon/flag-gray.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_gray');
						}
					}, {
						text : '��ɫ',
						icon : 'icon/flag-pink.png',
						scope : this,
						handler : function() {
							setLineStyle(this,'line_style_pink');
						}
					} ]
				}, {
					text : 'ȡ����ɫ',
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
		//��ѯͬ�����µ����� 
		Ext.Direct.addProvider({
			id : 'pollTaskList' 
			,type :'polling'
			,interval : 90000
			,url : Tms.URLS.taskList
			,baseParams : {
				no : 1
				,name : 'Ralph' 
			} 
		}); //��Ӧ������ѯ���ص����� 
		  
		Ext.Direct.on({ 
			scope :this
			,refresh : function(e) {
				if(e.success)
					this.store.loadData(e);
				else 
					Ext.Msg.alert("��ʾ��Ϣ",e.message); 
			}
			,error : function(e){
				Ext.Msg.alert("��ʾ��Ϣ",e.message); 
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
			title : '��ʾ',
			msg : 'δѡ����',
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
											self.location.href = 'index.html';
										};
									},
									failure : function(response, action) {
										Tms.user = null;
										// ���漶������¼����
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
				margins : '0 0 0 3',// չ��ʱ
				cmargins : '0 3 0 3',// �����
				lines : false,
				autoScroll : true,
		xtype : 'panel',
		title : '�����ѯ',
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
				fieldLabel : '��Ŀ����',
				width : 150,
				store: {
					xtype : 'arraystore',
					fields: ['id', 'name'],
					autoDestroy: true,
				    data : [[0,'ȫ��'],[1,'Ͷ�б�'],[2,'�滮'],[3,'����'],[4,'����'],[5,'ʩ��ͼ']]
				},
				displayField:'name',
				valueField : 'id',
				typeAhead: true,
				forceSelection: true,
				triggerAction: 'all',
				emptyText:'��ѡ����Ŀ����',
				editable : false,
				selectOnFocus:false
			},{
				xtype : 'combo',
				id : 'dateType_id',
				mode: 'local',
				hiddenName : 'dateType',
				fieldLabel : '��ѯ����',
				width : 150,
				store: {
					xtype : 'arraystore',
					fields: ['val', 'text'],
					autoDestroy: true,
					data : [[0,'�Զ���'],[1,'����'],[2,'����']]
				},
				defaultValue : 0,
				displayField:'text',
				valueField : 'val',
				typeAhead: true,
				editable : false,
				forceSelection: true,
				triggerAction: 'all',
				emptyText:'��ѡ���ѯ����',
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
				fieldLabel : '��ʼʱ��',
				name : 'startDate',
				format : 'Y-m-d',
				editable : false,
				width : 150
			},{
				id : 'ed',
				xtype : 'datefield',
				fieldLabel : '��ֹ�ռ�',
				name : 'endDate',
				format : 'Y-m-d',
				editable : false,
				width : 150
			}, {
				xtype : 'textfield',
				fieldLabel : '���̱��',
				name : 'prjNumber',
				width : 150
			}, {
				xtype : 'textfield',
				fieldLabel : '��������',
				name : 'prjName',
				width : 150
			} 
			],
			buttonAlign: 'center',
			buttons :[{
				text : '����',
				handler : function(ct,event) {
					ct.ownerCt.ownerCt.getForm().reset();
				}
			},{
				text : '��ѯ',
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
				title : '��Ŀ����',
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
	
				Tms.workbench();//�ѵ�½����ʾ��������
			}else{
				new Tms.loginWindow();// ��ʾ��¼����
			}
		},
		failure : function(response, opts) {
			new Tms.loginWindow();// ��ʾ��¼����
		},
		timeout : 30000
	});	
});
// -------------------------------------------------------------
