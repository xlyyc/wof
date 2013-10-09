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


	//选择实现
	beforeRender: function(){
        if(this._initFlag==null){
            var toolbar = new wof.widget.Toolbar();
            toolbar.setIsInside(true);
            toolbar.setWidth(this.getWidth());
            toolbar.setTop(0);
            toolbar.setLeft(0);
            toolbar.appendTo(this);

            var layoutComponents = this.getLayoutComponents();
            if(layoutComponents.length>0){
                var toolbarItem0 = new wof.widget.ToolbarItem();
                toolbarItem0.setIsInside(true);
                toolbarItem0.setTitle('布局组件');
                toolbarItem0.setName('layout');
                toolbarItem0.appendTo(toolbar);
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
            }

            var bizWidgetComponents = this.getBizWidgetComponents();
            if(bizWidgetComponents.length>0){
                var toolbarItem1 = new wof.widget.ToolbarItem();
                toolbarItem1.setIsInside(true);
                toolbarItem1.setTitle('业务组件');
                toolbarItem1.setName('biz');
                toolbarItem1.appendTo(toolbar);
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
            }


            var widgetComponents = this.getWidgetComponents();
            if(widgetComponents.length>0){
                var toolbarItem2 = new wof.widget.ToolbarItem();
                toolbarItem2.setIsInside(true);
                toolbarItem2.setTitle('基础组件');
                toolbarItem2.setName('base');
                toolbarItem2.appendTo(toolbar);
                for(var i=0;i<widgetComponents.length;i++){
                    var widget = widgetComponents[i];
                    var label = new wof.widget.Label();
                    label.setIsInside(true);
                    label.setIco('src/img/dropdown.png');
                    label.setWidth(130);
                    label.setHeight(25);
                    label.setValue(widget.getName());
                    label.setText(widget.getTitle());
                    label.appendTo(toolbarItem2);
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

		};
	},
	//必须实现
	setData:function(data){

	}
	
};