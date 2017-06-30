/**
 * @class Ext.ux.grid.TextRowAction
 * @extends Ext.util.Observable
 * 
 * �����в�����������������ڲ�������ʾ���ı���Ŀǰ��֧��ͼƬ����
 * �������£�
   ����һ:ʵ����TextRowAction���
   var textRowAction = new Ext.ux.grid.TextRowAction({
      header: '����',
      autoWidth: false,
      width: 100,
      actions:[{
        text:'�޸�',
        handler: function(grid, record, rowIndex, col){
           //����޸ĺ�Ĵ����߼�
           alert('�޸�');
        }
      },{
        getData:function(value,cell,record,row,col,store){//��̬����text�ı�
           if(rec.get('state')=='������'){
               return '����';
           }else(rec.get('state')=='���'){
               return '�鿴';
           }
        },
        handler: function(grid, record, rowIndex, col){
           alert('�û��Զ������');
        }
      }]
   });
   
   ���������grid����ģ���кͲ���ӿ��������ò��
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
 * ����һ�������е��ı����
 * @constructor
 * @param {Object} config A config object
 */
Ext.ux.grid.TextRowAction = function(config){
	Ext.apply(this,config);
	
	//��д��ģ���е�renderer����
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
	
	if(!this.scope){//����scope����ֹ��ģ���е���scope�����Ŀ�ָ�����
		this.scope = this;
    }
	
	Ext.ux.grid.TextRowAction.superclass.constructor.call(this);
};

Ext.extend(Ext.ux.grid.TextRowAction, Ext.util.Observable,{
	/**
	 * @cfg {String} header Action����ģ����text�ֶε�����
	 */
	header: '',
	
	/**
	 * @cfg {Boolean} autoWidth ��������ֵΪtrue�����Զ������ı��Ŀ�ȣ�Ĭ��ֵ��true����
	 */
	autoWidth:true,
	
	/**
	 * @cfg {Number} widthIntercept ���ڼ����ȵĳ�����Ĭ����4����
	 */
	widthIntercept:4,
	
	/**
	 * @cfg {Number} widthSlope ���ڼ����ȵĳ�����Ĭ����21����
	 */
	widthSlope:20,
	
	/**
	 * @cfg {String} dataIndex Ĭ�ϵ��������Ҫ���ģ����������ã������ת������ʱ�ᱨ��
	 * @private
	 */
	dataIndex : '',
	
	/**
	 * @cfg {String} actionEvent �ı�����Ӧ�¼����е�����˫����������ı��ϵȣ�Ĭ���ǵ����¼���
	 */
	actionEvent: 'click',
	
	/**
	 * @cfg {Boolean} isColumn Ĭ�ϵ��������Ҫ���ģ����������ã�����޷���ʾ��
	 * @private
	 */
	isColumn:true,
	
	/**
	 * @cfg {Boolean} editable Ĭ�ϵ��������Ҫ���ģ�,
	 * �ɱ༭���������������ܹ��༭ʱ�������ø�������Ϊfalseʱ���ᱨ��
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
	 * @cfg {String} tplRow �����в����ģ��
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
	 * ����ĳ�ʼ������
	 * @param {Ext.grid.GridPanel} grid ��������ı��
	 */
	init:function(grid){
		this.grid = grid;
		
		this.id = this.id || Ext.id();
		
		//����grid��ģ�������lookup������
		var lookup = grid.getColumnModel().lookup;
		delete(lookup[undefined]);
		lookup[this.id] = this;
		
		//������ʾģ��
		//if(!this.tpl){
		//	this.tpl = this.processActions(this.actions);
		//}
		
		//�Զ�������
		if(this.autoWidth){
			this.width =  this.widthSlope * this.actions.length*2 + this.widthIntercept;
			this.fixed = true;
		}
		
		//����¼��İ�
		var view = grid.getView();
		var cfg = {scope:this};
		cfg[this.actionEvent] = this.onClick;
		grid.afterRender = grid.afterRender.createSequence(function(){
			view.mainBody.on(cfg);
			grid.on('destroy', this.purgeListeners, this);
		},this);
		
		//��д��ģ���е�renderer����
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
	 * @cfg {Boolean} autoWidth ��������ֵΪtrue�����Զ������ı��Ŀ�ȣ�Ĭ��ֵ��true����
	 */
	autoWidth:true,
	
	/**
	 * @cfg {String} actionEvent �ı�����Ӧ�¼����е�����˫����������ı��ϵȣ�Ĭ���ǵ����¼���
	 */
	actionEvent: 'click',
	
	/**
	 * @cfg {Boolean} editable Ĭ�ϵ��������Ҫ���ģ�,
	 * �ɱ༭���������������ܹ��༭ʱ�������ø�������Ϊfalseʱ���ᱨ��
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
	 * @cfg {String} tplRow �����в����ģ��
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
		
		//����grid��ģ�������lookup������
		//var lookup = grid.getColumnModel().lookup;
		//delete(lookup[undefined]);
		//lookup[this.id] = this;
		
		//������ʾģ��
		//if(!this.tpl){
		//	this.tpl = this.processActions(this.actions);
		//}
		
		//�Զ�������
		//if(this.autoWidth){
		//	this.width =  this.widthSlope * this.actions.length*2 + this.widthIntercept;
		//	this.fixed = true;
		//}
		
		//����¼��İ�
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