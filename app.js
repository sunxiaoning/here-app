/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

//<debug>
Ext.Loader.setPath({
    'Ext': '../../src',
    'here': 'app'
});
//</debug>

Ext.require('here.util.LocationUtil');

Ext.application({
    name: 'here',

    requires: [
        'Ext.MessageBox'
    ],

    views: [
        'Main',
        'Main',
        'home.HomeMenuView',
        'home.LatestView',
        'home.InfoListView',
        'home.LocationInfoListView',
        'home.InfoDetail',
        'publish.FirstView',
        'publish.ThirdView',
        'publish.FourthView',
        'map.LocationLocationMapView',
        'map.ContentLocationMapView',
        'my.MyContainer',
        'login.LoginView',
        'menu.MenuTabView'
    ],
    controllers: [
        'home.LatestViewController',
        'publish.ContentPublishController',
        'MenuTabViewController',
        'login.LoginViewController'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // 获取本机IP地址
        // var hostIp = SYSTEM_CONFIG.CLIENT_IP;

        // 清理storage缓存数据
        window.localStorage.clear();

        // 设置本机IP地址
        // window.localStorage.setItem("hostIp",hostIp);

        // 设置服务器主机地址
       // window.localStorage.setItem("SERVER_URL","http://39.106.122.85:8080");

        // 进行定位
        window.localStorage.setItem("MY_LOCATION",JSON.stringify({
            longitude : 116.404081,
            latitude : 39.910098
        }));
        if(typeof(baidumap_location) != 'undefined'){
            here.util.LocationUtil.updateMyLocation();
            setInterval(function () {
                here.util.LocationUtil.updateMyLocation();
            },60000);
        }

        Ext.Viewport.add(Ext.create('here.view.login.LoginView',{
            id : 'loginView'
        }));

        // Initialize the main view
        Ext.Viewport.add(Ext.create('here.view.Main',{
            id : 'mainView',
            hidden : true
        }));


        // Ext.Viewport.animateActiveItem(0,'fade');



        

        /*Ext.Viewport.addAfterListener('painted', function(){
            var me = this;
            if(navigator.connection.type == Connection.NONE){
               
                // 用户提示
                Ext.toast(
                    {
                        message: "网络已断开,请连接网络！",
                        docked : 'top',
                        timeout: 200
                    }
                );
            }

            // 监听网络状态
            document.addEventListener("offline", Ext.bind(me.onOffline,me), false);
            document.addEventListener("online", Ext.bind(me.onOnline,me), false);
        }, this);*/
    },

    onOffline : function(){
        var me = this;

        // 用户提示
        Ext.toast(
            {
                message: "网络已断开,请连接网络！",
                timeout: 200,
                docked : 'top'
            }
        );
    },
    onOnline : function(){
        var me = this;
        
        // 用户提示
        Ext.toast(
            {
                message: "网络已连接！",
                timeout: 200,
                docked : 'top'
            }
        );
        me.restartView();
    },
    restartView : function(){
        window.location.reload();
    }
});
