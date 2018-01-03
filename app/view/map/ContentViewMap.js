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
        var mainView =  Ext.ComponentQuery.query("#mainView")[0];
        var locationInfoListView = Ext.widget('locationInfoListView');
        locationInfoListView.setTitle(marker.options.title+" "+locationInfoListView.getTitle());
        var myLocation = here.util.LocationUtil.getMyLocation();
        locationInfoListView.getStore().getProxy().setExtraParams({
            locationId : marker.options.id,
            lat : myLocation.latitude,
            lng : myLocation.longitude
        });
        locationInfoListView.getStore().load();
        mainView.push(locationInfoListView);
    },
    initMap : function(){
        var me = this;
        me.callParent();
        var myLocation = here.util.LocationUtil.getMyLocation();
        var center = {
            lng:myLocation.longitude,
            lat:myLocation.latitude
        };
        me.setCenter(center);
        me.onLocate();
    },
    onLocate : function () {
        var me = this;
        me.callParent();
        me.loadNearbyLocation();
    },

    // 加载周边位置
    loadNearbyLocation : function(){
        var me = this;

        var myLocation = here.util.LocationUtil.getMyLocation();


        // 添加我的位置周边位置
        Ext.Ajax.request({
            url: window.localStorage.getItem("SERVER_URL")+'/locationController/getNearbyLocationList',
            useDefaultXhrHeader: false,
            params: {
                lng:myLocation.longitude,
                lat:myLocation.latitude,
                radius : 5000
            },
            method : "POST",
            success: function(response){
                var responseJSON = Ext.JSON.decode(response.responseText,true);
                if(responseJSON.pointLocationDtoList){
                    Ext.Array.each(responseJSON.pointLocationDtoList,function(item, index, length){
                        if(item['lng'] != myLocation.longitude || item['lat'] != myLocation.latitude) {
                            me.addPoint(item['lng'], item['lat'], item, me, me.getMap());
                        }
                    });
                }
            },
            failure : function(response) {
                Ext.Msg.alert('提示', '加载周围点位置出错！', Ext.emptyFn);

            }
        });

    }
});