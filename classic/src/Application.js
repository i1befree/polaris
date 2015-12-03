Ext.define('Polaris.Application', {
    extend: 'Ext.app.Application',
    namespace: 'Polaris',

    requires: [
        'Ext.app.*',
        'Ext.state.CookieProvider',
        'Ext.window.MessageBox',
        'Ext.tip.QuickTipManager',
        'Polaris.*',
        'Ext.chart.*'
    ],

    controllers: [
        'Global'
    ],

    init: function() {
        if ('nocss3' in Ext.Object.fromQueryString(location.search)) {
            Ext.supports.CSS3BorderRadius = false;
            Ext.getBody().addCls('x-nbr x-nlg');
        }

        Ext.create('Polaris.store.Navigation', {
            storeId: 'navigation'
        });

        // Set the default route to start the application.
        this.setDefaultToken('menu');

        Ext.setGlyphFontFamily('Pictos');
        Ext.tip.QuickTipManager.init();

        if (!Ext.platformTags.test) {
            Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        }
    },

    launch: function () {
        if (/[?&]solo\b/.test(location.search)) {
            Ext.create('Polaris.view.main.Solo');
        } else {
            Ext.create('Polaris.view.main.Main');
        }
    }
});
