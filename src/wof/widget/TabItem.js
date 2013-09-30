/**
 * @widgetClass TabItem class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-5 下午1:30
 */

wof.widget.TabItem = function () {
    this.setPosition('static');
    this.setIsInside(true);

};

wof.widget.TabItem.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _title: null,

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

    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {
         this.getDomInstance().attr('id', this.getId());
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
            title: this.getTitle()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setTitle(data.title);
    }

};