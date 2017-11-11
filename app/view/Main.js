Ext.define('here.view.Main', {
    extend: 'Ext.NavigationView',
    xtype: 'main',
	config : {
		defaultBackButtonText : '返回',
		autoDestroy: false,
		items:[
			{
				xtype: 'tabpanel',
				title : 'Here',
				tabBarPosition : 'bottom',
				items: [
						{
							xclass: 'here.view.home.HomeContainer'
						},
						{
							xclass : 'here.view.publish.FirstView'
						},
						{
							xclass: 'here.view.my.MyContainer'
						}
				]
					
			}
		
		]
		
	}
});
