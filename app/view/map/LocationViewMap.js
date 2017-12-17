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
        var myLocation = Ext.JSON.decode(window.localStorage.getItem("myLocation"),true);
        Ext.Msg.confirm("提示", "您的当前位置为：" + myLocation.addr + " " + myLocation.locationDescribe, function (buttonId) {
            if (buttonId == "yes") {

                // 获取我的位置
                var myLocation = Ext.JSON.decode(window.localStorage.getItem("myLocation"),true);

                // 位置不存在，提交新的位置请求
                Ext.Ajax.request({
                    url: window.localStorage.getItem("serverUrl")+'/locationController/postNewLocation',
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
    }
});