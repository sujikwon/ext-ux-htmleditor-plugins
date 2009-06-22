/**
 * @author Shea
 */
Ext.ux.form.HtmlEditor.Word = Ext.extend(Ext.util.Observable, {
    init: function(cmp){
        
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
        
    },
    fixWordPaste: function(wordPaste) {
        
        // remove microsoft jibberish using regex jibberish
        var removals = [/MsoNormal/g, /<\\?\?xml[^>]*>/g, /<\/?o:p[^>]*>/g, /<\/?v:[^>]*>/g, /<\/?o:[^>]*>/g, /<\/?st1:[^>]*>/g, /&nbsp;/g, 
            /<\/?SPAN[^>]*>/g, /<\/?FONT[^>]*>/g, /<\/?STRONG[^>]*>/g, /<\/?H1[^>]*>/g, /<\/?H2[^>]*>/g, /<\/?H3[^>]*>/g, /<\/?H4[^>]*>/g, 
            /<\/?H5[^>]*>/g, /<\/?H6[^>]*>/g, /<\/?P[^>]*><\/P>/g, /<!--(.*)-->/g, /<!--(.*)>/g, /<!(.*)-->/g, /<\\?\?xml[^>]*>/g, 
            /<\/?o:p[^>]*>/g, /<\/?v:[^>]*>/g, /<\/?o:[^>]*>/g, /<\/?st1:[^>]*>/g, /style=\"[^\"]*\"/g, /style=\'[^\"]*\'/g, /lang=\"[^\"]*\"/g, 
            /lang=\'[^\"]*\'/g, /class=\"[^\"]*\"/g, /class=\'[^\"]*\'/g, /type=\"[^\"]*\"/g, /type=\'[^\"]*\'/g, /href=\'#[^\"]*\'/g, 
            /href=\"#[^\"]*\"/g, /name=\"[^\"]*\"/g, /name=\'[^\"]*\'/g, / clear=\"all\"/g, /id=\"[^\"]*\"/g, /title=\"[^\"]*\"/g, 
            /&nbsp;/g, /\n/g, /\r/g, /<span[^>]*>/g, /<\/?span[^>]*>/g, /class=/g];
        
        Ext.each(removals, function(s){
            wordPaste = wordPaste.replace(s, "");
        });
        
        // keep the divs in paragraphs
        wordPaste = wordPaste.replace(/<div[^>]*>/g, "<p>");
        wordPaste = wordPaste.replace(/<\/?div[^>]*>/g, "</p>");
        return wordPaste;
        
    },
    onRender: function() {
        
        this.cmp.getToolbar().add({
          iconCls: 'x-edit-wordpaste',
          handler: function() {
            var wordPaste;
            var wordPasteEditor = new Ext.form.HtmlEditor({
              width: 520,
              height: 150
            });
            var wordPasteWindow = new Ext.Window({ 
              title: "Paste text here from Microsoft Word",  
              modal: true,
              width: 537,
              height: 220,
              shadow: true,
              resizable: false,
              plain: true,
              items: wordPasteEditor,
              buttons: [{
                text: 'Insert',
                handler: function() {
                  var wordPaste = wordPasteEditor.getValue();
                  this.cmp.insertAtCursor(this.fixWordPaste(wordPaste));
                  wordPasteWindow.close();
                },
                scope: this
              }, {
                text: 'Cancel',
                handler: function() {
                  wordPasteWindow.close();
                }
              }]
            });
            wordPasteWindow.show();
          },
          scope: this,
          tooltip: '<b>Paste Microsoft Word</b><br>Copy selected text from Microsoft Word and paste in this window'
        });
    }
});