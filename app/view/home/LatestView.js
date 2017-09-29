Ext.define('here.view.home.LatestView', {
    extend: 'Ext.Panel',
	xtype: 'latestView',
	requires : [
		'Ext.SegmentedButton'
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
						}
					]
					},
					{
						id: 'locationView',
						xtype : 'map'
					},
					{
						id: 'infoListView',
						xtype : 'panel',
						html : '信息视图',
						hidden : true
					}
			]
	
	}
});