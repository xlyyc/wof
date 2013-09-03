/**
 * @widgetClass ArrayList class
 * @package wof.util
 * @copyright author
 * @Time: 13-8-5 上午11:18
 */

wof.util.ArrayList = function(){
    this._datas = [];
};
wof.util.ArrayList.prototype = {

    _datas: null,

    size: function() {
        return this._datas.length;
    },

    isEmpty: function() {
        return this.size() === 0;
    },

    contains: function(value) {
        return this._datas.indexOf(value) !== -1;
    },

    indexOf: function(value) {
        for ( var index in this._datas) {
            if (this._datas[index] === value) {
                return index;
            }
        }
        return -1;
    },

    lastIndexOf: function(value) {
        for ( var index = this.size(); index >= 0; index--) {
            if (this._datas[index] === value) {
                return index;
            }
        }
        return -1;
    },

    toArray: function() {
        return this._datas;
    },

    outOfBound: function(index) {
        return index < 0 || index > (this.size() - 1);
    },

    get: function(index) {
        if (this.outOfBound(index)) {
            return null;
        }
        return this._datas[index];
    },

    set: function(index, value) {
        this._datas[index] = value;
    },

    add: function(value) {
        this._datas.push(value);
    },

    insert: function(index, value) {
        if (this.outOfBound(index)) {
            return;
        }
        this._datas.splice(index, 0, value);
    },

    remove: function(index) {
        if (this.outOfBound(index)) {
            return false;
        }
        this._datas.splice(index, 1);
        return true;
    },

    removeValue: function(value) {
        if (this.contains(value)) {
            this.remove(this.indexOf(value));
            return true;
        }
        return false;
    },

    clear: function() {
        this._datas.splice(0, this.size());
    },

    addAll: function(list) {
        if (!list instanceof ArrayList) {
            return false;
        }
        for ( var index in list.datas) {
            this.add(list.get(index));
        }
        return true;
    },

    insertAll: function(index, list) {
        if (this.outOfBound(index)) {
            return false;
        }
        if (!list instanceof ArrayList) {
            return false;
        }
        var pos = index;
        for(var index in list.datas)
        {
            this.insert(pos++, list.get(index));
        }
        return true;
    },

    toString: function(){
        return "[" + this._datas.join() + "]";
    },

    valueOf: function(){
        return this.toString();
    }
};
