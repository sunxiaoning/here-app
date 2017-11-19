Ext.define('here.view.Main', {
    extend: 'Ext.NavigationView',
    xtype: 'main',
	config : {
		defaultBackButtonText : '返回',
		autoDestroy: false,
		items:[
			{
				id : 'menuTabView',
				xtype: 'tabpanel',
				title : 'Here',
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
		
		]
		
	}
});
