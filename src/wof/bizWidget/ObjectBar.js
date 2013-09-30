﻿wof.bizWidget.ObjectBar = function(){
	
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
            toolbar.setHeight(this.getHeight());
            toolbar.setTop(0);
            toolbar.setLeft(0);
            toolbar.appendTo(this);

            var toolbarItem1 = new wof.widget.ToolbarItem();
            toolbarItem1.setIsInside(true);
            toolbarItem1.setTitle('布局组件');
            toolbarItem1.setName('layout');
            toolbarItem1.appendTo(toolbar);

            var label1 = new wof.widget.Label();
            label1.setIsInside(true);
            label1.setIco('src/img/verify.gif');
            label1.setWidth(130);
            label1.setHeight(25);
            label1.setValue('wof.bizWidget.FlowLayout');
            label1.setText('FlowLayout');
            label1.appendTo(toolbarItem1);
            label1.getDomInstance().draggable({
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
                    label1.getDomInstance().css('zIndex',60000);
                },
                stop:function(event,ui){
                    event.stopPropagation();
                    label1.getDomInstance().css('zIndex','auto');
                }
            });

            var toolbarItem2 = new wof.widget.ToolbarItem();
            toolbarItem2.setIsInside(true);
            toolbarItem2.setTitle('基本组件');
            toolbarItem2.setName('base');
            toolbarItem2.appendTo(toolbar);

            for(var o in wof.widget){
                if(typeof(wof.widget[o])=='function'){
                    var label = new wof.widget.Label();
                    label.setIsInside(true);
                    label.setIco('src/img/verify.gif');
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

            var toolbarItem3 = new wof.widget.ToolbarItem();
            toolbarItem3.setIsInside(true);
            toolbarItem3.setTitle('业务组件');
            toolbarItem3.setName('biz');
            toolbarItem3.appendTo(toolbar);
            for(var o in wof.bizWidget){
                if(typeof(wof.bizWidget[o])=='function'){
                    if(o!='FlowLayout'&&o!='FlowLayoutSection'&&o!='FlowLayoutItem'&&o!='PropertyBar'&&o!='OnSendMessageBar'&&o!='OnReceiveMessageBar'&&o!='ObjectBar'&&o!='ObjectInspector'){
                        var label = new wof.widget.Label();
                        label.setIsInside(true);
                        label.setIco('src/img/verify.gif');
                        label.setWidth(130);
                        label.setHeight(25);
                        label.setValue('wof.bizWidget.'+o);
                        label.setText(o);
                        label.appendTo(toolbarItem3);
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