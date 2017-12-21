Ext.define('here.controller.MenuTabController', {
    extend: 'Ext.app.Controller',
    requires : ['here.util.LocationUtil'],
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

    }
});


