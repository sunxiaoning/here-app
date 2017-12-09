Ext.define('here.controller.MenuTabController', {
    extend: 'Ext.app.Controller',
    requires : [],
    config: {
        control: {

            menuTabView : {
                activeitemchange : 'menuChange'
            }
        },
        refs: {

            menuTabView : '#menuTabView',
            locationViewMap : '#locationViewMap'
        }
    },

    menuChange : function(menuTab, value, oldValue, eOpts ){
        var me = this;
        var menuItem = value.getItemId();
        switch(menuItem) {
            case 'homeMenu':
                // alert(1);
                break;
            case 'publishMenu':
                me.loadNearbyLocation();
                break;
            case 'myMenu':
                // alert(3);
                break;

        }
    },

    // 加载周边位置
    loadNearbyLocation : function(){
        var me = this;

        // 获取位置点视图
        var locationView = me.getLocationViewMap();
        if(typeof(baidumap_location) != 'undefined'){

            // 进行定位
            baidumap_location.getCurrentPosition(function (result) {

                //  存储我的位置
                window.localStorage.setItem("myLocation",JSON.stringify(result));
                var myLocation = {
                    lng:result.longitude,
                    lat:result.latitude
                };
                locationView.setCenter(myLocation);

                // 添加我的位置标注
                locationView.addMyPoint(locationView.getCenter().lng, locationView.getCenter().lat);

                // 添加我的位置周边位置
                Ext.Ajax.request({
                    url: window.localStorage.getItem("serverUrl")+'/locationController/getNearbyLocationList',
                    useDefaultXhrHeader: false,
                    params: {
                        lat : locationView.getCenter().lat,
                        lng : locationView.getCenter().lng,
                        radius : 1000
                    },
                    method : "POST",
                    success: function(response){
                        var responseJSON = Ext.JSON.decode(response.responseText,true);
                        if(responseJSON.pointLocationDtoList){
                            Ext.Array.each(responseJSON.pointLocationDtoList,function(item, index, length){
                                if(item['lng'] != locationView.getCenter().lng || item['lat'] != locationView.getCenter().lat) {
                                    locationView.addPoint(item['lng'], item['lat'], item, locationView, locationView.getMap());
                                }
                            });
                        }
                    },
                    failure : function(response) {
                        Ext.Msg.alert('提示', '加载周围点位置出错！', Ext.emptyFn);

                    }
                });

            }, function (error) {
                // alert(JSON.stringify(error));
                Ext.toast(
                    {
                        message: '定位失败!',
                        timeout: 200,
                        docked : 'top'
                    }
                );
            });
        }

    }
});


