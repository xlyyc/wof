wof.bizWidget.OnReceiveMessageBar = function(){
	this.getDomInstance().css('position', 'absolute');
	
	var _this = this;
	this.getDomInstance().click(function(event){
		event.stopPropagation();
        _this.sendMessage('wof.bizWidget.OnReceiveMessageBar_click');
	});
};
wof.bizWidget.OnReceiveMessageBar.prototype={
	
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
    //创建表
    _createTable: function(trs){
        var table = jQuery('<table id="propertyTable" style="border-collapse:collapse;text-align:left;width:96%;">');
        var tbody = jQuery('<tbody>');
        for(var i=0;i<trs.length;i++){
            tbody.append(trs[i]);
        }
        table.append(tbody);
        return table;
    },
    //创建行
    _createTr: function(label,componentData){
        var _this = this;
        var tr = jQuery('<tr style="height:30px;border:1px inset #a1a1a1;">');
        tr.append(jQuery('<td style="width:40%;"><span style="width:100px;">'+label+'</span></td>'));
        if(componentData.type=='button'){
            var td = jQuery('<td style="width:60%;"></td>');
            tr.append(td);
            var input = jQuery('<input type="button" style="width:80px;" name="'+componentData.name+'" value="'+componentData.value+'"/>');
            td.append(input);
            input.click(function(event){
                var name = event.target.name;
                var method = _this.getMethodByName(name);
                var priority = _this.getPriorityByName(name);
                if(method==null){
                    method = '';
                }
                if(priority==null){
                    priority = 50;
                }
                var dialogDiv = jQuery('<div title="定制业务"><div style="width:770px;height:25px;line-height:25px;vertical-align:middle;">消息ID:'+name+'</div><div style="width:770px;height:25px;line-height:25px;vertical-align:middle;">优先级:<input type="text" value="'+priority+'"></div><textarea rows="27" cols="94">'+method+'</textarea></div>');
                dialogDiv.dialog({
                    resizable: false,
                    height: 625,
                    width: 800,
                    modal: true,
                    buttons: {
                        "保存": function(){
                            var funcStr = jQuery(this).find('textarea').val();
                            var priority = Number(jQuery(this).find('input[type="text"]').val());
                            _this.setMethodByName(name, funcStr, priority);
                            _this.sendMessage('wof.bizWidget.OnReceiveMessageBar_apply');
                            jQuery(this).dialog("close");
                        },
                        '关闭': function(){
                            jQuery(this).dialog("close");
                        }
                    },
                    close: function(event,ui){
                        jQuery(this).remove();
                    }
                });
            });
        }
        return tr;
    },
	//选择实现
	beforeRender: function(){
		this.getDomInstance().children().remove();
	},
	//必须实现
	render: function(){
		var _this = this;
        var propertys = this.getPropertys();
		if(!jQuery.isEmptyObject(propertys.onReceiveMessage)){
            var onReceiveMessage = propertys.onReceiveMessage;
            var trs = [];
            for(var i=0;i<onReceiveMessage.length;i++){
                var message = onReceiveMessage[i];
                trs.push(this._createTr(message.id,{type:'button',name:message.id,value:'定制'}));
            }
            var table = this._createTable(trs);
            this.getDomInstance().append(table);
		}
        var addBtn = jQuery('<input type="button" value="增加监听">');
        addBtn.click(function(event){
            event.stopPropagation();
            var dialogDiv = jQuery('<div title="定制业务"><div style="width:770px;height:25px;line-height:25px;vertical-align:middle;">消息ID:<input type="text" name="name"></div><div style="width:770px;height:25px;line-height:25px;vertical-align:middle;">优先级:<input type="text" name="priority" value="50"></div><textarea rows="27" cols="94"></textarea></div>');
            dialogDiv.dialog({
                resizable: false,
                height: 625,
                width: 800,
                modal: true,
                buttons: {
                    "保存": function(){
                        var name = jQuery(this).find('input[type="text"][name="name"]').val();
                        var method = jQuery(this).find('textarea').val();
                        var priority = Number(jQuery(this).find('input[type="text"][name="priority"]').val());
                        _this.setMethodByName(name, method, priority);
                        _this.sendMessage('wof.bizWidget.OnReceiveMessageBar_apply');
                        jQuery(this).dialog("close");
                    },
                    '关闭': function(){
                        jQuery(this).dialog("close");
                    }
                },
                close: function(event,ui){
                    jQuery(this).remove();
                }
            });
        });
        this.getDomInstance().append(addBtn);
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
	},

    getMethodByName:function(name){
        var method = null;
        var messages = this.getPropertys()['onReceiveMessage'];
        for(var i=0;i<messages.length;i++){
            var msg = messages[i];
            if(msg.id==name){
                method = msg.method;
                break;
            }
        }
        return method;
    },

    getPriorityByName:function(name){
        var priority = null;
        var messages = this.getPropertys()['onReceiveMessage'];
        for(var i=0;i<messages.length;i++){
            var msg = messages[i];
            if(msg.id==name){
                priority = msg.priority;
                break;
            }
        }
        return priority;
    },

    setMethodByName:function(name, method, priority){
        var messages = this.getPropertys()['onReceiveMessage'];
        for(var i=0;i<messages.length;i++){
            if( messages[i].id==name){
                messages.splice(i,1);
                break;
            }
        }
        if(method!=null&&method.length>0){
            messages.push({id:name,method:method, priority:priority});
        }
    }
	
};