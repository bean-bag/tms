(function() {

var T = Ext.Toolbar;
Ext.MyPagingToolbar = Ext.extend(Ext.Toolbar, {
    /**
     * @cfg {Ext.data.Store} store
     * The {@link Ext.data.Store} the paging toolbar should use as its data source (required).
     */
    /**
     * @cfg {Boolean} displayInfo
     * <tt>true</tt> to display the displayMsg (defaults to <tt>false</tt>)
     */
	 //displayInfo : true,
    /**
     * @cfg {Number} pageSize
     * The number of records to display per page (defaults to <tt>20</tt>)
     */
    pageSize : 20,
    /**
     * @cfg {Boolean} prependButtons
     * <tt>true</tt> to insert any configured <tt>items</tt> <i>before</i> the paging buttons.
     * Defaults to <tt>false</tt>.
     */
    /**
     * @cfg {String} displayMsg
     * The paging status message to display (defaults to <tt>'Displaying {0} - {1} of {2}'</tt>).
     * Note that this string is formatted using the braced numbers <tt>{0}-{2}</tt> as tokens
     * that are replaced by the values for start, end and total respectively. These tokens should
     * be preserved when overriding this string if showing those values is desired.
     */
    displayMsg : 'Displaying {0} - {1} of {2}',
    /**
     * @cfg {String} emptyMsg
     * The message to display when no records are found (defaults to 'No data to display')
     */
    emptyMsg : 'No data to display',
    /**
     * @cfg {String} beforePageText
     * The text displayed before the input item (defaults to <tt>'Page'</tt>).
     */
    beforePageText : 'Page',
    /**
     * @cfg {String} afterPageText
     * Customizable piece of the default paging text (defaults to <tt>'of {0}'</tt>). Note that
     * this string is formatted using <tt>{0}</tt> as a token that is replaced by the number of
     * total pages. This token should be preserved when overriding this string if showing the
     * total page count is desired.
     */
    afterPageText : 'of {0}',
    /**
     * @cfg {String} firstText
     * The quicktip text displayed for the first page button (defaults to <tt>'First Page'</tt>).
     * <b>Note</b>: quick tips must be initialized for the quicktip to show.
     */
    firstText : 'First Page',
    /**
     * @cfg {String} prevText
     * The quicktip text displayed for the previous page button (defaults to <tt>'Previous Page'</tt>).
     * <b>Note</b>: quick tips must be initialized for the quicktip to show.
     */
    prevText : 'Previous Page',
    /**
     * @cfg {String} nextText
     * The quicktip text displayed for the next page button (defaults to <tt>'Next Page'</tt>).
     * <b>Note</b>: quick tips must be initialized for the quicktip to show.
     */
    nextText : 'Next Page',
    /**
     * @cfg {String} lastText
     * The quicktip text displayed for the last page button (defaults to <tt>'Last Page'</tt>).
     * <b>Note</b>: quick tips must be initialized for the quicktip to show.
     */
    lastText : 'Last Page',
    /**
     * @cfg {String} refreshText
     * The quicktip text displayed for the Refresh button (defaults to <tt>'Refresh'</tt>).
     * <b>Note</b>: quick tips must be initialized for the quicktip to show.
     */
    refreshText : 'Refresh',

    /**
     * <p><b>Deprecated</b>. <code>paramNames</code> should be set in the <b>data store</b>
     * (see {@link Ext.data.Store#paramNames}).</p>
     * <br><p>Object mapping of parameter names used for load calls, initially set to:</p>
     * <pre>{start: 'start', limit: 'limit'}</pre>
     * @type Object
     * @property paramNames
     * @deprecated
     */

    /**
     * The number of records to display per page.  See also <tt>{@link #cursor}</tt>.
     * @type Number
     * @property pageSize
     */

    /**
     * Indicator for the record position.  This property might be used to get the active page
     * number for example:<pre><code>
     * // t is reference to the paging toolbar instance
     * var activePage = Math.ceil((t.cursor + t.pageSize) / t.pageSize);
     * </code></pre>
     * @type Number
     * @property cursor
     */

    initComponent : function(){
        var pagingItems = [this.refresh = new T.Button({
            tooltip: this.refreshText,
            text: this.refreshText,
            //iconCls: 'x-tbar-page-first',
            disabled: false,
            handler: this.doRefresh,
            scope: this		
		}),'->',this.first = new T.Button({
            tooltip: this.firstText,
            text: this.firstText,
            //iconCls: 'x-tbar-page-first',
            disabled: true,
            handler: this.moveFirst,
            scope: this
        }), this.prev = new T.Button({
            tooltip: this.prevText,
            text: this.prevText,
            //iconCls: 'x-tbar-page-prev',
            disabled: true,
            handler: this.movePrevious,
            scope: this
        }),// '-',// this.beforePageText,
        /*this.inputItem = new Ext.form.NumberField({
            cls: 'x-tbar-page-number',
            allowDecimals: false,
            allowNegative: false,
            enableKeyEvents: true,
            selectOnFocus: true,
            submitValue: false,
            listeners: {
                scope: this,
                keydown: this.onPagingKeyDown,
                blur: this.onPagingBlur
            }
        }), this.afterTextItem = new T.TextItem({
            text: String.format(this.afterPageText, 1)
        }),	'-', */this.next = new T.Button({
            tooltip: this.nextText,
            text: this.nextText,
            //iconCls: 'x-tbar-page-next',
            disabled: true,
            handler: this.moveNext,
            scope: this
        }), this.last = new T.Button({
            tooltip: this.lastText,
            text: this.lastText,
            //iconCls: 'x-tbar-page-last',
            disabled: true,
            handler: this.moveLast,
            scope: this
        })/*, '-', this.refresh = new T.Button({
            tooltip: this.refreshText,
            overflowText: this.refreshText,
            iconCls: 'x-tbar-loading',
            handler: this.doRefresh,
            scope: this
        })*/];


        var userItems = this.items || this.buttons || [];
        if (this.prependButtons) {
            this.items = userItems.concat(pagingItems);
        }else{
            this.items = pagingItems.concat(userItems);
        }
        delete this.buttons;
        //if(this.displayInfo){
            //this.items.push('->');
            //this.items.push(this.displayItem = new T.TextItem({}));
        //}
		//debugger;
        Ext.MyPagingToolbar.superclass.initComponent.call(this);
        this.addEvents(
            /**
             * @event change
             * Fires after the active page has been changed.
             * @param {Ext.MyPagingToolbar} this
             * @param {Object} pageData An object that has these properties:<ul>
             * <li><code>total</code> : Number <div class="sub-desc">The total number of records in the dataset as
             * returned by the server</div></li>
             * <li><code>activePage</code> : Number <div class="sub-desc">The current page number</div></li>
             * <li><code>pages</code> : Number <div class="sub-desc">The total number of pages (calculated from
             * the total number of records in the dataset as returned by the server and the current {@link #pageSize})</div></li>
             * </ul>
             */
            'change',
            /**
             * @event beforechange
             * Fires just before the active page is changed.
             * Return false to prevent the active page from being changed.
             * @param {Ext.MyPagingToolbar} this
             * @param {Object} params An object hash of the parameters which the MyPagingToolbar will send when
             * loading the required page. This will contain:<ul>
             * <li><code>start</code> : Number <div class="sub-desc">The starting row number for the next page of records to
             * be retrieved from the server</div></li>
             * <li><code>limit</code> : Number <div class="sub-desc">The number of records to be retrieved from the server</div></li>
             * </ul>
             * <p>(note: the names of the <b>start</b> and <b>limit</b> properties are determined
             * by the store's {@link Ext.data.Store#paramNames paramNames} property.)</p>
             * <p>Parameters may be added as required in the event handler.</p>
             */
            'beforechange'
        );
        this.on('afterlayout', this.onFirstLayout, this, {single: true});
        this.cursor = 0;
        this.bindStore(this.store, true);
    },

    // private
    onFirstLayout : function(){
        if(this.dsLoaded){
            this.onLoad.apply(this, this.dsLoaded);
        }
    },

    // private
    updateInfo : function(){
        if(this.displayItem){
            var count = this.store.getCount();
            var msg = count == 0 ?
                this.emptyMsg :
                String.format(
                    this.displayMsg,
                    this.cursor+1, this.cursor+count, this.store.getTotalCount()
                );
            this.displayItem.setText(msg);
        }
    },

    // private
    onLoad : function(store, r, o){
        if(!this.rendered){
            this.dsLoaded = [store, r, o];
            return;
        }
        var p = this.getParams();
        this.cursor = (o.params && o.params[p.start]) ? o.params[p.start] : 0;
        var d = this.getPageData(), ap = d.activePage, ps = d.pages;

        //this.afterTextItem.setText(String.format(this.afterPageText, d.pages));
        //this.inputItem.setValue(ap);
        this.first.setDisabled(ap == 1);
        this.prev.setDisabled(ap == 1);
        this.next.setDisabled(ap == ps);
        this.last.setDisabled(ap == ps);
        //this.refresh.enable();
        this.updateInfo();
        this.fireEvent('change', this, d);
    },

    // private
    getPageData : function(){
        var total = this.store.getTotalCount();
        return {
            total : total,
            activePage : Math.ceil((this.cursor+this.pageSize)/this.pageSize),
            pages :  total < this.pageSize ? 1 : Math.ceil(total/this.pageSize)
        };
    },

    /**
     * Change the active page
     * @param {Integer} page The page to display
     */
    changePage : function(page){
        this.doLoad(((page-1) * this.pageSize).constrain(0, this.store.getTotalCount()));
    },

    // private
    onLoadError : function(){
        if(!this.rendered){
            return;
        }
        this.refresh.enable();
    },

    // private
    readPage : function(d){
        var v = this.inputItem.getValue(), pageNum;
        if (!v || isNaN(pageNum = parseInt(v, 10))) {
            this.inputItem.setValue(d.activePage);
            return false;
        }
        return pageNum;
    },

    onPagingFocus : function(){
        this.inputItem.select();
    },

    //private
    onPagingBlur : function(e){
        this.inputItem.setValue(this.getPageData().activePage);
    },

    // private
    onPagingKeyDown : function(field, e){
        var k = e.getKey(), d = this.getPageData(), pageNum;
        if (k == e.RETURN) {
            e.stopEvent();
            pageNum = this.readPage(d);
            if(pageNum !== false){
                pageNum = Math.min(Math.max(1, pageNum), d.pages) - 1;
                this.doLoad(pageNum * this.pageSize);
            }
        }else if (k == e.HOME || k == e.END){
            e.stopEvent();
            pageNum = k == e.HOME ? 1 : d.pages;
            field.setValue(pageNum);
        }else if (k == e.UP || k == e.PAGEUP || k == e.DOWN || k == e.PAGEDOWN){
            e.stopEvent();
            if((pageNum = this.readPage(d))){
                var increment = e.shiftKey ? 10 : 1;
                if(k == e.DOWN || k == e.PAGEDOWN){
                    increment *= -1;
                }
                pageNum += increment;
                if(pageNum >= 1 & pageNum <= d.pages){
                    field.setValue(pageNum);
                }
            }
        }
    },

    // private
    getParams : function(){
        //retain backwards compat, allow params on the toolbar itself, if they exist.
        return this.paramNames || this.store.paramNames;
    },

    // private
    beforeLoad : function(){
        if(this.rendered && this.refresh){
            this.refresh.disable();
        }
    },

    // private
    doLoad : function(start){
        var o = {}, pn = this.getParams();
        o[pn.start] = start;
        o[pn.limit] = this.pageSize;
        if(this.fireEvent('beforechange', this, o) !== false){
            this.store.load({params:o});
        }
    },

    /**
     * Move to the first page, has the same effect as clicking the 'first' button.
     */
    moveFirst : function(){
        this.doLoad(0);
    },

    /**
     * Move to the previous page, has the same effect as clicking the 'previous' button.
     */
    movePrevious : function(){
        this.doLoad(Math.max(0, this.cursor-this.pageSize));
    },

    /**
     * Move to the next page, has the same effect as clicking the 'next' button.
     */
    moveNext : function(){
        this.doLoad(this.cursor+this.pageSize);
    },

    /**
     * Move to the last page, has the same effect as clicking the 'last' button.
     */
    moveLast : function(){
        var total = this.store.getTotalCount(),
            extra = total % this.pageSize;

        this.doLoad(extra ? (total - extra) : total - this.pageSize);
    },

    /**
     * Refresh the current page, has the same effect as clicking the 'refresh' button.
     */
    doRefresh : function(){
        this.doLoad(this.cursor);
    },

    /**
     * Binds the paging toolbar to the specified {@link Ext.data.Store}
     * @param {Store} store The store to bind to this toolbar
     * @param {Boolean} initial (Optional) true to not remove listeners
     */
    bindStore : function(store, initial){
        var doLoad = false;
        if(!initial && this.store){
            if(store !== this.store && this.store.autoDestroy){
                this.store.destroy();
            }else{
                this.store.un('beforeload', this.beforeLoad, this);
                this.store.un('load', this.onLoad, this);
                this.store.un('exception', this.onLoadError, this);
            }
            if(!store){
                this.store = null;
            }
        }
        if(store){
            store = Ext.StoreMgr.lookup(store);
            store.on({
                scope: this,
                beforeload: this.beforeLoad,
                load: this.onLoad,
                exception: this.onLoadError
            });
            doLoad = true;
        }
        this.store = store;
        if(doLoad){
            this.onLoad(store, null, {});
        }
    },

    /**
     * Unbinds the paging toolbar from the specified {@link Ext.data.Store} <b>(deprecated)</b>
     * @param {Ext.data.Store} store The data store to unbind
     */
    unbind : function(store){
        this.bindStore(null);
    },

    /**
     * Binds the paging toolbar to the specified {@link Ext.data.Store} <b>(deprecated)</b>
     * @param {Ext.data.Store} store The data store to bind
     */
    bind : function(store){
        this.bindStore(store);
    },

    // private
    onDestroy : function(){
        this.bindStore(null);
        Ext.MyPagingToolbar.superclass.onDestroy.call(this);
    }
});

})();
Ext.reg('mypaging', Ext.MyPagingToolbar);

/**
 * @class CExt.PagingToolbar
 * @extends Ext.PagingToolbar
 * 分页工具条
 */
Ext.CePagingToolbar = Ext.extend(Ext.PagingToolbar, {
    /**
     * @cfg {Boolean} displayInfo True表示显示分页信息，默认true
     */
    displayInfo: true,

    /**
     * @cfg {String} simplePageText 使用简单分页时，翻页按钮中间显示的文字，当simple==true时有效
     */
    simplePageText: '{0} / {1}',

    /**
     * @cfg {Boolean} hidePageSizeText True隐藏分页大小设置下拉选择框，默认false，当simple==true时有效
     */
    hidePageSizeText: false,

    /**
     * @cfg {String} beforePageSizeText 分页大小Combo前的显示文字，当simple==true时有效
     */
    beforePageSizeText: '',

    /**
     * @cfg {Array} pageSizeArray 分页大小选项，默认[[10], [20], [50]]
     */
    pageSizeArray: [[10], [20], [50]],

    // private
    initComponent: function() {
        
        var pagingItems = [];//, userItems = this.items || this.buttons || [];
        
		// 当store加载时，动态创建分页按钮，需要将分页按钮插入到这个位置
		this.pagingIndex = pagingItems.length;
		this.pagingEndIndex = this.pagingIndex + 1;

		//pagingItems.push(new Ext.Toolbar.TextItem({
		//    text: '1'
		//}));



		//if (this.prependButtons) {
			//pagingItems = pagingItems.concat(userItems);
		//}
		
		//if (!this.prependButtons) {
			//pagingItems = pagingItems.concat(userItems);
		//}
		debugger;
		pagingItems.push('->');
		pagingItems.push(this.first = new Ext.Toolbar.Button({
			text: this.firstText,
			overflowText: this.firstText,
			//iconCls: 'x-tbar-page-prev',
			disabled: true,
			handler: this.moveFirst,
			scope: this
		}));

		pagingItems.push(this.prev = new Ext.Toolbar.Button({
			text: this.prevText,
			overflowText: this.prevText,
			//iconCls: 'x-tbar-page-prev',
			disabled: true,
			handler: this.movePrevious,
			scope: this
		}));

		pagingItems.push(this.next = new Ext.Toolbar.Button({
			text: this.nextText,
			overflowText: this.nextText,
			//iconAlign: 'right',
			//iconCls: 'x-tbar-page-next',
			disabled: true,
			handler: this.moveNext,
			scope: this
		}));
		pagingItems.push(this.last = new Ext.Toolbar.Button({
			text: this.lastText,
			overflowText: this.lastText,
			//iconAlign: 'right',
			//iconCls: 'x-tbar-page-last',
			disabled: true,
			handler: this.moveLast,
			scope: this
		}));

		pagingItems.push(this.pageSizeItem = new Ext.form.ComboBox({
			mode: 'local',
			triggerAction: 'all',
			forceSelection: true,
			editable: false,
			displayField: 'size',
			value: this.pageSize,
			width: 50,
			listWidth: 50,
			store: new Ext.data.ArrayStore({
				fields: ['size'],
				data: this.pageSizeArray
			}),
			listeners: {
				select: this.changePageSize,
				scope: this
			}
		}));
		
		//pagingItems.push(' ');
		this.items = pagingItems;
		//if (this.displayInfo) {
		//	this.items.push('->');
		//	this.items.push(this.displayItem = new Ext.Toolbar.TextItem({}));
		//}
        
        delete this.buttons;

        Ext.CePagingToolbar.superclass.initComponent.call(this);
        this.addEvents(
        /**
         * @event change
         * Fires after the active page has been changed.
         * @param {Ext.PagingToolbar} this
         * @param {Object} pageData An object that has these properties:<ul>
         * <li><code>total</code> : Number <div class="sub-desc">The total number of records in the dataset as
         * returned by the server</div></li>
         * <li><code>activePage</code> : Number <div class="sub-desc">The current page number</div></li>
         * <li><code>pages</code> : Number <div class="sub-desc">The total number of pages (calculated from
         * the total number of records in the dataset as returned by the server and the current {@link #pageSize})</div></li>
         * </ul>
         */
        'change',
        /**
         * @event beforechange
         * Fires just before the active page is changed.
         * Return false to prevent the active page from being changed.
         * @param {Ext.PagingToolbar} this
         * @param {Object} params An object hash of the parameters which the PagingToolbar will send when
         * loading the required page. This will contain:<ul>
         * <li><code>start</code> : Number <div class="sub-desc">The starting row number for the next page of records to
         * be retrieved from the server</div></li>
         * <li><code>limit</code> : Number <div class="sub-desc">The number of records to be retrieved from the server</div></li>
         * </ul>
         * <p>(note: the names of the <b>start</b> and <b>limit</b> properties are determined
         * by the store's {@link Ext.data.Store#paramNames paramNames} property.)</p>
         * <p>Parameters may be added as required in the event handler.</p>
         */
        'beforechange');
        this.on('afterlayout', this.onFirstLayout, this, {
            single: true
        });
        this.cursor = 0;
        this.bindStore(this.store, true);
    },

    // private
    onDestroy: function() {
        //this.grid = null;
        Ext.CePagingToolbar.superclass.onDestroy.call(this);
    },

    // private
    onLoad: function(store, r, o) {
        if (!this.rendered) {
            this.dsLoaded = [store, r, o];
            return;
        }
        var p = this.getParams();
        this.cursor = (o.params && o.params[p.start]) ? o.params[p.start] : 0;
        var d = this.getPageData(), ap = d.activePage, ps = d.pages;

        if (!this.simple) {
            this.prev.setDisabled(ap == 1);
            this.next.setDisabled(ap == ps);
            this.updatePaging(d);
            this.updateInfo();
        } else {
            this.prev.setDisabled(ap == 1);
            this.next.setDisabled(ap == ps);
            this.simplePageItem.setText(String.format(this.simplePageText, ap, ps));
        }
        this.fireEvent('change', this, d);
    },

    // private
    updatePaging: function(d) {
        var ap = d.activePage, ps = d.pages;
        for (var i = this.pagingIndex; i < this.pagingEndIndex; i++) {
            this.get(this.pagingIndex).destroy();
        }

        this.pagingEndIndex = this.pagingIndex;
        if (ap - 2 > 1 && ps != 4 && ps != 5) {
            this.insert(this.pagingIndex, new Ext.Toolbar.Button({
                text: '1',
                tooltip: this.firstText,
                overflowText: this.firstText,
                handler: this.movePage,
                scope: this
            }));
            this.pagingEndIndex++;
        }
        if (ap - 2 > 2 && ps != 5) {
            this.insert(this.pagingEndIndex, new Ext.Toolbar.TextItem({
                text: '..'
            }));
            this.pagingEndIndex++;
        }

        var start = 1, end = ps > 5 ? ps : 5;
        if (end > 5) {
            if (ap < 3) {
                start = 1;
                end = 5;
            } else if (ap > ps - 3) {
                start = ps - 4;
                end = ps;
            } else {
                start = ap - 2;
                end = ap + 2;
            }
        } else {
            end = ps;
        }

        if ((ap == 5 || ap == 6) && ps == 6) {
            start = 3;
        }

        for (var i = start; i < end + 1; i++) {
            if (i == ap) {
                this.insert(this.pagingEndIndex, new Ext.Toolbar.TextItem({
                    text: i,
                    cls: 'x-tbar-page-active',
                    style: 'font-weight: bold;'
                }));
            } else {
                this.insert(this.pagingEndIndex, new Ext.Toolbar.Button({
                    text: i,
                    handler: this.movePage,
                    scope: this
                }));
            }
            this.pagingEndIndex++;
        }

        if (ps - ap > 3 && ps != 5 && ps != 6) {
            this.insert(this.pagingEndIndex, new Ext.Toolbar.TextItem({
                text: '..'
            }));
            this.pagingEndIndex++;
        }
        if (ps - ap > 2 && ps != 4 && ps != 5) {
            this.insert(this.pagingEndIndex, new Ext.Toolbar.Button({
                text: ps,
                tooltip: this.lastText,
                overflowText: this.lastText,
                handler: this.movePage,
                scope: this
            }));
            this.pagingEndIndex++;
        }

        this.doLayout();
    },

    /*// private
    changeGridView: function() {
        if (this.grid) {
            this.grid.changeView('grid');
            this.gridView.setDisabled(true);
            this.graphicView.setDisabled(false);
        }
    },

    // private
    changeGraphicView: function() {
        if (this.grid) {
            this.grid.changeView('graphic');
            this.gridView.setDisabled(false);
            this.graphicView.setDisabled(true);
        }
    },*/

    // private
    changePageSize: function(c, r, i) {
        var size;
        if (!Ext.isNumber(c) && r) {
            size = r.data.size;
        } else {
            size = c;
        }
        this.pageSize = size;
        this.store.baseParams.limit=size;//当改变pageSize时同步更新store中的分页参数;
        this.doLoad(0);
    },

    // private
    movePage: function(btn) {
        this.doLoad((btn.text - 1) * this.pageSize);
    }
});