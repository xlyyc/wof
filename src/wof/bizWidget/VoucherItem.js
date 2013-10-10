/**
 * @bizWidgetClass VoucherItem class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.VoucherItem = function () {


};
wof.bizWidget.VoucherItem.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _initFlag: null,

    _colNum: null,   //列号

    _rowNum: null,  //行号

    _isFixItem: null,   //是否是固定项，如为固定项目，则在界面显示时，显示位置固定，不进行流式布局

    _rowspan: null,   //纵跨行数

    _itemName: null,  //表单项名称,设置格式：#EntityName.PropertyName

    _index: null,   //表单项显示次序

    _visiable: null, //表单项是否显示

    _itemLabel: null, //显示名称，设置格式：#EntityName.PropertyVisibleName,可以固定值，也可以是设置绑定实体字段

    _dataField: null, //绑定的数据实体属性，设置格式

    _dateTimeBoxFormat: null, //日期 、时间格式，平台会预设几个格式

    _readOnly: null, //是否只读

    _required: null, //是否必填

    _length: null, //字符长度

    _min: null, //数值最小值

    _max: null, //数值最大值

    _regExp: null, //校验正则表达式

    _checkErrorInfo: null, //数据校验失败提示信息

    _selectPattern: null, //下拉框显示模式

    _useMultiSelect:null, //数据字典用于选择项下拉时，指定多选还是单选

    _visbleType: null, //显示类型

    _labelWidth: null, //Label宽度

    _inputWidth: null, //输入框宽度

    _inputHeight: null, //输入框高度

    _colspan: null, //横跨的列数

    _tipValue: null, //提示性的值或默认值

    _linkageItem: null, //


    /**
     * get/set 属性方法定义
     */
    getColNum: function(){
        return this._colNum;
    },

    setColNum: function(colNum){
        this._colNum = colNum;
    },

    getRowNum: function(){
        return this._rowNum;
    },

    setRowNum: function(rowNum){
        this._rowNum = rowNum;
    },

    getIsFixItem: function(){
        if(this._isFixItem==null){
            this._isFixItem = false;
        }
        return this._isFixItem;
    },

    setIsFixItem: function(isFixItem){
        this._isFixItem = isFixItem;
    },

    getRowspan: function(){
        if(this._rowspan==null){
            this._rowspan = 1;
        }
        return this._rowspan;
    },

    setRowspan: function(rowspan){
        this._rowspan = rowspan;
    },

    getItemName: function(){
        if(this._itemName==null){
            this._itemName = '';
        }
        return this._itemName;
    },

    setItemName: function(itemName){
        this._itemName = itemName;
    },

    getVisiable: function(){
        if(this._visiable==null){
            this._visiable = true;
        }
        return this._visiable;
    },

    setVisiable: function(visiable){
        this._visiable = visiable;
    },

    getItemLabel: function(){
        if(this._itemLabel==null){
            this._itemLabel = '';
        }
        return this._itemLabel;
    },

    setItemLabel: function(itemLabel){
        this._itemLabel = itemLabel;
    },

    getIsDataField: function(){
        return this._dataField;
    },

    setIsDataField: function(dataField){
        this._dataField = dataField;
    },

    getDateTimeBoxFormat: function(){
        return this._dateTimeBoxFormat;
    },

    setDateTimeBoxFormat: function(dateTimeBoxFormat){
        this._dateTimeBoxFormat = dateTimeBoxFormat;
    },

    getReadOnly: function(){
        return this._readOnly;
    },

    setReadOnly: function(readOnly){
        this._readOnly = readOnly;
    },

    getRequired: function(){
        return this._required;
    },

    setRequired: function(required){
        this._required = required;
    },

    getLength: function(){
        return this._length;
    },

    setLength: function(length){
        this._length = length;
    },

    getMin: function(){
        return this._min;
    },

    setMin: function(min){
        this._min = min;
    },

    getMax: function(){
        return this._max;
    },

    setMax: function(max){
        this._max = max;
    },

    getRegExp: function(){
        return this._regExp;
    },

    setRegExp: function(regExp){
        this._regExp = regExp;
    },

    getCheckErrorInfo: function(){
        return this._checkErrorInfo;
    },

    setCheckErrorInfo: function(checkErrorInfo){
        this._checkErrorInfo = checkErrorInfo;
    },

    getSelectPattern: function(){
        return this._selectPattern;
    },

    setSelectPattern: function(selectPattern){
        this._selectPattern = selectPattern;
    },

    getUseMultiSelect: function(){
        return this._useMultiSelect;
    },

    setUseMultiSelect: function(useMultiSelect){
        this._useMultiSelect = useMultiSelect;
    },

    getVisbleType: function(){
        return this._visbleType;
    },

    setVisbleType: function(visbleType){
        this._visbleType = visbleType;
    },

    getLabelWidth: function(){
        return this._labelWidth;
    },

    setLabelWidth: function(labelWidth){
        this._labelWidth = labelWidth;
    },

    getInputWidth: function(){
        return this._inputWidth;
    },

    setInputWidth: function(inputWidth){
        this._inputWidth = inputWidth;
    },

    getInputHeight: function(){
        return this._inputHeight;
    },

    setInputHeight: function(inputHeight){
        this._inputHeight = inputHeight;
    },

    getColspan: function(){
        return this._colspan;
    },

    setColspan: function(colspan){
        this._colspan = colspan;
    },

    getTipValue: function(){
        return this._tipValue;
    },

    setTipValue: function(tipValue){
        this._tipValue = tipValue;
    },

    getLinkageItem: function(){
        return this._linkageItem;
    },

    setLinkageItem: function(linkageItem){
        this._linkageItem = linkageItem;
    },

    getIndex: function(){
        return this._index;
    },

    setIndex: function(index){
        this._index = index;
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
                    _this.sendMessage('wof.bizWidget.VoucherComponent_mousedown');
                    _this.sendMessage('wof.bizWidget.VoucherComponent_active');
                },250);
            });
            this.getDomInstance().dblclick(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                _this.sendMessage('wof.bizWidget.VoucherComponent_dblclick');
                _this.sendMessage('wof.bizWidget.VoucherComponent_active');
            });
            this._initFlag = true;
        }
    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {


        this.sendMessage('wof.bizWidget.VoucherComponent_render')

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            index:this.getIndex(),
            colNum: this.getColNum(),
            rowNum: this.getRowNum(),
            isFixItem: this.getIsFixItem(),
            rowspan: this.getRowspan(),
            itemName: this.getItemName(),
            visiable: this.getVisiable(),
            itemLabel: this.getItemLabel(),
            dataField: this.getDataField(),
            dateTimeBoxFormat: this.getDateTimeBoxFormat(),
            readOnly: this.getReadOnly(),
            required: this.getRequired(),
            length: this.getLength(),
            min: this.getMin(),
            max: this.getMax(),
            regExp: this.getRegExp(),
            checkErrorInfo: this.getCheckErrorInfo(),
            selectPattern: this.getSelectPattern(),
            useMultiSelect:this.getUseMultiSelect(),
            visbleType: this.getVisbleType(),
            labelWidth: this.getLabelWidth(),
            inputWidth: this.getInputWidth(),
            inputHeight: this.getInputHeight(),
            colspan: this.getColspan(),
            tipValue: this.getTipValue(),
            linkageItem: this.getLinkageItem()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.getIndex(data.index);
        this.getColNum(data.colNum);
        this.getRowNum(data.rowNum);
        this.getIsFixItem(data.isFixItem);
        this.getRowspan(data.rowspan);
        this.getItemName(data.itemName);
        this.getVisiable(data.visiable);
        this.getItemLabel(data.itemLabel);
        this.getDataField(data.dataField);
        this.getDateTimeBoxFormat(data.dateTimeBoxFormat);
        this.getReadOnly(data.readOnly);
        this.getRequired(data.required);
        this.getLength(data.length);
        this.getMin(data.min);
        this.getMax(data.max);
        this.getRegExp(data.regExp);
        this.getCheckErrorInfo(data.checkErrorInfo);
        this.getSelectPattern(data.selectPattern);
        this.getUseMultiSelect(data.useMultiSelect);
        this.getVisbleType(data.visbleType);
        this.getLabelWidth(data.labelWidth);
        this.getInputWidth(data.inputWidth);
        this.getInputHeight(data.inputHeight);
        this.getColspan(data.colspan);
        this.getTipValue(data.tipValue);
        this.getLinkageItem(data.linkageItem);
    }



};