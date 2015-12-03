/**
 * Demonstrates usage of a card layout.
 */
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
            //layout: 'form',
            //defaultType: 'radio',

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
            html: '<p>Step 2 of 3</p><p>Almost there.  Please click the "Next" button to continue...</p>'
        },
        {
            id: 'upload-2',
            html: '<h1>Congratulations!</h1><p>Step 3 of 3 - Complete</p>'
        }
    ]
});