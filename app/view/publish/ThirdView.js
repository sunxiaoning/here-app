Ext.define('here.view.publish.ThirdView',{
    extend : 'Ext.Panel',
    xtype : 'thirdView',
    config : {
        title : '选择视频图片',
        layout : 'card',
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
                id : "imagePanel",
                xtype: "image",
                src: "http://placehold.it/200x200",
                width: '100%',
                height: '100%'
            }
        ]
    }
})