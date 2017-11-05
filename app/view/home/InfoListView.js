Ext.define("here.view.home.InfoListView",{
    extend : 'Ext.DataView',
    xtype : 'infoListView',
    requires : [
		'Ext.data.Store',
        'Ext.data.proxy.JsonP',
         'Ext.DataView'
    ],
    config : {
        store: {
            autoLoad: true,
            fields: ['desc', 'title','photo'],
            proxy: {
                id : 'infoListProxy',
                type: 'jsonp',
                pageParam : false,
                timeout : 10000,
                url: 'http://192.168.101.218:3000/api/getUserPublish',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        itemTpl: '<div style="margin-top:5%;font-size:14px;font-weight:bold;"><span style="margin-left:5%;">{title}</span></div><div style="margin-top:5%;"><tpl for="photo"><span style="margin-left:5%;"><img src="{.}" style="width:40%;height:40%;" /></span></tpl></div><div style="margin-top:5%;"><span style="margin-left:5%;font-size:10px;">William</span><span style="margin-left:5%;font-size:10px;">2小时前</span><span style="margin-left:5%;font-size:10px;">500M</span><span style="margin-left:5%;font-size:10px;">点击量：1000</span></div>'
    }
   
});