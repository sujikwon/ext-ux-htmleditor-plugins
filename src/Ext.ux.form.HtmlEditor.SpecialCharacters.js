/**
 * @author Shea
 */
Ext.ux.form.HtmlEditor.SpecialCharacters = Ext.extend(Ext.util.Observable, {
	charRange: [160, 256],
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },
    onRender: function() {
        var cmp = this.cmp;
        var btn = this.cmp.getToolbar().addButton({
          iconCls: 'x-edit-char',
          handler: function() {
		  	this.specialChars = [];
		  	for (i=this.charRange[0];i<this.charRange[1];i++){
				this.specialChars.push(['&#'+i+';']);
			}
			var charStore = new Ext.data.ArrayStore({
				fields: ['char'],
				data: this.specialChars
			});
            this.charWindow = new Ext.Window({
                title: 'Insert Special Character',
				width: 436,
				autoHeight: true,
				layout: 'fit',
                items: [{
					xtype: 'dataview',
					store: charStore,
					ref: '../charView',
					autoHeight: true,
					multiSelect: true, 
					tpl: new Ext.XTemplate('<tpl for="."><div class="char-item">{char}</div></tpl><div class="x-clear"></div>'),
					overClass: 'char-over',
					itemSelector: 'div.char-item',
					listeners: {
						dblclick: function(t,i,n,e){
							this.insertChar(t.getStore().getAt(i).get('char'));
						},
						scope: this
					}
                }],
                buttons: [{
                    text: 'Insert',
                    handler: function(){
						Ext.each(this.charWindow.charView.getSelectedRecords(), function(rec){
							var c = rec.get('char');
							this.insertChar(c);
						}, this);
						this.charWindow.close();
					},
                    scope: this
                }, {
                    text: 'Cancel',
                    handler: function() {
                      this.charWindow.close();
                    },
					scope: this
                }]
            });
			this.charWindow.show();
          },
          scope: this,
          tooltip: 'Insert Special Character'
        });
    },
    insertChar: function(c) {
		if (c){
        	this.cmp.insertAtCursor(c);
            this.charWindow.close();
        }
    }
});