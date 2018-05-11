Ext.define('here.util.PostUtil', {

    singleton: true,

    requires: [],

    /**
     * POST 请求
     * @param url
     * @param params
     * @param callback
     * @param failure
     */
    post : function (url,params,callback,failure) {
        if(!params['timestamp']){
            params['timestamp'] = Ext.Date.format(new Date(),'Y-m-d H:i:s');
        }
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
                    return;
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
                    window.plugins.toast.showShortBottom(['服务不可用，请稍后重试！错误代码：',response.status].join(""));
                }
            }
        });
    },

    /**
     * 请求参数加签名
     * @param params
     * @param callback
     * @param failure
     */
    sign : function (params,callback,failure) {
        var me = this;
        me.post(SYSTEM_CONFIG.GET_RSA_KEY_PAIR_URL,{},function (keyPariJson) {
            var signParams = {};
            signParams['signKey'] = keyPariJson.privateKey;
            signParams['timestamp'] = Ext.Date.format(new Date(),'Y-m-d H:i:s');
            var paramsJson = params;
            paramsJson['clientRsaPublicKey'] = keyPariJson.publicKey;
            paramsJson['token'] = SYSTEM_CONFIG.TOKEN;
            paramsJson['timestamp'] = signParams['timestamp'];
            signParams['paramsJson'] = Ext.JSON.encode(paramsJson);
            me.post(SYSTEM_CONFIG.SIGN_URL,signParams,function (responseJSON) {
                var signResultParams = paramsJson;
                signResultParams['sign'] = responseJSON.sign;
                callback(signResultParams);
            },failure);
        });

    },

    /**
     * 请求参数签名并发送POST请求
     * @param url
     * @param params
     * @param callback
     * @param failure
     */
    postWithSign : function (url,params,callback,failure) {
        var me = this;
        me.sign(params,function (signResultParams) {
            me.post(url,signResultParams,callback,failure);
        },failure);
    }
});