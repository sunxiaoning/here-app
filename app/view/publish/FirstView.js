/**
 * 内容发布第一个视图 选择你的当前位置视图
 */
Ext.define('here.view.publish.FirstView',{
    extend : 'Ext.Panel',
    requires: ['Ext.ActionSheet','here.view.map.LocationLocationMapView'],
    config : {
        title : '发布',
        iconCls : 'compose',
        layout : 'card',
        items : [
            {
                xtype : 'toolbar',
                docked : 'top',
                items : [
                    {
                        xtype :  'label',
                        html : '请选择你的位置'
                    },
                    {
                        xtype : 'spacer'
                    },
                    {
                        id : 'showSecondViewButton',
                        xtype : 'button',
                        text : '下一步'
                    }
                ]
            },
            {
                id : 'locationLocationMapView',
                xtype : 'locationLocationMapView'
            },
            {
                id: 'firstViewActionSheet',
                xtype : 'actionsheet',
                items: [
                    {
                        id : 'takePhotoButton',
                        text: '拍摄'
                    },
                    {
                        id : 'choosePhotoButton',
                        text: '从相机中选择',
                        ui  : 'confirm'
                    }
                ],
                hidden : true
            }
        ]
    }
})