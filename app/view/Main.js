Ext.define('here.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
	config : {
		layout: {
            type: 'card'
        },
		items:[
			{
				xtype : 'toolbar',
				docked: 'top',
				items : [
					{
						border : 0,
						iconCls : 'locate',
						style: 'background:none',
						html:'Here'
					},
					{ xtype: 'spacer' },
					{
						xtype: 'searchfield',
						placeholder: '搜索'
					}
					
				]
			},
			{
				
				xtype: 'tabpanel',
				tabBarPosition : 'bottom',
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
		
		]
		
	}
});
