Ext.define('here.view.map.LocationViewMap', {
    extend: 'here.ux.BMap',
    xtype: 'locationViewMap',
    requires: [
		'Ext.util.DelayedTask','Ext.Toast'
	],
    config: {
        title: '地图',
        /// <summary>
        /// 地图配置
        /// </summary>
        /// <param name="locate">是否加载定位控件</param>
        mapOptions: {
            locate: true
         },
        //是否监听标点的点击事件
        markerTap: true,
        locationFinish : false,
        data: null
    },
    
    // 点击坐标处理
    onTapMarker : function (me, marker) {
        Ext.Msg.confirm("提示", "当前位置为："+marker.options.address+" "+marker.options.title, function(buttonId){
            if(buttonId = "yes"){
                window.localStorage.setItem("locationId",marker.options.id);
                Ext.Msg.alert('提示', '位置已选择！', Ext.emptyFn);                
            }
        });   

    },
    initMap : function(){
        var me = this;
        me.callParent();
    }
});