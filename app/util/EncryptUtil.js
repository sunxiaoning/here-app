/**
 * 加解密工具
 */
Ext.define('here.util.EncryptUtil', {
    singleton: true,
    requires: ['here.util.PostUtil'],

    /**
     * 加密算法
     * @param word 待加密文本
     * @param callback 加密成功后回调方法
     */
    encrypt : function(word,callback){
        var me = this;

        // 获取加密密钥
        me.getAesKey(function (aesKey) {

            // 使用aes密钥加密
            var key = CryptoJS.enc.Utf8.parse(aesKey);
            var srcs = CryptoJS.enc.Utf8.parse(word);
            var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
            if(typeof(callback) == "function" ){
                callback(encrypted.toString());
            }
        })
    },

    /**
     * 解密算法
     * @param word 待解密文本
     * @param callback 解密成功后回调方法
     */
    decrypt : function(word,callback){
        var me = this;

        // 获取加密密钥
        me.getAesKey(function (aesKey) {
            var key = CryptoJS.enc.Utf8.parse(aesKey);
            var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
            if(typeof(callback) == "function" ){
                callback(CryptoJS.enc.Utf8.stringify(decrypt).toString());
            }
        })
    },

    /**
     *  从服务端获取加密密钥并使用RSA解密密钥
     * @param keyPairJson
     * @param encryptAesKey
     */
    getAesKey : function (callback) {

        // 获取rsa公私钥对
        here.util.PostUtil.post(SYSTEM_CONFIG.GET_RSA_KEY_PAIR_URL,{},function (keyPairJson) {

            // 从服务端获取aes加密密钥并使用获取的rsa公私钥对的公钥加密后返回
            here.util.PostUtil.post(SYSTEM_CONFIG.GET_AES_KEY_URL,{
                clientRsaPublicKey : keyPairJson.publicKey
            },function (responseJSON) {

                // 使用获取到的rsa公私钥对的私钥对加密的aesKey进行还原解密
                var decrypt = new JSEncrypt();
                decrypt.setPrivateKey(keyPairJson.privateKey);
                if(typeof(callback) == "function" ){
                    callback(decrypt.decryptLong(responseJSON.aesKey));
                }
            });
        });
    }
});