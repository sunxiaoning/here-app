/**
 * 位置位置视图 在地图展示周边的位置标注
 */
Ext.define('here.view.map.LocationLocationMapView', {
    extend: 'here.ux.BMap',
    xtype: 'locationLocationMapView',
    requires: [
		'Ext.util.DelayedTask','Ext.Toast','here.util.LocationUtil','here.util.PostUtil'
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
        myMarkerTap : true,
        locationFinish : false,
        data: null
    },
    
    // 点击坐标处理
    onTapMarker : function (me, marker) {
        Ext.Msg.confirm("提示", "当前位置为："+marker.options.address+" "+marker.options.title, function(buttonId){
            if(buttonId == "yes"){
                window.localStorage.setItem("locationId",marker.options.id);
                Ext.Msg.alert('提示', '位置已选择！', Ext.emptyFn);                
            }
        });   

    },

    // 点击我的位置图标
    onTapMyMarker : function (me, marker) {

        // 获取我的位置
        var myLocation = here.util.LocationUtil.getMyLocation();
       /* var myLocation = {
            lng:116.404081,
            lat:39.910098
        };*/
        Ext.Msg.confirm("提示", "您的当前位置为：" + myLocation.addr + " " + myLocation.locationDescribe, function (buttonId) {
            if (buttonId == "yes") {

                here.util.PostUtil.postWithSign('/locationController/postNewLocation', {
                        lng : myLocation.longitude,
                        lat : myLocation.latitude,
                        title : myLocation.locationDescribe,
                        address : myLocation.addr
                    },
                    function (responseJSON) {
                        if(responseJSON.locationId){
                            window.localStorage.setItem("locationId",responseJSON.locationId);
                            Ext.Msg.alert('提示', '位置已选择！', Ext.emptyFn);
                        }
                    },
                    null
                );
            }
        });
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

        here.util.PostUtil.postWithSign('/locationController/getNearbyLocationList', {
                lng:myLocation.longitude,
                lat:myLocation.latitude,
                radius : 1000
            },
            function (responseJSON) {
                if(responseJSON.pointLocationDtoList){
                    if(responseJSON.pointLocationDtoList){
                        Ext.Array.each(responseJSON.pointLocationDtoList,function(item, index, length){
                            if(item['lng'] != myLocation.longitude || item['lat'] != myLocation.latitude) {
                                me.addPoint(item['lng'], item['lat'], item, me, me.getMap());
                            }
                        });
                    }
                }
            },
            null
        );

    }
});
