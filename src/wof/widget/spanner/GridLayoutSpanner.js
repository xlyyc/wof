/**
 * @widgetClass GridLayoutSpanner class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.widget.spanner.GridLayoutSpanner = function () {
    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.widget.GridLayout_active',method:'this.setPropertys(message.sender);this.render();'});
    var method = 'var data=message.sender.propertys; '
        +'if(data.id==this.getPropertys().id){ '
        +' var button=wof.util.ObjectManager.get(data.id); '
        +' button.setData(data); '
        +' button.render();'
        +'}';
    onReceiveMessage.push({id:'wof.bizWidget.PropertyBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnSendMessageBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnReceiveMessageBar_apply',method:method});
    this.setOnReceiveMessage(onReceiveMessage);

    var _this = this;

};
wof.widget.spanner.GridLayoutSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性
    _propertys: null,

    _activeData: null,

    /**
     * get/set 属性方法定义
     */

    setPropertys:function(propertys){
        this._propertys = propertys;
    },

    getPropertys: function(){
        if(this._propertys==null){
            this._propertys = {};
        }
        return this._propertys;
    },

    setActiveData:function(activeData){
        this._activeData = activeData;
    },

    getActiveData: function(){
        if(this._activeData==null){
            this._activeData = {};
        }
        return this._activeData;
    },

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
        this.setActiveData(this.getPropertys());
        this.sendMessage('wof.widget.spanner.GridLayoutSpanner_render');
    },

    /**
     * getData/setData 方法定义
     */

    //必须实现
    getData:function(){
        return {
            propertys: this.getPropertys(),
            activeData: this.getActiveData()
        };
    },
    //必须实现
    setData:function(data){
        this.setPropertys(data.propertys);
        this.setActiveData(data.activeData);
    }

};