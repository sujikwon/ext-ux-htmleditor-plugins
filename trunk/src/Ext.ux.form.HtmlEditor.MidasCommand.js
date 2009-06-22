/**
 * @author Shea
 */
Ext.ns('Ext.ux.form.HtmlEditor');

Ext.ux.form.HtmlEditor.MidasCommand = Ext.extend(Ext.util.Observable, {
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },
    onRender: function() {
        var midasCmdButtons = [];
        Ext.each(this.midasBtns,function(b){
            if (Ext.isObject(b)) {
                midasCmdButtons.push({
                    iconCls: 'x-edit-' + b.cmd,
                    handler: function(){
                        this.cmp.relayCmd(b.cmd);
                    },
                    scope: this,
                    tooltip: b.title
                });
            }else{
                midasCmdButtons.push(new Ext.Toolbar.Separator());
            }
        }, this);
        this.cmp.getToolbar().addButton(midasCmdButtons);
    }
});