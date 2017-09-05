Ext.define('here.view.home.HomeContainer',{
	extend: 'Ext.tab.Panel',
	xtype : 'homeContainer',
	config: {
		title : '首页',
		iconCls : 'home',
		items :[
			{
				title : '最新发布'
			},
			{
				title : '我的关注'
			},
			{
				title : '我的发布'
			}
		]
	 }
});