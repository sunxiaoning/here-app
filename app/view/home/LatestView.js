Ext.define('here.view.home.LatestView', {
    extend: 'Ext.Panel',
	xtype: 'latestView',
	requires : [
		'Ext.SegmentedButton',
		'here.view.home.InfoListView'
	],
	config : {
			title : '最新发布',
			layout : 'card',
			items : [
				{
					xtype: 'toolbar',
					layout : 'fit',
					docked: 'top',
					items : [
						/*({
							border : 0,
							iconCls : 'locate',
							style: 'background:none',
							html:'Here'
						},*/		
						{
							xtype: 'segmentedbutton',
							id : 'toggleButton',
							centered : true,
							items: [
								{ 
									id : 'locationButton',
									text: '位置视图',
									pressed: true  
								},
								{ 
									id : 'infoButton',
									text: '信息视图'
								}
							]
						},
					]
					},
					{
						id: 'locationView',
						xtype : 'map'
					},
					{
						id: 'infoListView',
						xtype : 'infoListView',
						hidden : true
					}
			]
	
	}
});