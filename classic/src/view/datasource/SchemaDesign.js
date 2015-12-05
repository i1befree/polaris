Ext.define('Polaris.view.datasource.CellEditing', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Polaris.model.FieldSchema'
    ],
    xtype: 'schema-design',

    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            plugins: [this.cellEditing],
            store: new Ext.data.Store({
                // destroy the store if the grid is destroyed
                autoDestroy: true,
                model: Polaris.model.FieldSchema,
                proxy: {
                    type: 'ajax',
                    // load remote data using HTTP
                    url: '/classic/resources/data/schemadesign.json',
                    // specify a XmlReader (coincides with the XML format of the returned data)
                    reader: {
                        type: 'json',
                        // records will have a 'plant' tag
                        rootProperty: 'schema'
                    }
                },
                sorters: [{
                    property: 'fieldName',
                    direction:'ASC'
                }]
            }),
            columns: [{
                header: 'Field Name',
                dataIndex: 'fieldName',
                flex: 1,
                editor: {
                    allowBlank: false
                }
            }, {
                header: 'Type',
                dataIndex: 'fieldType',
                width: 130,
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    triggerAction: 'all',
                    store: [
                        ['Timestamp','timestamp'],
                        ['String','string'],
                        ['Int','int'],
                        ['Float','float'],
                        ['Double','double']
                    ]
                })
            }, {
                xtype: 'checkcolumn',
                header: 'Use?',
                dataIndex: 'useColumn',
                width: 90,
                stopSelection: false
            }],
            selModel: {
                type: 'cellmodel'
            }
        });

        this.callParent();

        if (Ext.supports.Touch) {
            this.addDocked({
                xtype: 'header',
                title: '<b>Note that cell editing is not recommeded on keyboardless touch devices.</b>'
            });
        }

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });
    },

    loadStore: function() {
        this.getStore().load();
    }
});