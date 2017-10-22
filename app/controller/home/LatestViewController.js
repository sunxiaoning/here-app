Ext.define('here.controller.home.LatestViewController', {
    extend: 'Ext.app.Controller',
    requires : [],
    config: {
        control: {
            toggleButton : {
                toggle: 'toggleView'
            },
            infoListProxy: {
                exception : "loadInfoListFail"
            },
            infoListView : {
                itemtap : "showInfoDetail"
            }
        },
        refs: {
            toggleButton : '#toggleButton',
            locationView : '#locationView',
            infoListView : '#infoListView',
            infoListProxy : "#infoListProxy",
            mainView : "#mainView"
        }
    },
    toggleView : function(segmentbutton, button, isPressed, eOpts){
        if(button.getId() == 'locationButton'){
            this.getLocationView().show();
            this.getInfoListView().hide();
        }
        else {
            this.getLocationView().hide();
            this.getInfoListView().show();
        }
    },
    loadInfoListFail : function(infoListProxy, response, operation, eOpts ){
        Ext.toast(
            {
                message: "加载失败，请稍候重试！",
                timeout: 200,
                docked : 'top'
            }
        );
    },
    showInfoDetail : function( dataItem, index, target, record, e, eOpts ){
        var infoDetail = Ext.widget("infoDetail");
        this.getMainView().push(infoDetail);
    }
});