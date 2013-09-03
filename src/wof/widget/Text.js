/**
 * @widgetClass Text class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-5 下午2:07
 */

wof.widget.Text = function () {

};

wof.widget.Text.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    //Text对象名称
    _name: null,

    //元数据属性id，如果自定义text 则为 custom
    _metaAttrId : null ,

    //展示形式（预制）：普通 base 、只读 readOnly 、带下划线的只读 readUnderLine
    _displayType : null ,

    //是否验证
    _isVerify : null ,

    //验证类型 ： 对应具体数值类型或者自定义的验证
    _verifyType : null ,

    //验证提示 ：显示验证提示的内容
    _verifyAlert : null ,

    //数值格式化正则
    _format : null ,

    /**
     * get/set 属性方法定义
     */
    getName: function(){
        if(this._name==null)
            this._name = '';
        return this._name;
    },

    setName: function(name){
        this._name = name;
    },

    getMetaAttrId:function(){
        if(this._metaAttrId==null)
            this._metaAttrId = '';
        return this._metaAttrId;
    },

    setMetaAttrId: function(metaAttrId){
        this._metaAttrId = metaAttrId;
    },

    getDisplayType:function(){
        if(this._displayType==null)
            this._displayType = '';
        return this._displayType;
    },

    setDisplayType: function(displayType){
        this._displayType = displayType;
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

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            _name : this.getName()  ,
            _metaAttrId: this.getMetaAttrId() ,
            _displayType : this.getDisplayType()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
        this.setMetaAttrId(data.metaAttrId);
        this.setDisplayType(data.displayType);
    }

};