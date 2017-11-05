Ext.define('here.view.map.Map', {
    alternateClassName: 'map',
    extend: 'here.ux.BMap',
    xtype: 'map',
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
        var infoWindow = new BMap.InfoWindow(marker.options.name);
        marker.openInfoWindow(infoWindow);
    },

    initialize: function(){
        var me = this;
        var myLocation;
        var markData = [];
        if(typeof(baidumap_location) != 'undefined'){
            me.callParent();
            
            // 进行定位 
            baidumap_location.getCurrentPosition(function (result) {
                me.setLocationFinish(true);
                myLocation = {
                    lng:result.longitude,
                    lat:result.latitude
                };
                me.setCenter(myLocation);

                // 移动到我的位置
                map.panTo(new BMap.Point(me.getCenter().lng,me.getCenter().lat));  
                      
                      // 添加我的位置标注
                      me.addMyPoint(me.getCenter().lng, me.getCenter().lat);
                      
                      // 添加我的位置周边位置
                      Ext.Ajax.request({
                            url: 'http://186685me27.imwork.net/locationController/getNearbyLocationList',
                            useDefaultXhrHeader: false,
                            params: {
                                lat : me.getCenter().lat,
                                lng : me.getCenter().lng,
                                radius : 1000
                            },
                            method : "POST",
                            success: function(response){
                                var responseJSON = Ext.JSON.decode(response.responseText,true);
                                me.getStore().addData(responseJSON.pointLocationDtoList);
                                if(me.getStore().getCount()){
                                    me.onload(me.getStore());
                                }
                            },
                            failure : function(response) {
                                Ext.Msg.alert('提示', "加载周围点位置出错！");
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
        }
        else {
            // markData.push(myLocation);
            // me.setData(markData);
            me.callParent();
            myLocation = {
                lat:31.229830,
                lng:121.539961
            };
            me.setCenter(myLocation);
           
        }
        
        
        
    },
    initMap : function(){
        var me = this;
        me.callParent();
        me.getMap().panTo(new BMap.Point(me.getCenter().lng,me.getCenter().lat));  
        
        // 添加我的位置标注
        me.addMyPoint(me.getCenter().lng, me.getCenter().lat);
        
        // 添加我的位置周边位置
        Ext.Ajax.request({
              url: 'http://186685me27.imwork.net/locationController/getNearbyLocationList',
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
                  Ext.Msg.alert('提示', "加载周围点位置出错！");
              }
      });
    },
    applyStore: function (store) {
        var me = this;
        me.callParent();
    }
});