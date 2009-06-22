/**
 * @author Shea
 */
Ext.ux.form.HtmlEditor.IndentOutdent = Ext.extend(Ext.ux.form.HtmlEditor.MidasCommand, {
    midasBtns: ['|',{
        cmd: 'indent',
        title: 'Indent Text'
    }, {
        cmd: 'outdent',
        title: 'Outdent Text'
    }]
});