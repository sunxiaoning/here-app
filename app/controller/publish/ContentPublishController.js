
Ext.define('here.controller.publish.ContentPublishController', {
    extend: 'Ext.app.Controller',
    requires : [],
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
            },
            submitContentButton : {
                tap : 'submitContent'
            },
            fourthViewButton : {
                tap : 'showFourthView'
            }
        },
        refs: {
            showSecondViewButton : '#showSecondViewButton',
            firstViewActionSheet : '#firstViewActionSheet',
            takePhotoButton : '#takePhotoButton',
            choosePhotoButton : '#choosePhotoButton',
            contentFormPanel : '#contentFormPanel',
            fourthViewButton : '#fourthViewButton',
            submitContentButton : '#submitContentButton',
            mainView : "#mainView"
        }
    },

    showActionSheet : function(button, e, eOpts ){
         if(window.localStorage.getItem("locationId") == null){
            Ext.Msg.alert('提示', '请先选择一个位置！', Ext.emptyFn);                
            return;
         }
         this.getFirstViewActionSheet().show();
       
    },
    takePhoto : function(){
        var me = this;
        me.getPhoto(navigator.camera.PictureSourceType.CAMERA);
       
    },
    choosePhoto : function(){
        var me = this;
        me.getPhoto(navigator.camera.PictureSourceType.PHOTOLIBRARY);
    },
    getPhoto : function(source){
        var me = this;
        me.getFirstViewActionSheet().hide();   
        navigator.camera.getPicture(function(imageUrl){
            var imagesUrl = window.localStorage.getItem("imagesUrl");
            if(imagesUrl){
                imagesUrl += ","+imagesUrl;
            }
            else {
                imagesUrl = imageUrl;
            }
            window.localStorage.setItem("imagesUrl",imagesUrl);
            var thirdView = Ext.widget("thirdView");
            Ext.ComponentQuery.query("#imagePanel")[0].setSrc(imageUrl);
            me.getMainView().push(thirdView);
        }, function(message){
            Ext.Msg.alert('提示', '选择图片失败，请重试！', Ext.emptyFn);                
        }, {
            quality: 50,
            targetWidth : 400,
            targetHeight : 500,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: source 
        });
    },
    showFourthView : function(){
        var me = this;
        var fourthView = Ext.widget("fourthView"); // 初始化fourthView

        // 获取选择的发布位置
        Ext.ComponentQuery.query("#contentFormPanel hiddenfield[name=locationId]")[0].setValue(parseInt(window.localStorage.getItem("locationId")));

        // 获取本机IP地址
        Ext.ComponentQuery.query("#contentFormPanel hiddenfield[name=publishIp]")[0].setValue(window.localStorage.getItem('hostIp'));
       

        // 跳转到内容编辑页面
        me.getMainView().push(fourthView);
        
    },
    submitContent : function(){
        var me = this;
        me.getSubmitContentButton().set('disabled',true);
        me.getContentFormPanel().submit({
            url: window.localStorage.getItem("serverUrl")+'/contentController/userPublish',
            method: 'POST',
            success : function(form, result) {  
                var imagesUrl = window.localStorage.getItem("imagesUrl");
                if(imagesUrl){
                    Ext.Array.each(imagesUrl.split(","),function(item, index, length){
                        me.uploadPhoto(item,result.contentId);
                    });
                }
                Ext.Msg.alert('提示', '发布成功！', function(){

                

                    // 清空表单值
                    me.getContentFormPanel().reset();
                    
                    // 清除缓存数据
                    window.localStorage.removeItem("locationId");
                    window.localStorage.removeItem("imagesUrl");
                    me.getSubmitContentButton().set('disabled',false);
                });                                      
            },
            failure : function(form, action) {  
                Ext.Msg.alert('提示', '发布失败，请稍后重试！', function(){
                    me.getSubmitContentButton().set('disabled',false);
                });                                
            }
        });
    },
    uploadPhoto : function(imageUrl,contentId){
        window.resolveLocalFileSystemURL(imageUrl, function success(fileEntry) {
            var win = function (r) {
                // alert("Code = " + r.responseCode+"Response = " + r.response+"Sent = " + r.bytesSent);
            }
            
            var fail = function (error) {                                           
                // alert("An error has occurred: Code = " + error.code+"upload error source " + error.source+"upload error target " + error.target);
            }
            
            var options = new FileUploadOptions();
            options.fileKey="requestMultiData";
            options.fileName = fileEntry.name;
            if(options.fileName.lastIndexOf('.')  == -1){
                options.fileName += ".jpg";
            }
            var params = {};
            params.contentId = contentId;
            options.params = params;
            var ft = new FileTransfer();
            ft.upload(imageUrl, encodeURI(window.localStorage.getItem("serverUrl")+"/contentController/uploadMultiData"), win, fail, options);
        });
    }

});