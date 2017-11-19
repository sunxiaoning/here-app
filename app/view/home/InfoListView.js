Ext.define("here.view.home.InfoListView",{
    extend : 'Ext.DataView',
    xtype : 'infoListView',
    requires : [
		'Ext.data.Store',
        'Ext.data.proxy.JsonP',
         'Ext.DataView'
    ],
    config : {
        itemTpl: '<div style="margin-top:5%;font-size:14px;font-weight:bold;"><span style="margin-left:5%;">{title}</span></div><div style="margin-top:5%;"><tpl for="url"><span style="margin-left:5%;"><img src="'+window.localStorage.getItem('serverUrl')+'/fileViewController/getFileDetail?fileUrl={.}" style="width:40%;height:40%;" />{publishUser}</span></tpl></div><div style="margin-top:5%;"><span style="margin-left:5%;font-size:10px;"></span><span style="margin-left:5%;font-size:10px;">{publishTime}</span><span style="margin-left:5%;font-size:10px;">距离我{distance}米</span><span style="margin-left:5%;font-size:10px;">点击量：{visitCount}</span></div>'
    },
    
    //初始化
    initialize: function () {
        var me = this;
        var lat = 39.910098;
        var lng = 116.404081;

        var store = Ext.create('Ext.data.Store',{
            autoLoad: false,
            fields: ['id', 'distance','publishTime','publishUser','title','url','visitCount'],
            proxy: {
                id : 'infoListProxy',
                type: 'ajax',
                actionMethods : {
                    read : "POST"
                },
                extraParams : {
                    lat : lat,
                    lng : lng
                },
                timeout : 10000,
                url: window.localStorage.getItem('serverUrl')+"/contentController/getLatestPublishList",
                reader: {
                    type: 'json',
                    rootProperty: 'pageResult.resultList'
                }
            }
        });
        me.setStore(store);
        me.callParent();
        me.getStore().load();
        
    },
   
});