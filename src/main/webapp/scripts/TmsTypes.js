Tms.userTextItem = Ext.extend(Ext.Toolbar.TextItem,{
	onRender : function(ct, position) {
		 try{
			this.text = '欢迎[ <font color=red>'+Tms.user.userName+'</font> ]使用任务管理系统！';
		 }catch(e){
			this.text = '欢迎使用任务管理系统！';		 
		 }
	   Tms.userTextItem.superclass.onRender.call(this, ct, position);
	}
});
Ext.reg('tms_tbtext', Tms.userTextItem);

/*校验码输入框*/
Tms.verifyCodeField = Ext.extend(Ext.form.TextField,  {
	onRender : function(ct, position){
		Tms.verifyCodeField.superclass.onRender.call(this, ct, position);

		var imgEl = this.el.parent().createChild({
			tag : 'img'
			,align : 'absbottom'
			,src : this.vcUrl
			,title : this.vcTip || '点击图片更换验证码'
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

/*格式化显示输出*/
Tms.FormatDisplayField = Ext.extend(Ext.form.DisplayField,  {
	setRawValue : function(v){
	   if(this.htmlEncode){
		  v = Ext.util.Format.htmlEncode(v);
	   }

		if(this.rendered){
			var fv = '';
			
			//先格式化
			if (this.dateFormat && Ext.isDate(v)) {  
				fv = this.el.dom.innerHTML = v.dateFormat(this.dateFormat);  
			}else if (this.numberFormat && typeof v == 'number') {  
				fv = this.el.dom.innerHTML = Ext.util.Format.number(v, this.numberFormat);  
			}else {
				fv = v;
			}
			
			//再渲染输出
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

/*格式化显示输出*/
Tms.UploadDisplayField = Ext.extend(Ext.form.DisplayField,  {
	fieldClass : 'x-form-upload-field'
	,onRender : function(ct, position){
		Tms.UploadDisplayField.superclass.onRender.call(this, ct, position);
		//添加DataView
		//this.bwrap.addChild();
		//添加uploadButton
		this.toString();
	}
	,setRawValue : function(v){
	   if(this.htmlEncode){
		  v = Ext.util.Format.htmlEncode(v);
	   }

		if(this.rendered){
			//var fv = '';			
			//先格式化
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
	,okText : '确定'
	,cancelText : '取消',
	
	constructor : function(config) {
		Ext.apply(this,config);
		
		config = Ext.apply({
			shadow : true
			,plain : true
			,modal : true// 弹出模态窗体
			,closable : false//允许右上角的关闭窗口按钮
			,resizable : false// 不可以随意改变大小			
			,draggable : false// 是否可以拖动
			//collapsible : true, // 允许缩放条

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
			this.fireEvent("clickOkButton", this, this.getForm()); // 在单击确定按钮时触发clickOkButton事件
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

