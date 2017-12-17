Ext.define('here.ux.PullRefreshFn', {
    extend: 'Ext.plugin.PullRefresh',
    alias: 'plugin.pullrefreshfn',
    requires: ['Ext.DateExtras'],
    xtype:'refreshFn',

    config: {
        refreshFn: null,
        pullText: '下拉可以更新',
        lastUpdatedText:"上次刷新时间",
        lastUpdatedDateFormat:"Y-m-d H:i",
        releaseText:"松开开始更新",
        loadedText:"加载完成"
    },

    fetchLatest: function() {
        if (this.getRefreshFn()) {
            this.getRefreshFn().call(this, this);
            this.setState("loaded");
            this.fireEvent('latestfetched', this, 'refreshFn, you have to handle toInsert youself');
            if (this.getAutoSnapBack()) {
                this.snapBack();
            }
        } else {
            console.log('fetchLatest')
            var store = this.getList().getStore(),
                proxy = store.getProxy(),
                operation;

            operation = Ext.create('Ext.data.Operation', {
                page: 1,
                start: 0,
                model: store.getModel(),
                limit: store.getPageSize(),
                action: 'read',
                sorters: store.getSorters(),
                filters: store.getRemoteFilter() ? store.getFilters() : []
            });

            proxy.read(operation, this.onLatestFetched, this);
        }
    },

    snapBack: function(force) {
        if(this.getState() !== "loaded" && force !== true) return;

        var that = this,
            list = this.getList(),
            scroller = list.getScrollable().getScroller(),
            currentY = scroller.minPosition.y;

        scroller.refresh();
        scroller.minPosition.y = 0;

        scroller.on({
            scrollend: this.onSnapBackEnd,
            single: true,
            scope: this
        });

        this.setIsSnappingBack(true);

        scroller.getTranslatable().translateAnimated(0, currentY, {duration: this.getSnappingAnimationDuration()});
        setTimeout(
            function () {
                scroller.scrollTo(0,1);
                scroller.scrollToTop();
            },
            that.getSnappingAnimationDuration()
        );

    }
});