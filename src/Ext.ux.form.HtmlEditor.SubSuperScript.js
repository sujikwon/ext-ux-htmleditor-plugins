/**
 * @author Shea
 */
Ext.ux.form.HtmlEditor.SubSuperScript = Ext.extend(Ext.ux.form.HtmlEditor.MidasCommand, {
    midasBtns: ['|',{
        cmd: 'subscript',
        title: 'Subscript'
    }, {
        cmd: 'superscript',
        title: 'Superscript'
    }]
});