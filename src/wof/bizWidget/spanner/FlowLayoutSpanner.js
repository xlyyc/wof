/**
 * @bizWidgetClass FlowLayoutSpanner class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.spanner.FlowLayoutSpanner = function () {

    var _this = this;

    //todo flowLayout需要加入句柄



    this._deleteSectionIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteSection.png">');
    this._insertSectionIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/insertSection.png">');
    this._upSectionIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/upSection.png">');
    this._downSectionIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/downSection.png">');
    this._deleteSectionIco.click(function(event){
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
    this._insertSectionIco.click(function(event){
        event.stopPropagation();
        var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
        var activeSectionIndex = _this.getPropertys().activeSectionIndex;
        var sectionData = {title:'未命名分组'};
        flowLayout.insertSection(sectionData,activeSectionIndex);
        flowLayout.render();
    });
    this._upSectionIco.click(function(event){
        event.stopPropagation();
        var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
        var activeSectionIndex = _this.getPropertys().activeSectionIndex;
        flowLayout.upSection(activeSectionIndex);
        flowLayout.render();
    });
    this._downSectionIco.click(function(event){
        event.stopPropagation();
        var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
        var activeSectionIndex = _this.getPropertys().activeSectionIndex;
        flowLayout.downSection(activeSectionIndex);
        flowLayout.render();
    });

    this._mergeItemArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/mergeItemArrow.png">');
    this._splitItemArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/splitItemArrow.png">');
    this._deleteItemIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteItem.png">');

    this._mergeItemArrow.click(function(event){
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
        }
    });
    this._splitItemArrow.click(function(event){
        event.stopPropagation();
        var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
        var activeSectionIndex = _this.getPropertys().activeSectionIndex;
        var activeItemRank = _this.getPropertys().activeItemRank;
        flowLayout.splitItem(activeItemRank, activeSectionIndex);
        flowLayout.render();
    });
    this._deleteItemIco.click(function(event){
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
        }
    });
};
wof.bizWidget.spanner.FlowLayoutSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性
    _propertys: null,

    _mergeItemArrow:null,

    _splitItemArrow:null,

    _deleteItemIco:null,

    _deleteSectionIco:null,

    _insertSectionIco:null,

    _upSectionIco:null,

    _downSectionIco:null,


    /**
     * get/set 属性方法定义
     */

    setPropertys:function(propertys){
        this._propertys = propertys;
    },

    getPropertys: function(){
        if(this._propertys==null){
            this._propertys = {};
        }
        return this._propertys;
    },

    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        this._deleteSectionIco.detach();
        this._insertSectionIco.detach();
        this._upSectionIco.detach();
        this._downSectionIco.detach();
        this._splitItemArrow.detach();
        this._mergeItemArrow.detach();
        this._deleteItemIco.detach();
    },

    //----------必须实现----------
    render: function () {
        var flowLayout = wof.util.ObjectManager.get(this.getPropertys().id);
        if(flowLayout!=null){
            var activeSectionIndex = this.getPropertys().activeSectionIndex;
            if(activeSectionIndex!=null){
                var activeSection = flowLayout.findSectionByIndex(activeSectionIndex);
                if(activeSection.getIsExpand()==true){ //如果section收缩状态 不需要加入item句柄
                    var activeItemRank = this.getPropertys().activeItemRank;
                    if(activeItemRank!=null){
                        var activeItem = activeSection.findItemByRank(activeItemRank);
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
                    }
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
            }
        }
    },

    //选择实现
    afterRender: function () {

    },

    /**
     * getData/setData 方法定义
     */

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