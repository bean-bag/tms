/*********************************************
 * 
 * description: 提交表单模板
 * 
 * author: baojunwen email:junctioner@163.com
 * 
**********************************************/

//合同或者计划人员，创建新委托
Tms.aideCreateForm = Ext.extend(Ext.form.FormPanel, {
	initComponent:function() {

		Ext.apply(this, {
			frame:true
			,labelWidth: 60
			
			,items: [
				Tms.ui.id
				,{
					layout:'column',
					items:[{
						columnWidth:.5
						,layout: 'form'
						,items: [
							Tms.ui.prjName
							,this.isCreated ? Tms.ui.prjType_check : Tms.ui.prjType_radio							
							,Tms.ui.startDate
						]
					}
					,{
						columnWidth:.5
						,layout: 'form'
						,items: [
							Tms.user.role.isHelper ? Tms.ui.prjNumber : Tms.ui.prjNumber_readonly 
							,this.isCreated ? Tms.ui.prjState_display : Tms.ui.prjState_check
						]
					}]
				}
				,Tms.ui.remark
			] 
		});
		Tms.aideCreateForm.superclass.initComponent.apply(this, arguments);
	}
});
Ext.reg('aideCreateForm', Tms.aideCreateForm);


//计划人员委派任务
Tms.planForm = Ext.extend(Ext.form.FormPanel, {
	initComponent:function() {

		Ext.apply(this, {
			frame:true
			,labelWidth: 60
			
			,items: [
				Tms.ui.id
				,{
					layout:'column',
					items:[{
						columnWidth:.5
						,layout: 'form'
						,items: [
							Tms.ui.prjName_display
							,Tms.ui.prjType_display
							,Tms.ui.team_combo
							,Tms.ui.startDate_display
							//,Tms.ui.prjPriority
						]
					}
					,{
						columnWidth:.5
						,layout: 'form'
						,items: [
							Tms.ui.prjNumber_display
							,Tms.ui.prjState_display
							//,Tms.ui.chiefPerson_combo
							,{
								xtype : 'combo'
								,id : 'prjPriority_id'
								,hiddenName : 'prjPriority'
								,fieldLabel : '优先级'
								,emptyText : '请选择优先级 ...'
								,forceSelection : true
								,listWidth : 200
								,mode : 'local'//本地数据
								,store : {
									xtype : 'simplestore'
									,fields : ['text','value']
									,data : Tms.projectPriority
								}
								,valueField : 'value'
								,displayField : 'text'
								,typeAhead : true
								,triggerAction : 'all'
								,selectOnFocus : true//用户不能自己输入,只能选择列表中有的记录
								,allowBlank : false
							}
							
							,Tms.ui.endDate
						]
					}]
				}
				,Tms.ui.remark
			]
		});
		Tms.planForm.superclass.initComponent.apply(this, arguments);
	}
});
Ext.reg('planForm', Tms.planForm);
/**
 * 室主任委派任务
 **/
Tms.directorForm = Ext.extend(Ext.form.FormPanel, {
	initComponent:function() {
		
		Ext.apply(this, {
			frame:true
			,labelWidth: 60
			
			,items: [
				Tms.ui.id
				,{
					layout:'column',
					items:[{
						columnWidth:.5
						,layout: 'form'
						,items: [
							Tms.ui.prjName_display
							,Tms.ui.prjType_display
							,Tms.ui.team_display
							//设计人员
							,Tms.ui.startDate_display
							,Tms.ui.prjPriority_display							
				         ]
					}
					,{
						columnWidth:.5
						,layout: 'form'
						,items: [
							Tms.ui.prjNumber_display
							,Tms.ui.prjState_display
							,Tms.ui.chiefPerson_combo
							//校对人员
							,Tms.ui.endDate_display
							,Tms.ui.accomplishment_display
						]
					}]
				}
				//上传条件图				
				,{
					xtype : 'uploaddisplayfield'
					,id : 'docs'	
					,name : 'docs'
					,fieldLabel : '条件图'
				}				
				,Tms.ui.remark
			]
		});
		Tms.directorForm.superclass.initComponent.apply(this, arguments);
	}
});
Ext.reg('directorForm', Tms.directorForm);
/**
 * 项目负责人委派任务
 **/
Tms.managerForm = Ext.extend(Ext.form.FormPanel, {
	initComponent:function() {
		
		Ext.apply(this, {
			frame:true
			,labelWidth: 60
			
			,items: [
				Tms.ui.id
				,{
					layout:'column',
					items:[{
						columnWidth:.5
						,layout: 'form'
						,items: [
							Tms.ui.prjName_display
							,Tms.ui.prjType_display
							,Tms.ui.team_display
							//设计人员
							,Tms.ui.startDate_display
							,Tms.ui.prjPriority_display							
				         ]
					}		
					,{
						columnWidth:.5
						,layout: 'form'
						,items: [
							Tms.ui.prjNumber_display
							,Tms.ui.prjState_display
							,Tms.ui.chiefPerson_combo
							//校对人员
							,Tms.ui.endDate_display
							,Tms.ui.accomplishment_display
						]
					}]
				}
				//上传条件图				
				,{
					xtype : 'uploaddisplayfield'
					,id : 'docs'	
					,name : 'docs'
					,fieldLabel : '条件图'
				}				
				,Tms.ui.remark
			]
		});
		Tms.planForm.superclass.initComponent.apply(this, arguments);
	}
});
Ext.reg('managerForm', Tms.managerForm);


function buildRole(info){
	var role = {
			perm : info
			,isHelper : false
			,isPlanner : false
			,isOfficer : false
			,isLeader : false
			,isDesigner : false
			,isCorrector : false
			,isBudgeteer : false
			,isAssessor : false
			,isArchive : false
			,isAccountant : false
			,isOutprint : false
			,isCeo : false
		};
	var ary = info;//.split(',');
	delete info;
	for(var i=0;i<ary.length;i++){
		if(ary[i] == 1){
			role.isHelper = true;	//合同助理
		}else if(ary[i] == 2){
			role.isPlanner = true;//计划
		}else if(ary[i] == 3){
			role.isOfficer = true;//项目主管(室主任)
		}else if(ary[i] == 4){
			role.isLeader = true;//责任人
		}else if(ary[i] == 6){
			role.isDesigner = true;//设计师
		}else if(ary[i] == 7){
			role.isAssessor = true;//总工
		}else if(ary[i] == 8){
			role.isBudgeteer = true;//预算
		}else if(ary[i] == 9){
			role.isOutprint = true;//出图
		}else if(ary[i] == 10){
			role.isArchive = true;//档案
		}else if(ary[i] == 11){
			role.isAccountant = true;//会计
		}else if(ary[i] == 12){
			role.isCeo = true; //总裁
		}
	}
	return role;
};
// the end of this file
