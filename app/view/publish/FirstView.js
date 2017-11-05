Ext.define('here.view.publish.FirstView',{
    extend : 'Ext.Panel',
    requires: ['Ext.ActionSheet'],
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
                xtype : 'map',
                onTapMarker : function (me, marker) {
                    Ext.Msg.confirm("选择我的位置", "选中位置："+marker.options.name+","+marker.options.address, Ext.emptyFn);
                },
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