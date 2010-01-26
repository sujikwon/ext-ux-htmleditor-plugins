/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.HR
 * @extends Ext.util.Observable
 * <p>A plugin that creates a button on the HtmlEditor for inserting a horizontal rule.</p>
 */
Ext.ux.form.HtmlEditor.HR = Ext.extend(Ext.util.Observable, {
    // HR language text
    langTitle   : 'Horizontal Rule',
    langHelp    : 'Enter the width of the Rule in percentage<br/> followed by the % sign at the end, or to<br/> set a fixed width ommit the % symbol.',
    langInsert  : 'Insert',
    langCancel  : 'Cancel',
    langWidth   : 'Width',
    // private
    cmd: 'hr',
    // private
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },
    // private
    onRender: function(){
        var cmp = this.cmp;
        var btn = this.cmp.getToolbar().addButton({
            iconCls: 'x-edit-hr',
            handler: function(){
                if (!this.hrWindow) {
                    this.hrWindow = new Ext.Window({
                        title: this.langTitle,
                        closeAction: 'hide',
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
                                html: this.langHelp + '<br/>&nbsp;'
                            }, {
                                xtype: 'textfield',
                                maskRe: /[0-9]|%/,
                                regex: /^[1-9][0-9%]{1,3}/,
                                fieldLabel: this.langWidth,
                                name: 'hrwidth',
                                width: 60,
                                listeners: {
                                    specialkey: function(f, e){
                                        if ((e.getKey() == e.ENTER || e.getKey() == e.RETURN) && f.isValid()) {
                                            this.doInsertHR();
                                        } else {
                                            f.getEl().frame();
                                        }
                                    },
                                    scope: this
                                }
                            }]
                        }],
                        buttons: [{
                            text: this.langInsert,
                            handler: function(){
                                var frm = this.hrWindow.getComponent('insert-hr').getForm();
                                if (frm.isValid()) {
                                    this.doInsertHR();
                                } else {
                                    frm.findField('hrwidth').getEl().frame();
                                }
                            },
                            scope: this
                        }, {
                            text: this.langCancel,
                            handler: function(){
                                this.hrWindow.hide();
                            },
                            scope: this
                        }]
                    });
                } else {
                    this.hrWindow.getEl().frame();
                }
                this.hrWindow.show();
            },
            scope: this,
            tooltip: {
                title: this.langInsert + ' ' + this.langTitle
            },
            overflowText: this.langTitle
        });
    },
    // private
    doInsertHR: function(){
        var frm = this.hrWindow.getComponent('insert-hr').getForm();
        if (frm.isValid()) {
            var hrwidth = frm.findField('hrwidth').getValue();
            if (hrwidth) {
                this.insertHR(hrwidth);
            } else {
                this.insertHR('100%');
            }
            frm.reset();
            this.hrWindow.hide();
        }
    },
    /**
     * Insert a horizontal rule into the document.
     * @param w String The width of the horizontal rule as the <tt>width</tt> attribute of the HR tag expects. ie: '100%' or '400' (pixels).
     */
    insertHR: function(w){
        this.cmp.insertAtCursor('<hr width="' + w + '">');
    }
});
