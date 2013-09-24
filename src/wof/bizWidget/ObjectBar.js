wof.bizWidget.ObjectBar = function(){
	this.getDomInstance().css('position', 'absolute');
	
	var _this = this;
	this.getDomInstance().click(function(event){
		event.stopPropagation();
        _this.sendMessage('wof.bizWidget.ObjectBar_click');
	});
};
wof.bizWidget.ObjectBar.prototype={

    _initFlag: null,

	//选择实现
	beforeRender: function(){
        if(this._initFlag==null){
            var toolbar = new wof.widget.Toolbar();
            toolbar.setIsInside(true);
            toolbar.setWidth(this.getWidth());
            toolbar.setTop(0);
            toolbar.setLeft(0);
            toolbar.appendTo(this);

            var toolbarItem1 = new wof.widget.ToolbarItem();
            toolbarItem1.setIsInside(true);
            toolbarItem1.setTitle('基本组件');
            toolbarItem1.setName('widget');
            toolbarItem1.appendTo(toolbar);

            for(var o in wof.widget){
                if(typeof(wof.widget[o])=='function'){
                    var label = new wof.widget.Label();
                    label.setIsInside(true);
                    label.setWidth(130);
                    label.setHeight(25);
                    label.setValue('wof.widget.'+o);
                    label.setText(o);
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
                            label.getDomInstance().css('zIndex',60000);
                        },
                        stop:function(event,ui){
                            label.getDomInstance().css('zIndex','auto');
                        }
                    });
                }
            }
            var toolbarItem2 = new wof.widget.ToolbarItem();
            toolbarItem2.setIsInside(true);
            toolbarItem2.setTitle('业务组件');
            toolbarItem2.setName('bizWidget');
            toolbarItem2.appendTo(toolbar);
            for(var o in wof.bizWidget){
                if(typeof(wof.bizWidget[o])=='function'){
                    if(o!='FlowLayoutSection'&&o!='FlowLayoutItem'&&o!='PropertyBar'&&o!='OnSendMessageBar'&&o!='OnReceiveMessageBar'&&o!='ObjectBar'){
                        var label = new wof.widget.Label();
                        label.setIsInside(true);
                        label.setWidth(130);
                        label.setHeight(25);
                        label.setValue('wof.widget.'+o);
                        label.setText(o);
                        label.appendTo(toolbarItem2);
                        label.getDomInstance().draggable({
                            cursor:"move",
                            opacity: 0.7,
                            cursorAt:{
                                top:0,
                                left:0
                            },
                            scroll: false,
                            start:function(event,ui){
                                label.getDomInstance().css('zIndex',60000);
                            },
                            stop:function(event,ui){
                                label.getDomInstance().css('zIndex','auto');
                            }
                        });
                    }
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

	},

    _insideOnReceiveMessage:{
        'wof.widget.Button_click':function(message){
            console.log(message.id+'   '+this.getClassName());
            console.log('message.sender.isInside='+message.sender.isInside);
        }
    }
	
};