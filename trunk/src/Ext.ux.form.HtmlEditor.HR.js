/**
 * @author Shea
 */
Ext.ux.form.HtmlEditor.HR = Ext.extend(Ext.util.Observable, {
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },
    onRender: function() {
        var cmp = this.cmp;
        var btn = this.cmp.getToolbar().addButton({
          iconCls: 'x-edit-hr',
          handler: function() {
            this.hrWindow = new Ext.Window({
                title: 'Insert Rule',
                items: [{
                    itemId: 'insert-hr',
                    xtype: 'form',
                    border: false,
                    plain: true,
                    bodyStyle: 'padding: 10px;',
                    labelWidth: 60,
                    labelAlign: 'right',
                    items: [{
                        xtype: 'label',
                        html: 'Enter the width of the Rule in percentage<br/> followed by the % sign at the end, or to<br/> set a fixed width ommit the % symbol.<br/>&nbsp;'
                    },{
                        xtype: 'textfield',
                        maskRe: /[0-9]|%/,
                        regex: /^[1-9][0-9%]{1,3}/,
                        fieldLabel: 'Width',
                        name: 'hrwidth',
                        width: 60,
                        listeners: {
                            specialkey: function(f, e){
                                if (e.getKey() == e.ENTER || e.getKey() == e.RETURN){
                                    this.insertHR();
                                }
                            },
                            scope: this
                        }
                    }]
                }],
                buttons: [{
                    text: 'Insert',
                    handler: this.insertHR,
                    scope: this
                }, {
                    text: 'Cancel',
                    handler: function() {
                      this.hrWindow.close();
                    },
					scope: this
                }]
            }).show();
          },
          scope: this,
          tooltip: 'Insert Horizontal Rule'
        });
    },
    insertHR: function() {
        var frm = this.hrWindow.getComponent('insert-hr').getForm();
        if (frm.isValid()) {
            var hrwidth = frm.findField('hrwidth').getValue();
            if (hrwidth) {
                this.cmp.insertAtCursor('<hr width="'+hrwidth+'">');
            }else{
                this.cmp.insertAtCursor('<hr width="100%">');
            }
            this.hrWindow.close();
        }
    }
});