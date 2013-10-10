/**
 * @bizWidgetClass VoucherComponent class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.VoucherComponent = function () {


};
wof.bizWidget.VoucherComponent.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _initFlag:null,


    /**
     * get/set 属性方法定义
     */


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

        };
    },
    //----------必须实现----------
    setData: function (data) {

    },

    //创建初始化的VoucherComponent
    createSelf: function(width, height){
        var node = new wof.bizWidget.VoucherComponent();
        node.setWidth(width);
        node.setHeight(height);
        node.setTop(0);
        node.setLeft(0);
        return node;
    }



};