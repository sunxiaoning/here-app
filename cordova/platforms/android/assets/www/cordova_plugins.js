cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-baidumaplocation.baidumap_location",
        "file": "plugins/cordova-plugin-baidumaplocation/www/baidumap_location.js",
        "pluginId": "cordova-plugin-baidumaplocation",
        "clobbers": [
            "baidumap_location"
        ]
    },
    {
        "id": "cordova-plugin-network-information.network",
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "cordova-plugin-network-information.Connection",
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-baidumaplocation": "3.2.0",
    "cordova-plugin-network-information": "1.3.3"
};
// BOTTOM OF METADATA
});