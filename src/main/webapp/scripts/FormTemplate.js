/*********************************************
 * 
 * description: �ύ��ģ��
 * 
 * author: baojunwen email:junctioner@163.com
 * 
**********************************************/

//��ͬ���߼ƻ���Ա��������ί��
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


//�ƻ���Աί������
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
								,fieldLabel : '���ȼ�'
								,emptyText : '��ѡ�����ȼ� ...'
								,forceSelection : true
								,listWidth : 200
								,mode : 'local'//��������
								,store : {
									xtype : 'simplestore'
									,fields : ['text','value']
									,data : Tms.projectPriority
								}
								,valueField : 'value'
								,displayField : 'text'
								,typeAhead : true
								,triggerAction : 'all'
								,selectOnFocus : true//�û������Լ�����,ֻ��ѡ���б����еļ�¼
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
 * ������ί������
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
							//�����Ա
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
							//У����Ա
							,Tms.ui.endDate_display
							,Tms.ui.accomplishment_display
						]
					}]
				}
				//�ϴ�����ͼ				
				,{
					xtype : 'uploaddisplayfield'
					,id : 'docs'	
					,name : 'docs'
					,fieldLabel : '����ͼ'
				}				
				,Tms.ui.remark
			]
		});
		Tms.directorForm.superclass.initComponent.apply(this, arguments);
	}
});
Ext.reg('directorForm', Tms.directorForm);
/**
 * ��Ŀ������ί������
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
							//�����Ա
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
							//У����Ա
							,Tms.ui.endDate_display
							,Tms.ui.accomplishment_display
						]
					}]
				}
				//�ϴ�����ͼ				
				,{
					xtype : 'uploaddisplayfield'
					,id : 'docs'	
					,name : 'docs'
					,fieldLabel : '����ͼ'
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
			role.isHelper = true;	//��ͬ����
		}else if(ary[i] == 2){
			role.isPlanner = true;//�ƻ�
		}else if(ary[i] == 3){
			role.isOfficer = true;//��Ŀ����(������)
		}else if(ary[i] == 4){
			role.isLeader = true;//������
		}else if(ary[i] == 6){
			role.isDesigner = true;//���ʦ
		}else if(ary[i] == 7){
			role.isAssessor = true;//�ܹ�
		}else if(ary[i] == 8){
			role.isBudgeteer = true;//Ԥ��
		}else if(ary[i] == 9){
			role.isOutprint = true;//��ͼ
		}else if(ary[i] == 10){
			role.isArchive = true;//����
		}else if(ary[i] == 11){
			role.isAccountant = true;//���
		}else if(ary[i] == 12){
			role.isCeo = true; //�ܲ�
		}
	}
	return role;
};
// the end of this file
