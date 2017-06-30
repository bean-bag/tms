/*********************************************
 * 
 * description : 界面元素组件库
 * 
 * author : baojunwen email : junctioner@163.com
 * 
**********************************************/

Tms.ui = {
	id : {  
		xtype:"hidden"
		,name:"id"
		,hidden:true
		,hiddenLabel:true
	},
	prjID : {
		xtype : "hidden",
		name : "prjID",
		hidden : true,
		hiddenLabel : true
	}
	,prjName : {
		xtype : 'textfield'
		,id : 'prjName'
		,name : 'prjName'
		,fieldLabel : '项目名称'
		,emptyText : '请输入项目名称...'
		,isFormField : true
		,allowBlank : false
	}
	,prjName_display : {
		xtype : 'textfield'
		,id : 'prjName_1'
		,name : 'prjName'
		,fieldLabel : '项目名称'
		,anchor : '100%'
		,readOnly : true
		,allowBlank : true
	}
	,prjName_display2 : {
		xtype : 'formatdisplayfield'
		,id : 'prjName_2'
		,name : 'prjName'
		,fieldLabel : '项目名称'
		,fieldClass : 'x-form-display-field3'
		,anchor : '100%'
		,allowBlank : true
		,readOnly : true
	}
	,prjNumber : {
		xtype : 'textfield'
		,id : 'prjNumber'
		,name : 'prjNumber'
		,fieldLabel : '工程编号'
		,emptyText : '请输入工程编号...'
		,isFormField : true
		,allowBlank : false
	}
	,prjNumber_display : {
		xtype : 'textfield'
		,id : 'prjNumber_1'
		,name : 'prjNumber'
		,fieldLabel : '工程编号'
		,anchor : '100%'
		,readOnly : true
		,allowBlank : true
	}
	,prjNumber_readonly : {
		xtype : 'textfield'
		,id : 'prjNumber_2'
		,name : 'prjNumber'
		,fieldLabel : '工程编号'
		,readOnly : true
		,isFormField : true
		,allowBlank : true
	}
	,prjType_radio : {
		xtype : 'radiogroup'
		,id : 'prjType'
		,fieldLabel : '项目类别'
		,allowBlank : false
		,isFormField : true
		,labelWidth : 1
		,columns : 1
		,items : [{
			name : 'prjType', boxLabel : '投招标', labelSeparator : '', inputValue : '1'
		},{
			name : 'prjType', boxLabel : '规划', labelSeparator : '', inputValue : '2'
		},{
			name : 'prjType', boxLabel : '可研', labelSeparator : '', inputValue : '3'
		},{
			name : 'prjType', boxLabel : '初设', labelSeparator : '', inputValue : '4'
		},{
			name : 'prjType', boxLabel : '施工图', labelSeparator : '', inputValue : '5'
		}]
	}
	,prjType_check : {
		xtype : 'checkboxgroup'
		,id : 'prjType_1'
		,fieldLabel : '项目类别'
		,allowBlank : false
		,isFormField : true
		,labelWidth : 1
		,columns : 1
		,items : [{
			name : 'prjType', boxLabel : '投招标', labelSeparator : '', inputValue : '1'
		},{
			name : 'prjType', boxLabel : '规划', labelSeparator : '', inputValue : '2'
		},{
			name : 'prjType', boxLabel : '可研', labelSeparator : '', inputValue : '3'
		},{
			name : 'prjType', boxLabel : '初设', labelSeparator : '', inputValue : '4'
		},{
			name : 'prjType', boxLabel : '施工图', labelSeparator : '', inputValue : '5'
		}]
	}
	,prjType_display : {
		xtype : 'formatdisplayfield'
		,id : 'prjType_2'
		,name : 'prjType'
		,fieldLabel : '项目类别'
		,fieldClass : 'x-form-display-field3'			
		,allowBlank : true
		,renderer : function(v){
			var sv = "<UL style='padding-left:15px'>";
			for(var i=1;i<Tms.projectTypes.length;i++){
				if(i == v){
					sv += "<li type=disc>" + Tms.projectTypes[v] + "</li>";
				}else{
					sv += "<li type=circle>&nbsp;</li>";
				}
			}
			sv += "</UL>";
			return sv;
		}
	}
	,prjType_readonly : {
		xtype : 'formatdisplayfield'
		,id : 'prjType_3'
		,name : 'prjType'
		,fieldLabel : '项目类别'
		,fieldClass : 'x-form-display-field3'			
		,allowBlank : true
		,readOnly : true
		,renderer : function(v){
			return Tms.projectTypes[v];
		}
	}
	,prjState_check : {
		xtype : 'checkboxgroup'
		,id : 'prjState'
		,fieldLabel : '项目状态'
		,allowBlank : false
		,isFormField : true
		,labelWidth : 1
		,columns : 1
		,items : [{
			name : 'prjState', boxLabel : '已完成', labelSeparator : '', inputValue : '1'
		},{
			name : 'prjState', boxLabel : '已审核', labelSeparator : '', inputValue : '2'
		},{
			name : 'prjState', boxLabel : '已签合同', labelSeparator : '', inputValue : '3'
		},{
			name : 'prjState', boxLabel : '已付订金', labelSeparator : '', inputValue : '4'
		},{
			name : 'prjState', boxLabel : '已收款', labelSeparator : '', inputValue : '5'
		}]
	}
	,prjState_display : {
		xtype : 'formatdisplayfield'
		,id : 'prjState_1'
		,name : 'prjState'
		,fieldLabel : '项目状态'
		,fieldClass : 'x-form-display-field3'
		,allowBlank : true
		,renderer : function(v){return val2view(v,Tms.projectStateNames,'<br>');}
		,value : ''
	}
	,startDate : {
		xtype : 'datefield'
		,id : 'startDate'
		,name : 'startDate'
		,fieldLabel : '委托日期'
		,emptyText : '请选择委托日期...'
		,format : 'Y-m-d'
		,editable:false
		,allowBlank : false
	}
	,startDate_display : {
		xtype : 'datefield'
		,id : 'startDate_id'
		,name : 'startDate'
		,fieldLabel : '委托日期'
		,format : 'Y-m-d'
		,readOnly : true
		,editable:false
		,allowBlank : true
	}
	,endDate : {
		xtype : 'datefield'
		,id : 'endDate_id'
		,name : 'endDate'
		,fieldLabel : '截止日期'
		,emptyText : '请选择截止日期...'
		,format : 'Y-m-d'
		,editable:false
		,allowBlank : false
	}
	,endDate_hidden : {
		xtype:"hidden"
		,hidden:true
		,hiddenLabel:true
		,name : 'endDate'
		,setValue : function(date){
			this.value = date;
			if(this.rendered){
				if(Ext.isDate(this.value)){
					this.value = this.value.dateFormat('Y-m-d');
				}else{
					this.value = '';
				}

				this.el.dom.value = (Ext.isEmpty(this.value) ? '' : this.value);
				this.validate();
			}
			return this;
		}
		,allowBlank : false
	}
	,endDate_display : {
		xtype : 'datefield'
		,id : 'endDate_id'
		,name : 'endDate'
		,fieldLabel : '截止日期'
		,format : 'Y-m-d'
		,readOnly : true
		,editable:false
		,allowBlank : true
	}
	,designer : {		
		xtype:'superboxselect'
		,id: 'designer_id'
		,name: 'designer'
		,fieldLabel: '设计人员'
		,emptyText : '请选择设计人员 ...'
		,allowBlank:false
		,resizable: true
		,anchor:'95%'
		,mode: 'local'
		,displayField: 'userName'
		,valueField: 'id'
		,navigateItemsWithTab: false
		,store : {
			xtype : 'store'
			//,autoLoad: true
			,fields : ['id','userName']
		}
        //displayFieldTpl: '{state} ({abbr})',
	}
	,corrector : {
		allowBlank:false,
        xtype:'superboxselect',
        fieldLabel: '校对人员',
		emptyText : '请选择校对人员 ...',
        resizable: true,
        id: 'corrector_id',
        name: 'corrector',
        anchor:'95%',
		store : {
			xtype : 'store'
			//,autoLoad: true
			,fields : ['id','userName']
		},
        mode: 'local',
        displayField: 'userName',
        //displayFieldTpl: '{state} ({abbr})',
        valueField: 'id',
		navigateItemsWithTab: false
	}
	,prjPriority_combo : {
		xtype : 'combo'
		,id : 'prjPriority_id'
		,hiddenName : 'prjPriority'
		,fieldLabel : '优先级别'
		,emptyText : '请选择优先级 ...'
		,listWidth : 200
		,valueField : 'id'
		,displayField : 'text'
		,triggerAction : 'all'
		,allowBlank : false
		,forceSelection : true
		,selectOnFocus : true
		,typeAhead : true
		,mode : 'local'//本地数据
		,store : new Ext.data.SimpleStore({
            fields: ['id', 'text'],
            data : [['1','最高级'],['2','普通级'],['3','可缓级']]
       }) 
	}
	,prjPriority_display : {
		xtype : 'formatdisplayfield'
		,id : 'prjPriority_id'
		,name : 'prjPriority'
		,fieldLabel : '优先级别'
		,fieldClass : 'x-form-display-field3'
		,allowBlank : true
		,renderer : function(v){
			if(v == null || v == 0){
				return Tms.projectPriority[0][0];
			}
			return Tms.projectPriority[v-1][0];
		}
		,value : ''
	}
	,chiefDept_display : {
		xtype : 'formatdisplayfield'
		,id : 'director_id'
		,name : 'chiefDept'
		,fieldLabel : '选室主任'
		,fieldClass : 'x-form-display-field3'			
		,allowBlank : true
		,renderer : function(v){return v;}//TODO bjw 采用ajax技术获取指定ID的部门名称}
		,value : ''
	}
	,chiefDept_combo : {
		xtype : 'combo'
		,id : 'chiefDept_id'
		,hiddenName : 'chiefDept'
		,fieldLabel : '选负责室'
		,emptyText : '请选择负责室 ...'
		,forceSelection : true
		,listWidth : 200
		,valueField : 'id'
		,displayField : 'depart'
		,editable: false
		,typeAhead : true
		,triggerAction : 'all'
		,selectOnFocus : true
		,allowBlank : false 
		,mode : 'remote'//远程
		,store : {
			xtype : 'store'
			,proxy:new Ext.data.HttpProxy({url : Tms.URLS.majorDepartList})
			,autoLoad: true
			,reader : new Ext.data.JsonReader({
				root : 'data'
				,fields : [{name : 'id'},{name: 'depart',mapping:'deptName'}]
			})	
		}
		,listeners:{
			select:function(){
				try{
					var _deptID = this.value;
					var cp = Ext.getCmp('chiefPerson_id');
					cp.setValue('');
					cp.store.reload({params:{deptID: _deptID}});
				}catch(e){}
			}
		}
	}
	,chiefDept_combo4query : {
		xtype : 'combo'
		,id : 'chiefDept_id_query'
		,hiddenName : 'chiefDept'
		,fieldLabel : '负责部门'
		,emptyText : '请选择负责部门 ...'
		,forceSelection : true
		,width: 150
		,listWidth : 200
		,valueField : 'id'
		,displayField : 'depart'
		,editable: false
		,typeAhead : true
		,triggerAction : 'all'
		,selectOnFocus : false
		,allowBlank : true 
		,mode : 'remote'//远程
		,store : {
			xtype : 'store'
			,proxy:new Ext.data.HttpProxy({url : Tms.URLS.majorDepartList})
			,autoLoad: true
			,reader : new Ext.data.JsonReader({
				root : 'data'
				,fields : [{name : 'id'},{name: 'depart',mapping:'deptName'}]
			})
		}
		,listeners :{
			select : function(combo, record, index) {
				var _deptID = this.value;
				var cpc = Ext.getCmp("chiefPerson_id_query");
				var pc = Ext.getCmp("person_id_query");
					if(cpc != null){
						cpc.clearValue();
					}
					if(pc != null){
						pc.clearValue();
					}
					Ext.Ajax.request({
						url : Tms.URLS.personListByDept,
						success : function(response,options) {
							var json = Ext.util.JSON.decode(response.responseText);
							if(json.success){
								if(cpc != null){
									cpc.store.loadData(json.data);
								}
								if(pc != null){
									pc.store.loadData(json.data);
								}
							}else{
								Ext.Msg.alert('提示',json.message);
							}
						},
						failure : function() {
							Ext.Msg.alert('提示', '网络通信失败，请重试！');
						},
						timeout : 30000,
						params : {
							deptID : _deptID
						}
					});
			}
		}
	}
	,linkedChiefPerson_combo4query : {
		xtype : 'combo'
		,id : 'chiefPerson_id_query'
		,hiddenName : 'chiefPerson'
		,fieldLabel : '选负责人'
		,emptyText : '请选择负责人 ...'
		,forceSelection : true
		,width : 150
		,listWidth : 150
		,valueField : 'id'
		,displayField : 'userName'
		,editable: false
		,typeAhead : true
		,triggerAction : 'all'
		,selectOnFocus : true
		,allowBlank : true
		,mode : 'local'
		,store : {
			xtype : 'arraystore'
			,fields : [{name : 'id',mapping:'id'},{name: 'userName',mapping:'userName'}]
			,data : []
		}
	}
	,chiefPerson_combo4query : {
		xtype : 'combo'
		,id : 'chiefPerson_id_query'
		,hiddenName : 'chiefPerson'
		,fieldLabel : '选负责人'
		,emptyText : '请选择负责人 ...'
		,forceSelection : true
		,width : 150
		,listWidth : 150
		,valueField : 'id'
		,displayField : 'userName'
		,editable: false
		,typeAhead : true
		,triggerAction : 'all'
		,selectOnFocus : true
		,allowBlank : true
		,mode : 'remote'
		,store : {
			xtype : 'store'
			,proxy:new Ext.data.HttpProxy({url : Tms.URLS.personListByDept})
			,reader : new Ext.data.JsonReader({
				root : 'data'
				,fields : [{name : 'id'},{name: 'userName'}]
			})
			,listeners : {
				beforeload : function(store,options){
					store.baseParams = {deptID : Tms.user.deptID};
				}
			}
		}
	}
	,person_combo4query : {
		xtype : 'combo'
		,id : 'person_id_query'
		,hiddenName : 'person'
		,fieldLabel : '参与人员'
		,emptyText : '请选择参与人员 ...'
		,forceSelection : true
		,width : 150
		,listWidth : 150
		,valueField : 'id'
		,displayField : 'userName'
		,editable: false
		,typeAhead : true
		,triggerAction : 'all'
		,selectOnFocus : true
		,allowBlank : true
		//,mode : 'remote'
		,mode : 'local'
		,store : {
			xtype : 'arraystore'
			,fields : [{name : 'id',mapping:'id'},{name: 'userName',mapping:'userName'}]
			,data : []
			/*,proxy:new Ext.data.HttpProxy({url : Tms.URLS.personListByDept})
			,reader : new Ext.data.JsonReader({
				root : 'data'
				,fields : [{name : 'id'},{name: 'userName'}]
			})
			,listeners : {
				beforeload : function(store,options){
					var qf = Ext.getCmp('queryForm');
					var _deptID = -1;
					store.baseParams = {deptID : _deptID};
				}
			}*/
		}
	}
	,chiefPerson_combo : {
		xtype : 'combo'
		,id : 'chiefPerson_id'
		,hiddenName : 'chiefPerson'
		,fieldLabel : '选负责人'
		,emptyText : '请选择负责人 ...'
		,forceSelection : true
		,listWidth : 200
		,valueField : 'id'
		,displayField : 'userName'
		,editable: false
		,typeAhead : true
		,triggerAction : 'all'
		,selectOnFocus : true
		,allowBlank : true
		//,mode : 'remote'
		,mode : 'local'
		,store : {
			xtype : 'store'
			,proxy:new Ext.data.HttpProxy({url : Tms.URLS.personList})
			,reader : new Ext.data.JsonReader({
				root : 'data'
				,fields : [{name : 'id'},{name: 'userName'}]
			})
		}
	}
	,minorPerson_combo : {
		xtype : 'combo'
		,id : 'minorPerson_id'
		,hiddenName : 'minorPerson'
		,fieldLabel : '选负责人'
		,emptyText : '请选择负责人 ...'
		,forceSelection : true
		,listWidth : 200
		,valueField : 'id'
		,displayField : 'userName'
		,editable: false
		,typeAhead : true
		,triggerAction : 'all'
		,selectOnFocus : true
		,allowBlank : true
		,mode : 'local'
		,store : {
			xtype : 'store'
			,proxy:new Ext.data.HttpProxy({url : Tms.URLS.personList})
			,reader : new Ext.data.JsonReader({
				root : 'data'
				,fields : [{name : 'id'},{name: 'userName'}]
			})	
		}
	}
	,accomplishment_combo :{
		xtype : 'combo'
		,id : 'accomplishment_id'
		,hiddenName : 'accomplishment'
		,fieldLabel : '完成比率'
		,emptyText : '请选择完成比率 ...'
		,listWidth : 200
		,mode : 'local'
		,store : new Ext.data.SimpleStore({
            fields: ['id', 'text'],
            data : [['0','0%'],['1','25%'],['2','50%'],['3','75%'],['4','100%']]
       })
		,valueField : 'id'
		,displayField : 'text'
		,forceSelection : true
		,editable: false
		,allowBlank : true
		,typeAhead : true
		,triggerAction : 'all'
		,selectOnFocus : true
		,allowBlank : false
	}
	,accomplishment_display : {
		xtype : 'formatdisplayfield'
		,id : 'accomplishment'
		,name : 'accomplishment'
		,fieldLabel : '完成比率'
		,fieldClass : 'x-form-display-field3'
		,allowBlank : true
		,renderer : function(v){return v;}
		,value : '0%'
	}
	,remark : {
		xtype : 'htmleditor'
		,id : 'remark'
		,name : 'remark'
		,fieldLabel : '备注'
		,emptyText : '请输入备注信息...'
		,height : 100
		,anchor : '95%'
	}
	,subImgName : {
		xtype : 'textfield'
		,id : 'subImgName'
		,name : 'subImgName'
		,fieldLabel : '子项名称'
		,emptyText : '请输入子项名称...'
		,isFormField : true
		,allowBlank : false
		,readOnly : false
	}
	,subprj_combo : {
		xtype : 'combo'
		,id : 'subprj_id'
		,hiddenName : 'subprj'
		,fieldLabel : '项目名称'
		,emptyText : '请选择项目名称 ...'
		,forceSelection : true
		,listWidth : 200
		,valueField : 'id'
		,displayField : 'subprjName'
		,editable: false
		,typeAhead : true
		,triggerAction : 'all'
		,selectOnFocus : true
		,allowBlank : true
		,mode : 'remote'
		,store : {
			xtype : 'store'
			,reader:new Ext.data.JsonReader({
				 id:'id'
				,root:'data'
				,fields:[
					{name: 'id'}
					,{name: 'subprjName'}
				]
			})
			,proxy:new Ext.data.HttpProxy({url:Tms.URLS.subprjList})
		}
	}
	,imgtype_combo : {
		xtype : 'combo'
		,id : 'imgtype_id'
		,hiddenName : 'imgtype'
		,fieldLabel : '图别'
		,emptyText : '请选择图别 ...'
		,forceSelection : true
		,listWidth : 200
		,valueField : 'id'
		,displayField : 'imgtypeName'
		,editable: false
		,typeAhead : true
		,triggerAction : 'all'
		,selectOnFocus : true
		,allowBlank : true
		,mode : 'remote'
		,store : {
			xtype : 'store'
			,reader:new Ext.data.JsonReader({
				 id:'id'
				,root:'data'
				,fields:[
					{name: 'id'}
					,{name: 'imgtypeName'}
				]
			})
			,proxy:new Ext.data.HttpProxy({url:Tms.URLS.imgtypeList})
		}
	}
	,imgsize_combo : {
		xtype : 'combo'
		,id : 'imgsize_id'
		,hiddenName : 'imgsize'
		,fieldLabel : '图幅'
		,emptyText : '请选择图幅 ...'
		,forceSelection : true
		,listWidth : 200
		,valueField : 'id'
		,displayField : 'imgsizeName'
		,editable: false
		,typeAhead : true
		,triggerAction : 'all'
		,selectOnFocus : true
		,allowBlank : true
		,mode : 'remote'
		,store : {
			xtype : 'store'
			,reader:new Ext.data.JsonReader({
				 id:'id'
				,root:'data'
				,fields:[
					{name: 'id'}
					,{name: 'imgsizeName'}
				]
			})
			,proxy:new Ext.data.HttpProxy({url:Tms.URLS.imgsizeList})
		}
	}
	,imgnum : {
		xtype : 'numberfield'
		,id : 'imgnum'
		,name : 'imgnum'
		,fieldLabel : '张数'
		,emptyText : '请输入张数...'
		,isFormField : true
		,allowBlank : false
	}
	,checkDate : {
		xtype : 'formatdisplayfield'
		,id : 'checkDate'
		,name : 'checkDate'
		,fieldLabel : '审核时间'
		,fieldClass : 'x-form-display-field3'			
		,isFormField : true
		,allowBlank : false
		,renderer : function(v){
			if(v && v != ''){
				if(v >0){
					return '还差'+v+'天';
				}else{
					return '逾期'+(0-v)+'天';
				}
			}else{
				return '';
			}
		}
		,value : ''
	}
	,fileUploadGrid : {
		xtype : 'grid',
		id : 'filesGrid',
		border : false,
		enableColumnMove : false,
		enableHdMenu : false,
		autoExpandColumn : 'fileNameCol',
		anchor : '95%',
		height : 120,
		columns : [
				new Ext.grid.RowNumberer(),
				{
					header : '文件名',
					id : 'fileNameCol',
					dataIndex : 'name',
					sortable : false,
					fixed : true,
					renderer : function(_v, cellmeta, record) {
						return '<div id="fileName_'
								+ record.data.fileId + '">' + _v
								+ '</div>';
					}
				},
				{
					header : '大小',
					width : 80,
					dataIndex : 'size',
					sortable : false,
					fixed : true,
					renderer : function(_v, celmeta, record) {
						return '<div id="fileSize_'
								+ record.data.fileId + '">'
								+ Ext.util.Format.fileSize(_v)
								+ '</div>';
					},
					align : 'center'
				},
				{
					header : '类型',
					width : 50,
					dataIndex : 'type',
					sortable : false,
					fixed : true,
					renderer : function(_v, cellmeta, record) {
						var returnValue = '';
						var fileId = record.data.fileId;
						if (_v) {
							var css = '.db-ft-' + _v.toLowerCase() + '-small';
							if (Ext.isEmpty(Ext.util.CSS.getRule(css), true)) { // 判断样式是否存在
								returnValue = '<div id="fileType_' + fileId + '" class="db-ft-unknown-small" style="height: 16px;background-repeat: no-repeat;">' + '&nbsp;&nbsp;&nbsp;&nbsp;'+ _v.toUpperCase() + '</div>';
							} else {
								returnValue = '<div id="fileType_' + fileId + '" class="db-ft-' + _v.toLowerCase() + '-small" style="height: 16px;background-repeat: no-repeat;"/>&nbsp;&nbsp;&nbsp;&nbsp;' + _v.toUpperCase() +'</div>';
							}
							return returnValue;
						}
						return '<div id="fileType_' + fileId + '" class="db-ft-unknown-small" style="height: 16px;background-repeat: no-repeat;"/>&nbsp;&nbsp;&nbsp;&nbsp;' + _v.toUpperCase() + '</div>';
					},
					align : 'center'
				}, {
					header : '操作',
					width : 50,
					dataIndex : '',
					renderer : function(v) {
						return '<div class="ux-row-action-href">删除</div>';
					},
					css : 'cursor:hand',
					sortable : false,
					fixed : true,
					align : 'center'
				} 
		],
		listeners : {
			cellclick : function(_grid,rowIndex,colIndex,event){
				if(colIndex === 4){
					var _store = _grid.store;
					Ext.Ajax.request({
						url : Tms.URLS.fileDel,
						success : function(response,options) {
							var json = Ext.util.JSON.decode(response.responseText);
							if(json.success){
								_grid.store.reload();
							}else{
								Ext.Msg.alert('提示',json.message);
							}
						},
						failure : function() {
							Ext.Msg.alert('提示', '网络通信失败，请重试！');
						},
						timeout : 30000,
						params : {
							prjID : _store.baseParams.prjID,
							category : _store.baseParams.category,
							subID : _store.baseParams.subID,
							name : _store.getAt(rowIndex).get('name')
						}
					});
				}
			}
		}, 
		store : {
			xtype : 'store',
			reader : new Ext.data.JsonReader({
				root : 'data',
				fields : [ {name:'name'},{name:'size'},{name:'type'},{name:'path'},{name:'category'},{name:'subID'}]
			}),
			url : Tms.URLS.fileList,//上传文件列表
			autoLoad : true
			/*,baseParams : {
				prjID : record.data.prjID,
				category : 'design',
				subID : record.data.id
			}*/
		}
	} 
	,fileDownloadGrid : {
		xtype : 'grid',
		id : 'filesGrid',
		border : false,
		enableColumnMove : false,
		enableHdMenu : false,
		autoExpandColumn : 'fileNameCol',
		anchor : '100%',
		height : 150,
		columns : [
				new Ext.grid.RowNumberer(),
				{
					header : '文件名',
					id : 'fileNameCol',
					dataIndex : 'name',
					sortable : false,
					fixed : true,
					renderer : function(_v, cellmeta, record) {
						return '<div id="fileName_'
								+ record.data.fileId + '">' + _v
								+ '</div>';
					}
				},
				{
					header : '大小',
					width : 80,
					dataIndex : 'size',
					sortable : false,
					fixed : true,
					renderer : function(_v, celmeta, record) {
						return '<div id="fileSize_'
								+ record.data.fileId + '">'
								+ Ext.util.Format.fileSize(_v)
								+ '</div>';
					},
					align : 'center'
				},
				{
					header : '类型',
					width : 50,
					dataIndex : 'type',
					sortable : false,
					fixed : true,
					renderer : function(_v, cellmeta, record) {
						var returnValue = '';
						var fileId = record.data.fileId;
						if (_v) {
							var css = '.db-ft-' + _v.toLowerCase() + '-small';
							if (Ext.isEmpty(Ext.util.CSS.getRule(css), true)) { // 判断样式是否存在
								returnValue = '<div id="fileType_' + fileId + '" class="db-ft-unknown-small" style="height: 16px;background-repeat: no-repeat;">' + '&nbsp;&nbsp;&nbsp;&nbsp;'+ _v.toUpperCase() + '</div>';
							} else {
								returnValue = '<div id="fileType_' + fileId + '" class="db-ft-' + _v.toLowerCase() + '-small" style="height: 16px;background-repeat: no-repeat;"/>&nbsp;&nbsp;&nbsp;&nbsp;' + _v.toUpperCase() +'</div>';
							}
							return returnValue;
						}
						return '<div id="fileType_' + fileId + '" class="db-ft-unknown-small" style="height: 16px;background-repeat: no-repeat;"/>&nbsp;&nbsp;&nbsp;&nbsp;' + _v.toUpperCase() + '</div>';
					},
					align : 'center'
				}, {
					header : '操作',
					width : 50,
					dataIndex : '',
					renderer : function(value, metaData, record, rowIndex, colIndex, store) {
						return '<a href="'+Tms.URLS.fileDownload+'&prjID='+store.baseParams.prjID+'&category='+record.get('category')+'&subID='+record.get('subID')+'&file_name='+record.get('name')+'" target="new">下载</a>';
					},
					css : 'cursor:hand',
					sortable : false,
					fixed : true,
					align : 'center'
				} 
		],
		store : {
			xtype : 'store',
			reader : new Ext.data.JsonReader({
				root : 'data',
				fields : [ {name:'name'},{name:'size'},{name:'type'},{name:'path'},{name:'category'},{name:'subID'}]
			}),
			url : Tms.URLS.fileList,//下载文件列表
			autoLoad : true
		}
	} 	
};

// the end of this file
