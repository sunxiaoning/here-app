Ext.define('here.controller.login.LoginViewController', {
    extend: 'Ext.app.Controller',
    requires : [],
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
        Ext.Viewport.animateActiveItem(1,'fade');

    }

});