Ext.define('here.view.publish.ThirdView',{
    extend : 'Ext.Panel',
    xtype : 'thirdView',
    config : {
        title : '选择视频图片',
        layout : 'vbox',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items : [
            {
                xtype : 'toolbar',
                flex : 1,
                docked : 'top',
                items : [
                    {
                        xtype : 'spacer'
                    },
                    {
                        id : 'fourthViewButton',
                        xtype : 'button',
                        text : '下一步'
                    }
                ]
            },
            {
                id : 'addMorePicButton',
                ui : 'confirm',
                xtype : 'button',
                docked : 'bottom',
                text : '添加更多图片',
                flex : 1
            }
        ]
    }
})