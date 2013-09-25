/**
 * @widgetClass Label class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-5 下午1:54
 */

wof.widget.Label = function () {

    //记录该widget所有的发送消息和描述信息 供属性条控件使用
    this._sendMessages = {'wof.widget.Label_mousedown':'单击','wof.widget.Label_dblclick':'双击'};

};

wof.widget.Label.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _text:null,

    _label:null,

    _isUnderline:null, //是否包括下划线

    _isBold:null, //是否需要加粗

    _isHighlight:null, //是否需要高亮

    _value: null,

    _initFlag: null,

    /**
     * get/set 属性方法定义
     */
    getValue : function (){
        return this._value || '';
    },

    setValue : function (value){
        this._value = value;
    },
	 getText: function(){
		if(this._text==null)
			this._text = '';
        return this._text;
	 },
	 
	 setText: function(text){
        this._text = text;
	 },

    getIsUnderline: function(){
        if(this._isUnderline==null)
            this._isUnderline = false;
        return this._isUnderline;
    },

    setIsUnderline: function(isUnderline){
        this._isUnderline = isUnderline;
    },

    getIsBold: function(){
        if(this._isBold==null)
            this._isBold = false;
        return this._isBold;
    },

    setIsBold: function(isBold){
        this._isBold = isBold;
    },

    getIsHighlight: function(){
        if(this._isHighlight==null)
            this._isHighlight = false;
        return this._isHighlight;
    },

    setIsHighlight: function(isHighlight){
        this._isHighlight = isHighlight;
    },


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
                    var positionX = event.pageX;
                    var positionY = event.pageY;
                    _this.sendMessage('wof.widget.Label_mousedown',{x:positionX,y:positionY});
                    _this.sendMessage('wof.widget.Label_active');
                },300);
            });
            this.getDomInstance().dblclick(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                var positionX = event.pageX;
                var positionY = event.pageY;
                _this.sendMessage('wof.widget.Label_dblclick',{x:positionX,y:positionY});
                _this.sendMessage('wof.widget.Label_active');
            });
            this._label = jQuery('<span style="position:absolute;top:4px;cursor:pointer;">'+this.getText()+'</span>');
            this.getDomInstance().append(this._label);
            this._initFlag = true;
		}
        this.getDomInstance().children('hr').remove();
    },

    //----------必须实现----------
    render: function () {
		this._label.html(this.getText());
        if(this.getIsBold()==true){
            this._label.css('fontWeight','900');
        }else{
            this._label.css('fontWeight','');
        }
        if(this.getIsHighlight()==true){
            this._label.addClass('ui-state-hover');
        }else{
            this._label.removeClass('ui-state-hover');
        }
        this._label.attr('value',this.getValue());
		if(this.getIsUnderline()==true){
            var hr = jQuery('<hr style="position:absolute;top:24px;width:100%;border-top:1px solid black;">');
            this.getDomInstance().append(hr);
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
            value : this.getValue(),
			text: this.getText(),
            isUnderline: this.getIsUnderline(),
            isBold: this.getIsBold(),
            isHighlight: this.getIsHighlight()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setValue(data.value);
		this.setText(data.text);
        this.setIsUnderline(data.isUnderline);
        this.setIsBold(data.isBold);
        this.setIsHighlight(data.isHighlight);
    }

};