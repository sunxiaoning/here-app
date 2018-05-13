/**
 * 内容发布第二个视图选择图片视频
 */
Ext.define('here.view.publish.ThirdView',{
    extend : 'Ext.Panel',
    xtype : 'thirdView',
    config : {
        title : '选择视频图片',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items : [
            {
                xtype : 'toolbar',
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