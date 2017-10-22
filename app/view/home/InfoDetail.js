Ext.define('here.view.home.InfoDetail', {
    extend: 'Ext.DataView',
    xtype : 'infoDetail',
    requires: [
                'Ext.data.Store',
                'Ext.data.proxy.JsonP',
              ],
    config: {
        store: {
            autoLoad: true,
            fields: ['desc', 'title','photo'],
            proxy: {
                type: 'jsonp',
                pageParam : false,
                timeout : 10000,
                url: 'http://192.168.31.83:3000/api/getUserPublishDetail',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        itemTpl: '<div style="margin-top:5%;font-size:14px;font-weight:bold;"><span style="margin-left:5%;">{title}</span></div><div style="margin-top:5%;margin-left:5%;"><span style="font-size:12px;">{desc}</span></div><div style="margin-top:5%;"><tpl for="photo"><span style="margin-left:5%;"><img src="{.}" style="width:100%;height:100%;" /></span></tpl></div>'
    }
});