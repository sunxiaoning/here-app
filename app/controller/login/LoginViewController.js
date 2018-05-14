/**
 * 用户登录控制器
 */
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

        // 加密用户密码
        here.util.EncryptUtil.encrypt(password,function (encryptedPassword) {

            // 发送登陆请求
            here.util.PostUtil.postWithSign('/userGrpcController/security/validateUserLogin', {
                    userName: userName,
                    password: encryptedPassword
                },
                function (responseJSON) {

                    // 登陆成功保存用户登陆token信息
                    SYSTEM_CONFIG['TOKEN'] = responseJSON.token;
                    Ext.Viewport.animateActiveItem(1,'fade');
                },
                function () {
                    window.plugins.toast.showShortBottom('用户名或密码错误，登录失败！');
                }
            );
        });

    }

});