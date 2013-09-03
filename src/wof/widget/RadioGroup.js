/**
 * @widgetClass RadioGroup class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:36
 */

wof.widget.RadioGroup = function () {

};

wof.widget.RadioGroup.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //分组名称
    _name : null ,

    /**
     * get/set 属性方法定义
     */

    getName: function(){
        if(this._name == null)
            this._name = '';
        return this._name;
    },

    setName: function(name){
        this._name = name;
    },


    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        this.getDomInstance().children('input[type=radio]').remove();
        this.getDomInstance().children('label').remove();
    },

    //----------必须实现----------
    render: function () {
        this.getDomInstance().attr('id', this.getName());
    },

    //选择实现
    afterRender: function () {
        //radio按钮组渲染
        jQuery('#'+this.getName()).buttonset();
        var _this = this;
        jQuery('input[type=radio]',_this.getDomInstance()).on('change', function() {
            for (var i=0; i <_this.childNodes().length; i++){
                if(_this.childNodes()[i].getId() === this.id)
                    _this.childNodes()[i].setChecked('checked');
                else
                     _this.childNodes()[i].setChecked('');
            }
        });

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            name : this.getName()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
    }

};