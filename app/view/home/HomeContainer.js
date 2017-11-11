Ext.define('here.view.home.HomeContainer',{
	extend: 'Ext.tab.Panel',
	xtype : 'homeContainer',
	requires: [
		'here.view.map.ContentViewMap','here.view.home.LatestView'
	],
	config: {
		title : '首页',
		iconCls : 'home',
		items :[
			{
				xtype : 'latestView'
			}
		]
	 }
});