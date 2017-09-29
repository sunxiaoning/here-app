Ext.define('here.controller.home.LatestViewController', {
    extend: 'Ext.app.Controller',
    config: {
        control: {
            toggleButton : {
                toggle: 'toggleView'
            }
        },
        refs: {
            toggleButton : '#toggleButton',
            locationView : '#locationView',
            infoListView : '#infoListView'
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
       
    }
});