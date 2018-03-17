Ext.define('here.util.LocationUtil', {

    singleton: true,

    requires: [],

    // 更新我的位置
    updateMyLocation : function(){
        if(typeof(baidumap_location) != 'undefined'){
            baidumap_location.getCurrentPosition(function (result) {

                //  存储我的位置
                window.localStorage.setItem("MY_LOCATION",JSON.stringify(result));

            }, function (error) {
                Ext.toast(
                    {
                        message: '定位失败!',
                        timeout: 200,
                        docked : 'top'
                    }
                );
            });
        }

    },

    // 获取我的位置
    getMyLocation : function(){
        var myLocation = window.localStorage.getItem('MY_LOCATION');
        do {
            myLocation = window.localStorage.getItem('MY_LOCATION');
        }while(!myLocation);
        myLocation = Ext.JSON.decode(window.localStorage.getItem("MY_LOCATION"),true);
        return myLocation;
    }


});