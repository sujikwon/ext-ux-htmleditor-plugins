/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.IndentOutdent
 * @extends Ext.ux.form.HtmlEditor.MidasCommand
 * <p>A plugin that creates two buttons on the HtmlEditor for indenting and outdenting of selected text.</p>
 */
Ext.ux.form.HtmlEditor.IndentOutdent = Ext.extend(Ext.ux.form.HtmlEditor.MidasCommand, {
	// private
    midasBtns: ['|',{
        cmd: 'indent',
        title: 'Indent Text'
    }, {
        cmd: 'outdent',
        title: 'Outdent Text'
    }]
});