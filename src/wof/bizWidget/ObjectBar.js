wof.bizWidget.ObjectBar = function(){
	
	var _this = this;
	this.getDomInstance().click(function(event){
		event.stopPropagation();
        _this.sendMessage('wof.bizWidget.ObjectBar_click');
	});
};
wof.bizWidget.ObjectBar.prototype={

    _initFlag: null,

    _bizWidgetComponents: null,

    _layoutComponents: null,

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


	//选择实现
	beforeRender: function(){
        if(this._initFlag==null){
            var toolbar = new wof.widget.Toolbar();
            toolbar.setIsInside(true);
            toolbar.setWidth(this.getWidth());
            toolbar.setTop(0);
            toolbar.setLeft(0);
            toolbar.appendTo(this);

            var toolbarItem0 = new wof.widget.ToolbarItem();
            toolbarItem0.setIsInside(true);
            toolbarItem0.setTitle('布局组件');
            toolbarItem0.setName('layout');
            toolbarItem0.appendTo(toolbar);

            var layoutComponents = this.getLayoutComponents();
            for(var i=0;i<layoutComponents.length;i++){
                var widget = layoutComponents[i];
                var label = new wof.widget.Label();
                label.setIsInside(true);
                label.setIco('src/img/dropdown.png');
                label.setWidth(130);
                label.setHeight(25);
                label.setValue(widget.getName());
                label.setText(widget.getTitle());
                label.appendTo(toolbarItem0);
                label.getDomInstance().draggable({
                    cursor:"move",
                    opacity: 0.7,
                    cursorAt:{
                        top:0,
                        left:0
                    },
                    scroll: false,
                    helper: 'clone',
                    start:function(event,ui){
                        event.stopPropagation();
                        label.getDomInstance().css('zIndex',60000);
                    },
                    stop:function(event,ui){
                        event.stopPropagation();
                        label.getDomInstance().css('zIndex','auto');
                    }
                });
            }

            var toolbarItem1 = new wof.widget.ToolbarItem();
            toolbarItem1.setIsInside(true);
            toolbarItem1.setTitle('基本组件');
            toolbarItem1.setName('base');
            toolbarItem1.appendTo(toolbar);

            var bizWidgetComponents = this.getBizWidgetComponents();
            for(var i=0;i<bizWidgetComponents.length;i++){
                var widget = bizWidgetComponents[i];
                var label = new wof.widget.Label();
                label.setIsInside(true);
                label.setIco('src/img/dropdown.png');
                label.setWidth(130);
                label.setHeight(25);
                label.setValue(widget.getName());
                label.setText(widget.getTitle());
                label.appendTo(toolbarItem1);
                label.getDomInstance().draggable({
                    cursor:"move",
                    opacity: 0.7,
                    cursorAt:{
                        top:0,
                        left:0
                    },
                    scroll: false,
                    helper: 'clone',
                    start:function(event,ui){
                        event.stopPropagation();
                        label.getDomInstance().css('zIndex',60000);
                    },
                    stop:function(event,ui){
                        event.stopPropagation();
                        label.getDomInstance().css('zIndex','auto');
                    }
                });
            }
            this._initFlag=true;
        }
	},
	//必须实现
	render: function(){

	},
    //选择实现
    afterRender: function(){

    },
	//必须实现
	getData:function(){
		return {
            layoutComponents: this.getLayoutComponents(),
            bizWidgetComponents: this.getLayoutComponents()
		};
	},
	//必须实现
	setData:function(data){
        this.setLayoutComponents(data.layoutComponents);
        this.setLayoutComponents(data.bizWidgetComponents);
	}
	
};