Ext.define('here.util.EncryptUtil', {

    singleton: true,

    requires: ['here.util.PostUtil'],

    encrypt : function(word,callback){
        here.util.PostUtil.post(SYSTEM_CONFIG.GET_RSA_KEY_PAIR_URL,function (keyPairJson) {
            var key = CryptoJS.enc.Utf8.parse();

            var srcs = CryptoJS.enc.Utf8.parse(word);
            var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
            callback(encrypted.toString());
        });
    },
    decrypt : function(word){
        var key = CryptoJS.enc.Utf8.parse(SYSTEM_CONFIG.ENCRYPT_KEY);
        var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
});