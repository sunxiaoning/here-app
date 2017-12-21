Ext.define('here.view.map.ContentViewMap', {
    extend: 'here.ux.BMap',
    xtype: 'contentViewMap',
    requires: [
		'Ext.util.DelayedTask','Ext.Toast','here.util.LocationUtil'
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
        var infoWindow = new BMap.InfoWindow(marker.options.title);
        marker.openInfoWindow(infoWindow);
    },
    initMap : function(){
        var me = this;
        me.callParent();

        /*var myLocation = {
            lng:116.404081,
            lat:39.910098
        };
        me.setCenter(myLocation);

        // 添加我的位置标注
        me.addMyPoint(me.getCenter().lng, me.getCenter().lat);*/

        var myLocation = here.util.LocationUtil.getMyLocation();
        var center = {
            lng:myLocation.longitude,
            lat:myLocation.latitude
        };
        me.setCenter(center);

        // 添加我的位置标注
        me.addMyPoint(me.getCenter().lng, me.getCenter().lat);
    },
    applyStore: function (store) {
        var me = this;
        me.callParent();
    }
});