/**
 * @bizWidgetClass FlowLayoutSpanner class
 * @package wof.bizWidget.spanner
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.spanner.FlowLayoutSpanner = function () {

    //记录该widget所有的发送消息和描述信息 供属性条控件使用
    this._sendMessages = {'wof.bizWidget.FlowLayout_mousedown':'单击','wof.bizWidget.FlowLayout_render':'重绘'};

    this._name = 'wof.bizWidget.FlowLayout';
    this._title = '流式布局';

    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.bizWidget.Spanner_render',method:'var propertys=message.sender.propertys;if(propertys.className=="wof.bizWidget.FlowLayout"){this.setPropertys(propertys);}else{this.setPropertys(null)}this.render();'});
    var method = 'var data=message.sender.propertys; '
        +' if(data.id==this.getPropertys().id){ '
        +' var flowLayout=wof.util.ObjectManager.get(data.id); '
        +' if(data.activeClass=="FlowLayoutSection"){ '
        +'   flowLayout.updateSection(data); '
        +'   flowLayout.render(); '
        +'   flowLayout.sendMessage("wof.bizWidget.FlowLayout_active");'
        +' }else if(data.activeClass=="FlowLayoutItem"){ '
        +'     flowLayout.updateItem(data); '
        +'     flowLayout.render(); '
        +'     flowLayout.sendMessage("wof.bizWidget.FlowLayout_active");'
        +'   }else if(data.activeClass=="FlowLayout"){ '
        +'       flowLayout.updateFlowLayout(data); '
        +'       flowLayout.render();'
        +'       flowLayout.sendMessage("wof.bizWidget.FlowLayout_active");'
        +'    } '
        +'}';
    onReceiveMessage.push({id:'wof.bizWidget.PropertyBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnSendMessageBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnReceiveMessageBar_apply',method:method});
    this.setOnReceiveMessage(onReceiveMessage);

    this._selectFlowLayoutIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/selectFlowLayout.png">');
    this._deleteFlowLayoutIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteFlowLayout.png">');

    this._deleteSectionIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteSection.png">');
    this._insertSectionIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/insertSection.png">');
    this._upSectionIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/upSection.png">');
    this._downSectionIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/downSection.png">');

    this._mergeItemArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/mergeItemArrow.png">');
    this._splitItemArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/splitItemArrow.png">');
    this._deleteItemIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteItem.png">');
};
wof.bizWidget.spanner.FlowLayoutSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性

    _name: null,

    _title: null,

    _sendMessages: null,

    _propertys: null,

    _activeData: null,

    _mergeItemArrow:null,

    _splitItemArrow:null,

    _deleteItemIco:null,

    _deleteSectionIco:null,

    _insertSectionIco:null,

    _upSectionIco:null,

    _downSectionIco:null,

    _selectFlowLayoutIco:null,

    _deleteFlowLayoutIco:null,


    /**
     * get/set 属性方法定义
     */

    getTitle: function(){
        return this._title;
    },

    getName: function(){
        return this._name;
    },

    getSendMessages: function(){
        return this._sendMessages;
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

    setActiveData:function(activeData){
        this._activeData = activeData;
    },

    getActiveData: function(){
        if(this._activeData==null){
            this._activeData = {};
        }
        return this._activeData;
    },


    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        this._selectFlowLayoutIco.remove();
        this._deleteFlowLayoutIco.remove();
        this._deleteSectionIco.remove();
        this._insertSectionIco.remove();
        this._upSectionIco.remove();
        this._downSectionIco.remove();
        this._splitItemArrow.remove();
        this._mergeItemArrow.remove();
        this._deleteItemIco.remove();
    },

    //----------必须实现----------
    render: function () {
        var activeData = {};
        var flowLayout = wof.util.ObjectManager.get(this.getPropertys().id);
        if(flowLayout!=null){
            activeData.id = this.getPropertys().id;
            activeData.className = this.getPropertys().className;
            activeData.onReceiveMessage = this.getPropertys().onReceiveMessage;
            activeData.onSendMessage = this.getPropertys().onSendMessage;
            var activeSectionIndex = this.getPropertys().activeSectionIndex;
            var activeSection = flowLayout.findSectionByIndex(activeSectionIndex);
            if(activeSection!=null){
                var activeItemRank = this.getPropertys().activeItemRank;
                var activeItem = activeSection.findItemByRank(activeItemRank);
                if(activeItem!=null){
                    //当前激活item加入拆分句柄
                    if(activeSection.isSplitItem(activeItem)){
                        this._splitItemArrow.css('top',0).css('left',0);
                        activeItem.getDomInstance().append(this._splitItemArrow);
                    }
                    //当前激活item加入合并句柄
                    if(activeSection.isMergeItem(activeItem)){
                        this._mergeItemArrow.css('top',0).css('left',activeItem.getWidth()*activeItem.getScale()-this._mergeItemArrow.width());
                        activeItem.getDomInstance().append(this._mergeItemArrow);
                    }
                    this._deleteItemIco.css('top',0).css('left',activeItem.getWidth()*activeItem.getScale()/2-this._deleteItemIco.width()/2);
                    activeItem.getDomInstance().append(this._deleteItemIco);

                    activeData.activeClass = 'FlowLayoutItem';
                    activeData.row = activeItem.getRow();
                    activeData.col = activeItem.getCol();
                    activeData.colspan = activeItem.getColspan();
                    activeData.sectionIndex = activeSection.getIndex();
                    activeData.readOnly = ['id','className','activeClass','row','col','sectionIndex','readOnly'];
                }else{
                    activeData.activeClass = 'FlowLayoutSection';
                    activeData.title = activeSection.getTitle();
                    activeData.cols = activeSection.getCols();
                    activeData.itemHeight = activeSection.getItemHeight();
                    activeData.isExpand = activeSection.getIsExpand();
                    //activeData.width = activeSection.getWidth();
                    activeData.index = activeSection.getIndex();
                    activeData.readOnly = ['id','className','activeClass','isExpand','index','readOnly'];
                }
                //当前激活section加入上移 下移 插入 删除操作句柄
                if(activeSectionIndex>1){
                    this._upSectionIco.css('top',5).css('left',activeSection.getWidth()*activeSection.getScale()-this._upSectionIco.width()*4-10);
                    activeSection.getDomInstance().append(this._upSectionIco);
                }
                this._insertSectionIco.css('top',5).css('left',activeSection.getWidth()*activeSection.getScale()-this._insertSectionIco.width()*3-8);
                activeSection.getDomInstance().append(this._insertSectionIco);
                this._deleteSectionIco.css('top',5).css('left',activeSection.getWidth()*activeSection.getScale()-this._deleteSectionIco.width()*2-6);
                activeSection.getDomInstance().append(this._deleteSectionIco);
                if(activeSectionIndex<flowLayout.getSections()){
                    this._downSectionIco.css('top',5).css('left',activeSection.getWidth()*activeSection.getScale()-this._downSectionIco.width()-4);
                    activeSection.getDomInstance().append(this._downSectionIco);
                }
            }else{
                activeData.activeClass = 'FlowLayout';
                activeData.cols = flowLayout.getCols();
                activeData.itemHeight = flowLayout.getItemHeight();
                activeData.width = flowLayout.getWidth();
                activeData.height = flowLayout.getHeight();
                activeData.left = flowLayout.getLeft();
                activeData.top = flowLayout.getTop();
                activeData.zIndex = flowLayout.getZIndex();
                activeData.hiden = flowLayout.getHiden();
                activeData.position = flowLayout.getPosition();
                activeData.scale = flowLayout.getScale();
                activeData.activeSectionIndex = flowLayout.getActiveSectionIndex();
                activeData.activeItemRank = flowLayout.getActiveItemRank();
                activeData.readOnly = ['id','height','left','top','cols','zIndex','hiden','position','scale','activeSectionIndex','activeItemRank','className','activeClass','readOnly'];
            }
            //当前选中的flowLayout加入拖放 删除操作句柄
            this._selectFlowLayoutIco.css('top',0).css('left',0);
            flowLayout.getDomInstance().append(this._selectFlowLayoutIco);
            this._deleteFlowLayoutIco.css('top',0).css('left',this._deleteFlowLayoutIco.width()+2);
            flowLayout.getDomInstance().append(this._deleteFlowLayoutIco);
        }
        this.setActiveData(activeData);
        this.sendMessage('wof.bizWidget.spanner.FlowLayoutSpanner_render');
    },

    //选择实现
    afterRender: function () {
        var _this = this;
        this._selectFlowLayoutIco.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            flowLayout.setActiveSectionIndex(null);
            flowLayout.setActiveItemRank(null);
            flowLayout.render();
            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
        });
        this._deleteFlowLayoutIco.mousedown(function(event){
            event.stopPropagation();
            var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>确定要删除该流式布局吗?</p></div>');
            dialogDiv.dialog({
                resizable:false,
                height:200,
                modal: true,
                buttons:{
                    '确定':function(){
                        var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
                        flowLayout.clear();
                        flowLayout.remove(true);
                        jQuery(this).dialog('close');
                        jQuery(this).remove();
                    },
                    '关闭':function(){
                        jQuery(this).dialog('close');
                        jQuery(this).remove();
                    }
                }
            });
        });

        this._deleteSectionIco.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            if(flowLayout.getSections()==1){
                var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>至少需要保留一个分组</p></div>');
                dialogDiv.dialog({
                    resizable:false,
                    height:200,
                    modal: true,
                    buttons:{
                        '关闭':function(){
                            jQuery(this).dialog('close');
                            jQuery(this).remove();
                        }
                    }
                });
            }else{
                var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>确定要删除该分组吗?</p></div>');
                dialogDiv.dialog({
                    resizable:false,
                    height:200,
                    modal: true,
                    buttons:{
                        '确定':function(){
                            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
                            flowLayout.deleteSection(activeSectionIndex);
                            flowLayout.render();
                            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
                            jQuery(this).dialog('close');
                            jQuery(this).remove();
                        },
                        '关闭':function(){
                            jQuery(this).dialog('close');
                            jQuery(this).remove();
                        }
                    }
                });
            }
        });
        this._insertSectionIco.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            var sectionData = {title:'未命名分组'};
            flowLayout.insertSection(sectionData,activeSectionIndex);
            flowLayout.render();
            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
        });
        this._upSectionIco.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            flowLayout.upSection(activeSectionIndex);
            flowLayout.render();
            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
        });
        this._downSectionIco.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            flowLayout.downSection(activeSectionIndex);
            flowLayout.render();
            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
        });

        this._mergeItemArrow.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            var activeItemRank = _this.getPropertys().activeItemRank;
            var activeSection = flowLayout.findSectionByIndex(activeSectionIndex);
            var activeItem = activeSection.findItemByRank(activeItemRank);
            if(activeItem.childNodes().length>0&&activeItem.nextNode().childNodes().length>0){
                var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>合并该单元格将会移除多出的字段，你确定要合并吗?</p></div>');
                dialogDiv.dialog({
                    resizable:false,
                    height:200,
                    modal: true,
                    buttons:{
                        '确定':function(){
                            jQuery(this).dialog('close');
                            flowLayout.mergeItem(activeItemRank, activeSectionIndex);
                            flowLayout.render();
                            jQuery(this).remove();
                            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
                        },
                        '取消':function(){
                            jQuery(this).dialog('close');
                            jQuery(this).remove();
                        }
                    }
                });
            }else{
                if(activeItem.nextNode().childNodes().length>0){
                    var childNode = activeItem.nextNode().childNodes()[0];
                    childNode.remove();
                    childNode.appendTo(activeItem);
                }
                flowLayout.mergeItem(activeItemRank, activeSectionIndex);
                flowLayout.render();
                flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
            }
        });
        this._splitItemArrow.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            var activeItemRank = _this.getPropertys().activeItemRank;
            flowLayout.splitItem(activeItemRank, activeSectionIndex);
            flowLayout.render();
            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
        });
        this._deleteItemIco.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            var section = flowLayout.findSectionByIndex(activeSectionIndex);
            var activeItemRank = _this.getPropertys().activeItemRank;
            var activeItem = section.findItemByRank(activeItemRank);
            if(activeItem!=null&&activeItem.childNodes().length>0){
                var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>该单元格包含对象,确定要删除该单元格吗?</p></div>');
                dialogDiv.dialog({
                    resizable:false,
                    height:200,
                    modal: true,
                    buttons:{
                        '确定':function(){
                            flowLayout.deleteItem(activeItemRank, activeSectionIndex);
                            flowLayout.render();
                            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
                            jQuery(this).dialog('close');
                            jQuery(this).remove();
                        },
                        '关闭':function(){
                            jQuery(this).dialog('close');
                            jQuery(this).remove();
                        }
                    }
                });
            }else{
                flowLayout.deleteItem(activeItemRank, activeSectionIndex);
                flowLayout.render();
                flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
            }
        });
    },

    /**
     * getData/setData 方法定义
     */

    //必须实现
    getData:function(){
        return {
            propertys: this.getPropertys(),
            activeData: this.getActiveData(),
            sendMessages: this.getSendMessages(),
            name: this.getName(),
            title: this.getTitle()
        };
    },
    //必须实现
    setData:function(data){
        this.setPropertys(data.propertys);
        this.setActiveData(data.activeData);

    }

};