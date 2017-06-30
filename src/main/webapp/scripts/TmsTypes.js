Tms.userTextItem = Ext.extend(Ext.Toolbar.TextItem,{
	onRender : function(ct, position) {
		 try{
			this.text = '��ӭ[ <font color=red>'+Tms.user.userName+'</font> ]ʹ���������ϵͳ��';
		 }catch(e){
			this.text = '��ӭʹ���������ϵͳ��';		 
		 }
	   Tms.userTextItem.superclass.onRender.call(this, ct, position);
	}
});
Ext.reg('tms_tbtext', Tms.userTextItem);

/*У���������*/
Tms.verifyCodeField = Ext.extend(Ext.form.TextField,  {
	onRender : function(ct, position){
		Tms.verifyCodeField.superclass.onRender.call(this, ct, position);

		var imgEl = this.el.parent().createChild({
			tag : 'img'
			,align : 'absbottom'
			,src : this.vcUrl
			,title : this.vcTip || '���ͼƬ������֤��'
			,width : this.vcWidth
			,height : this.vcHeight
			,style : this.vcStyle
		});
		
		var url = this.vcUrl;
		imgEl.on('click', function(el){ 
			el.target.setAttribute('src', url +"&random="+ Math.random());
		});		
	}
	,refresh : function(){
		this.el.dom.nextSibling.setAttribute('src', this.vcUrl +"&random="+ Math.random());			
	}
});
Ext.reg('verifycodefield', Tms.verifyCodeField);

Tms.prjStateField = Ext.extend(Ext.form.DisplayField,  {
	setRawValue : function(v){
	   if(this.htmlEncode){
		  v = Ext.util.Format.htmlEncode(v);
	   }

	   return this.rendered ? (this.el.dom.innerHTML = val2view(v,this.etymons,'<br>') ) : (this.value = v);
	}
});
Ext.reg('prjStateField', Tms.prjStateField);

/*��ʽ����ʾ���*/
Tms.FormatDisplayField = Ext.extend(Ext.form.DisplayField,  {
	setRawValue : function(v){
	   if(this.htmlEncode){
		  v = Ext.util.Format.htmlEncode(v);
	   }

		if(this.rendered){
			var fv = '';
			
			//�ȸ�ʽ��
			if (this.dateFormat && Ext.isDate(v)) {  
				fv = this.el.dom.innerHTML = v.dateFormat(this.dateFormat);  
			}else if (this.numberFormat && typeof v == 'number') {  
				fv = this.el.dom.innerHTML = Ext.util.Format.number(v, this.numberFormat);  
			}else {
				fv = v;
			}
			
			//����Ⱦ���
			if(this.renderer && typeof this.renderer == 'function'){
				return this.el.dom.innerHTML = this.renderer(fv);
			}else{
				return this.el.dom.innerHTML = fv;
			}
		}else{
			return this.value = v;
		}
	   //return this.rendered ? (this.el.dom.innerHTML = renderer(v) ) : (this.value = v);
	}
	,renderer : function(v){return v;}
});
Ext.reg('formatdisplayfield', Tms.FormatDisplayField);

/*��ʽ����ʾ���*/
Tms.UploadDisplayField = Ext.extend(Ext.form.DisplayField,  {
	fieldClass : 'x-form-upload-field'
	,onRender : function(ct, position){
		Tms.UploadDisplayField.superclass.onRender.call(this, ct, position);
		//���DataView
		//this.bwrap.addChild();
		//���uploadButton
		this.toString();
	}
	,setRawValue : function(v){
	   if(this.htmlEncode){
		  v = Ext.util.Format.htmlEncode(v);
	   }

		if(this.rendered){
			//var fv = '';			
			//�ȸ�ʽ��
			//if (this.dateFormat && Ext.isDate(v)) {  
			//	fv = this.el.dom.innerHTML = v.dateFormat(this.dateFormat);  
			//}else if (this.numberFormat && typeof v == 'number') {  
			//	fv = this.el.dom.innerHTML = Ext.util.Format.number(v, this.numberFormat);  
			//}else {
			//	fv = v;
			//}
			return this.el.dom.innerHTML = v;
		}else{
			return this.value = v;
		}
	   //return this.rendered ? (this.el.dom.innerHTML = renderer(v) ) : (this.value = v);
	}
	
});
Ext.reg('uploaddisplayfield', Tms.UploadDisplayField);


Ext.reg('form-window',Tms.formWindow = Ext.extend(Ext.Window,{
	searchForm : false
	,okText : 'ȷ��'
	,cancelText : 'ȡ��',
	
	constructor : function(config) {
		Ext.apply(this,config);
		
		config = Ext.apply({
			shadow : true
			,plain : true
			,modal : true// ����ģ̬����
			,closable : false//�������ϽǵĹرմ��ڰ�ť
			,resizable : false// ����������ı��С			
			,draggable : false// �Ƿ�����϶�
			//collapsible : true, // ����������

			,closeAction : 'close'
			
			//,buttonAlign : "center"
			,bodyStyle : "padding:10px 0 0 15px"			

			,buttons : [ {
				text : this.okText
				,handler : this.clickOkButton
				,scope : this
			}, {
				text : this.cancelText
				,handler : this.clickCancelButton
				,scope : this
			} ]

		},config||{});

		Tms.formWindow.superclass.constructor.call(this, config);
		
		this.addEvents('clickOkButton','clickCancelButton');
	}
	
	,clickOkButton : function(){
		if(this.searchForm){
			this.fireEvent("clickOkButton", this, this.getForm()); // �ڵ���ȷ����ťʱ����clickOkButton�¼�
		}else{
			this.fireEvent("clickOkButton", this);
		}
	}
	
	,clickCancelButton : function(){
		this.close();
	}
	//private 
	,getForm : function(id){
		var count = 0;
		var form = null;
		
		for(var i=0;i<this.items.length;i++){
			var tmp = this.items.itemAt(i);
			if(tmp.xtype === 'form'){
				count++; 
				form = tmp;
				if(form.id == id){
					return form;
				}
			}
		}
		return (count == 1)?form:null;
	}
	,formReset : function(id){
		var form = this.getForm(id);
		if(form){
			form.getForm().reset();
		}
	}
	,formLoad : function(data,id){
		var form = this.getForm(id);
		if(form){
			form.getForm().load(data);
		}		
	}
	,formLoadRecord : function(data,id){
		var form = this.getForm(id);
		if(form){
			form.getForm().loadRecord(data);
		}		
	}	
}));
(function() {

Tms.PagingToolbar = Ext.extend(Ext.PagingToolbar,{
	initComponent : function(){
		this.store = this.ownerCt.store;
		Tms.PagingToolbar.superclass.initComponent.call(this);
	}
});

})();

Ext.reg('tms-paging',Tms.PagingToolbar);

