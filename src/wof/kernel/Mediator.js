/**
 * @widgetClass Mediator class
 * @package wof.Mediator
 * @copyright author
 * @Time: 13-8-7 上午10:49
 */

wof.kernel.Mediator = function () {
    this._sendMessages = {'wof.kernel.Mediator_click':'单击'}

    var _this = this;
    this.getDomInstance().click(function(event){
        event.stopPropagation();
        _this.sendMessage('wof.kernel.Mediator_click');
    });
};
wof.kernel.Mediator.prototype = {
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
        this.getDomInstance().css('cursor','pointer');
        this.getDomInstance().children('table').remove();
    },

    //选择实现
    afterRender: function () {
        var table = jQuery('<table style="background-color:#fff9e5;border-collapse:collapse;text-align:left;width:160px;">');
        var tr = jQuery('<tr style="height:30px;border:1px inset #a1a1a1;">');
        tr.append(jQuery('<td style="width:15%;">&nbsp;<img src="src/img/logic.ico" style="width:16px;height:16px;"></td>'));
        tr.append(jQuery('<td style="width:85%;">定制业务脚本 '+String(this.getOnReceiveMessage().length)+' 项</td>'));
        table.append(tr);
        this.getDomInstance().append(table);
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