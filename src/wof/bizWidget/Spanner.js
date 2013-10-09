wof.bizWidget.Spanner = function(){

};
wof.bizWidget.Spanner.prototype={

    _activeSpannerId: null,

    _propertys: null,

    _bizWidgetComponents: null,

    _layoutComponents: null,

    _widgetComponents: null,

    getWidgetComponents: function(){
        if(this._widgetComponents==null){
            this._widgetComponents = [];
        }
        return this._widgetComponents;
    },

    setWidgetComponents: function(widgetComponents){
        this._widgetComponents = widgetComponents;
    },

    getBizWidgetComponents: function(){
        if(this._bizWidgetComponents==null){
            this._bizWidgetComponents = [];
        }
        return this._bizWidgetComponents;
    },

    setBizWidgetComponents: function(bizWidgetComponents){
        this._bizWidgetComponents = bizWidgetComponents;
    },

    getLayoutComponents: function(){
        if(this._layoutComponents==null){
            this._layoutComponents = [];
        }
        return this._layoutComponents;
    },

    setLayoutComponents: function(layoutComponents){
        this._layoutComponents = layoutComponents;
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
        var bizWidgetComponents = this.getBizWidgetComponents();
        for(var i=0;i<bizWidgetComponents.length;i++){
            var widget = bizWidgetComponents[i];
            onReceiveMessage.push({id:widget.getName()+'_active',method:method});
        }
        var layoutComponents = this.getLayoutComponents();
        for(var i=0;i<layoutComponents.length;i++){
            var widget = layoutComponents[i];
            onReceiveMessage.push({id:widget.getName()+'_active',method:method});
        }
        var widgetComponents = this.getWidgetComponents();
        for(var i=0;i<widgetComponents.length;i++){
            var widget = widgetComponents[i];
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