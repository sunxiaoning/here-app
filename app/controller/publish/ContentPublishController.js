
Ext.define('here.controller.publish.ContentPublishController', {
    extend: 'Ext.app.Controller',
    requires : ['Ext.util.DelayedTask'],
    config: {
        control: {
            showSecondViewButton : {
                tap: 'showActionSheet'
            },
            takePhotoButton : {
                tap : 'takePhoto'
            },
            choosePhotoButton : {
                tap : 'choosePhoto'
            }
        },
        refs: {
            showSecondViewButton : '#showSecondViewButton',
            firstViewActionSheet : '#firstViewActionSheet',
            takePhotoButton : '#takePhotoButton',
            choosePhotoButton : '#choosePhotoButton'
        }
    },
    showActionSheet : function(button, e, eOpts ){
         this.getFirstViewActionSheet().show();
       
    },
    takePhoto : function(){
        this.getFirstViewActionSheet().hide();
    },
    choosePhoto : function(){
        this.getFirstViewActionSheet().hide();
    }
});