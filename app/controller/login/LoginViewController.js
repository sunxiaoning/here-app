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
        here.util.PostUtil.post('/userController/validateUserLogin', {
                    userName: 'admin',
                    password: here.util.EncryptUtil.encrypt("123456")
                },
                function (responseJSON) {
                    Ext.Viewport.animateActiveItem(1,'fade');
                }
        );
    }

});