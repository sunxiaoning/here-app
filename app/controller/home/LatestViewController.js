Ext.define('here.controller.home.LatestViewController', {
    extend: 'Ext.app.Controller',
    requires : ['here.util.LocationUtil','here.util.PostUtil'],
    config: {
        control: {
            toggleButton : {
                toggle: 'toggleView'
            },
            infoListProxy: {
                exception : "loadInfoListFail"
            },
            infoListView : {
                itemtap : "showInfoDetail"
            },
            locationInfoListView : {
                itemtap : 'showInfoDetail'
            },
            locationInfoListView : {
                show : 'reLocate'
            }
        },
        refs: {
            toggleButton : '#toggleButton',
            locationView : '#locationView',
            infoListView : '#infoListView',
            infoListProxy : "#infoListProxy",
            locationInfoListView : 'locationInfoListView',
            mainView : "#mainView"
        }
    },
    toggleView : function(segmentbutton, button, isPressed, eOpts){
        var me = this;
        if(button.getId() == 'locationButton'){
            me.getInfoListView().hide();
            me.getLocationView().show();

        }
        else {
            me.getLocationView().hide();
            me.getInfoListView().show();
            me.loadInfoList();
        }
    },
    loadInfoList : function(){
        var me = this;

        // 获取信息列表视图
        var infoListView = me.getInfoListView();
        var result = here.util.LocationUtil.getMyLocation();

        // 请求参数签名
        var params = {};
        here.util.PostUtil.sign({
            lat : result.latitude,
            lng : result.longitude
        },function (signParamsResult) {
            params = signParamsResult;
        },function () {
            window.plugins.toast.showShortBottom('信息列表加签名出错！');
        });
        infoListView.getStore().getProxy().setExtraParams(params);
        infoListView.getStore().load();
    },
    loadInfoListFail : function(infoListProxy, response, operation, eOpts ){
        Ext.toast(
            {
                message: "加载失败，请稍候重试！",
                timeout: 200,
                docked : 'top'
            }
        );
    },
    showInfoDetail : function( dataItem, index, target, record, e, eOpts ){
        var infoDetail = Ext.widget("infoDetail");
        infoDetail.getStore().getProxy().setExtraParams(
            {
                contentId : record.data.id
            }
        );
        infoDetail.getStore().load();
        this.getMainView().push(infoDetail);
    },
    reLocate : function(){
        var me = this;
        me.getLocationView().onLocate();
    }

});