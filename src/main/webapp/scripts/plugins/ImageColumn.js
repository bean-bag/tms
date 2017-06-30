/*
 * ! Ext JS Library 3.2.1 Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com http://www.extjs.com/license
 */
Ext.ns('Ebiz.ux.grid');

/**
 * @class Ext.ux.grid.imageColumn
 * @extends Object GridPanel plugin to add a column with check boxes to a grid.
 *          <p>
 *          Example usage:
 *          </p>
 * 
 * <pre><code>
 *  // create the column
 *  var imageColumn = new Ext.grid.imageColumn({
 *  header: 'Indoor',
 *  dataIndex: 'indoor',
 *  id: 'check',
 *  width: 55
 *  });
 * 
 *  // add the column to the column model
 *  var cm = new Ext.grid.ColumnModel([{
 *  ...
 *  },
 *  imageColumn
 *  ]);
 * 
 *  // create the grid
 *  var grid = new Ext.grid.EditorGridPanel({
 *  ...
 *  cm: cm,
 *  plugins: [imageColumn], // include plugin
 *  ...
 *  });
 * </code></pre>
 * 
 * In addition to storing a Boolean value within the record data, this class
 * toggles a css class between <tt>'x-grid3-check-col'</tt> and
 * <tt>'x-grid3-check-col-on'</tt> to alter the background image used for a
 * column.
 */
Ebiz.ux.grid.ImageColumn = function(config) {
	Ext.apply(this, config);
	if (!this.id) {
		this.id = Ext.id();
	}
};

Ebiz.ux.grid.ImageColumn.prototype = {
	
    
	cls : 'ebiz-form-imagecolumn',
	clsShow : 'ebiz-form-imagecolumnshow',
	tpl : '<img class="{0}" qtip=\'<img src="{1}" class="{2}">\' src="{1}"/>',
	init : function(grid) {
		this.grid = grid;
	},

	renderer : function(v, p, record) {
		return Ext.isEmpty(v)?'':String.format(this.tpl, this.cls, v,this.clsShow);
	}
};

// register ptype
Ext.preg('ebiz-ux-grid-imageColumn', Ebiz.ux.grid.ImageColumn);

Ebiz.ux.ImageColumn = Ebiz.ux.grid.ImageColumn;