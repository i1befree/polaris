Ext.define('Polaris.view.datasource.UploadController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.upload',

    showNext: function () {
        this.doCardNavigation(1);
    },

    showPrevious: function (btn) {
        this.doCardNavigation(-1);
    },

    doCardNavigation: function (incr) {
        var me = this.getView();
        var l = me.getLayout();
        var i = l.activeItem.id.split('upload-')[1];
        var next = parseInt(i, 10) + incr;

        l.setActiveItem(next);

        me.down('#card-prev').setDisabled(next===0);
        me.down('#card-next').setDisabled(next===2);
    },

    getFilePath: function() {
        var v = this.getView().lookupReference('uploadFile').getValue();

        Ext.Msg.alert('Selected File', v && v !== '' ? v : 'None');
    },

    uploadFile: function() {
        var form = this.getView().lookupReference('uploadLocalFileForm').getForm();

        if (form.isValid()) {
            form.submit({
                url: 'data/form/file-upload.php',
                waitMsg: 'Uploading your file...',
                success: this.uploadSuccess,
                failure: this.uploadFailure
            });
        }
    },

    uploadSuccess: function(form, action) {
        var tpl = new Ext.XTemplate(
            'File processed on the server.<br />',
            'Name: {fileName}<br />',
            'Size: {fileSize:fileSize}'
        );

        Ext.Msg.alert('Success', tpl.apply(o.result));

        this.showNext()
    },

    uploadFailure: function(form, action) {
        Ext.Msg.alert("Error", Ext.JSON.decode(this.response.responseText).message);
    }
});