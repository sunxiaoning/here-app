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
        // mapOptions: {
            //locate: false
        // },
        //是否监听标点的点击事件
        markerTap: true,
        locationFinish : false
    },
    //点击坐标处理
    onTapMarker: function (me, marker) {
        //创建信息窗口
        var infoWindow = new BMap.InfoWindow(marker.options.name);
        marker.openInfoWindow(infoWindow);
    },

    initialize: function(){
        var me = this;
        var myLocation;
        var markData = [];
        if(typeof(baidumap_location) != 'undefined'){
            
            // 进行定位 
            baidumap_location.getCurrentPosition(function (result) {
                me.setLocationFinish(true);
                myLocation = {
                    lng:result.longitude,
                    lat:result.latitude
                };
                me.setCenter(myLocation);
                markData.push(myLocation);
                me.setData(markData);              
            }, function (error) {
                me.setLocationFinish(true);       
                Ext.toast(
                    {
                        message: '定位失败!',
                        timeout: 2000
                    }
                );    
            },[{
                timeout : 500
            }]);

            // 等待定位请求
            function waitLocation(){
                function sleep(numberMillis) { 
                    var now = new Date(); 
                    var exitTime = now.getTime() + numberMillis; 
                    while (true) { 
                        now = new Date(); 
                        if (now.getTime() > exitTime) 
                            return; 
                    } 
                }

                // 已等待时间
                var waitedTime = 0;
                while(true){
                    
                    // 定位成功，或定位超时
                    if(me.getLocationFinish() || waitedTime > 3000){
                        break;
                    }
                    else {
                        sleep(300);
                        waitedTime += 300;
                    }
                }
                me.callParent();
            }
            waitLocation();
           
           

          
        }
        else {
            myLocation = {
                lng:114.3146600000,
                lat:34.8017770000
            };
            me.setCenter(myLocation);
            markData.push(myLocation);
            me.setData(markData);
            me.callParent();
        }
        
        
        
    }
});