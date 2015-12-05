Ext.define('Polaris.view.datasource.Upload', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Card'
    ],
    xtype: 'upload',
    controller: 'upload',

    layout: 'card',
    width: '100%',
    height: '100%',
    deferredRender: true,

    bodyPadding: 15,

    defaults: {
        border:false
    },

    defaultListenerScope: true,

    bbar: ['->',
        {
            itemId: 'card-prev',
            text: '&laquo; Previous',
            handler: 'showPrevious',
            disabled: true
        },
        {
            itemId: 'card-next',
            text: 'Next &raquo;',
            handler: 'showNext'
        }
    ],

    items: [
        {
            id: 'upload-0',
            layout: 'anchor',
            bodyPadding: 10,
            style: {
                'margin-bottom': '20px'
            },

            items: [
                {
                    html: '<h2>Select file to upload...</h2>'
                },
                {
                    xtype: 'panel',
                    layout: 'form',

                    defaultType: 'radio',
                    items: [
                        {
                            checked: true,
                            fieldLabel: '',
                            boxLabel: 'File is located at your desktop.',
                            name: 'filelocation',
                            inputValue: 'local'
                        }, {
                            boxLabel: 'File is located at Hadoop file system',
                            name: 'filelocation',
                            inputValue: 'hdfs'
                        }, {
                            boxLabel: 'File is located at S3',
                            name: 'filelocation',
                            inputValue: 's3'
                        }
                    ]
                }
            ]
        },
        {
            id: 'upload-1',
            xtype: 'form',
            layout: 'anchor',
            bodyPadding: 10,
            reference: 'uploadLocalFileForm',
            style: {
                'margin-bottom': '20px'
            },
            defaults: {
                anchor: '100%',
                allowBlank: false,
                msgTarget: 'side'
            },
            items: [{
                xtype: 'component',
                html: [
                    '<h2>Select file from your file system</h2>',
                    '<p>The size of file is limited by 100MB. </p>'
                ]
            }, {
                xtype: 'filefield',
                hideLabel: true,
                reference: 'uploadFile'
            }, {
                xtype: 'button',
                text: 'Upload',
                handler: 'uploadFile'
            }]
        },
        {
            id: 'upload-2',
            layout: 'anchor',
            bodyPadding: 10,
            style: {
                'margin-bottom': '20px'
            },

            items: [
                {
                    layout: 'form',

                    items: [{
                        xtype: 'fieldset',
                        layout: 'anchor',
                        items: [{
                            xtype: 'component',
                            anchor: '100%',
                            html: [
                                '<h3>Detected format</h3>',
                                '<p>The format of your data would be one of theses</p>'
                            ]
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Selected Format',
                            itemId: 'lbSelectedFormat',
                            value: ''
                        }, {
                            xtype: 'combobox',
                            fieldLabel: 'Detected formats',
                            displayField: 'formatName',
                            valueField: 'formatId',
                            anchor: '-15',
                            forceSelection: true,
                            itemId: 'cbParser',
                            queryMode: 'local',
                            typeAhead: true,

                            store: Ext.create('Ext.data.Store',{
                                autoDestroy: true,

                                proxy: {
                                    type: 'ajax',
                                    url: '/classic/resources/data/logformat.json',
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'logformat'
                                    }
                                },
                                fields: ['formatName', 'formatId']
                            }),

                            listeners: {
                                change: function(cb, newValue, oldValue, eOpts){
                                    var selectedFormat = cb.ownerCt.getComponent('lbSelectedFormat');
                                    selectedFormat.setValue(cb.findRecordByValue(newValue).get('formatName'));
                                }
                            },
                            //Event Propagation 문제 발생.. 추적이 힘들어 진다. Controller로 변경 필요.
                            selectDefault: function(store, records, successful, operation, eOpts ){
                                if(successful && records.length > 0){
                                    this.select(store.getData().getAt(0));
                                }
                            }
                        }]
                    }]
                },
                {
                    xtype: 'file-preview',
                    url:'/classic/resources/data/preview.json',
                    border: true
                }
            ],
            listeners: {
                activate: function(panel, eOpts){
                    //TODO: 더 좋은 방법이 있는지 모르겠음. 더 찾아봐야 한다.
                    var cbs = Ext.ComponentQuery.query('combobox#cbParser');

                    if(cbs && cbs.length == 1) {
                        var cb = cbs[0];
                        cb.getStore().on('load', cb.selectDefault, cb);
                        cb.getStore().load();
                    }
                }
            }
        }
    ],

    showNext: function () {
        this.getController().showNext();
    },

    showPrevious: function (btn) {
        this.getController().showPrevious();
    },

    getFilePath: function(){
        this.getController().getFilePath();
    },

    uploadFile: function(){
        this.getController().uploadFile();
    }
});