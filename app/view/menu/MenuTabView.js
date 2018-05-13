/**
 * 程序菜单视图
 */
Ext.define('here.view.menu.MenuTabView', {
    extend: 'Ext.TabPanel',
    xtype: 'menuTabView',
    config: {
        title: 'Here',
        tabBarPosition: 'bottom',
        items: [
            {
                itemId: 'homeMenu',
                xclass: 'here.view.home.HomeMenuView' // 首页视图
            },
            {
                itemId: 'publishMenu',
                xclass: 'here.view.publish.FirstView' // 内容发布视图（第一个视图）
            },
            {
                itemId: 'myMenu',
                xclass: 'here.view.my.MyContainer' // 我的视图
            }
        ]
    }
})