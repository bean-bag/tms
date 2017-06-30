/**
 * @class Ext.ux.grid.TextRowAction
 * @extends Ext.util.Observable
 * 
 * 操作列插件：可以随意配置在操作列显示的文本（目前不支持图片）。
 * 例子如下：
   步骤一:实例化TextRowAction插件
   var textRowAction = new Ext.ux.grid.TextRowAction({
      header: '操作',
      autoWidth: false,
      width: 100,
      actions:[{
        text:'修改',
        handler: function(grid, record, rowIndex, col){
           //点击修改后的处理逻辑
           alert('修改');
        }
      },{
        getData:function(value,cell,record,row,col,store){//动态配置text文本
           if(rec.get('state')=='处理中'){
               return '处理';
           }else(rec.get('state')=='完成'){
               return '查看';
           }
        },
        handler: function(grid, record, rowIndex, col){
           alert('用户自定义操作');
        }
      }]
   });
   
   步骤二：在grid的列模型中和插件接口中声明该插件
   new Ext.grid.GridPanel({
      store: myStore,
      columns:[{
        textRowAction
      }],
      plugins:[{
        textRowAction
      }]
   });
 */

Ext.ns('Ext.ux.grid');
/**
 * 创建一个操作列的文本插件
 * @constructor
 * @param {Object} config A config object
 */
Ext.ux.grid.TextRowAction = function(config){
	Ext.apply(this,config);
	
	//重写列模型中的renderer函数
	if(!this.renderer){
			this.renderer = function(value, cell, record, row, col, store){
			   var acts = [];
			   Ext.each(this.actions,function(a,i){
			   	var o;
			   	if(Ext.isFunction(a.getData)){
			   		//o= {text:a.getData.apply(this,arguments)};
			   		o= {text:a.getData.apply(this,[value,cell,record, row, col, store]),index:i};
			   	}else{
			   		o = {text: a.text, index:i};
			   	}
			   	
			   	acts.push(o);
			   },this);
			   var xt = new Ext.XTemplate(this.tplRow);
			   return new Ext.XTemplate(xt.apply({actions:acts})).apply();
			}.createDelegate(this);
	}
	
	if(!this.scope){//加上scope，防止列模型中调用scope产生的空指针错误
		this.scope = this;
    }
	
	Ext.ux.grid.TextRowAction.superclass.constructor.call(this);
};

Ext.extend(Ext.ux.grid.TextRowAction, Ext.util.Observable,{
	/**
	 * @cfg {String} header Action的列模型中text字段的配置
	 */
	header: '',
	
	/**
	 * @cfg {Boolean} autoWidth 若该属性值为true，会自动计算文本的宽度（默认值是true）。
	 */
	autoWidth:true,
	
	/**
	 * @cfg {Number} widthIntercept 用于计算宽度的常量（默认是4）。
	 */
	widthIntercept:4,
	
	/**
	 * @cfg {Number} widthSlope 用于计算宽度的常量（默认是21）。
	 */
	widthSlope:20,
	
	/**
	 * @cfg {String} dataIndex 默认的配置项（不要更改），若不设置，表格在转载数据时会报错。
	 * @private
	 */
	dataIndex : '',
	
	/**
	 * @cfg {String} actionEvent 文本的响应事件，有单击、双击、鼠标在文本上等，默认是单击事件。
	 */
	actionEvent: 'click',
	
	/**
	 * @cfg {Boolean} isColumn 默认的配置项（不要更改），若不设置，插件无法显示。
	 * @private
	 */
	isColumn:true,
	
	/**
	 * @cfg {Boolean} editable 默认的配置项（不要更改）,
	 * 可编辑表格的配置项，当表格能够编辑时，不配置该项属性为false时，会报错。
	 * @private
	 */
	editable:false,
	
	/**
	 * @cfg {Boolean}
	 * @private
	 */
	menuDisabled:true,
	
	/**
	 * @cfg {RegExp} actionIdRe
	 * @private 
	 */
	actionIdRe: /ux-row-action-(\d+)/,
	
	/**
	 * @cfg {String} tplRow 操作列插件的模板
	 * @private
	 */
	tplRow: 
	  '<div class="ux-row-action">' +
	    //'<div class="ux-row-action-text">' +
		  '<tpl for="actions">' +
	        '&#160;&nbsp;<span class="ux-row-action-text ux-row-action-{index}">{text}</span>' +	    
		  '</tpl>'+
		//'</div>' +
	  '</div>'
	,
	
	disableTip: true,
	
	/**
	 * 插件的初始化函数
	 * @param {Ext.grid.GridPanel} grid 插件依附的表格
	 */
	init:function(grid){
		this.grid = grid;
		
		this.id = this.id || Ext.id();
		
		//配置grid列模型所需的lookup数据项
		var lookup = grid.getColumnModel().lookup;
		delete(lookup[undefined]);
		lookup[this.id] = this;
		
		//配置显示模板
		//if(!this.tpl){
		//	this.tpl = this.processActions(this.actions);
		//}
		
		//自动计算宽度
		if(this.autoWidth){
			this.width =  this.widthSlope * this.actions.length*2 + this.widthIntercept;
			this.fixed = true;
		}
		
		//点击事件的绑定
		var view = grid.getView();
		var cfg = {scope:this};
		cfg[this.actionEvent] = this.onClick;
		grid.afterRender = grid.afterRender.createSequence(function(){
			view.mainBody.on(cfg);
			grid.on('destroy', this.purgeListeners, this);
		},this);
		
		//重写列模型中的renderer函数
		/*if(!this.renderer){
			this.renderer = function(value, cell, record, row, col, store){
			   var acts = [];
			   Ext.each(this.actions,function(a,i){
			   	var o;
			   	if(Ext.isFunction(a.getData)){
			   		//o= {text:a.getData.apply(this,arguments)};
			   		o= {text:a.getData.apply(this,[value,cell,record, row, col, store]),index:i};
			   	}else{
			   		o = {text: a.text, index:i};
			   	}
			   	
			   	acts.push(o);
			   },this);
			   var xt = new Ext.XTemplate(this.tplRow);
			   return new Ext.XTemplate(xt.apply({actions:acts})).apply();
			}.createDelegate(this);
		
		}*/
	},
	
	onClick: function(e, target){
		var row = e.getTarget('.x-grid3-row');
		if(row){
			var record = this.grid.store.getAt(row.rowIndex);
		    var view = this.grid.getView();
		    var col = view.findCellIndex(target.parentNode.parentNode);
		
		    var action = e.getTarget('.ux-row-action-text');
		    if(action){
		    	var m = action.className.match(this.actionIdRe);
			    var index = m[1];
			    if(this.actions[index].handler){
			    	//this.actions[index].handler.call(this.scope || this, this.grid, record, row.rowIndex, col);
                    this.actions[index].handler.call(this.actions[index].scope || this, this.grid, record, row.rowIndex, col);
                }
		    }
		}
		
	}
});

Ext.reg('textrowaction',Ext.ux.grid.TextRowAction);

Ext.grid.ActionsColumn = Ext.extend(Ext.grid.Column, {
	/**
	 * @cfg {Boolean} autoWidth 若该属性值为true，会自动计算文本的宽度（默认值是true）。
	 */
	autoWidth:true,
	
	/**
	 * @cfg {String} actionEvent 文本的响应事件，有单击、双击、鼠标在文本上等，默认是单击事件。
	 */
	actionEvent: 'click',
	
	/**
	 * @cfg {Boolean} editable 默认的配置项（不要更改）,
	 * 可编辑表格的配置项，当表格能够编辑时，不配置该项属性为false时，会报错。
	 * @private
	 */
	editable:false,
	
	/**
	 * @cfg {Boolean}
	 * @private
	 */
	menuDisabled:true,
	/**
	 * @cfg {RegExp} actionIdRe
	 * @private 
	 */
	actionIdRe: /ux-row-action-(\d+)/,
	
	/**
	 * @cfg {String} tplRow 操作列插件的模板
	 * @private
	 */
	tplRow: 
	  '<div class="ux-row-action">' +
	    //'<div class="ux-row-action-text">' +
		  '<tpl for="actions">' +
	        '&#160;&nbsp;<span class="ux-row-action-{style} ux-row-action-{index}">{text}</span>' +	    
		  '</tpl>'+
		//'</div>' +
	  '</div>'
	,

    constructor: function(cfg){
        Ext.grid.ActionsColumn.superclass.constructor.call(this, cfg);

/*		var view = grid.getView();
		cfg.scope = this;
		cfg[this.actionEvent] = this.onClick;
		grid.afterRender = grid.afterRender.createSequence(function(){
			view.mainBody.on(cfg);
			grid.on('destroy', this.purgeListeners, this);
		},this);
*/
    },
	renderer : function(value, cell, record, row, col, store){
	   var acts = [];
	   Ext.each(this.actions,function(a,i){
		var o = {index : i};
		if(Ext.isFunction(a.getData)){
			o.text = a.getData.apply(this,[value,cell,record, row, col, store]);
		}else{
			o.text = a.text;
		}
		if(Ext.isFunction(a.getStyle)){
			o.style = a.getStyle.apply(this,[value,cell,record, row, col, store]);
		}else{
			o.style = a.style | 'text';
		}
		
		acts.push(o);
	   },this);
	   var xt = new Ext.XTemplate(this.tplRow);
	   return new Ext.XTemplate(xt.apply({actions:acts})).apply();
	},
	
	init:function(grid){
		this.grid = grid;
		
		//this.id = this.id || Ext.id();
		
		//配置grid列模型所需的lookup数据项
		//var lookup = grid.getColumnModel().lookup;
		//delete(lookup[undefined]);
		//lookup[this.id] = this;
		
		//配置显示模板
		//if(!this.tpl){
		//	this.tpl = this.processActions(this.actions);
		//}
		
		//自动计算宽度
		//if(this.autoWidth){
		//	this.width =  this.widthSlope * this.actions.length*2 + this.widthIntercept;
		//	this.fixed = true;
		//}
		
		//点击事件的绑定
		var view = grid.getView();
		var cfg = {scope:this};
		cfg[this.actionEvent] = this.onClick;
		grid.afterRender = grid.afterRender.createSequence(function(){
			view.mainBody.on(cfg);
			grid.on('destroy', this.purgeListeners, this);
		},this);	
		
		if(!this.renderer){
			this.renderer = function(value, cell, record, row, col, store){
			   var acts = [];
			   Ext.each(this.actions,function(a,i){
				var o = {index : i};
				if(Ext.isFunction(a.getData)){
					o.text = a.getData.apply(this,[value,cell,record, row, col, store]);
				}else{
					o.text = a.text;
				}
				if(Ext.isFunction(a.getStyle)){
					o.style = a.getStyle.apply(this,[value,cell,record, row, col, store]);
				}else{
					o.style = a.style | 'text';
				}
			   	
			   	acts.push(o);
			   },this);
			   var xt = new Ext.XTemplate(this.tplRow);
			   return new Ext.XTemplate(xt.apply({actions:acts})).apply();
			}.createDelegate(this);
		}
	},
	onClick: function(e, target){
		var row = e.getTarget('.x-grid3-row');
		if(row){
			var record = this.grid.store.getAt(row.rowIndex);
		    var view = this.grid.getView();
		    var col = view.findCellIndex(target.parentNode.parentNode);

		    var action = e.getTarget('.ux-row-action-href');
		    if(action &&( view.getHeaderCell(col).textContent==this.header || view.getHeaderCell(col).innerText==this.header)){
		    	var m = action.className.match(this.actionIdRe);
			    var index = m[1];
			    if(this.actions[index].handler){
			    	//this.actions[index].handler.call(this.scope || this, this.grid, record, row.rowIndex, col);
                    this.actions[index].handler.call(this.actions[index].scope || this, this.grid, record/*, row.rowIndex, col*/);
                }
		    }
		}		
	}
});

Ext.grid.Column.types.actionscolumn = Ext.grid.ActionsColumn;