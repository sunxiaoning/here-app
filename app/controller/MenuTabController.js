Ext.define('here.controller.MenuTabController', {
    extend: 'Ext.app.Controller',
    requires : ['here.util.LocationUtil'],
    config: {
        control: {

            menuTabView : {
                activeitemchange : 'menuChange'
            }
        },
        refs: {

            menuTabView : '#menuTabView'
     }
    },

    menuChange : function(menuTab, value, oldValue, eOpts ){
        var me = this;
        var menuItem = value.getItemId();
        switch(menuItem) {
            case 'homeMenu':
                // alert(1);
                break;
            case 'publishMenu':
                break;
            case 'myMenu':
                // alert(3);
                break;

        }
    }
});


