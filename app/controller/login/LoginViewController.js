Ext.define('here.controller.login.LoginViewController', {
    extend: 'Ext.app.Controller',
    requires : ['here.util.EncryptUtil','here.util.PostUtil'],
    config: {
        control: {
            confirmLoginButton : {
                tap : 'confirmLogin'
            }

        },
        refs: {
            confirmLoginButton : '#confirmLoginButton'
        }
    },
    confirmLogin : function () {
        var me = this;
        var userName = Ext.ComponentQuery.query("#loginView textfield[name=userName]")[0].getValue();
        var password = Ext.ComponentQuery.query("#loginView passwordfield[name=password]")[0].getValue();
        here.util.PostUtil.post('/userController/validateUserLogin', {
                    userName: userName,
                    password: here.util.EncryptUtil.encrypt(password)
                },
                function (responseJSON) {
                    SYSTEM_CONFIG['token'] = responseJSON.token;
                    Ext.Viewport.animateActiveItem(1,'fade');
                },
                null
        );
    }

});