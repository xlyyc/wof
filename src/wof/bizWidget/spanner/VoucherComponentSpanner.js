/**
 * @widgetClass VoucherComponentSpanner class
 * @package wof.bizWidget.spanner
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.spanner.VoucherComponentSpanner = function () {

    //记录该widget所有的发送消息和描述信息 供属性条控件使用
    this._sendMessages = {'wof.bizWidget.VoucherComponent_mousedown':'单击','wof.bizWidget.VoucherComponent_render':'重绘'};

    this._name = 'wof.bizWidget.VoucherComponent';
    this._title = '表头';

    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.bizWidget.Spanner_render',method:'var propertys=message.sender.propertys;if(propertys.className=="wof.bizWidget.VoucherComponent"){this.setPropertys(propertys);}else{this.setPropertys(null)}this.render();'});
    var method = 'var data=message.sender.propertys; '
        +'if(data.id==this.getPropertys().id){ '
        +' var node=wof.util.ObjectManager.get(data.id); '
        +' node.setData(data); '
        +' node.render();'
        +'}';
    onReceiveMessage.push({id:'wof.bizWidget.PropertyBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnSendMessageBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnReceiveMessageBar_apply',method:method});
    this.setOnReceiveMessage(onReceiveMessage);

    var _this = this;

};
wof.bizWidget.spanner.VoucherComponentSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性

    _name: null,

    _title: null,

    _sendMessages: null,

    _propertys: null,

    _activeData: null,

    /**
     * get/set 属性方法定义
     */
    getTitle: function(){
        return this._title;
    },

    getName: function(){
        return this._name;
    },

    getSendMessages: function(){
        return this._sendMessages;
    },

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
        this.sendMessage('wof.bizWidget.spanner.VoucherComponentSpanner_render');
    },

    /**
     * getData/setData 方法定义
     */

    //必须实现
    getData:function(){
        return {
            propertys: this.getPropertys(),
            activeData: this.getActiveData(),
            sendMessages: this.getSendMessages(),
            name: this.getName(),
            title: this.getTitle()
        };
    },
    //必须实现
    setData:function(data){
        this.setPropertys(data.propertys);
        this.setActiveData(data.activeData);
    }

};