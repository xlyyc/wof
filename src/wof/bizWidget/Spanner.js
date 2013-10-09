wof.bizWidget.Spanner = function(){

};
wof.bizWidget.Spanner.prototype={

    _activeSpannerId: null,

    _propertys: null,

    setPropertys:function(propertys){
        this._propertys = propertys;
    },

    getPropertys: function(){
        if(this._propertys==null){
            this._propertys = {};
        }
        return this._propertys;
    },

	//选择实现
	beforeRender: function(){

	},
	//必须实现
	render: function(){

	},
    //选择实现
    afterRender: function(){

        this.sendMessage('wof.bizWidget.Spanner_render');
    },
	//必须实现
	getData:function(){
		return {
            propertys: this.getPropertys()
		};
	},
	//必须实现
	setData:function(data){
        this.setPropertys(data.propertys);
	}
	
};