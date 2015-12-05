Ext.define('Polaris.view.datasource.FilePreview', {
    extend: 'Ext.grid.Panel',
    xtype: 'file-preview',

    initComponent: function() {
        var me = this;

        if (me.url == '') {
            Ext.Error.raise('url parameter is empty! You have to set proper url to get data form server.');
        }
        else {
            Ext.apply(me, {
                columns: [{
                    header: 'Field Name',
                    dataIndex: 'fieldName',
                    flex: 1
                }],
                forceFit: true,
                store: Ext.create('Ext.data.Store', {
                    autoDestroy: true,
                    // Fields have to be set as empty array. Without this Ext will not create dynamic model.
                    fields: [],
                    // After loading data grid have to reconfigure columns with dynamic created columns
                    // in Ext.ux.data.reader.DynamicReader
                    listeners: {
                        'metachange': function(store, meta) {
                            me.reconfigure(store, meta.columns);
                        }
                    },
                    autoLoad: true,
                    remoteSort: false,
                    remoteFilter: false,
                    remoteGroup: false,
                    scrollable: {
                        x : 6,
                        y : 10
                    },
                    proxy: {
                        reader: 'dynamicReader',
                        type: 'rest',
                        url: me.url
                    }
                })
            });
        }

        me.callParent(arguments);

        if (Ext.supports.Touch) {
            me.addDocked({
                xtype: 'header',
                title: '<b>Note that cell editing is not recommeded on keyboardless touch devices.</b>'
            });
        }
    }
});