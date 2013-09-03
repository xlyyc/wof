wof.bizWidget.PropertyBar = function(){
	this.getDomInstance().css('position', 'absolute');
	
	var _this = this;
	this.getDomInstance().click(function(event){
		event.stopPropagation();
        _this.sendMessage('wof.bizWidget.PropertyBar_click');
	});
};
wof.bizWidget.PropertyBar.prototype={
	
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
		if(componentData.type=='text'){
            var td = jQuery('<td style="width:60%;"></td>');
            tr.append(td);
            var input = jQuery('<input type="input" style="width:100px;" name="'+componentData.name+'" value="'+componentData.value+'"/>');
            td.append(input);
            input.bind('input propertychange', function() {
                /*if(_this._propertys!=null){
                    _this._propertys[componentData.name] = jQuery(this).val();
                }*/
            });
        }else{
            //todo 支持其他类型的控件
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
            var trs = [];
            for(var name in propertys){
                if(name=='childNodes'){
                    continue;
                }
                var value = propertys[name];
                trs.push(this._createTr(name,{type:'text',name:name,value:value}));
            }
            var table = this._createTable(trs);
            this.getDomInstance().append(table);

            var applyBtn = jQuery('<input type="button" value=" 应用 ">');
            this.getDomInstance().append(applyBtn);
            applyBtn.click(function(event){
                _this.sendMessage('system_object_update', propertys);
            });
            var removeBtn = jQuery('<input type="button" value=" 删除 ">');
            this.getDomInstance().append(removeBtn);
            removeBtn.click(function(event){
                _this.sendMessage('system_object_delete', {'id':propertys.id});
                _this.setPropertys(null);
                _this.render();
            });
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