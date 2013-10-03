wof.widget.Tree = function () {

    var _this = this;
    this.getDomInstance().click(function (event) {
        event.stopPropagation();

    });
};

wof.widget.Tree.prototype = {

    _initFlag: null,

    url: null,

    setUrl: function (url) {
        this.url = url;
    },
    getUrl: function () {
        return this.url;
    },

    /**
     * type string or object
     */
    param: null,

    setParam: function (param) {
        this.url = url;
    },
    getParam: function () {
        return this.param;
    },

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


    onClick: jQuery.noop,

    onExpand: jQuery.noop,

    //选择实现
    beforeRender: function () {
        if (!this._initFlag) {
            jQuery.fn.zTree.init(this.getDomInstance().addClass('ztree'),
                {treeId: this.getId(), callback: {onClick: this.onClick}}, this.nodes);
            this._initFlag = true;
        }
    },

    //----------必须实现----------
    render: function () {

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
            url: this.getUrl(),
            param: this.getParam(),
            nodes: this.getNodes()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setUrl(data.url);
        this.setParam(data.param);
        this.setNodes(data.nodes);
    }

};