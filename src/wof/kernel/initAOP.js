var wof$_aop = (function(){
    function uuid() {
        var s = [];
        var hexDigits = "0123456789ABCDEF";
        for (var i = 0; i < 32; i++)
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        s[12] = "4";
        s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);
        return s.join("");
    }
    function aopChildren(objName){
        var obj = eval(objName);
        for(var o in obj){
            if(typeof(obj[o])=='function'){
                if(obj[o]['getClassName']==null){
                    //todo disable
                    obj[o].prototype._sendMessages = null;
                    obj[o].prototype._onSendMessage = null;
                    obj[o].prototype.getOnSendMessage = function() {
                        if(this._onSendMessage==null){
                            this._onSendMessage = [];
                        }
                        return this._onSendMessage;
                    };
                    obj[o].prototype._onSendMessageMethods = null;
                    obj[o].prototype.setOnSendMessage = function(onSendMessage) {
                        if(this.getIsInside()!=true){
                            if(onSendMessage instanceof Array){
                                this._onSendMessage = onSendMessage;
                                this._onSendMessageMethods = {};
                                var _this = this;
                                jQuery.each(this.getOnSendMessage(), function(i,n){
                                    _this._onSendMessageMethods[n.id] = n.method;
                                });
                            }
                        }else{
                            alert('内部对象:'+this.getClassName()+'不能定制业务脚本');
                        }
                    };
                    obj[o].prototype._onReceiveMessage = null;
                    obj[o].prototype.getSendMessages = function() {
                        return this._sendMessages;
                    };
                    obj[o].prototype.getOnReceiveMessage = function() {
                        if(this._onReceiveMessage==null){
                            this._onReceiveMessage = [];
                        }
                        return this._onReceiveMessage;
                    };
                    obj[o].prototype.setOnReceiveMessage = function(onReceiveMessage) {
                        if(this.getIsInside()!=true){
                            if(onReceiveMessage instanceof Array){
                                this._onReceiveMessageMethods = {};
                                var _this = this;
                                jQuery.each(this.getOnReceiveMessage(), function(i,n){
                                    wof.util.Observer.unregister(n.id, _this);
                                });
                                _this._onReceiveMessage = onReceiveMessage;
                                jQuery.each(this.getOnReceiveMessage(), function(i,n){
                                    wof.util.Observer.register(n.id, _this, n.priority==null?50: n.priority);
                                    _this._onReceiveMessageMethods[n.id] = n.method;
                                });
                            }
                        }else{
                            alert('内部对象:'+this.getClassName()+'不能定制业务脚本');
                        }
                    };
                    obj[o].prototype._isInside = null; //是否为内部对象 true 是 false 否
                    obj[o].prototype.getIsInside = function(){
                        if(this._isInside==null){
                            this._isInside = false;
                        }
                        return this._isInside;
                    };
                    obj[o].prototype.setIsInside = function(isInside){
                        this._isInside = isInside;
                    };
                    obj[o].prototype._position = null;
                    obj[o].prototype.getPosition = function() {
                        if(this._position == null){
                            this._position = 'absolute';
                        }
                        return this._position;
                    };
                    obj[o].prototype.setPosition = function(position) {
                        this._position = position;
                    };
                    obj[o].prototype._zIndex = null;
                    obj[o].prototype.getZIndex = function() {
                        if(this._zIndex == null){
                            this._zIndex = 'auto';
                        }
                        return this._zIndex;
                    };
                    obj[o].prototype.setZIndex = function(zIndex) {
                        this._zIndex = zIndex;
                    };
                    obj[o].prototype._className = objName+"."+o;
                    obj[o].prototype.getClassName = function(){
                        return this._className;
                    };
                    obj[o].prototype._id = null;
                    obj[o].prototype.getId = function(){
                        return (this._id==null)?(this._id=uuid()):this._id;
                    };
                    obj[o].prototype._domInstance = null;
                    obj[o].prototype.getDomInstance = function(){
                        if(this._domInstance==null){
                            this._domInstance = this._domInstance=jQuery('<div oid="'+this.getId()+'" classname="'+this.getClassName()+'" isInside="'+this.getIsInside()+'">');
                        }
                        return this._domInstance;
                    };
                    obj[o].prototype.sendMessage = function(messageId, data){
                        if(this.getIsInside()==true){ //如果是内部对象 则以冒泡方式逐级向上发送消息 并且消息终止在非内部对象的那一级上
                            var parentNode = this;
                            while((parentNode=parentNode.parentNode())!=null){
                                var ret = null;
                                if(parentNode._insideOnReceiveMessage==null){
                                    parentNode._insideOnReceiveMessage={};
                                }
                                var messageMethod = parentNode._insideOnReceiveMessage[messageId];
                                if(messageMethod!=null){
                                    try{
                                        ret = messageMethod.call(parentNode,{'id':messageId, 'sender':this.getData(), 'data':data});
                                    }catch(e){
                                        console.log('执行对象自带消息['+messageId+']处理过程发生异常 原因:'+e);
                                    }
                                }
                                if(parentNode.getIsInside()!=true){
                                    break;
                                }else if(ret==false){
                                    break;
                                }
                            }
                        }else{
                            //如果有用户自定义的业务逻辑 先调用之 并根据返回值判断是否需要继续发送消息
                            var f = true;
                            if(this._onSendMessageMethods==null){
                                this._onSendMessageMethods = {};
                            }
                            var onSendMessageFunc = this._onSendMessageMethods[messageId];
                            if(onSendMessageFunc!=null){
                                try{
                                    var func = null;
                                    eval('func=(function wof$_onSendMessageFunc(message){ '+onSendMessageFunc+' })');
                                    f = func.call(this,{'id':messageId, 'sender':this.getData(), 'data':data});
                                }catch(e){
                                    console.log('执行业务['+messageId+']处理过程发生异常 原因:'+e);
                                }
                            }
                            if(f!=false){
                                //如果不是内部对象 则以消息订阅的方式发布消息
                                wof.util.Observer.sendMessage({'id':messageId, 'sender':this.getData(), 'data':data});
                            }
                        }
                    };
                    obj[o].prototype._onReceiveMessageMethods = null;
                    obj[o].prototype.receiveMessage = function(message){
                        if(this.getIsInside()!=true){ //不是内部对象
                            if(this._onReceiveMessageMethods==null){
                                this._onReceiveMessageMethods = {};
                            }
                            var onReceiveMessageFunc = this._onReceiveMessageMethods[message.id];
                            if(onReceiveMessageFunc!=null){ //有相应的用户定制业务脚本处理 则直接调用
                                try{
                                    var func = null;
                                    eval('func=(function wof$_onReceiveMessageFunc(message){ '+onReceiveMessageFunc+' })');
                                    return func.apply(this,arguments);
                                }catch(e){
                                    console.log('执行用户定制业务['+message.id+']脚本处理过程发生异常 原因:'+e);
                                }
                            }
                        }else{ //如果是内部对象 则不能响应外部发布的消息
                            console.log('内部对象不能响应处理消息:'+message.id);
                        }
                    };
                    obj[o].prototype._hiden = null;
                    obj[o].prototype.getHiden = function(){
                        return (this._hiden==null)?this._hiden=false:this._hiden;
                    };
                    obj[o].prototype.setHiden = function(hiden){
                        if(hiden==true){
                            this.getDomInstance().hide();
                        }else{
                            this.getDomInstance().show();
                        }
                        this._hiden = hiden;
                    };
                    obj[o].prototype._css = null;
                    obj[o].prototype.getCss = function(){
                        return (this._css==null)?this._css='':this._css;
                    };
                    obj[o].prototype.setCss = function(css){
                        this._css = css;
                    };
                    obj[o].prototype.clone = function(){
                        var obj=eval('new '+this.getClassName()+'()');
                        obj.setData(this.getData());
                        return obj;
                    };
                    obj[o].prototype._parentNode = null;
                    obj[o].prototype.parentNode = function(){
                        return this._parentNode;
                    };
                    obj[o].prototype.beforeTo = function(node){
                        node.before(this);
                    };
                    obj[o].prototype.afterTo = function(node){
                        node.after(this);
                    };
                    obj[o].prototype.appendTo = function(parentNode){
                        if(parentNode!=null){
                            parentNode.appendChild(this);
                        }else{
                            jQuery('body').append(this.getDomInstance());
                            wof.util.ObjectManager.add(this.getId(), this);
                        }
                    };
                    obj[o].prototype.remove = function(flag){
                        if(this.beforeRemove!=null){
                            this.beforeRemove();
                        }
                        var parentNode = this.parentNode();
                        if(parentNode!=null){
                            parentNode.removeChild(this,flag);
                        }else{
                            wof.util.ObjectManager.remove(this.getId());
                            if(flag==true){
                                this.getDomInstance().remove();
                            }else{
                                this.getDomInstance().detach();
                            }
                        }
                        if(this.afterRemove!=null){
                            this.afterRemove();
                        }
                    };
                    obj[o].prototype.clear = function(){
                        if(this.beforeClear!=null) {
                            this.beforeClear();
                        }
                        var childNodes = this.childNodes();
                        for(var i=childNodes.length-1; i>=0; i--){
                            childNodes[i].clear();
                            if(childNodes[i].getIsInside()!=true){
                                childNodes[i].setOnReceiveMessage([]);
                                childNodes[i].setOnSendMessage([]);
                            }
                            childNodes[i].remove(true);
                        }
                        if(this.afterClear!=null){
                            this.afterClear();
                        }
                    };
                    obj[o].prototype.toJSON = function(){
                        return JSON.stringify(this.getData());
                    };
                    obj[o].prototype.toHTML = function(){
                        return this._domInstance.html();
                    };
                    obj[o].prototype._childNodes = null;
                    obj[o].prototype.childNodes = function(){
                        return (this._childNodes==null)?this._childNodes=[]:this._childNodes;
                    };
                    obj[o].prototype.appendChild = function(childNode){
                        wof.util.ObjectManager.add(childNode.getId(), childNode);
                        childNode._parentNode = this;
                        this.getDomInstance().append(childNode.getDomInstance());
                        this.childNodes().push(childNode);
                    };
                    obj[o].prototype.before = function(node){
                        wof.util.ObjectManager.add(node.getId(), node);
                        this.getDomInstance().before(node.getDomInstance());
                        if(this.parentNode()!=null){
                            var idx=jQuery.inArray(this, this.parentNode().childNodes());
                            this.parentNode().childNodes().splice(idx,0,node);
                            node._parentNode = this.parentNode();
                        }else{
                            console.log('警告:执行beforeTo方法出现问题[目标节点的父节点不存在]');
                        }
                    };
                    obj[o].prototype.after = function(node){
                        wof.util.ObjectManager.add(node.getId(), node);
                        this.getDomInstance().after(node.getDomInstance());
                        if(this.parentNode()!=null){
                            var idx=jQuery.inArray(this, this.parentNode().childNodes());
                            this.parentNode().childNodes().splice(idx+1,0,node);
                            node._parentNode = this.parentNode();
                        }else{
                            console.log('警告:执行afterTo方法出现问题[目标节点的父节点不存在]');
                        }
                    };
                    obj[o].prototype.removeChild = function(childNode,flag){
                        var idx=jQuery.inArray(childNode, this.childNodes());
                        if(idx != -1){
                            wof.util.ObjectManager.remove(childNode.getId());
                            childNode._parentNode = null;
                            this.childNodes().splice(idx,1);
                            if(flag==true){
                                childNode.getDomInstance().remove();
                            }else{
                                childNode.getDomInstance().detach();
                            }
                        }
                    };
                    obj[o].prototype.nextNode = function(){
                        var node = null;
                        if(this.parentNode()!=null){
                            var childNodes = this.parentNode().childNodes();
                            for(var i=0;i<childNodes.length;i++){
                                if(childNodes[i].getId()==this.getId()){
                                    if(i<childNodes.length&&childNodes[i+1]!=null){
                                        node = childNodes[i+1];
                                    }else{
                                        break;
                                    }
                                }
                            }
                        }else{
                            console.log('警告:执行nextNode方法出现问题[目标节点的父节点不存在]');
                        }
                        return node;
                    };
                    obj[o].prototype.prevNode = function(){
                        var node = null;
                        if(this.parentNode()!=null){
                            var childNodes = this.parentNode().childNodes();
                            for(var i=0;i<childNodes.length;i++){
                                if(childNodes[i].getId()==this.getId()){
                                    if(i>0&&childNodes[i-1]!=null){
                                        node = childNodes[i-1];
                                    }else{
                                        break;
                                    }
                                }
                            }
                        }else{
                            console.log('警告:执行prevNode方法出现问题[目标节点的父节点不存在]');
                        }
                        return node;
                    };
                    obj[o].prototype._height = null;
                    obj[o].prototype.getHeight = function(){
                        return this._height;
                    };
                    obj[o].prototype.setHeight = function(height){
                        if(this.beforeSetHeight!=null){
                            this.beforeSetHeight();
                        }
                        this._height = height;
                        if(this.afterSetHeight!=null){
                            this.afterSetHeight();
                        }
                    };
                    obj[o].prototype._width = null;
                    obj[o].prototype.getWidth = function(){
                        return this._width;
                    };
                    obj[o].prototype.setWidth = function(width){
                        if(this.beforeSetWidth!=null){
                            this.beforeSetWidth();
                        }
                        this._width = width;
                        if(this.afterSetWidth!=null){
                            this.afterSetWidth();
                        }
                    };
                    obj[o].prototype._left = null;
                    obj[o].prototype.getLeft = function(){
                        return this._left;
                    };
                    obj[o].prototype.setLeft = function(left){
                        this._left = left;
                    };
                    obj[o].prototype._top = null;
                    obj[o].prototype.getTop = function(){
                        return this._top;
                    };
                    obj[o].prototype.setTop = function(top){
                        this._top = top;
                    };
                    obj[o].prototype._scale = null;
                    obj[o].prototype.getScale = function(){
                        if(this._scale==null)
                            this._scale=1;
                        return this._scale;
                    };
                    obj[o].prototype.setScale = function(scale){
                        var childNodes = this.childNodes();
                        for(var i=0; i<this.childNodes().length; i++){
                            childNodes[i].setScale(scale);
                        }
                        this._scale = scale;
                    };
                    if(obj[o].prototype.getData!=null){
                        obj[o].prototype._getData = obj[o].prototype.getData;
                        obj[o].prototype.getData = function(){
                            var data=this._getData();
                            data.sendMessages = this.getSendMessages();
                            data.isInside = this.getIsInside();
                            data.id=this.getId();
                            data.className=this.getClassName();
                            data.hiden=this.getHiden();
                            data.position = this.getPosition();
                            data.zIndex = this.getZIndex();
                            data.scale = this.getScale();
                            data.onSendMessage = this.getOnSendMessage();
                            data.onReceiveMessage = this.getOnReceiveMessage();
                            if(this.getWidth()!=null){
                                data.width=this.getWidth();
                            }
                            if(this.getHeight()!=null){
                                data.height=this.getHeight();
                            }
                            if(this.getTop()!=null){
                                data.top=this.getTop();
                            }
                            if(this.getLeft()!=null){
                                data.left=this.getLeft();
                            }
                            data.css=this.getCss();
                            var childNodes=[];
                            for(var i=0; i<this.childNodes().length; i++){
                                childNodes.push(this.childNodes()[i].getData());
                            }
                            data.childNodes=childNodes;
                            return data;
                        };
                    }
                    if(obj[o].prototype.setData!=null){
                        obj[o].prototype._setData = obj[o].prototype.setData;
                        obj[o].prototype.setData = function(data){
                            if(data.width!=null){
                                this.setWidth(data.width);
                            }
                            if(data.height!=null){
                                this.setHeight(data.height);
                            }
                            if(data.top!=null){
                                this.setTop(data.top);
                            }
                            if(data.left!=null){
                                this.setLeft(data.left);
                            }
                            this.setIsInside(data.isInside);
                            this.setCss(data.css);
                            this.setHiden(data.hiden);
                            this.setPosition(data.position);
                            this.setZIndex(data.zIndex);
                            this.setScale(data.scale);
                            if(this.getIsInside()!=true){
                                var onSendMessage = [];
                                for(var i=0;i<data.onSendMessage.length;i++){
                                    onSendMessage.push({id:data.onSendMessage[i]['id'],method:data.onSendMessage[i]['method']});
                                }
                                this.setOnSendMessage(onSendMessage);
                                var onReceiveMessage = [];
                                for(var i=0;i<data.onReceiveMessage.length;i++){
                                    onReceiveMessage.push({id:data.onReceiveMessage[i]['id'],method:data.onReceiveMessage[i]['method'],priority:data.onReceiveMessage[i]['priority']});
                                }
                                this.setOnReceiveMessage(onReceiveMessage);
                            }
                            this._setData(data);
                            var dataChildLen=data.childNodes.length;
                            var tempNodes=new wof.util.Hashtable();
                            var objChildLen=this.childNodes().length;
                            for(var i=objChildLen-1; i>=0; i--){
                                tempNodes.add(this.childNodes()[i].getId(), this.childNodes()[i]);
                                this.removeChild(this.childNodes()[i]);
                            }
                            for(var i=0; i<dataChildLen; i++){
                                if(tempNodes.items(data.childNodes[i].id)!=null){
                                    tempNodes.items(data.childNodes[i].id).appendTo(this);
                                    tempNodes.items(data.childNodes[i].id).setData(data.childNodes[i]);
                                    tempNodes.remove(data.childNodes[i].id);
                                }else{
                                    var node=eval("new " + data.childNodes[i].className + "();");
                                    node.appendTo(this);
                                    node.setData(data.childNodes[i]);
                                }
                            }
                        };
                    }
                    if(obj[o].prototype.render!=null){
                        obj[o].prototype._render = obj[o].prototype.render;
                        obj[o].prototype.render = function(){
                            if(this.beforeRender!=null){
                                this.beforeRender();
                            }
                            if(this._left!=null){
                                this.getDomInstance().css('left', (this._left*this.getScale())+'px');
                            }
                            if(this._top!=null){
                                this.getDomInstance().css('top', (this._top*this.getScale())+'px');
                            }
                            if(this._width!=null){
                                this.getDomInstance().css('width', (this._width*this.getScale())+'px');
                            }
                            if(this._height!=null){
                                this.getDomInstance().css('height', (this._height*this.getScale())+'px');
                            }
                            this.getDomInstance().css('position', this.getPosition());
                            this.getDomInstance().css('zIndex', this.getZIndex());
                            this.getDomInstance().addClass(this.getCss());    //todo 有bug
                            this._render();
                            for(var i=0; i<this.childNodes().length; i++){
                                this.childNodes()[i].render();
                            }
                            if(this.afterRender!=null){
                                this.afterRender();
                            }
                        };
                    }
                    for(var p in obj[o].prototype){
                        if(typeof(obj[o].prototype[p])=='function'&&p.indexOf('set')==0){ //对set方法注入权限检查
                            obj[o].prototype['__'+p] = obj[o].prototype[p];
                            obj[o].prototype[p]=function(){
                                var funcName = '';
                                var func = arguments.callee;
                                for(var n in this){
                                    if(this[n]===func){
                                        funcName = n;
                                        break;
                                    }
                                }
                                if(this.getIsInside()==true){ //如果当前对象为内部对象 则定制业务脚本不能调用内部对象的set方法
                                    var canCall = true;
                                    var c = this[funcName].caller;
                                    if(c==null){
                                        canCall = false;
                                    }else if(c!=null&& c.toString().indexOf('wof$_onReceiveMessageFunc')>=0) {
                                        canCall = false;
                                    }else if(c!=null&& c.toString().indexOf('wof$_onSendMessageFunc')>=0) {
                                        canCall = false;
                                    }
                                    if(canCall==false){
                                        alert('定制业务脚本不能调用内部对象的set方法');
                                        return;
                                    }
                                }
                                this['__'+funcName].apply(this,arguments);
                            }
                        }
                    }
                }
            }else if(typeof(obj[o])=='object'){
                aopChildren(objName+"."+o);
            }
        }
    }
    return aopChildren;
})();
wof$_aop('wof.kernel');
wof$_aop('wof.widget');
wof$_aop('wof.bizWidget');
var wof$ = wof.util.Selector.find;
