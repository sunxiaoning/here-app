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
        data: [
                    { lng: '121.538089', lat: '31.22488', name: '上海东昌',address : '上海市浦东新区峨山路91弄160号陆家嘴软件园'}, 
                    { lng: '121.538784', lat: '31.223483', name: '上海乐赚',address:'上海市浦东新区峨山路91弄98号陆家嘴软件园' },
                    { lng: '121.48393', lat: '31.291559', name: '虹口区教师进修学院',address:'水电路839'},
                    { lng: '121.486409', lat: '31.292679', name: '智慧桥创业园',address:'上海市虹口区广灵四路116号-1号楼-203'}
              ]
    },
    
    // 点击坐标处理
    onTapMarker : function (me, marker) {
        Ext.Msg.confirm("选择我的位置", "选中位置："+marker.options.name+","+marker.options.address, Ext.emptyFn);
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
            }, function (error) {
                me.setLocationFinish(true);       
                Ext.toast(
                    {
                        message: '定位失败!',
                        timeout: 200,
                        docked : 'top'
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
                    if(me.getLocationFinish() || waitedTime > 1000){
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
                lng:121.484947,
                lat:31.29175
            };
            me.setCenter(myLocation);
           // markData.push(myLocation);
            // me.setData(markData);
            me.callParent();
           
        }
        
        
        
    }
});