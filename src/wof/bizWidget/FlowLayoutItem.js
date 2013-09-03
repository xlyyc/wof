/**
 * @bizWidgetClass FlowLayoutItem class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.FlowLayoutItem = function () {

    this.setIsInside(true);

    var _this = this;
    this.getDomInstance().click(function(event){
        event.stopPropagation();
        _this.sendMessage('wof.bizWidget.FlowLayoutItem_click');
    });
    this.getDomInstance().droppable({
        snap:true,
        accept:'div[className!="wof.bizWidget.FlowLayoutSection"]', //不能接受分组
        hoverClass: 'ui-state-hover',
        drop:function(event,ui){
            event.stopPropagation();
            _this.sendMessage('wof.bizWidget.FlowLayoutItem_drop', {'itemId':ui.draggable.attr('oid')});
        }
    });
    this.getDomInstance().draggable({
        cursor:"move",
        opacity: 0.7,
        cursorAt:{
            top:0,
            left:0
        },
        scroll: false,
        start:function(event,ui){
            _this.getDomInstance().css('zIndex',60000);
        },
        stop:function(event,ui){
            _this.getDomInstance().css('zIndex','auto');
        }
    });
};
wof.bizWidget.FlowLayoutItem.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _colspan:null,

    _row:null,

    _col:null,

    _initFlag:null,

    /**
     * get/set 属性方法定义
     */
    getColspan: function(){
        if(this._colspan==null)
            this._colspan = 1;
        return this._colspan;
    },

    setColspan: function(colspan){
        this._colspan = colspan;
    },

    getRow: function(){
        return this._row;
    },

    setRow: function(row){
        this._row = row;
    },

    getCol: function(){
        return this._col;
    },

    setCol: function(col){
        this._col = col;
    },
    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        if(this._initFlag==null){
            //限定拖放只能在当前分组内
            this.getDomInstance().draggable( 'option', 'containment', 'div[oid="'+this.parentNode().getId()+'"]' );
            this._initFlag = true;
        }
    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            row: this.getRow(),
            col: this.getCol(),
            colspan: this.getColspan()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setRow(data.row);
        this.setCol(data.col);
        this.setColspan(data.colspan);
    }

};