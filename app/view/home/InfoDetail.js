Ext.define('here.view.home.InfoDetail', {
    extend: 'Ext.DataView',
    xtype : 'infoDetail',
    requires: [
                'Ext.data.Store',
                'Ext.data.proxy.JsonP'
              ],
    config: {
        title : '发布内容详情',
        contentId : null
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
                    contentId : null
                },
                timeout : 10000,
                url: [SYSTEM_CONFIG.SERVER_URL,'/contentGrpcController/getLatestPublishDetail'].join(""),
                reader: {
                    type: 'json'
                }
            }
        });
        me.setStore(store);
        var restApiParams = here.util.PostUtil.getRestApiParams();
        var itemTpl =  ['<div style="margin-top:5%;font-size:18px;font-weight:bold;">',
                            '<span style="margin-left:5%;">{title}</span>',
                        '</div>',
                        '<div style="margin-top:5%;margin-left:5%;">',
                                '<span style="font-size:12px;">{content}</span>',
                        '</div>',
                        '<div style="margin-top:5%;">' +
                            '<tpl for="url"><span style="margin-left:5%;">' +
                                '<img src="',SYSTEM_CONFIG.SERVER_URL,'/fileViewController/getFileDetail?fileUrl={.}&&token=',encodeURIComponent(restApiParams['token']),'&&timestamp=',restApiParams['timestamp'],'" style="width:90%;height:90%;" /></span>',
                            '</tpl>' +
                        '</div>'].join("");

        me.setItemTpl(itemTpl);
        me.callParent();
    }
});