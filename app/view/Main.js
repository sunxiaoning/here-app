/**
 * 主视图，视图入口
 */
Ext.define('here.view.Main', {
    extend: 'Ext.NavigationView',
    xtype: 'main',
    requires: ['here.view.menu.MenuTabView'],
    config: {
        defaultBackButtonText: '返回',
        autoDestroy: false,
        items: [
            {
                id: 'menuTabView',
                xtype: 'menuTabView'
            }
        ]

    }
});
