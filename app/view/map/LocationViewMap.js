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
         
        // 进行定位 
        baidumap_location.getCurrentPosition(function (result) {
            me.setLocationFinish(true);
            myLocation = {
                lng:result.longitude,
                lat:result.latitude
            };
            me.setCenter(myLocation);
            
            // 添加我的位置标注
            me.addMyPoint(me.getCenter().lng, me.getCenter().lat);
            
            // 添加我的位置周边位置
            Ext.Ajax.request({
                  url: window.localStorage.getItem("serverUrl")+'/locationController/getNearbyLocationList',
                  useDefaultXhrHeader: false,
                  params: {
                      lat : me.getCenter().lat,
                      lng : me.getCenter().lng,
                      radius : 1000
                  },
                  method : "POST",
                  success: function(response){
                      var responseJSON = Ext.JSON.decode(response.responseText,true);                
                      if(responseJSON.pointLocationDtoList){
                          Ext.Array.each(responseJSON.pointLocationDtoList,function(item, index, length){
                            me.addPoint(item['lng'], item['lat'], item, me, me.getMap());
                          });
                      }
                  },
                  failure : function(response) {
                    Ext.Msg.alert('提示', '加载周围点位置出错！', Ext.emptyFn);                
                    
                  }
          });
                    
        }, function (error) {
            alert(JSON.stringify(error));
            me.setLocationFinish(true);       
            Ext.toast(
                {
                    message: '定位失败!',
                    timeout: 200,
                    docked : 'top'
                }
            );    
        });
    },
    applyStore: function (store) {
        var me = this;
        me.callParent();
    }
});