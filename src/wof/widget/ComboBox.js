/**
 * @widgetClass ComboBox class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:35
 */

wof.widget.ComboBox = function () {

};

wof.widget.ComboBox.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _options: [],

    _select: null,

    _selectedOption: null,

    /**
     * get/set 属性方法定义
     */
    setOptions: function (options) {
        this._options = options;
    },
    getOptions: function (options) {
        return this._options;
    },

    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        if (this._select != null) {
            this._select.remove(true);
        }
    },

    //----------必须实现----------
    render: function () {
        this._select = jQuery('<select>');
        if (this._options) {
            for (var i = 0; i < this._options.length; i++) {
                var option = this._options[i];
                var optionDom = jQuery('<option>').val(option.value).text(option.text)
                    .appendTo(this._select);
                if (this._selectedOption && this._selectedOption.value === option.value) {
                    optionDom.attr('selected', 'selected');
                }
            }
        }

        this.getDomInstance().append(this._select);
    },

    //选择实现
    afterRender: function () {
        var that = this;
        this._select.multiselect({selectedList: 1, multiple: false, click: function (event, ui) {
            if (ui.checked === true) {
                that._selectedOption = {text: ui.text, value: ui.value};
            } else {
                that._selectedOption = null;
            }
        }});
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            options: this.getOptions()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setOptions(data.options);
    }

};