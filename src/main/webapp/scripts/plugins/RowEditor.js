/**
 * @class Ebiz.ux.grid.RowEditor
 * @extends Ext.ux.grid.RowEditor
 * 
 * Zshop���
 * ��Ҫ���ܣ�Ϊgrid�ṩ�б༭����
 * 
 */

Ext.ns('Ebiz.ux.grid');
Ebiz.ux.grid.RowEditor = Ext.extend(Ext.ux.grid.RowEditor,{
	
	hidden: true,//��ֹ��һ����Ⱦʱ��Щ���λ�ò��Ե�������
	
	zindex: 9000,//��ֹ��ס������messagebox
	
	autoEncode: true,//��ת�빦��
	
	monitorValid: false,//�ر�ʵʱУ�鹦��

	/**
	 * @cfg {String} saveText Text for save button
	 */
	saveText: '����',
	
	/**
	 * @cfg {String} cancelText Text for cancel button
	 */
	cancelText: 'ȡ��',
	
	/**     
	 * @cfg {Number} minButtonWidth     
	 * Minimum width in pixels of all {@link #buttons} in this panel    
	 */
	minButtonWidth: 45,
	
	layout: 'column',
	
	initComponent: function(){
		Ebiz.ux.grid.RowEditor.superclass.initComponent.apply(this,arguments);
	},
	init: function(grid){
		this.grid = grid;
		Ebiz.ux.grid.RowEditor.superclass.init.call(this, grid);
		
		grid.un('rowdblclick', this.onRowDblClick, this);
		grid.un('rowclick', this.onRowClick, this);
		
		grid.getView().onAllColumnWidthsUpdated = this.onAllColumnWidthChanged.createDelegate(this);
	},
	
	onAllColumnWidthChanged: function(ws, tw){
		if(!this.initialized || !this.isVisible()){
			return;
        }
        
        this.verifyLayout(true);
	},
	
	onRender:function(){
		Ebiz.ux.grid.RowEditor.superclass.onRender.apply(this, arguments);
	},
	afterRender:function(){
		//Ebiz.ux.grid.RowEditor.superclass.afterRender.apply(this, arguments);
		Ext.ux.grid.RowEditor.superclass.afterRender.apply(this, arguments);
	},
	
	/**
	 * ��д���෽��
	 * ȥ���Ա༭״̬ʱ�޸�������������������
	 * @param {} rowIndex
	 * @param {} doFocus
	 * @param {Boolean} addFlag
	 */
	startEditing: function(rowIndex, doFocus, addFlag){
		/*if(this.editing && this.isDirty()){
            this.showTooltip(this.commitChangesText);
            return;
        }*/
		/*if(addFlag){//���������һ�У��رռ��
			this.monitorValid = false;
		}else{
			this.monitorValid = true;
		}*/
		
        if(Ext.isObject(rowIndex)){
            rowIndex = this.grid.getStore().indexOf(rowIndex);
        }
        if(this.fireEvent('beforeedit', this, rowIndex) !== false){
            this.editing = true;
            var g = this.grid, view = g.getView(),
                row = view.getRow(rowIndex),
                record = g.store.getAt(rowIndex);

            this.record = record;
            this.rowIndex = rowIndex;
            this.values = {};
            if(!this.rendered){
                this.render(view.getEditorParent());
            }
            var w = Ext.fly(row).getWidth();
            this.setSize(w);
            if(!this.initialized){
                this.initFields();
            }
            var cm = g.getColumnModel(), fields = this.items.items, f, val;
            
            
           for(var j = 0, len = cm.getColumnCount(); j < len; j++){
                var c = cm.getColumnAt(j);
                if(!c.hidden && c.getEditor()){
                    //�����һ�εĴ�����Ϣ
                    if(!Ext.isEmpty(c.getEditor().getActiveError())){
                    	c.getEditor().clearInvalid();
                    }
                }
            }
            
            for(var i = 0, len = cm.getColumnCount(); i < len; i++){
                val = this.preEditValue(record, cm.getDataIndex(i));
                f = fields[i];
                f.isLoading = true;//�ر�У��
                f.setValue(val);
                this.values[f.id] = Ext.isEmpty(val) ? '' : val;
            }
            
            
            
            this.verifyLayout(true);
            if(!this.isVisible()){
                this.setPagePosition(Ext.fly(row).getXY());
            } else{
                this.el.setXY(Ext.fly(row).getXY(), {duration:0.15});
            }
            if(!this.isVisible()){
                this.show().doLayout();
            }
            
            //�����һ�εĴ�����ʽ
           for(var j = 0, len = cm.getColumnCount(); j < len; j++){
                var c = cm.getColumnAt(j);
                if(!c.hidden && c.getEditor()){
                    //c.getEditor().focus();
                	//�Ƴ�������ʽ
                    c.getEditor().getEl().removeClass('x-form-invalid');
                    
                    //�����һ�εĴ�����Ϣ
                    /*if(!Ext.isEmpty(c.getEditor().getActiveError())){
                    	c.getEditor().clearInvalid();
                    }
                    */
                    //����blur�¼�
                    c.getEditor().on('blur', this.onTextBlur, this);
                     
                }
            }
            /*this.initBlurEvents = true;*/
            
            if(doFocus !== false){
                this.doFocus.defer(this.focusDelay, this);
            }
            
            for(var i = 0, len = cm.getColumnCount(); i < len; i++){
                f = fields[i];
                f.isLoading = false;
            }
        }
	},
	
	onTextBlur : function(){
		var btn = this.btns.items.items[1];
		if(btn.getEl().hasClass('x-btn-click')){//�û����"ȡ��"��ť��ʹʧ���¼�����ʱ����У��
			return;
		}
		this.bound = true;
		this.bindHandler();
	},
	
	// private
	/**
	 * ��д���ຯ��
	 * ������֤ͨ�������ش�����ʾ��Ĺ���
	 * ȥ����ť���û�״̬
	 * @return {Boolean}
	 */
    bindHandler : function(){
        if(!this.bound){
            return false; // stops binding
        }
        var valid = this.isValid();
        if(!valid && this.errorSummary){
            this.showTooltip(this.getErrorText().join(''));
        }else{
        	this.hideToolTip();
        }
        /*this.btns.saveBtn.setDisabled(!valid);*/
        this.fireEvent('validation', this, valid);
    },
    
    //private
    /**
     * ��д�����У�麯��
     * ͨ��getActiveError�����ж��Ƿ��д�
     * @return {}
     */
    isValid: function(){
        var valid = true;
        this.items.each(function(f){
            /*if(!f.isValid(true)){*/
        	if(!Ext.isEmpty(f.getActiveError())){
                valid = false;
                return false;
            }
        });
        return valid;
    },
    
    /**
     * �Ա������У�飬�����µ���validate�����ӿ�
     * @return {}
     */
    isValidAll: function(){
    	var valid = true;
        this.items.each(function(f){
            if(!f.isValid(true)){
                valid = false;
                return false;
            }
        });
        return valid;
    },
	
	hideToolTip: function(){
		var t = this.tooltip;
		if(!t){
			return false;
		}
		t.hide();
	},
	
	/**
	 * ��д���෽��
	 * ��IE����������ø�����ĸ߶�Ϊ�и�
	 * @param {} force
	 */
	verifyLayout: function(force){
        if(this.el && (this.isVisible() || force === true)){
            var row = this.grid.getView().getRow(this.rowIndex);
            var totalWidth = Ext.fly(row).getWidth();
            //this.setSize(Ext.fly(row).getWidth(), Ext.isIE ? Ext.fly(row).getHeight() + 9 : undefined);
            this.setSize(Ext.fly(row).getWidth(), Ext.fly(row).getHeight());
            var cm = this.grid.colModel, fields = this.items.items;
            for(var i = 0, len = cm.getColumnCount(); i < len; i++){
            	var cw;
                if(!cm.isHidden(i)){
                    var adjust = 0;
                    if(i === (len - 1)){
                        adjust += 3; // outer padding
                    } else{
                        adjust += 1;
                    }
                    fields[i].show();
                    Ext.apply(fields[i],{
                    	columnWidth : cm.getColumnWidth(i)/totalWidth
                    });
                    //fields[i].setWidth(cm.getColumnWidth(i) - adjust);
                } else{
                    fields[i].hide();
                }
            }
            this.doLayout();
            this.positionButtons();
        }
    },
	
	/**
	 * ��ť���ض�λ����
	 */
	positionButtons: function(){
		if(this.btns){
			var g = this.grid,
			    cm = g.getColumnModel(),
			    view = g.getView(),
			    scroll = view.scroller.dom.scrollLeft,
			    bw = this.btns.getWidth(),
			    width = Math.min(g.getWidth(), g.getColumnModel().getTotalWidth());
			var fields = this.items.items;
			var columnwidth = fields[fields.length-1].width;
			this.btns.el.shift({left: width+scroll-columnwidth-5, top: 0, stopFx: true, duration:0.2});
		}
	},
	
	/**
	 * ���ӱ���У��Ĺ���
	 * @param {} saveChanges
	 */
	stopEditing : function(saveChanges){
        this.editing = false;
        if(!this.isVisible()){
            return;
        }
        if(saveChanges === false /*|| !this.isValid()*/){
            this.hide();
            this.fireEvent('canceledit', this, saveChanges === false);
            return;
        }
        //if(!this.isValid() && this.errorSummary){//��֤δͨ������������ʾ
        if(!this.isValidAll() && this.errorSummary){//����֮ǰ�Ա��е����������һ��У��
            this.showTooltip(this.getErrorText().join(''));
            return;
        }
        var changes = {},
        	changes2 = {},
            r = this.record,
            r2 = this.record,//����Ϊ�޸ĵ��У�������̨���ύ��
            hasChange = false,
            cm = this.grid.colModel,
            fields = this.items.items;
        for(var i = 0, len = cm.getColumnCount(); i < len; i++){
            if(!cm.isHidden(i)){
                var dindex = cm.getDataIndex(i);
                if(!Ext.isEmpty(dindex)){
                    var oldValue = r.data[dindex],
                        value = this.postEditValue(fields[i].getValue(), oldValue, r, dindex),
                        value2 = fields[i].getValue();
						if(String(value).length !== String(value2).length){//������ת����ֵ��¼����
							changes2[dindex] = value2;
						}
                    if(String(oldValue) !== String(value)){
                        changes[dindex] = value;                       
                        hasChange = true;
                    }
                }
            }
        }
	
        if(hasChange && this.fireEvent('validateedit', this, changes, r, this.rowIndex) !== false){
            r.beginEdit();
            Ext.iterate(changes, function(name, value){
                r.set(name, value);
            });
          			
            r.endEdit();
			//��ת������ֵ�ָ�
			r2.beginEdit();
			  Ext.iterate(changes2, function(name, value){
                r2.set(name, value);
            });	
			
            //r2.endEdit();//���������䡣
            this.fireEvent('afteredit', this, changes, r2, this.rowIndex);
			
        }
        this.hide();
    },
	
	showTooltip: function(msg){
		var t = this.tooltip;
		if(!t){
			/*t = this.tooltip = new Ext.ToolTip({*/
            t = this.tooltip = new Ebiz.RowEditorTip({
                maxWidth: 600,
                cls: 'errorTip',
                width: 300,
                title: this.errorText,
                autoHide: false,
                anchor: 'top',
                anchorToTarget: true,
                defaultAlign: 'tr-br?',
                
                //����tooltip�е�onTargetOver������
                //��ֹ�������ͣ�ڰ�ť�ϵ���tooltip���������
                onTargetOver : Ext.emptyFn
                
            });
        }
        var v = this.grid.getView(),
            top = parseInt(this.el.dom.style.top, 10),
            scroll = v.scroller.dom.scrollTop,
            h = this.el.getHeight();
            
        if(top + h >= scroll){
            /*t.initTarget(this.lastVisibleColumn().getEl());*/
        	t.initTarget(this.btns.saveBtn.getEl());
            if(!t.rendered){
                t.show();
                t.hide();
            }
            t.body.update(msg);
            t.doAutoWidth(20);
            t.show();
        }else if(t.rendered){
            t.hide();
        }
	},
	
	// private
	/**
	 * ������������zindex�����Ͳ��
	 * @param {} cfg
	 */
    makeFloating : function(cfg){
        this.floating = true;
        this.el = new Ext.Layer(Ext.apply({}, cfg, {
            shadow: Ext.isDefined(this.shadow) ? this.shadow : 'sides',
            shadowOffset: this.shadowOffset,
            constrain:false,
            shim: this.shim === false ? false : undefined,
            zindex: this.zindex
        }), this.el);
    },
    
    //private
    getErrorText: function(){
        var data = ['<ul>'];
        this.items.each(function(f){
            /*if(!f.isValid(true)){*/
        	if(!Ext.isEmpty(f.getActiveError())){
            	/*if(f.blankText == f.getActiveError()){
            		data.push('<li>', f.column.header + "��"+ '<img src="widgets/ebiz/resources/images/form/null.gif"/>'+ f.getActiveError(), '</li>');
            	}else{*/
            		data.push('<li>', f.column.header + "��"+ '<img src="widgets/ebiz/resources/images/public/error.gif"/><span style="color:red">' +f.getActiveError(), '</span></li>');
            	/*}*/
        	}
            /*}*/
        });
        data.push('</ul>');
        return data;
    }
	
});
Ext.preg('ebiz-ux-grid-roweditor',Ebiz.ux.grid.RowEditor);
