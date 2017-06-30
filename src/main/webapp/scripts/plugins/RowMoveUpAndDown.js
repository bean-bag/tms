/**
 * @class Ebiz.ux.RowMoveUpAndDown
 * @extends Ext.ux.grid.RowActions
 * 
 * Zshop插件
 * 主要功能：为grid提供行上下移动功能
 * @param {} config
 */
Ext.ns('Ebiz.ux');

Ebiz.ux.RowMoveUpAndDown = function(config){
    Ext.apply(this,config);
    
    this.addEvents(
        /**
         * @event beforemove
         * 
         */
        'beforemove',
        /**
         * @event move
         * @param {Ext.grid.GridPanel} grid
         * @param {Ext.data.Record} record Record corresponding to row clicked
         * @param {Integer} rowIndex Index of clicked grid row
         * 
         */
        'move'
    );
    
    if(!this.scope){//加上scope，防止列模型中调用scope产生的空指针错误
    	this.scope = this;
    }
    
    //调用父类构造函数
    Ebiz.ux.RowMoveUpAndDown.superclass.constructor.call(this);
    
    this.on('action', this.onRowAction, this);
};

Ext.extend(Ebiz.ux.RowMoveUpAndDown, Ext.ux.grid.RowActions, {
	
	selectedMovedRowClass: 'ebiz-movedrow-selected',
	
	init: function(grid){
		this.grid = grid;
		Ebiz.ux.RowMoveUpAndDown.superclass.init.call(this, grid);
	},
	
	/**
	 * 
	 * @param {} grid
	 * @param {} record
	 * @param {} action
	 * @param {} row
	 * @param {} col
	 */
	onRowAction: function(grid, record, action, row, col){
		var firstRowCls = grid.getView().firstRowCls; //当前页第一行的样式
		var lastRowCls = grid.getView().lastRowCls;   //当前页最后一行的样式
		
		var firstRow = false;
		var lastRow = false;
		
		
		var rowCls = grid.getView().getRow(row);
		var rowIndex = rowCls.rowIndex;
		
		if( rowIndex == 0 ){
			firstRow = true;
		}
		if(rowIndex == grid.getStore().getCount()-1 || rowIndex == grid.getStore().baseParams.limit-1){
			lastRow = true;
		}
		
		/*var classArray = rowCls.classList;//class默认值
		if(Ext.isIE){//IE浏览器下要取得值要用className，IE下取得的class是String类型，要先转换成数组
			classString = rowCls.className;
			classArray = classString.split(" ");
		}
		
		for(var i=0; i<classArray.length;i++){
			if(classArray[i] == firstRowCls){
				firstRow = true;
				break;
			}
			if(classArray[i] == lastRowCls){
				lastRow = true;
				break;
			}
			if(classArray[i] !== firstRowCls&&classArray[i] !== lastRowCls){
				continue;
			}
		}*/
		
		var firstActionCls = this.actions[0].iconCls;
		var secondActionCls = this.actions[1].iconCls;
		
		if(grid.getStore().getCount() == 1){//只有一条记录时
			return;
		}
		if(firstRow && action == firstActionCls){//当前页的第一行
			//alert('第一行不能上移');
			return;
		}
		if(lastRow && action == secondActionCls){//当前页的最后一行
			//alert('最后一行不能下移');
			return;
		}
		//除第一行和最后一行外，其余行数既可以上移，也可以下移
		switch (action) {
			case firstActionCls :
				this.moveUp(grid, record, row, col);
				break;

			case secondActionCls :
				this.moveDown(grid, record, row, col);
				break;
		}
	},
	
	moveUp : function(grid, record, row, col){
		this.move(-1, grid, record, row, col);
	},
	
	moveDown : function(grid, record, row, col){
		this.move(1, grid, record, row, col);
	},
	
	move : function(toward, grid, record, row, col){
		grid.getSelectionModel().clearSelections();
		//var sm = grid.getSelectionModel();//获取选择模型
		//var data = sm.getSelections();    //获取数据
		var ds = grid.getStore();         //获取store
		var rec, rowIndex, nextRec;
		/*if(sm.hasSelection()){
			rec = sm.getSelected();
			//当前行在store中的ID
			rowIndex = ds.indexOfId(rec.id);
			nextRec  = ds.getAt(rowIndex+toward);
		}else{*///选择模型异常时的处理
		    //alert('选择模型异常！');
		    rec = record;
		    rowIndex = ds.indexOfId(rec.id);
		    nextRec  = ds.getAt(rowIndex+toward);
		    //return;
		//}
		
		//行交换操作
		ds.remove(rec);
		ds.insert(rowIndex+toward, rec);
		
		//增加行交换后的样式
		this.selectMovedRow(grid, row+toward, toward);
		
		this.fireEvent('move', grid, rec, rowIndex, nextRec);
	},
	
	selectMovedRow : function(grid, row, toward){
		var last = this.selRow;
		
		if(row == last+toward){//同一条记录的判断
			this.onSelectedRowChange(grid, row, true);
			this.selRow = row;
		}else{
			if(row == last){//相邻行之间的交换
				this.onSelectedRowChange(grid, row-toward, false);
				this.onSelectedRowChange(grid, row, true);
				this.selRow = row;
			}else{
				if(Ext.isDefined(last)){
				   this.onSelectedRowChange(grid, last, false);
			    }
			    this.selRow = row;
			    this.onSelectedRowChange(grid, row, true);
			}
		}
	},
	
	onSelectedRowChange : function(grid, row, state){
		if(state){
			grid.getView().addRowClass(row, this.selectedMovedRowClass);
		}else{
			grid.getView().removeRowClass(row, this.selectedMovedRowClass);
		}
	}
	
});

Ext.preg('ebiz-ux-rowmoveupanddown',Ebiz.ux.RowMoveUpAndDown);