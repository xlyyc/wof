/**
 * @widgetClass Toolbar class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:49
 */

wof.widget.Toolbar = function () {

    this.getDomInstance().addClass('ui-widget-content ui-corner-bottom');
    this.getDomInstance().css('overflow','hidden');
};

wof.widget.Toolbar.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    /**
     * get/set 属性方法定义
     */


    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {

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

        };
    },
    //----------必须实现----------
    setData: function (data) {

    }

};