/**
 * @bizWidgetClass FlowLayoutSection class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.FlowLayoutSection = function () {

    this.setIsInside(true);

    //todo overflow定义
    this.getDomInstance().css('overflow','hidden');

    this._backgroundImg = jQuery('<img src="src/img/backgroud.gif" style="position:absolute;cursor:pointer;opacity:0;filter:alpha(opacity=0);width:100%;height:100%;">');

    this._itemTable = new wof.util.Hashtable();

};
wof.bizWidget.FlowLayoutSection.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

	 _itemTable: null,
	 
	 _label: null,
	 
	 //列数
	 _cols: null,

    //行数
    _rows: null,
	 
	 //标题
	 _title:null,
	 //标题高度
	 _titleHeight:null,
	 
	 //item高度
	 _itemHeight: null,

    _initFlag: null,

    _isExpand: null,

    _index: null,

    _backgroundImg: null,
	 
    /**
     * get/set 属性方法定义
     */

    getIsExpand: function(){
        if(this._isExpand==null){
            this._isExpand = true;
        }
        return this._isExpand;
    },

    setIsExpand: function(isExpand){
        this._isExpand = isExpand;
    },

    getItemHeight: function(){
        if(this._itemHeight==null){
            if(this.parentNode()!=null){
                this._itemHeight = this.parentNode().getItemHeight();
            }else{
                this._itemHeight = 70;
            }
        }
        return this._itemHeight;
    },

    setItemHeight: function(itemHeight){
        this._itemHeight = itemHeight;
    },

    getTitle: function(){
        if(this._title==null){
            this._title = '';
        }
        return this._title;
    },

    setTitle: function(title){
        this._title = title;
    },

    getCols: function(){
		if(this._cols==null){
			if(this.parentNode()!=null){
				this._cols = this.parentNode().getCols();
			}else{
				this._cols = 1;
			}
		}
        return this._cols;
	 },
	 
	 setCols: function(cols){
        this._cols = cols;
	 },

    getRows: function(){
        return this._rows;
    },

    setRows: function (rows) {
        this._rows = rows;
    },
	 
	 getTitleHeight: function(){
		if(this._titleHeight==null){
			this._titleHeight = 30;
		}
        return this._titleHeight;
	 },
	 
	 setTitleHeight: function(titleHeight){
        this._titleHeight = titleHeight;
	 },

    getWidth: function(){
        if(this.parentNode()!=null){
            this._width = this.parentNode().getWidth();
        }
        return this._width;
    },

    getIndex: function(){
        return this._index;
    },

    setIndex: function(index){
        this._index = index;
    },
	 
    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        if(this._initFlag==null){
            var _this = this;
            var timeFn = null;
            this.getDomInstance().mousedown(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                timeFn = setTimeout(function(){
                    _this.sendMessage('wof.bizWidget.FlowLayoutSection_mousedown');
                },250);
            });
            this.getDomInstance().dblclick(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                if(_this.getIsExpand()==true){
                    _this.setIsExpand(false);
                }else{
                    _this.setIsExpand(true);
                }
                _this.sendMessage('wof.bizWidget.FlowLayoutSection_dblclick');
            });
            this.getDomInstance().droppable({
                snap:true,
                accept:function(draggable){
                    var b=false;
                    var draggableObj = wof.util.ObjectManager.get(draggable.attr('oid'));
                    if(draggableObj!=null){
                        if(draggableObj.getClassName()=='wof.bizWidget.FlowLayoutSection'){
                            var layout = draggableObj.parentNode();
                            var thisLayout = _this.parentNode();
                            if(thisLayout.getId()==layout.getId()){
                                b=true;
                            }
                        }
                    }
                    return b;
                },
                hoverClass: 'ui-state-hover',
                drop:function(event,ui){
                    event.stopPropagation();
                    _this.sendMessage('wof.bizWidget.FlowLayoutSection_drop', {'sectionId':ui.draggable.attr('oid')});
                }
            });
            this.getDomInstance().draggable({
                cursor:"move",
                opacity: 0.7,
                cursorAt:{
                    top:0,
                    left:0
                },
                scroll: false,
                containment: 'div[oid="'+this.parentNode().getId()+'"]',  //限定拖放只能在当前FlowLayout内
                start:function(event,ui){
                    _this.getDomInstance().css('zIndex',60000);
                },
                stop:function(event,ui){
                    _this.getDomInstance().css('zIndex','auto');
                }
            });
            //如果是clone过来的 会直接创建一个label对象 需要先移除
            var nodes = this.childNodes();
            for(var i=0;i<nodes.length;i++){
                if(nodes[i].getClassName()=='wof.widget.Label'){
                    nodes[i].remove(true);
                    break;
                }
            }
            var label = new wof.widget.Label();
            label.setIsInside(true);
            label.setTop(0);
            label.setLeft(0);
            label.setIsUnderline(true);
            label.setScale(this.getScale());

            this._label = label;

            this._initFlag = true;
        }
    },

    //----------必须实现----------
    render: function () {
		this._appendLabel();
		this._flowLayout();
    },

    //选择实现
    afterRender: function () {
        this.resetStyle();

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
			title: this.getTitle(),
			titleHeight: this.getTitleHeight(),
			cols: this.getCols(),
            rows: this.getRows(),
			itemHeight: this.getItemHeight(),
            isExpand: this.getIsExpand(),
            index: this.getIndex()
        };
    },

    //----------必须实现----------
    setData: function (data) {
		this.setTitle(data.title);
		this.setTitleHeight(data.titleHeight);
		this.setCols(data.cols);
        this.setRows(data.rows);
		this.setItemHeight(data.itemHeight);
        this.setIsExpand(data.isExpand);
        this.setIndex(data.index);
    },

    _insideOnReceiveMessage:{
        'wof.bizWidget.FlowLayoutItem_itemDrop':function(message){
            console.log(message.id+'   '+this.getClassName());
            var insertItem = wof.util.ObjectManager.get(message.data.itemId);
            var item = wof.util.ObjectManager.get(message.sender.id);
            insertItem.remove();
            insertItem.beforeTo(item);
            this.render();
            var sectionIndex = this.getIndex();
            this.parentNode().setActiveSectionIndex(sectionIndex);
            if(insertItem!=null){
                this.parentNode().setActiveItemRank({row:insertItem.getRow(),col:insertItem.getCol()});
            }else{
                this.parentNode().setActiveItemRank(null);
            }
            this.parentNode().render();
            this.parentNode().sendMessage('wof.bizWidget.FlowLayout_active');
        }
    },

    //找到第一个item
    findFirstItem: function(){
        var item = this.findItemByIndex(0);
        return section;
    },

    //找到最后一个item
    findLastItem: function(){
        var item = null;
        var childNodes = this.childNodes();
        for(var i=childNodes.length-1;i>=0;i--){
            var node = childNodes[i];
            if(node.getClassName()=='wof.bizWidget.FlowLayoutItem'){
                item = node;
                break;
            }
        }
        return item;
    },

    //找到指定行列号的item
    findItemByRank: function(itemRank){
        var item = null;
        if(!jQuery.isEmptyObject(itemRank)){
            var items = this.findItems();
            for(var i=0;i<items.length;i++){
                if(items[i].getRow()==itemRank.row && items[i].getCol()==itemRank.col){
                    item = items[i];
                    break;
                }
            }
        }
        return item;
    },

    //重置样式
    resetStyle: function(){
        this._label.setIsBold(false);
        this._label.setIsHighlight(false);
        this._label.render();
        var items = this._getItems();
        for(var i=0;i<items.length;i++){
            this._setBorderStyle(items[i],'1px dashed black').css('backgroundColor','#ffffff');
        }
    },

	//拆分cell
	splitItem: function(item){
		var newItem = new wof.bizWidget.FlowLayoutItem();
		newItem.setWidth(item.getWidth()/item.getColspan());
		newItem.setHeight(item.getHeight());
		newItem.setTop(item.getTop());
		newItem.setLeft(item.getWidth()+item.getLeft()-newItem.getWidth());
		newItem.afterTo(item);
        newItem.setScale(this.getScale());

        item.setWidth(item.getWidth()-newItem.getWidth());
        item.setColspan(item.getColspan()-1);
	},
	
	//合并item 如果存在子对象对象 则需要先移除
	mergeItem: function(item){
		var nextItem = item.nextNode();
        item.setWidth(item.getWidth()+nextItem.getWidth());
        item.setColspan(item.getColspan()+nextItem.getColspan());
		//如果nextItem中有子对象 则移除此对象
		if(nextItem.childNodes().length>0){
            //todo 需要消息通知移除子对象
            nextItem.clear();
		}

        nextItem.clear();
		nextItem.remove(true); //true表示将绑定事件一并移除
	},
	
	//设置边框样式
	_setBorderStyle: function(node,style){
        var nodeDom = node.getDomInstance();
        if(node.getRow()==this.getRows()){
            nodeDom.css('borderBottom',style);
        }
        if((node.getCol()+node.getColspan()-1)==this.getCols()){
            nodeDom.css('borderRight',style);
        }
        nodeDom.css('borderTop',style).css('borderLeft',style);
		return nodeDom;
	},
	
	//判断是否可以拆分item
	isSplitItem: function(item){
		var b = false;
		if(item.getColspan()>1){
			b = true;
		}
		return b;
	},
	//判断是否可以合并item
	isMergeItem: function(item){
		var b = false;
		if(item.nextNode()!=null&&item.nextNode().getTop()==item.getTop()){
			b = true;
		}
		return b;
	},

    //设置当前激活的section样式
    activeSectionStyle: function(){
        this._label.setIsBold(true);
        this._label.setIsHighlight(true);
        this._label.render();
    },

    //设置当前激活的item背景色
    activeItemStyle: function(activeItem){
        //设置当前选中item背景
        activeItem.getDomInstance().css('backgroundColor','#efefef');
    },
	
	//设置并插入label标题到第一个位置
	_appendLabel: function(){
		var label = this._label;
        label.setIsInside(true);
        label.remove();
		label.setWidth(this.getWidth());
		label.setHeight(this.getTitleHeight());
		label.setText(this.getTitle());
		if(this.childNodes().length>0){
			label.beforeTo(this.childNodes()[0]);
        }else{
			label.appendTo(this);
        }
	},
	
	//找到所有item
	findItems: function(){
		 var items = [];
		 var childNodes = this.childNodes();
		 for(var i=0;i<childNodes.length;i++){
			 var node = childNodes[i];
			 if(node.getClassName()=='wof.bizWidget.FlowLayoutItem'){
			 	items.push(node);
             }
		 }
		 return items;
	},

	//获得所有item 并且重设item行列号
	_getItems: function(){
		var items = this.findItems();
		if(items.length>0){
			var rows = Math.ceil((items[items.length-1].getTop()-items[0].getTop()+items[0].getHeight())/items[0].getHeight());
			var	cols = Math.ceil(this.getWidth()/(items[0].getWidth()/items[0].getColspan()));
            this.setRows(rows);
			var k=0;
			for(var r=1;r<=rows;r++){
				for(var c=1;c<=cols;c++){
					if(c==1){
						items[k].setRow(r);
						items[k].setCol(c);
						k++;
					}else{
						var prevCell = items[k-1];
						if(((prevCell.getColspan()+prevCell.getCol()-1)>=c)&&prevCell.getRow()==r){
							continue;
						}else{
                            items[k].setRow(r);
							items[k].setCol((c==1?c:(prevCell.getCol()+prevCell.getColspan())));
							k++;
						}
					}
				}
			}
		}
		return items;
	},
	
	//检查item是否是该行中最后一个item
	_isLastItemBySameTop: function(item){
		var b = false;
		var nextItem = item.nextNode();
		if(nextItem==null)
			b = true;
		else if(nextItem.getTop()!=item.getTop())
			b = true;
		return b;
	},
	
	//判断指定行是否需要被删除
	_isRemoveRow: function(beginItem){
		var b = false;
		if(beginItem.getTop()>this.getTitleHeight()){ //第一行需要保留
			var tempItem = beginItem;
			var count=0;
			while(tempItem!=null){
				if(tempItem.getTop()==beginItem.getTop()){
					if(tempItem.getColspan()==1&&tempItem.childNodes().length==0){
						count++;
					}else{
						break;
					}
				}else{
					break;
				}
				tempItem=tempItem.nextNode();
			}
			var cols = Math.ceil(this.getWidth()/(beginItem.getWidth()/beginItem.getColspan()));
			if(count==cols){
				b = true;
			}
		}
		return b;
	},
	
	//获得指定开头的item下同一行的item
	_getItemsBySameTop: function(beginItem){
		var items = [];
		var tempItem = beginItem;
		items.push(beginItem);
		while(tempItem=tempItem.nextNode()){
			if(tempItem.getTop()==beginItem.getTop()){
				items.push(tempItem);
			}else{
				break;
			}
		}
		return items;
	},
	 
	//进行流式布局
	_flowLayout: function(){
		var label = this._label;
		var items = this.findItems();
		var k=0;
		for(var i=0;i<items.length;i++){
			items[i].setWidth(this.getWidth()/this.getCols()*items[i].getColspan());
			items[i].setHeight(this.getItemHeight());
			items[i].remove();
		}
		//从第一个item开始检查 如果item width+前个item left+前个item width大于section width 则将item调整到下一行
		for(var i=0;i<items.length;i++){
			var item = items[i];
			if(i==0){
				item.setTop(label.getHeight());
				item.setLeft(0);
				item.afterTo(label);
				k++;
			}else{
				var prevItem = items[i-1];
				if(prevItem.getLeft()+prevItem.getWidth()+item.getWidth()>this.getWidth()){ //如果当前item超过本行宽度 则跳转到下一行
					item.setLeft(0);
					item.setTop(prevItem.getTop()+prevItem.getHeight());
					k++;
				}else{ //根据前个item调整left top
					item.setLeft(prevItem.getLeft()+prevItem.getWidth());
					item.setTop(prevItem.getTop());
				}
				item.afterTo(prevItem);
			}
		}
		//补全每行空缺的item
		var lastItems = [];
		for(var i=0;i<items.length;i++){
			var item = items[i];
			if(this._isLastItemBySameTop(item)){
				lastItems.push(item);
			}
		}
		for(var i=0;i<lastItems.length;i++){
			var lastItem = lastItems[i];
			var tempWidth = lastItem.getLeft()+lastItem.getWidth();
			if(tempWidth<this.getWidth()){
				var c = Math.ceil((this.getWidth()-tempWidth)/(lastItem.getWidth()/lastItem.getColspan()));
				for(var t=c;t>=1;t--){
					var newItem = new wof.bizWidget.FlowLayoutItem();
					newItem.setWidth(lastItem.getWidth()/lastItem.getColspan());
					newItem.setHeight(lastItem.getHeight());
					newItem.setTop(lastItem.getTop());
					newItem.setLeft(lastItem.getLeft()+lastItem.getWidth()+(newItem.getWidth()*(t-1)));
					newItem.afterTo(lastItem);
                    newItem.setScale(this.getScale());
				}
			}
		}
		//反向查找 如果一行中所有item都没有内容 并且colspan为1 则将此行移除 同时section height减一行
		var beginItems = [];
		for(var i=0;i<items.length;i++){
			var item = items[i];
			if(item.getLeft()==0){
				beginItems.push(item);
			}
		}
		for(var i=beginItems.length-1;i>=0;i--){
			var b = this._isRemoveRow(beginItems[i]);
			if(b==true){
				var items = this._getItemsBySameTop(beginItems[i]);
				for(var t=items.length-1;t>=0;t--){
                	items[t].remove(true);
				}
				k--;
			}else{
				break;
			}
		}
        //设置section div容器高度和宽度
        if(this.getIsExpand()==true){
            this.setHeight(beginItems[0].getHeight()*k+this.getTitleHeight());
            this.getDomInstance().css('height', (this.getHeight()*this.getScale()+2)+'px');//加2修正css的边框误差
        }else{
            this.setHeight(this.getTitleHeight());
            this.getDomInstance().css('height', (this.getHeight()*this.getScale())+'px');
        }
        this.getDomInstance().css('width', (this.getWidth()*this.getScale()+2)+'px');//加2修正css的边框误差
        this._label.getDomInstance().css('width',(this.getWidth()*this.getScale())+'px');
        this._label.getDomInstance().css('height',(this.getTitleHeight()*this.getScale())+'px');

        //屏蔽label对象的事件
        label.getDomInstance().after(this._backgroundImg);

	}

};