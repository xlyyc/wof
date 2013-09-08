wof.bizWidget.MessageBar = function(){
	this.getDomInstance().css('position', 'absolute');
	
	var _this = this;
	this.getDomInstance().click(function(event){
		event.stopPropagation();
        _this.sendMessage('wof.bizWidget.MessageBar_click');
	});
};
wof.bizWidget.MessageBar.prototype={
	
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
                alert(11);
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
            if(sendMessages!=null){
                var trs = [];
                for(var name in sendMessages){
                    var value = sendMessages[name];
                    trs.push(this._createTr(value,{type:'button',name:name,value:name}));
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
	}
	
};