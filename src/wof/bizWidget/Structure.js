/**
 * @widgetClass Structure class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-9-21 下午08:46
 */
(function () {

    var Structure = wof.bizWidget.Structure = function (root) {
        this.getDomInstance().click(function (event) {
            event.stopPropagation();

        });
    };

    Structure.getCurrentStructureJson = function (root) {
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
            return jQuery.parseJSON(jsonStr);
        }
        return {};
    }

    Structure.prototype = {

        //选择实现
        beforeRender: function () {
            var ztreeInstance = this.getDomInstance().data('ztree');
            if (ztreeInstance) {
                ztreeInstance.destroy();
            }
        },

        //----------必须实现----------
        render: function () {
            var ztreeInstance = jQuery.fn.zTree.init(this.getDomInstance().addClass('ztree'), {},
                Structure.getCurrentStructureJson(jQuery('#content')));
            this.getDomInstance().data('ztree', ztreeInstance);
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

})();
