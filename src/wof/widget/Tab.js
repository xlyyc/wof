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

    /**
     * get/set 属性方法定义
     */


    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        this.getDomInstance().children('ul').remove();
    },

    //----------必须实现----------
    render: function () {
        this.getDomInstance().attr('id', this.getId());
		var ul = $('<ul>');
		this.getDomInstance().prepend(ul);
		for(var i=0; i<this.childNodes().length; i++){
			var li = $('<li>');
			var a = $('<a href="#'+this.childNodes()[i].getId()+'">'+this.childNodes()[i].getTitle()+'</a>');
			li.append(a);
			ul.append(li);
		}
    },

    //选择实现
    afterRender: function () {
        $('#'+this.getId()).tabs({ heightStyle: "fill" });
		$('#'+this.getId()).tabs( "refresh" );
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {

        };
    },
    //----------必须实现----------
    setData: function (data) {

    }

};