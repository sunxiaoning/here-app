/**
 * 登录视图
 */
Ext.define('here.view.login.LoginView',{
    extend : 'Ext.form.Panel',
    xtype : 'loginView',
    requires: [
    ],
    config : {
        layout: {
            type: 'vbox'
        },
        defaults: {
            margin: '30 10 10 10'
        },
        items: [
            {
                xtype: 'label',
                html: '用户登录'
            },
            {
                xtype: 'textfield',
                name: 'userName',
                label: '用户名'
            },
            {
                xtype: 'passwordfield',
                name: 'password',
                label: '密码'
            },
            {
                id: 'confirmLoginButton',
                ui: 'confirm',
                xtype: 'button',
                text: '登录'
            }
        ]
    }
})