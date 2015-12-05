Ext.define('Polaris.store.LogFormat', {
    extend: 'Ext.data.Store',

    storeId: 'logformat',
    alias: 'store.logformat',
    model: 'Polaris.model.LogFormat',

    proxy: {
        type: 'ajax',
        url: '/classic/resources/data/logformat.json',
        render: {
            type: 'json',
            rootProperty: 'logformat'
        }
    }
});