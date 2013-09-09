wof.bizWidget.OnSendMessageBar = function(){
	this.getDomInstance().css('position', 'absolute');
	
	var _this = this;
	this.getDomInstance().click(function(event){
		event.stopPropagation();
        _this.sendMessage('wof.bizWidget.MessageBar_click');
	});
};
wof.bizWidget.OnSendMessageBar.prototype={
	
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
                var method = _this.getMethodByName(name, 'onSendMessage');
                if(method==null){
                    method = '';
                }
                var dialogDiv = jQuery('<div title="定制业务"><div style="width:770px;height:50px;line-height:50px;vertical-align:middle;">消息ID:'+name+'</div><textarea rows="30" cols="125">'+method+'</textarea></div>');
                dialogDiv.dialog({
                    resizable: false,
                    height: 625,
                    width: 800,
                    modal: true,
                    buttons: {
                        "保存": function(){
                            var funcStr = jQuery(this).find('textarea').val();
                            _this.setMethodByName(name, funcStr, 'onSendMessage');
                            _this.sendMessage('wof.bizWidget.MessageBar_apply');
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
		if(!jQuery.isEmptyObject(propertys)){
            var sendMessages = propertys.sendMessages;
            var onSendMessage = propertys.onSendMessage;
            if(sendMessages!=null){
                var trs = [];
                for(var name in sendMessages){
                    var label = sendMessages[name];
                    var funcFlag = '未定义';
                    var method = this.getMethodByName(name, 'onSendMessage');
                    if(method!=null){
                        funcFlag = '已定义';
                    }
                    trs.push(this._createTr(label,{type:'button',name:name,value:funcFlag}));
                }
                var table = this._createTable(trs);
                this.getDomInstance().append(table);
            }
		}
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

    getMethodByName:function(name, type){
        var method = null;
        var messages = this.getPropertys()[type];
        for(var i=0;i<messages.length;i++){
            var msg = messages[i];
            if(msg.id==name){
                method = msg.method;
                break;
            }
        }
        return method;
    },

    setMethodByName:function(name, method, type){
        var messages = this.getPropertys()[type];
        for(var i=0;i<messages.length;i++){
            if( messages[i].id==name){
                messages.splice(i,1);
                break;
            }
        }
        if(method!=null&&method.length>0){
            console.log(method);
            messages.push({id:name,method:method});
        }
    }
	
};