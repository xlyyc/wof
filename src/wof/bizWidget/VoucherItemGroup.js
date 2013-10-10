/**
 * @bizWidgetClass VoucherItemGroup class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.VoucherItemGroup = function () {


};
wof.bizWidget.VoucherItemGroup.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _initFlag: null,

    _mustInOrder: null,   //组内各项是否严格遵循次序排列

    _itemHeight: null,  //表头单元格高度

    _groupCaption: null,   //分组名称

    _colsNum: null,   //分组列数

    _index: null,  //渲染位置

    _isHead: null,   //是是否为head，即不在tab中展示，并且viewtype选择HEAD_TAB时的配置，其他类型忽略该属性


    /**
     * get/set 属性方法定义
     */

    getMustInOrder: function(){
        return this._mustInOrder;
    },

    setMustInOrder: function(mustInOrder){
        this._mustInOrder = mustInOrder;
    },

    getIsHead: function(){
        return this._isHead;
    },

    setIsHead: function(isHead){
        this._isHead = isHead;
    },

    getIndex: function(){
        return this._index;
    },

    setIndex: function(index){
        this._index = index;
    },

    getColsNum: function(){
        if(this._colsNum==null){
            this._colsNum = 3;
        }
        return this._colsNum;
    },

    setColsNum: function(colsNum){
        this._colsNum = colsNum;
    },

    getItemGroupCaption: function(){
        if(this._groupCaption==null){
            this._groupCaption = '';
        }
        return this._groupCaption;
    },

    setItemGroupCaption: function(groupCaption){
        this._groupCaption = groupCaption;
    },

    getItemHeight: function(){
        if(this._itemHeight==null){
            this._itemHeight = 70;
        }
        return this._itemHeight;
    },

    setItemHeight: function(itemHeight){
        this._itemHeight = itemHeight;
    },

    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        if(this._initFlag==null){
            var _this = this;
            var timeFn = null;
            this.getDomInstance().mousedown(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                timeFn = setTimeout(function(){
                    _this.sendMessage('wof.bizWidget.VoucherComponent_mousedown');
                    _this.sendMessage('wof.bizWidget.VoucherComponent_active');
                },250);
            });
            this.getDomInstance().dblclick(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                _this.sendMessage('wof.bizWidget.VoucherComponent_dblclick');
                _this.sendMessage('wof.bizWidget.VoucherComponent_active');
            });
            this._initFlag = true;
        }
    },

    //----------必须实现----------
    render: function () {


    },

    //选择实现
    afterRender: function () {


        this.sendMessage('wof.bizWidget.VoucherComponent_render')

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            mustInOrder:this.getMustInOrder(),
            isHead:this.getIsHead(),
            index:this.getIndex(),
            colsNum:this.getColsNum(),
            itemGroupCaption:this.getItemGroupCaption(),
            itemHeight:this.getItemHeight()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.getMustInOrder(data.mustInOrder);
        this.getIsHead(data.isHead);
        this.getIndex(data.index);
        this.getColsNum(data.colsNum);
        this.getItemGroupCaption(data.itemGroupCaption);
        this.getItemHeight(data.itemHeight);
    },

    //找到所有item
    findItems: function(){
        var items = [];
        var childNodes = this.childNodes();
        for(var i=0;i<childNodes.length;i++){
            var node = childNodes[i];
            if(node.getClassName()=='wof.bizWidget.VoucherItem'){
                items.push(node);
            }
        }
        return items;
    },

    //获得所有item 并且重设item行列号
    _getItems: function(){
        var items = this.findItems();
        if(items.length>0){
            var rows = Math.ceil((items[items.length-1].getTop()-items[0].getTop()+items[0].getHeight())/(items[0].getHeight()/items[0].getRowspan()));
            var	cols = Math.ceil(this.getWidth()/(items[0].getWidth()/items[0].getColspan()));
            var k=0;
            for(var r=1;r<=rows;r++){
                for(var c=1;c<=cols;c++){
                    if(c==1){
                        items[k].setRow(r);
                        items[k].setCol(c);
                        k++;
                    }else{
                        var prevCell = items[k-1];
                        if(((prevCell.getColspan()+prevCell.getCol()-1)>=c)&&prevCell.getRow()==r){
                            continue;
                        }else{
                            items[k].setRow(r);
                            items[k].setCol((c==1?c:(prevCell.getCol()+prevCell.getColspan())));
                            k++;
                        }
                    }
                }
            }
        }
        return items;
    },


};