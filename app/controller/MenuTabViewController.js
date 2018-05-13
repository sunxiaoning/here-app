/**
 * 程序菜单控制器
 */
Ext.define('here.controller.MenuTabViewController', {
    extend: 'Ext.app.Controller',
    requires : [],
    config: {
        control: {

            menuTabView : {
                activeitemchange : 'menuChange'
            }
        },
        refs: {
            mainView : '#mainView',
            menuTabView : '#menuTabView'
        }
    },

    menuChange : function(menuTab, menuItem, oldValue, eOpts ){
        var me = this;

        // change Title
        var itemId = menuItem.getItemId();
        switch(itemId) {
            case 'homeMenu':
                // alert(1);
                break;
            case 'publishMenu':
                break;
            case 'myMenu':
                /*me.getMainView().push(Ext.create('here.view.login.LoginView',{
                    id : 'loginView'
                }));*/
                break;

        }
    }
});


