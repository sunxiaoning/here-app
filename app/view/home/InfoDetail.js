Ext.define('here.view.home.InfoDetail', {
    extend: 'Ext.DataView',
    xtype : 'infoDetail',
    requires: [
                'Ext.data.Store',
                'Ext.data.proxy.JsonP'
              ],
    config: {
        contentId : null,
        itemTpl: '<div style="margin-top:5%;font-size:14px;font-weight:bold;"><span style="margin-left:5%;">{title}</span></div><div style="margin-top:5%;margin-left:5%;"><span style="font-size:12px;">{content}</span></div><div style="margin-top:5%;"><tpl for="url"><span style="margin-left:5%;"><img src="'+window.localStorage.getItem('serverUrl')+'/fileViewController/getFileDetail?fileUrl={.}" style="width:40%;height:40%;" />{publishUser}</span></tpl></div>'
    },

    //初始化
    initialize: function () {
        var me = this;

        var store = Ext.create('Ext.data.Store',{
            autoLoad: false,
            fields: ['id', 'title','content','url'],
            proxy: {
                type: 'ajax',
                actionMethods : {
                    read : "POST"
                },
                extraParams : {
                    contentId : window.localStorage.getItem("infoListView.contentId")
                },
                timeout : 10000,
                url: window.localStorage.getItem('serverUrl')+"/contentController/getLatestPublishDetail",
                reader: {
                    type: 'json'
                }
            }
        });
        me.setStore(store);
        me.getStore().load();
        me.callParent();
    }
});