Ext.define('here.util.EncryptUtil', {

    singleton: true,

    requires: [],

    encrypt : function(word){
        var key = CryptoJS.enc.Utf8.parse(SYSTEM_CONFIG.ENCRYPT_KEY);

        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
    },
    decrypt : function(word){
        var key = CryptoJS.enc.Utf8.parse(SYSTEM_CONFIG.ENCRYPT_KEY);
        var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
});