/**
 * @utilClass Selector class
 * @package wof.util
 * @copyright author
 * @Time: 13-8-16 下午9:42
 */
if (!wof.util.Selector) {
		wof.util.Selector = {

            //todo 有待完善的语法分析
            _parser:function(queryString){
                var selectors = [];
                //todo 先检查是否为群组选择器
                //todo 再检查是否为层次选择器
                //todo 再检查是否为基本选择器
                //todo 再检查是否包括过滤选择器(简单、内容、属性、子对象、可见性)

                //以下先简单实现 仅支持基本选择器的语法
                var queryString = jQuery.trim(queryString);
                if(queryString!=null &&queryString.length>0){
                    if(queryString=='*'){
                        selectors.push({type:'*',query:queryString});
                    }else if(queryString.indexOf('#')==0){ //id选择器
                        var queryStr = queryString.substring(1);
                        selectors.push({type:'#',query:queryStr});
                    }else{
                        selectors.push({type:'className',query:queryString});
                    }

                }
                return selectors;
            },

            /**
             * 对选择器语法进行解析并调用对应的选择器
             */
            find: function(queryString) {
                var sls = new wof.util.SelectorList();
                var selectors = wof.util.Selector._parser(queryString);
                for(var i=0;i<selectors.length;i++){
                    var ss = selectors[i];
                    if(ss.type=='*'){
                        console.log('查找所有对象');
                    }else if(ss.type=='#'){
                        sls = wof.util.Selector._getObjectById(ss.query);
                    }else if(ss.type=='className'){
                        console.log('查找className='+ss.query+'的对象');
                    }
                }
                return sls;
            },

            /**
             * 根据对象id查找
             * return 对象集合
             */
            _getObjectById: function(oid) {
                var sls = new wof.util.SelectorList();
                var obj = wof.util.ObjectManager.get(oid);
                sls.add(obj);
                return sls;
            }




        };
}
