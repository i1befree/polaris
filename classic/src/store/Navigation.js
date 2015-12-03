Ext.define('Polaris.store.Navigation', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.navigation',

    constructor: function(config) {
        var me = this,
            queryParams = Ext.Object.fromQueryString(location.search),
            charts = ('charts' in queryParams) && !/0|false|no/i.test(queryParams.charts);

        me.callParent([Ext.apply({
            root: {
                text: 'Menu',
                id: 'menu',
                expanded: true,
                children: me.getNavItems()
            }
        }, config)]);
    },

    addIconClasses: function (items) {
        for (var item, i = items.length; i-- > 0; ) {
            item = items[i];

            if (!('iconCls' in item)) {
                item.iconCls = 'icon-' + item.id;
            }

            if (!('glyph' in item)) {
                // sets the font-family
                item.glyph = '32@Sencha-Examples';
            }

            if (item.children) {
                this.addIconClasses(item.children);
            }
        }

        return items;
    },

    getNavItems: function() {
        return this.addIconClasses([
            {
                text: 'Datasource',
                id: 'datasource',
                expanded: true,
                description: 'DataSource is basic unit of data for analysing data',
                children: [
                    {
                        id: 'create-datasource',
                        text: 'Create Datasource',
                        expanded: true,
                        description: 'Create new datasource',
                        children: [
                            {id: 'upload', text: 'Upload', leaf: true},
                            {id: 'monitor', text: 'Monitor', leaf: true},
                            {id: 'database', text: 'Database', leaf: true}
                        ]
                    },
                    { id: 'list-datasources', text: 'List Datasource', leaf: true }
                ]
            },
            {
                text: 'Sheets',
                id: 'sheets',
                expanded: true,
                description:    'Sheet is basic unit of analysing data. You can analyze datasource.',
                children: [
                    { id: 'polaris-sheet/1', text: 'Sheet1', leaf: true },
                    { id: 'polaris-sheet/2', text: 'Sheet2', leaf: true }
                ]
            },
            {
                text: 'Dashboard',
                id: 'dashboard',
                expanded: true,
                description: 'View dashboard.',
                children: [
                    { id: 'first-board', text: 'First dashboard', leaf: true },
                    { id: 'second-board', text: 'Second dashboard', leaf: true }
                ]
            }
        ]);
    }
});
