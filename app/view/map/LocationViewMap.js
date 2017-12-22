Ext.define('here.view.map.LocationViewMap', {
    extend: 'here.ux.BMap',
    xtype: 'locationViewMap',
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

                // 位置不存在，提交新的位置请求
                Ext.Ajax.request({
                    url: window.localStorage.getItem("SERVER_URL")+'/locationController/postNewLocation',
                    useDefaultXhrHeader: false,
                    params: {
                        lng : myLocation.longitude,
                        lat : myLocation.latitude,
                        title : myLocation.locationDescribe,
                        address : myLocation.addr
                    },
                    method : "POST",
                    success: function(response){
                        var responseJSON = Ext.JSON.decode(response.responseText,true);
                        if(responseJSON.locationId){
                            window.localStorage.setItem("locationId",responseJSON.locationId);
                            Ext.Msg.alert('提示', '位置已选择！', Ext.emptyFn);
                        }
                    },
                    failure : function(response) {
                        Ext.Msg.alert('提示', '提交我的点位置信息出错！', Ext.emptyFn);

                    }
                });
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


        // 添加我的位置周边位置
        Ext.Ajax.request({
            url: window.localStorage.getItem("SERVER_URL")+'/locationController/getNearbyLocationList',
            useDefaultXhrHeader: false,
            params: {
                lng:myLocation.longitude,
                lat:myLocation.latitude,
                radius : 1000
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