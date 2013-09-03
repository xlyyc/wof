/**
 * @widgetClass DateBox class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:35
 */

wof.widget.DateBox = function () {
   this._dateFormat = 'yyyy-mm-dd';
};

wof.widget.DateBox.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _value : null,
	
	_dateFormat : null,
	
    /**
     * get/set 属性方法定义
     */
    getValue : function (){
	    return this._value || '';
	},
	
	setValue : function (value){
	    this._value = value;
	},
	
	getDateFormat : function (){
	    return this._dateFormat;
	},
	
	setDateFormat : function (dateFormat){
	    this._dateFormat = dateFormat;
	},
    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        this.getDomInstance().datepicker('destroy');
    },

    //----------必须实现----------
    render: function () {
         this.getDomInstance().datepicker({
                dateFormat : this.getDateFormat()
         });
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
            value : this.getValue(),
			dateFormat : this.getDateFormat()
        };
    },
    //----------必须实现----------
    setData: function (data) {
		this.setValue(data.value);
		this.setDateFormat(data.dateFormat);
    }

};