(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])