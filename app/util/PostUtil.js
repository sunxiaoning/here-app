Ext.define('here.util.PostUtil', {

    singleton: true,

    requires: [],

    post : function (url,params,callback) {
        Ext.Ajax.request({
            url: [SYSTEM_CONFIG.SERVER_URL,url].join(""),
            useDefaultXhrHeader: false,
            params: params,
            method : "POST",
            success: function(response){
                var responseJSON = Ext.JSON.decode(response.responseText, true);
                if(responseJSON.responseCode != 'SUCCESS'){
                    Ext.Msg.alert('提示', ['请求',url,'参数:',params,'出错！'].join(""),Ext.emptyFn);
                }
                if(typeof(callback) == "function" ){
                    callback(responseJSON);
                }
            },
            failure : function(response) {
                Ext.Msg.alert('提示', ['请求',url,'参数:',params,'出错！'].join(""),Ext.emptyFn);

            }
        });

    }
});