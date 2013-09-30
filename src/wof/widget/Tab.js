/**
 * @widgetClass Tab class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */

wof.widget.Tab = function () {

};

wof.widget.Tab.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _activeIndex:null,

    _initDOMFlag:null,

    _updateFlag:null,

    /**
     * get/set 属性方法定义
     */
    setActiveIndex: function(activeIndex){
        if(this._initDOMFlag==true){
            this.getDomInstance().tabs({'active':activeIndex});
            this._updateFlag = false;
        }
        this._activeIndex = activeIndex;
    },

    getActiveIndex:function(){
        return this._activeIndex;
    },

    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        this.getDomInstance().children('ul').remove();
    },

    //----------必须实现----------
    render: function () {
		var ul = jQuery('<ul>');
		this.getDomInstance().prepend(ul);
		for(var i=0; i<this.childNodes().length; i++){
            this.childNodes()[i].setWidth(this.getWidth()-38);
            this.childNodes()[i].setHeight(this.getHeight());
			var li = jQuery('<li>');
			var a = jQuery('<a href="#'+this.childNodes()[i].getId()+'">'+this.childNodes()[i].getTitle()+'</a>');
			li.append(a);
			ul.append(li);
		}
    },

    //选择实现
    afterRender: function(){
        var _this = this;
        this._updateFlag = true;
        this.getDomInstance().tabs({
            heightStyle:'fill',
            activate: function(event,ui){
                event.stopPropagation();
                if(_this._updateFlag == false){
                    var activeIndex = 0;
                    var oid = ui.newPanel.attr('oid');
                    var items = _this.childNodes();
                    for(var i=0;i<items.length;i++){
                        if(items[i].getId()==oid){
                            activeIndex = i;
                            break;
                        }
                    }
                    _this.setActiveIndex(activeIndex);
                    _this.sendMessage('wof.widget.Tab_active',{'activeIndex':activeIndex});
                }else{
                    _this._updateFlag = false;
                }
            }
        });
        this.getDomInstance().tabs("refresh");
        if(this.getActiveIndex()!=null){
            this.getDomInstance().tabs({active:this.getActiveIndex()});
            this.sendMessage('wof.widget.Tab_active');
        }
        this._initDOMFlag = true;
        this.sendMessage('wof.widget.Tab_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function() {
        return {
            activeIndex: this.getActiveIndex()
        };
    },
    //----------必须实现----------
    setData: function(data) {
        this.setActiveIndex(data.activeIndex);
    }

};