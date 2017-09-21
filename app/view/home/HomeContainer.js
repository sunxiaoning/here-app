Ext.define('here.view.home.HomeContainer',{
	extend: 'Ext.tab.Panel',
	xtype : 'homeContainer',
	requires: [
		'here.view.map.Map'
	],
	config: {
		title : '首页',
		iconCls : 'home',
		items :[
			{
				title : '最新发布',
				layout : 'fit',
				items : [
					{
						xtype: 'toolbar',
						layout : 'fit',
						docked: 'top',
						items : [
						
							{
								xtype: 'segmentedbutton',
								centered : true,
								items: [
									{ text: '位置视图',pressed: true  },
									{ text: '信息视图'}
								],
								listeners: {
									toggle: function(container, button, pressed){
										if(pressed){
											
										}
										else {
											
										}
									}
								}
							}
						]
					 },
					 {
					 	
						 xtype : 'map'
						 
					 },
					 {
						 xtype : 'panel',
						 html : '信息视图',
						 hidden : true
					 }
				]
			}
		]
	 }
});