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
                layout: {
                    type: 'vbox'
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
                        maxRows : 100,
                        name: 'content',
                        label: '内容',
                        flex : 1
                    },
                    {
                        id : 'submitContentButton',
                        xtype : 'button',
                        docked : 'bottom',
                        text : '提交发布'
                    }
                    
                ]
            }
        ]
    }
})