/**
 * @widgetClass RadioGroupItem class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-13 下午1:36
 */

wof.widget.RadioGroupItem = function () {
 
};

wof.widget.RadioGroupItem.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    //是否选中
    _checked : null ,
    //是否禁用
    _disabled : null ,
    //单选按钮的值
    _value : null ,

    /**
     * get/set 属性方法定义
     */

    getChecked: function(){
        if(this._checked == null)
            this._checked = '';
        return this._checked;
    },

    setChecked: function(checked){
        this._checked = checked;
    },

    getDisabled: function(){
        if(this._disabled == null)
            this._disabled = '';
        return this._disabled;
    },

    setDisabled: function(disabled){
        this._disabled = disabled;
    },

    getValue: function(){
        if(this._value == null)
            this._value = '';
        return this._value;
    },

    setValue: function(value){
        this._value = value;
    },

    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        //设置为内置对象
        this.getDomInstance().attr('isinside', 'true');
    },

    //----------必须实现----------
    render: function () {
        var radioBtnDom =jQuery('<input type="radio" id="'+this.getId()+
            '" name="'+this.parentNode().getName()+'" >' +
            '</input>' +
            '<label for="'+this.getId()+'">' +
            ''+this.getValue()+
            '</label>');
        this.getDomInstance().append(radioBtnDom);
        this.parentNode().getDomInstance().append(radioBtnDom);

        if(this.getChecked() === 'checked'){
            //属性不变，css样式变化
            // jQuery('#'+this.getId()).prop('checked', true);
            //input 属性 checked 设置为 checked
            jQuery('#'+this.getId()).attr('checked','checked');
        }
        if(this.getDisabled() === 'disabled'){
            //属性不变，css样式变化
            //  jQuery('#'+this.getId()).prop("disabled", true);
            //disabled 属性 true
            jQuery('#'+this.getId()).attr("disabled", true);
        }

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
            checked : this.getChecked()  ,
            disabled: this.getDisabled() ,
            value : this.getValue()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setChecked(data.checked);
        this.setDisabled(data.disabled);
        this.setValue(data.value);
    }

};