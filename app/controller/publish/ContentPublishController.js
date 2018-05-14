/**
 * 内容发布控制器
 */
Ext.define('here.controller.publish.ContentPublishController', {
    extend: 'Ext.app.Controller',
    requires : ['here.util.PostUtil'],
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
            },
            addMorePicButton : {
                tap : 'addMorePicButton'
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
            mainView : "#mainView",
            addMorePicButton : '#addMorePicButton'
        }
    },

    addMorePicButton : function(button,e,eOpts){
        var me = this;
        var imagesUrl = window.localStorage.getItem("imagesUrl");
        if(imagesUrl.split(",").length >= 3){
            Ext.Msg.alert('提示', '最多只能添加3长图片！', Ext.emptyFn);
            return;
        }
        me.getMainView().pop();
        me.showActionSheet();
    },

    showActionSheet : function(button, e, eOpts ){
        if(window.localStorage.getItem("locationId") == null){
            Ext.Msg.alert('提示', '请先选择一个位置！', Ext.emptyFn);
            return;
        }
        var imagesUrl = window.localStorage.getItem("imagesUrl");
        if(imagesUrl && imagesUrl.split(",").length >= 3){
            var thirdView = Ext.widget("thirdView");
            Ext.Array.each(imagesUrl.split(","),function(item, index, length){
                thirdView.add({
                    xtype : 'panel',
                    html:'<div style="margin-top: 5%;margin-left: 5%"><img src="'+item+'" width="90%" height="100%"></div>'
                });
            });
            this.getMainView().push(thirdView);
        }
        else {
            this.getFirstViewActionSheet().show();
        }

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
                imagesUrl += ","+imageUrl;
            }
            else {
                imagesUrl = imageUrl;
            }
            window.localStorage.setItem("imagesUrl",imagesUrl);
            var thirdView = Ext.widget("thirdView");
            Ext.Array.each(imagesUrl.split(","),function(item, index, length){
                thirdView.add({
                    xtype : 'panel',
                    html:'<div style="margin-left: 5%"><img src="'+item+'" width="90%" height="100%"></div>'
                });
            });
            me.getMainView().push(thirdView);
        }, function(message){
            Ext.Msg.alert('提示', '选择图片失败，请重试！', Ext.emptyFn);                
        }, {
            quality: 100,
            targetWidth : 600,
            targetHeight : 800,
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
        Ext.ComponentQuery.query("#contentFormPanel hiddenfield[name=publishIp]")[0].setValue(SYSTEM_CONFIG.CLIENT_IP);

        // 跳转到内容编辑页面
        me.getMainView().push(fourthView);
        
    },
    submitContent : function(){
        var me = this;
        var formParms = {};
        formParms['topicId'] = Ext.ComponentQuery.query("#contentFormPanel hiddenfield[name=topicId]")[0].getValue();
        formParms['title'] = Ext.ComponentQuery.query("#contentFormPanel textfield[name=title]")[0].getValue();
        formParms['content'] = Ext.ComponentQuery.query("#contentFormPanel textareafield[name=content]")[0].getValue();
        formParms['userId'] = Ext.ComponentQuery.query("#contentFormPanel hiddenfield[name=userId]")[0].getValue();
        formParms['locationId'] = Ext.ComponentQuery.query("#contentFormPanel hiddenfield[name=locationId]")[0].getValue();
        formParms['publishIp'] = Ext.ComponentQuery.query("#contentFormPanel hiddenfield[name=publishIp]")[0].getValue();

        // 防止重复请求
        me.getSubmitContentButton().set('disabled',true);

        here.util.PostUtil.post('/contentGrpcController/userPublish', formParms,
            function (responseJSON) {
                if(responseJSON.responseCode != 'SUCCESS'){
                    Ext.Msg.alert('提示', '发布失败，请稍后重试！', function(){
                        me.getSubmitContentButton().set('disabled',false);
                    });
                    return;
                }

                // 上传图片附件
                var imagesUrl = window.localStorage.getItem("imagesUrl");
                if(imagesUrl){
                    Ext.Array.each(imagesUrl.split(","),function(item, index, length){
                        me.uploadPhoto(item,responseJSON.contentId);
                    });
                }

                // 发布成功后续逻辑
                Ext.Msg.alert('提示', '发布成功！', function(){

                    // 清空表单
                    Ext.ComponentQuery.query("#contentFormPanel textfield[name=title]")[0].setValue("");
                    Ext.ComponentQuery.query("#contentFormPanel textareafield[name=content]")[0].setValue("");

                    // 清除缓存数据
                    window.localStorage.removeItem("locationId");
                    window.localStorage.removeItem("imagesUrl");

                    // 恢复按钮可用状态
                    me.getSubmitContentButton().set('disabled',false);

                    // 返回上一页面
                    me.getMainView().pop(2);
                });
            },
            null
        );
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
            options.params = here.util.PostUtil.getRestApiParams(params);
            var ft = new FileTransfer();
            ft.upload(imageUrl, encodeURI([SYSTEM_CONFIG.SERVER_URL,"/contentGrpcController/uploadMultiData"].join("")), win, fail, options);
        });
    }

});