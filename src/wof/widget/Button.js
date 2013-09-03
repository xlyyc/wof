/**
 * @widgetClass Button class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:49
 */

wof.widget.Button = function () {

    //记录该widget所有的发送消息和描述信息 供属性条控件使用
    this._sendMessages = {'wof.widget.Button_click':'单击'};

    var _this = this;
    this.getDomInstance().click(function(event){
        event.stopPropagation();
        var positionX = event.pageX;
        var positionY = event.pageY;
        _this.sendMessage('wof.widget.Button_click',{x:positionX,y:positionY});
    });
};

wof.widget.Button.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    //按钮启用属性
    _disabled:null,
    //按钮图标
    _icons:null,
    //按钮文本
    _text:null,
    //是否显示按钮文本
    _textShowed: null,
    //按钮类型：button 普通，submit 提交
    _type: null ,

    /**
     * get/set 属性方法定义
     */
    getDisabled: function(){
        if(this._disabled == null)
            this._disabled = '';
        return this._disabled;
    },

    setDisabled: function(disabled){
        this._disabled = disabled;
    },

    getIcons: function(){
        if(this._icons ==null)
            this._icons = false;
        return this._icons ;
    },

    setIcons: function(icons){
        this._icons = icons ;
    },

    getText: function(){
        if(this._text == null)
            this._text = '';
        return this._text;
    },

    setText: function(text){
        this._text = text;
    },

    getTextShowed: function(){
        if(this._textShowed == null)
            this._textShowed = true;
        return this._textShowed;
    },

    setTextShowed: function(textShowed){
        this._textShowed = textShowed;
    },

    getType: function(){
        if(this._type == null)
            this._type = '';
        return this._type ;
    },

    setType: function(type){
        this._btnType = type;
    },
    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        this.getDomInstance().children('input[type=button],input[type=submit], button').remove();
    },

    //----------必须实现----------
    render: function () {
        this.getDomInstance().attr('id', this.getId());
        var btn = jQuery('<button type="'+this.getType()+'" '+this.getDisabled()+' />');
        btn.button(
            {
                label: this.getText() ,
                icons : {
                    primary: "ui-icon-gear" ,
                    secondary: "ui-icon-triangle-1-s"
                },
                text : this.getTextShowed()
            }
        );

        this.getDomInstance().append(btn);
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
            disabled: this.getDisabled() ,
            icons: this.getIcons(),
            text: this.getText(),
            textShowed: this.getTextShowed() ,
            type: this.getType()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setDisabled(data.disabled);
        this.setIcons(data.icons);
        this.setText(data.text);
        this.setTextShowed(data.textShowed);
        this.setType(data.type);
    },

    //选择实现
    _update:function(data){
        if(data.text!=null){
            this.setText(data.text);
        }
        this.render();
    },

    _delete: function(){
        this.remove();
    }

};