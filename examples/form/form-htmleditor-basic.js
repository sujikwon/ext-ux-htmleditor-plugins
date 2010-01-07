/**
 * @author Shea
 */

Ext.onReady(function(){

    Ext.QuickTips.init();

    new Ext.FormPanel({
        title       : 'HtmlEditor Plugins Form',
        renderTo    : 'test',
        width       : 950,
        height      : 400,
        border      : false,
        frame       : true,
        items       : [{
            hideLabel       : true,
            labelSeparator  : '',
            name            : 'description',
            value           : 'The quick brown fox jumps over the fence<br/><img src="training.jpg" width="300" height="200"/>',
            anchor          : '100% 100%',
            xtype           : "htmleditor",
            plugins         : [
                new Ext.ux.form.HtmlEditor.Link(),
                new Ext.ux.form.HtmlEditor.Divider(),
                new Ext.ux.form.HtmlEditor.Word(),
                new Ext.ux.form.HtmlEditor.FindAndReplace(),
                new Ext.ux.form.HtmlEditor.Divider(),
                new Ext.ux.form.HtmlEditor.Image(),
                new Ext.ux.form.HtmlEditor.Table(),
                new Ext.ux.form.HtmlEditor.HR(),
                new Ext.ux.form.HtmlEditor.SpecialCharacters(),
                new Ext.ux.form.HtmlEditor.IndentOutdent(),
                new Ext.ux.form.HtmlEditor.SubSuperScript(),
                new Ext.ux.form.HtmlEditor.RemoveFormat(),
                new Ext.ux.form.HtmlEditor.UndoRedo()
            ]
        }],
        buttons     : [{
            text            : 'Save'
        }]
    });
    
 });