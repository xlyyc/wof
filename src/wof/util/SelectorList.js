/**
 * @widgetClass SelectorList class
 * @package wof.util
 * @copyright author
 * @Time: 13-8-5 上午11:18
 */
wof.util.SelectorList = function(){
    this._list = new wof.util.ArrayList();
};
wof.util.SelectorList.prototype = {

    _list: null,

    size: function() {
        return this._list.size();
    },

    isEmpty: function() {
        return this._list.isEmpty();
    },

    contains: function(obj) {
        return this._list.contains(obj);
    },

    indexOf: function(obj) {
        return this._list.indexOf(obj);
    },

    lastIndexOf: function(obj) {
        return this._list.lastIndexOf(obj);
    },

    toArray: function() {
        return this._list.toArray();
    },

    outOfBound: function(index) {
        return this._list.outOfBound(index);
    },

    get: function(index) {
        return this._list.get(index);
    },

    set: function(index, obj) {
        this._list.set(index, obj);
    },

    add: function(obj) {
        this._list.add(obj);
    },

    insert: function(index, obj) {
        this._list.insert(index,obj);
    },

    remove: function(index) {
        return this._list.remove(index);
    },

    removeObject: function(obj) {
        return this._list.removeValue(obj);
    },

    clear: function() {
        this._list.clear();
    },

    addAll: function(list) {
        return this._list.addAll(list.getList());
    },

    insertAll: function(index, list) {
        return this._list.insertAll(index,list.getList());
    },

    getList: function(){
        return this._list;
    }


};
