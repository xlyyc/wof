/**
 * @widgetClass TabItem class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-5 下午1:30
 */

wof.widget.TabItem = function () {
    this._position = 'static';
};

wof.widget.TabItem.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _title: null,
    //可否关闭属性
    _closeAble: null,
    //tab页当前是否活动
    _active: null,

    /**
     * get/set 属性方法定义
     */
    getTitle: function () {
        if (this._title == null)
            this._title = '';
        return this._title;
    },

    setTitle: function (title) {
        this._title = title;
    },

    getActive: function () {
        if (this._active == null)
            this._active = '';
        return this._active;
    },

    setActive: function (active) {
        this._active = active;
    },

    getCloseAble: function () {
        if (this._closeAble == null)
            this._closeAble = false;
        return this._closeAble;
    },

    setCloseAble: function (closeAble) {
        this._closeAble = closeAble;
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
            title: this.getTitle(),
            closeAble: this.getCloseAble(),
            active: this.getActive()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setTitle(data.title);
        this.setCloseAble(data.closeAble);
        this.setActive(data.active);
    }

};