/*********************************************
 * 
 * description : ����Ԫ�������
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
		,fieldLabel : '��Ŀ����'
		,emptyText : '��������Ŀ����...'
		,isFormField : true
		,allowBlank : false
	}
	,prjName_display : {
		xtype : 'textfield'
		,id : 'prjName_1'
		,name : 'prjName'
		,fieldLabel : '��Ŀ����'
		,anchor : '100%'
		,readOnly : true
		,allowBlank : true
	}
	,prjName_display2 : {
		xtype : 'formatdisplayfield'
		,id : 'prjName_2'
		,name : 'prjName'
		,fieldLabel : '��Ŀ����'
		,fieldClass : 'x-form-display-field3'
		,anchor : '100%'
		,allowBlank : true
		,readOnly : true
	}
	,prjNumber : {
		xtype : 'textfield'
		,id : 'prjNumber'
		,name : 'prjNumber'
		,fieldLabel : '���̱��'
		,emptyText : '�����빤�̱��...'
		,isFormField : true
		,allowBlank : false
	}
	,prjNumber_display : {
		xtype : 'textfield'
		,id : 'prjNumber_1'
		,name : 'prjNumber'
		,fieldLabel : '���̱��'
		,anchor : '100%'
		,readOnly : true
		,allowBlank : true
	}
	,prjNumber_readonly : {
		xtype : 'textfield'
		,id : 'prjNumber_2'
		,name : 'prjNumber'
		,fieldLabel : '���̱��'
		,readOnly : true
		,isFormField : true
		,allowBlank : true
	}
	,prjType_radio : {
		xtype : 'radiogroup'
		,id : 'prjType'
		,fieldLabel : '��Ŀ���'
		,allowBlank : false
		,isFormField : true
		,labelWidth : 1
		,columns : 1
		,items : [{
			name : 'prjType', boxLabel : 'Ͷ�б�', labelSeparator : '', inputValue : '1'
		},{
			name : 'prjType', boxLabel : '�滮', labelSeparator : '', inputValue : '2'
		},{
			name : 'prjType', boxLabel : '����', labelSeparator : '', inputValue : '3'
		},{
			name : 'prjType', boxLabel : '����', labelSeparator : '', inputValue : '4'
		},{
			name : 'prjType', boxLabel : 'ʩ��ͼ', labelSeparator : '', inputValue : '5'
		}]
	}
	,prjType_check : {
		xtype : 'checkboxgroup'
		,id : 'prjType_1'
		,fieldLabel : '��Ŀ���'
		,allowBlank : false
		,isFormField : true
		,labelWidth : 1
		,columns : 1
		,items : [{
			name : 'prjType', boxLabel : 'Ͷ�б�', labelSeparator : '', inputValue : '1'
		},{
			name : 'prjType', boxLabel : '�滮', labelSeparator : '', inputValue : '2'
		},{
			name : 'prjType', boxLabel : '����', labelSeparator : '', inputValue : '3'
		},{
			name : 'prjType', boxLabel : '����', labelSeparator : '', inputValue : '4'
		},{
			name : 'prjType', boxLabel : 'ʩ��ͼ', labelSeparator : '', inputValue : '5'
		}]
	}
	,prjType_display : {
		xtype : 'formatdisplayfield'
		,id : 'prjType_2'
		,name : 'prjType'
		,fieldLabel : '��Ŀ���'
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
		,fieldLabel : '��Ŀ���'
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
		,fieldLabel : '��Ŀ״̬'
		,allowBlank : false
		,isFormField : true
		,labelWidth : 1
		,columns : 1
		,items : [{
			name : 'prjState', boxLabel : '�����', labelSeparator : '', inputValue : '1'
		},{
			name : 'prjState', boxLabel : '�����', labelSeparator : '', inputValue : '2'
		},{
			name : 'prjState', boxLabel : '��ǩ��ͬ', labelSeparator : '', inputValue : '3'
		},{
			name : 'prjState', boxLabel : '�Ѹ�����', labelSeparator : '', inputValue : '4'
		},{
			name : 'prjState', boxLabel : '���տ�', labelSeparator : '', inputValue : '5'
		}]
	}
	,prjState_display : {
		xtype : 'formatdisplayfield'
		,id : 'prjState_1'
		,name : 'prjState'
		,fieldLabel : '��Ŀ״̬'
		,fieldClass : 'x-form-display-field3'
		,allowBlank : true
		,renderer : function(v){return val2view(v,Tms.projectStateNames,'<br>');}
		,value : ''
	}
	,startDate : {
		xtype : 'datefield'
		,id : 'startDate'
		,name : 'startDate'
		,fieldLabel : 'ί������'
		,emptyText : '��ѡ��ί������...'
		,format : 'Y-m-d'
		,editable:false
		,allowBlank : false
	}
	,startDate_display : {
		xtype : 'datefield'
		,id : 'startDate_id'
		,name : 'startDate'
		,fieldLabel : 'ί������'
		,format : 'Y-m-d'
		,readOnly : true
		,editable:false
		,allowBlank : true
	}
	,endDate : {
		xtype : 'datefield'
		,id : 'endDate_id'
		,name : 'endDate'
		,fieldLabel : '��ֹ����'
		,emptyText : '��ѡ���ֹ����...'
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
		,fieldLabel : '��ֹ����'
		,format : 'Y-m-d'
		,readOnly : true
		,editable:false
		,allowBlank : true
	}
	,designer : {		
		xtype:'superboxselect'
		,id: 'designer_id'
		,name: 'designer'
		,fieldLabel: '�����Ա'
		,emptyText : '��ѡ�������Ա ...'
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
        fieldLabel: 'У����Ա',
		emptyText : '��ѡ��У����Ա ...',
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
		,fieldLabel : '���ȼ���'
		,emptyText : '��ѡ�����ȼ� ...'
		,listWidth : 200
		,valueField : 'id'
		,displayField : 'text'
		,triggerAction : 'all'
		,allowBlank : false
		,forceSelection : true
		,selectOnFocus : true
		,typeAhead : true
		,mode : 'local'//��������
		,store : new Ext.data.SimpleStore({
            fields: ['id', 'text'],
            data : [['1','��߼�'],['2','��ͨ��'],['3','�ɻ���']]
       }) 
	}
	,prjPriority_display : {
		xtype : 'formatdisplayfield'
		,id : 'prjPriority_id'
		,name : 'prjPriority'
		,fieldLabel : '���ȼ���'
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
		,fieldLabel : 'ѡ������'
		,fieldClass : 'x-form-display-field3'			
		,allowBlank : true
		,renderer : function(v){return v;}//TODO bjw ����ajax������ȡָ��ID�Ĳ�������}
		,value : ''
	}
	,chiefDept_combo : {
		xtype : 'combo'
		,id : 'chiefDept_id'
		,hiddenName : 'chiefDept'
		,fieldLabel : 'ѡ������'
		,emptyText : '��ѡ������ ...'
		,forceSelection : true
		,listWidth : 200
		,valueField : 'id'
		,displayField : 'depart'
		,editable: false
		,typeAhead : true
		,triggerAction : 'all'
		,selectOnFocus : true
		,allowBlank : false 
		,mode : 'remote'//Զ��
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
		,fieldLabel : '������'
		,emptyText : '��ѡ������ ...'
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
		,mode : 'remote'//Զ��
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
								Ext.Msg.alert('��ʾ',json.message);
							}
						},
						failure : function() {
							Ext.Msg.alert('��ʾ', '����ͨ��ʧ�ܣ������ԣ�');
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
		,fieldLabel : 'ѡ������'
		,emptyText : '��ѡ������ ...'
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
		,fieldLabel : 'ѡ������'
		,emptyText : '��ѡ������ ...'
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
		,fieldLabel : '������Ա'
		,emptyText : '��ѡ�������Ա ...'
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
		,fieldLabel : 'ѡ������'
		,emptyText : '��ѡ������ ...'
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
		,fieldLabel : 'ѡ������'
		,emptyText : '��ѡ������ ...'
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
		,fieldLabel : '��ɱ���'
		,emptyText : '��ѡ����ɱ��� ...'
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
		,fieldLabel : '��ɱ���'
		,fieldClass : 'x-form-display-field3'
		,allowBlank : true
		,renderer : function(v){return v;}
		,value : '0%'
	}
	,remark : {
		xtype : 'htmleditor'
		,id : 'remark'
		,name : 'remark'
		,fieldLabel : '��ע'
		,emptyText : '�����뱸ע��Ϣ...'
		,height : 100
		,anchor : '95%'
	}
	,subImgName : {
		xtype : 'textfield'
		,id : 'subImgName'
		,name : 'subImgName'
		,fieldLabel : '��������'
		,emptyText : '��������������...'
		,isFormField : true
		,allowBlank : false
		,readOnly : false
	}
	,subprj_combo : {
		xtype : 'combo'
		,id : 'subprj_id'
		,hiddenName : 'subprj'
		,fieldLabel : '��Ŀ����'
		,emptyText : '��ѡ����Ŀ���� ...'
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
		,fieldLabel : 'ͼ��'
		,emptyText : '��ѡ��ͼ�� ...'
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
		,fieldLabel : 'ͼ��'
		,emptyText : '��ѡ��ͼ�� ...'
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
		,fieldLabel : '����'
		,emptyText : '����������...'
		,isFormField : true
		,allowBlank : false
	}
	,checkDate : {
		xtype : 'formatdisplayfield'
		,id : 'checkDate'
		,name : 'checkDate'
		,fieldLabel : '���ʱ��'
		,fieldClass : 'x-form-display-field3'			
		,isFormField : true
		,allowBlank : false
		,renderer : function(v){
			if(v && v != ''){
				if(v >0){
					return '����'+v+'��';
				}else{
					return '����'+(0-v)+'��';
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
					header : '�ļ���',
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
					header : '��С',
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
					header : '����',
					width : 50,
					dataIndex : 'type',
					sortable : false,
					fixed : true,
					renderer : function(_v, cellmeta, record) {
						var returnValue = '';
						var fileId = record.data.fileId;
						if (_v) {
							var css = '.db-ft-' + _v.toLowerCase() + '-small';
							if (Ext.isEmpty(Ext.util.CSS.getRule(css), true)) { // �ж���ʽ�Ƿ����
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
					header : '����',
					width : 50,
					dataIndex : '',
					renderer : function(v) {
						return '<div class="ux-row-action-href">ɾ��</div>';
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
								Ext.Msg.alert('��ʾ',json.message);
							}
						},
						failure : function() {
							Ext.Msg.alert('��ʾ', '����ͨ��ʧ�ܣ������ԣ�');
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
			url : Tms.URLS.fileList,//�ϴ��ļ��б�
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
					header : '�ļ���',
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
					header : '��С',
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
					header : '����',
					width : 50,
					dataIndex : 'type',
					sortable : false,
					fixed : true,
					renderer : function(_v, cellmeta, record) {
						var returnValue = '';
						var fileId = record.data.fileId;
						if (_v) {
							var css = '.db-ft-' + _v.toLowerCase() + '-small';
							if (Ext.isEmpty(Ext.util.CSS.getRule(css), true)) { // �ж���ʽ�Ƿ����
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
					header : '����',
					width : 50,
					dataIndex : '',
					renderer : function(value, metaData, record, rowIndex, colIndex, store) {
						return '<a href="'+Tms.URLS.fileDownload+'&prjID='+store.baseParams.prjID+'&category='+record.get('category')+'&subID='+record.get('subID')+'&file_name='+record.get('name')+'" target="new">����</a>';
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
			url : Tms.URLS.fileList,//�����ļ��б�
			autoLoad : true
		}
	} 	
};

// the end of this file
