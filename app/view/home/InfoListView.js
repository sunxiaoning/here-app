Ext.define("here.view.home.InfoListView",{
    extend : 'Ext.List',
    xtype : 'infoListView',
    requires : [
		'Ext.data.Store',
        'Ext.data.proxy.JsonP',
         'Ext.DataView',
        'here.ux.PullRefreshFn'
    ],
    config : {
        emptyText : '没有数据！',
        style : 'background-color:#b3ffff',
        plugins: [
            {
                xtype : 'refreshFn',
                pullText: '下拉以刷新',
                releaseText : '松开以刷新',
                loadingText : '正在加载...',
                loadedText : '数据已加载',
                lastUpdatedText : '最后更新时间：&nbsp;',
                lastUpdatedDateFormat : 'Y-m-d h:i:s',
                scrollerAutoRefresh : true,
                refreshFn: function (loaded) {
                    loaded.getList().getStore().loadPage(1);
                }
            },
            {
                xclass: 'Ext.plugin.ListPaging',
                autoPaging: true,
                docked : 'bottom',
                loadMoreText : '点击加载更多',
                noMoreRecordsText : '没有更多数据了'
            }
        ],
        itemTpl: '<div style="margin-top:5%;font-size:18px;font-weight:bold;"><span style="margin-left:5%;">{title}</span></div><div style="margin-top:5%;"><span style="margin-left:5%;font-size:10px;">{publishUser}</span><span style="margin-left:5%;font-size:10px;">{publishTime}</span><span style="margin-left:5%;font-size:10px;">{locationDescribe}<span style="margin-left:5%;font-size:10px;">距离我{distance}</span></span></div>'
    },
    
    //初始化
    initialize: function () {
        var me = this;
        var lat = 39.910098;
        var lng = 116.404081;

        var store = Ext.create('Ext.data.Store',{
            autoLoad: false,
            fields: ['id', 'distance','publishTime','publishUser','locationDescribe','title','url','visitCount'],
            pageSize:10,
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
                    rootProperty: 'pageResult.resultList',
                    totalProperty: 'pageResult.totalCount'
                }
            }
        });
        me.setStore(store);
        me.callParent();
        me.getStore().load();
        
    }
   
});