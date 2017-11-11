Ext.define('here.view.publish.FourthView',{
    extend : 'Ext.Panel',
    xtype : 'fourthView',
    config : {
        title : '提交发布内容',
        layout : 'card',
        items : [
            {
                id : "contentFormPanel",
                xtype: "formpanel",
                config : {
                  style : 'padding : 5px'
                },
                items : [
                    {
                        xtype : 'hiddenfield',
                        name : 'userId',
                        value : 1
                    },
                    {
                        xtype : 'hiddenfield',
                        name : 'topicId',
                        value : 1
                    },
                    {
                        xtype : 'hiddenfield',
                        name : 'locationId'
                    },
                    {
                        xtype : 'hiddenfield',
                        name : 'publishIp'
                    },
                    {
                        xtype: 'textfield',
                        name: 'title',
                        label: '标题'
                    },
                    {
                        xtype: 'textareafield',
                        config : {
                            maxRows : 20
                        },
                        name: 'content',
                        label: '内容'
                    },
                    {
                        id : 'submitContentButton',
                        xtype : 'button',
                        text : '提交发布'
                    }
                    
                ]
            }
        ]
    }
})