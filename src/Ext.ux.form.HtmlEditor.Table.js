/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.Table
 * @extends Ext.util.Observable
 * <p>A plugin that creates a button on the HtmlEditor for making simple tables.</p>
 */
Ext.ux.form.HtmlEditor.Table = Ext.extend(Ext.util.Observable, {
	// private
	cmd: 'table',
    /**
     * @cfg {Array} tableBorderOptions
     * A nested array of value/display options to present to the user for table border style. Defaults to a simple list of 5 varrying border types.
     */
	tableBorderOptions: [['none','None'],['1px solid #000','Sold Thin'],['2px solid #000','Solid Thick'],['1px dashed #000','Dashed'],['1px dotted #000','Dotted']],
	// private
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },
	// private
    onRender: function() {
        var cmp = this.cmp;
        var btn = this.cmp.getToolbar().addButton({
          iconCls: 'x-edit-table',
          handler: function() {
            var tableWindow = new Ext.Window({
                title: 'Insert Table',
                items: [{
                    itemId: 'insert-table',
                    xtype: 'form',
                    border: false,
                    plain: true,
                    bodyStyle: 'padding: 10px;',
                    labelWidth: 60,
                    labelAlign: 'right',
                    items: [{
                        xtype: 'numberfield',
                        allowBlank: false,
                        allowDecimals: false,
                        fieldLabel: 'Rows',
                        name: 'row',
                        width: 60
                    },{
                        xtype: 'numberfield',
                        allowBlank: false,
                        allowDecimals: false,
                        fieldLabel: 'Columns',
                        name: 'col',
                        width: 60
                    },{
                        xtype: 'combo',
                        fieldLabel: 'Border',
                        name: 'border',
                        forceSelection: true,
                        mode: 'local',
                        store: new Ext.data.ArrayStore({
                            autoDestroy: true,
                            fields: ['spec','val'],
                            data: this.tableBorderOptions
                        }),
                        triggerAction: 'all',
                        value: 'none',
                        displayField: 'val',
                        valueField: 'spec',
                        width: 90
                    }]
                }],
                buttons: [{
                    text: 'Insert',
                    handler: function() {
                        var frm = tableWindow.getComponent('insert-table').getForm();
                        var border = frm.findField('border').getValue();
                        if (frm.isValid()) {
                            var rowcol = [frm.findField('row').getValue(),frm.findField('col').getValue()];
                            if (rowcol.length == 2 && rowcol[0] > 0 && rowcol[0] < 10&& rowcol[1] > 0 && rowcol[1] < 10) {
                                var html = "<table style='border: "+border+";'>";
                                for (var row=0; row<rowcol[0]; row++) {
                                    html += "<tr>";
                                    for (var col=0; col<rowcol[1]; col++) {
                                        html += "<td width='20%'>"+row+"-"+col+"</td>";
                                    }
                                    html += "</tr>";
                                }
                                html += "</table>";
                                this.cmp.insertAtCursor(html);
                            }
                        }
                        tableWindow.close();
                    },
                    scope: this
                }, {
                    text: 'Cancel',
                    handler: function() {
                      tableWindow.close();
                    },
					scope: this
                }]
            }).show();
          },
          scope: this,
          tooltip: 'Insert Table'
        });
    }
});