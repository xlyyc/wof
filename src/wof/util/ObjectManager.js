if (!wof.util.ObjectManager) {
	wof.util.ObjectManager = {
		
		_objs: new wof.util.Hashtable(),

		get: function(oId) {
            var obj = wof.util.ObjectManager._objs.items(oId);
            if(obj!=null&&obj.getIsInside()==true){
                console.log('查找到的id='+oId+'是内部对象');
            }
			return obj;
		},
		
		add: function(oId, obj) {
			return wof.util.ObjectManager._objs.add(oId, obj);
		},
		
		remove: function(oId) {
			return wof.util.ObjectManager._objs.remove(oId);
		}
		
	};
}
