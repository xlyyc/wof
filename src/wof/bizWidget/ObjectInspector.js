/**
 * @widgetClass Structure class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-9-21 下午08:46
 */


wof.bizWidget.ObjectInspector = function (root) {

    this.getDomInstance().mousedown(function (event) {
        event.stopPropagation();

    });
};
wof.bizWidget.ObjectInspector.prototype = {

    _initFlag: null,

    _getCurrentStructureJson: function(root){
        var convertInstanceToJson = function (instances) {
                var jsonArray = '[',
                    index = 0;
                if (instances) {
                    for (var i = 0; i < instances.length; i++) {
                        var instance = instances[i],
                            className = instance._className;
                        if (className.indexOf('Spanner') >= 0) {
                            continue;
                        }
                        if (index > 0) {
                            jsonArray += ',';
                        }
                        index++;
                        var children = instance.childNodes();
                        if (children.length) {
                            jsonArray += '{"name" : "' + className + '"';
                            var childrenJson = convertInstanceToJson(children);
                            if (childrenJson) {
                                jsonArray += ',"children" : ' + childrenJson;
                            }
                            jsonArray += '}';
                        } else {
                            jsonArray += '{"name" : "' + className + '"}';
                        }
                    }
                }
                if (index == 0) {
                    return null;
                }
                return jsonArray += ']';
            },
            jsonStr = '';
        if (root) {
            var instances = [];
            root.children().each(function () {
                var oid = jQuery(this).attr('oid'),
                    instance = wof.util.ObjectManager.get(oid);
                if (instance) {
                    instances.push(instance);
                }
            });
            jsonStr = convertInstanceToJson(instances);
            return JSON.parse(jsonStr);
        }
        return [];
    },

    //选择实现
    beforeRender: function () {
        if(!this._initFlag){
           var tree = new wof.widget.Tree();
		   tree.setIsInside(true);
           tree.setNodes(this._getCurrentStructureJson(jQuery('#content')));
		   tree.appendTo(this);
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

        };
    },
    //----------必须实现----------
    setData: function (data) {

    }

};
