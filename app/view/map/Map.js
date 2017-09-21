Ext.define('app.view.Map', {
    alternateClassName: 'map',
    extend: 'here.ux.BMap',
    xtype: 'map',
    config: {
        title: '地图',
        /// <summary>
        /// 地图配置
        /// </summary>
        /// <param name="locate">是否加载定位控件</param>
        mapOptions: {
            locate: true
        },
        data: [{ lng: '116.404', lat: '39.915', name: '天安门' }, { lng: '116.1', lat: '39.915', name: '地安门' }],
        //是否监听标点的点击事件
        markerTap: true
    },
    //点击坐标处理
    onTapMarker: function (me, marker) {
        //创建信息窗口
        var infoWindow = new BMap.InfoWindow(marker.options.name);
        marker.openInfoWindow(infoWindow);
    }
});