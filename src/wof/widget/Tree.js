/**
 * @widgetClass Tree class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:46
 */

wof.widget.Tree = function () {

    var _this = this;
    this.getDomInstance().click(function(event){
        event.stopPropagation();

    });
};

wof.widget.Tree.prototype = {

    url: null,
    /**
     * type string or object
     */
    param: null,
    /**
     *   数据格式
     *   var nodes = [
             {name: "父节点1", children: [
                 {name: "子节点1"},
                 {name: "子节点2"}
             ]},
             {name: "父节点2",leaf : true,icon : 'home'},
             {name: "父节点3",open : true}
         ];
     */
    nodes: null,

    setNodes: function (nodes) {
        this.nodes = nodes;
    },
    getNodes: function () {
        return this.nodes;
    },


    onClick: function () {

    },

    onExpand: function () {

    },
    beforeClick: function () {

    },

    beforeExpand: function () {

    },

    //选择实现
    beforeRender: function () {
        var ztreeInstance = this.getDomInstance().data('ztree');
        if(ztreeInstance){
            ztreeInstance.destroy();
        }
    },

    //----------必须实现----------
    render: function () {
        var ztreeInstance = jQuery.fn.zTree.init(this.getDomInstance().addClass('ztree'), {}, this.nodes);
        this.getDomInstance().data('ztree',ztreeInstance);
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

        };
    },
    //----------必须实现----------
    setData: function (data) {

    }

};