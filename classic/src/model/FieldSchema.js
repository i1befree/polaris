Ext.define('Polaris.model.FieldSchema', {
    extend: 'Polaris.model.Base',
    fields: [
        {name: 'fieldName', type: 'string'},
        {name: 'fieldType', type: 'string'},
        {name: 'useColumn', type: 'bool'}
    ]
});