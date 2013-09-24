/**
 * @bizWidgetClass FlowLayoutItem class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.FlowLayoutItem = function () {

    this.setIsInside(true);

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
            var _this = this;
            this.getDomInstance().mousedown(function(event){
                event.stopPropagation();
                _this.sendMessage('wof.bizWidget.FlowLayoutItem_mousedown');
            });
            this.getDomInstance().droppable({
                snap:true,
                accept:function(draggable){
                    var b=false;
                    var draggableObj = wof.util.ObjectManager.get(draggable.attr('oid'));
                    if(draggableObj!=null){
                        if(draggableObj.getClassName()=='wof.bizWidget.FlowLayoutItem'){
                            var layout = draggableObj.parentNode().parentNode();
                            var thisLayout = _this.parentNode().parentNode();
                            if(thisLayout.getId()==layout.getId()){
                                b=true;
                            }
                        }else if(draggableObj.getClassName()!='wof.bizWidget.FlowLayoutSection'){ //不能接受分组
                            var childNode = _this.childNodes().length>0?_this.childNodes()[0]:null;
                            //item必须属于最内层 即只有叶子节点 不包括容器节点(容器节点包括 FlowLayout\GridLayout)
                            if(childNode==null){
                                b=true;
                            }else if(childNode.getClassName()!='wof.bizWidget.FlowLayout' && childNode.getClassName()!='wof.bizWidget.GridLayout'){
                                b=true;
                            }else{
                                console.log('childNode.getClassName()='+childNode.getClassName());
                            }
                        }
                    }
                    return b;
                },
                hoverClass: 'ui-state-hover',
                drop:function(event,ui){
                    event.stopPropagation();
                    var obj = wof.util.ObjectManager.get(ui.draggable.attr('oid'));
                    if(obj!=null){
                        if(obj.getClassName()=='wof.bizWidget.FlowLayoutItem'){
                            _this.sendMessage('wof.bizWidget.FlowLayoutItem_itemDrop', {'itemId':ui.draggable.attr('oid')});
                        }else{
                            if(obj.getIsInside()==true){
                                var sectionIndex = _this.parentNode().getIndex();
                                _this.parentNode().parentNode().setActiveSectionIndex(sectionIndex);
                                _this.parentNode().parentNode().setActiveItemRank({row:_this.getRow(),col:_this.getCol()});
                                _this.sendMessage('wof.bizWidget.FlowLayoutItem_newWidgetDrop', {'widgetId':ui.draggable.attr('oid')});
                            }else{
                                var sectionIndex = _this.parentNode().getIndex();
                                _this.parentNode().parentNode().setActiveSectionIndex(sectionIndex);
                                _this.parentNode().parentNode().setActiveItemRank({row:_this.getRow(),col:_this.getCol()});
                                _this.sendMessage('wof.bizWidget.FlowLayoutItem_widgetDrop', {'widgetId':ui.draggable.attr('oid')});
                            }
                        }
                    }
                }
            });
            this.getDomInstance().draggable({
                cursor:"move",
                opacity: 0.7,
                cursorAt:{
                    top:0,
                    left:0
                },
                containment: 'div[oid="'+this.parentNode().getId()+'"]',  //限定拖放只能在当前分组内
                scroll: false,
                start:function(event,ui){
                    event.stopPropagation();
                    _this.getDomInstance().css('zIndex',60000);
                },
                stop:function(event,ui){
                    event.stopPropagation();
                    _this.getDomInstance().css('zIndex','auto');
                }
            });
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