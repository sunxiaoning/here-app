Ext.define('here.util.PostUtil', {

    singleton: true,

    requires: [],

    post : function (url,params,callback,failure) {
        Ext.Ajax.request({
            url: [SYSTEM_CONFIG.SERVER_URL,url].join(""),
            useDefaultXhrHeader: false,
            params: params,
            method : "POST",
            success: function(response){
                var responseJSON = Ext.JSON.decode(response.responseText, true);
                if(responseJSON.responseCode != 'SUCCESS'){
                    if(typeof(failure) == "function"){
                        failure(responseJSON);
                    }
                    else {
                        window.plugins.toast.showShortBottom(['服务不可用，请稍后重试！错误代码：',responseJSON.responseCode].join(""));
                    }
                }
                if(typeof(callback) == "function" ){
                    callback(responseJSON);
                }
            },
            failure : function(response) {
                if(typeof(failure) == "function" ){
                    failure(response);
                }
                else {
                    window.plugins.toast.showShortBottom('服务不可用，请稍后重试！错误代码：UNKNOWN');
                }
            }
        });

        postWithSign : function (url,params,callback,failure) {
            post(url,params,function(responseJSON){

            },function () {
                
            });

        }

    }
});