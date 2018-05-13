/**
 * 首页 最新发布视图
 */
Ext.define('here.view.home.LatestView', {
    extend: 'Ext.Panel',
    xtype: 'latestView',
    requires: [
        'Ext.SegmentedButton',
        'here.view.home.InfoListView'
    ],
    config: {
        title: '最新发布',
        layout: 'card',
        items: [
            {
                xtype: 'toolbar',
                layout: 'fit',
                docked: 'top',
                items: [
                    {
                        xtype: 'segmentedbutton',
                        id: 'toggleButton',
                        centered: true,
                        items: [
                            {
                                id: 'locationViewButton',
                                text: '位置视图',
                                pressed: true
                            },
                            {
                                id: 'infoViewButton',
                                text: '信息视图'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'locationView',
                xtype: 'contentLocationMapView'
            },
            {
                id: 'infoListView',
                xtype: 'infoListView',
                hidden: true
            }
        ]
    }
});