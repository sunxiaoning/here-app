/**
 * 首页视图
 */
Ext.define('here.view.home.HomeMenuView', {
    extend: 'Ext.tab.Panel',
    xtype: 'homeMenuView',
    requires: [
        'here.view.map.ContentLocationMapView', 'here.view.home.LatestView'
    ],
    config: {
        title: '首页',
        iconCls: 'home',
        items: [
            {
                xtype: 'latestView'
            }
        ]
    }
});