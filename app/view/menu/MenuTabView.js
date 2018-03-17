Ext.define('here.view.menu.MenuTabView',{
    extend : 'Ext.TabPanel',
    xtype : 'menuTabView',
    config : {
        title : '首页',
        tabBarPosition : 'bottom',
        items: [
            {
                itemId : 'homeMenu',
                xclass: 'here.view.home.HomeContainer'
            },
            {
                itemId : 'publishMenu',
                xclass : 'here.view.publish.FirstView'
            },
            {
                itemId : 'myMenu',
                xclass: 'here.view.my.MyContainer'
            }
        ]
    }
})