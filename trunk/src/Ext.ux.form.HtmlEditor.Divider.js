/**
 * @author Shea
 */
Ext.ux.form.HtmlEditor.Divider = Ext.extend(Ext.util.Observable, {
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },
    onRender: function() {
        this.cmp.getToolbar().addButton([new Ext.Toolbar.Separator()]);
    }
});