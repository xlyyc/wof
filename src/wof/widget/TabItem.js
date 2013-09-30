/**
 * @widgetClass TabItem class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-5 下午1:30
 */

wof.widget.TabItem = function () {
    //this.setPosition('static');
    this.setIsInside(true);

};

wof.widget.TabItem.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _title: null,

    _overflow: null,

    /**
     * get/set 属性方法定义
     */
    getTitle: function () {
        if (this._title == null){
            this._title = '';
        }
        return this._title;
    },

    setTitle: function (title) {
        this._title = title;
    },

    setOverflow: function (overflow) {
        this._overflow = overflow;
    },


    getOverflow: function(){
        return this._overflow;
    },



    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        this.getDomInstance().css('overflow', '').css('overflow-x', '').css('overflow-y', '');
    },

    //----------必须实现----------
    render: function () {
        this.getDomInstance().attr('id', this.getId());
        if(this.getOverflow()=='x'){
            this.getDomInstance().css('overflow-x', 'scroll');
        }else if(this.getOverflow()=='y'){
            this.getDomInstance().css('overflow-y', 'scroll');
        }else if(this.getOverflow()=='scroll'){
            this.getDomInstance().css('overflow', 'scroll');
        }else if(this.getOverflow()=='auto'){
            this.getDomInstance().css('overflow', 'auto');
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
            title: this.getTitle(),
            overflow: this.getOverflow()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setTitle(data.title);
        this.setOverflow(data.overflow);
    }

};