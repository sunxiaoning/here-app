Ext.define('here.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    config: {
        tabBarPosition: 'bottom',
        items: [
                {
                    xclass: 'here.view.home.HomeContainer'
                },
                {
                    xtype : 'button',
					title : '发布',
                    iconCls : 'compose'
                },
                {
                    xclass: 'here.view.my.MyContainer'
                }
            ]
    }
});
