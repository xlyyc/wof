wof.bizWidget.Spanner = function(){

};
wof.bizWidget.Spanner.prototype={

    _activeSpannerId: null,

    _propertys: null,

    _components: null,

    getComponents: function(){
        if(this._components==null){
            this._components = [];
        }
        return this._components;
    },

    setComponents: function(components){
        this._components = components;
    },

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
        var onReceiveMessage = [];
        var method = 'this.setPropertys(message.sender);this.render();';
        var components = this.getComponents();
        for(var i=0;i<components.length;i++){
            var widget = components[i];
            onReceiveMessage.push({id:widget.getName()+'_active',method:method});
        }
        this.setOnReceiveMessage(onReceiveMessage);

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