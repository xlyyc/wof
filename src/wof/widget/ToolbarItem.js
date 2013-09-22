/**
 * @widgetClass ToolbarItem class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:50
 */

wof.widget.ToolbarItem = function () {
    this.setPosition('relative');

};

wof.widget.ToolbarItem.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _title: null,

    _name: null,

    _isHide: null,

    _divLabel: null,

    _divChildNodes: null,

    /**
     * get/set 属性方法定义
     */
    getTitle: function(){
        if(this._title==null)
            this._title = '';
        return this._title;
    },

    setTitle: function(title){
        this._title = title ;
    },

    getName: function(){
        if(this._name==null)
            this._name = '';
        return this._name;
    },

    setName: function(name){
        this._name = name ;
    },

    getIsHide: function(){
        if(this._isHide==null)
            this._isHide = false;
        return this._isHide;
    },

    setIsHide: function(isHide){
        this._isHide = isHide ;
    },

    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        if(this._divLabel==null){
            var _this = this;
            this._divLabel = jQuery('<div class="ui-widget-header ui-corner-all" style="text-align:center;height:24px;width:'+(this.parentNode().getWidth()-1)+'px;"><label style="line-height:24px;">'+this.getTitle()+'</label></div>');
            this.getDomInstance().append(this._divLabel);
            this._divLabel.click(function(event){
                _this._divChildNodes.slideToggle();
                if(_this.getIsHide()==true) {
                    _this.setIsHide(false);
                }else{
                    _this.setIsHide(true);
                }
            });
            this.getDomInstance().append(jQuery('<div style="height:8px;">'));
            this._divChildNodes = jQuery('<div style="width:'+(this.parentNode().getWidth()-1)+'px;">');
            this.getDomInstance().append(this._divChildNodes);
            for(var i=0;i<this.childNodes().length;i++){
                var node = this.childNodes()[i];
                node.setPosition('relative');
                this._divChildNodes.append(node.getDomInstance());
            }
        }
    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {
        if(this.getIsHide()==true){
            this._divChildNodes.hide();
        }else{
            this._divChildNodes.show();
        }
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            title: this.getTitle(),
            name: this.getName(),
            isHide: this.getIsHide()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setTitle(data.title);
        this.setName(data.name);
        this.setIsHide(data.isHide);

    }

};