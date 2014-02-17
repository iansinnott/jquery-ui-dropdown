/*!
 * jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
 * Author: @addyosmani
 * Further changes: @peolanha
 * Licensed under the MIT license
 */

// For development i'm not going to bother with iife
// ;(function ( $, window, document, undefined ) {

    // define your widget under a namespace of your choice
    //  with additional parameters e.g. 
    // $.widget( "namespace.widgetname", (optional) - an 
    // existing widget prototype to inherit from, an object 
    // literal to become the widget's prototype ); 

    // The namespace will give us a jQuery pseudo selector: ':is-dropdown'

    $.widget( "is.filterable" , {

      //Options to be used as defaults
      options: {
        className: 'filterable'
      },

      //Setup widget (eg. element creation, apply theming
      // , bind events etc.)
      _create: function () {
        this.el = this.element
        this.$el = $(this.el)
        this.$filterEls = this.el.children()
            .addClass('ui-widget-content ' + this.options.className)
        this.$filterInput = $("<input type='text'>")
            .insertBefore( this.el )
            .wrap( "<div class='ui-widget-header "+ this.options.className+"'>")

        this._on( this.$filterEls, {
            mouseenter: "_hover",
            mouseleave: "_hover"
        })

        this._focusable( this.$filterInput )

        this._on( this.$filterInput, {
            'keyup': 'filter'
        })
        this.timeout = false
      },

      // Destroy an instantiated plugin and clean up 
      // modifications the widget has made to the DOM
      _destroy: function () {
        this.$filterInput.parent().remove()
        this.$filterEls.removeClass('ui-widget-content ui-helper-hidden ui-state-active ' + this.options.className)
        return this._super()
      },

      filter: function( event ) {
        clearTimeout( this.timeout )
        this.timeout = this._delay( function() {
            var re = new RegExp( this.$filterInput.val(), 'i' ),
                visible = this.$filterEls.filter(function() {
                    var $t = $( this ), matches = re.test( $t.text() )
                    $t.toggleClass( 'ui-helper-hidden', !matches )
                    return matches
                })
            this._trigger( 'filtered', event, {
                visible: visible
            })
        }, this.options.delay)
      },

      _hover: function( event ) {
        $(event.target).toggleClass('ui-state-active', e.type === 'mouseenter')
        this._trigger('hover', event, { hovered: $(e.target) })
      },

      // Respond to any changes the user makes to the 
      // option method
      _setOption: function ( key, value ) {
        switch (key) {
        case 'className':
          var oldClass = this.options.className
          console.log('You just set the class to: ' + value)
          this.$el.removeClass( oldClass )
          this.$el.addClass( value )
          this.options.className = value
          break;
        default:
          // this.options[ key ] = value;
          console.log('You tried to set "' + key + '" to "' + value + '". But it didn\'t work!');
          break;
        }

        // Call the super!
        this._super( "_setOption", key, value );
      }
    });

// })( jQuery, window, document );