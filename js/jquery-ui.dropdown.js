/*!
 * jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
 * Author: @addyosmani
 * Further changes: @peolanha
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

    // The namespace will give us a jQuery pseudo selector: ':is-dropdown'
    $.widget( "is.dropdown" , {

      //Options to be used as defaults
      options: {
        className: 'dd',
        buttonTag: 'button',
        buttonClass: '',
        buttonId: 'dd-toggle',
        buttonText: 'Open Nav'
      },

      // Currently assumes it's being called on a ul
      _create: function () {
        var o = this.options

        this.el = this.element
        this.$el = $(this.el)
          .addClass( o.className )
          .hide()
        this.$toggle = $('<' + o.buttonTag + ' id="' + o.buttonId + '" class="' + o.buttonClass + '">')
          .text( o.buttonText )
          .insertBefore( this.el )

        this._on( this.$toggle, { 'click': 'toggle' })
      },

      toggle: function( event ) {
        this.$el.slideToggle()
        this._trigger('toggle', event, { el: this.el })
      },

      // Destroy an instantiated plugin and clean up 
      // modifications the widget has made to the DOM
      _destroy: function () {
        this.$el.removeClass( this.options.className ).show()
        this.$toggle.remove()
      },

      methodB: function ( event ) {
        //_trigger dispatches callbacks the plugin user 
        // can subscribe to
        // signature: _trigger( "callbackName" , [eventObject], 
        // [uiObject] )
        // eg. this._trigger( "hover", e /*where e.type == 
        // "mouseenter"*/, { hovered: $(e.target)});
        this._trigger('methodA', event, {
          key: value
        });
      },

      methodA: function ( event ) {
        this._trigger('dataChanged', event, {
          key: value
        });
      },

      // Respond to any changes the user makes to the 
      // option method
      _setOption: function ( key, value ) {

        // This doesn't seme to get the old value... 
        var oldValue = this.options[ key ]

        switch (key) {
        case "className":
          // Swap out the old class for the new
          this.$el.attr( 'class', value )
          break;
        case "buttonClass":
          this.$toggle.attr( 'class', value )
          break;
        case "buttonText":
          this.$toggle.text( value )
          break;
        case "buttonId":
          this.$toggle.attr( 'id', value )
          break;
        default:
          this.options[ key ] = value;
          break;
        }

        this._super( "_setOption", key, value );
      }
    });

})( jQuery, window, document );