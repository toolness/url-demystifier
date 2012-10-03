// mimeparse.js
//
// This module provides basic functions for handling mime-types. It can
// handle matching mime-types against a list of media-ranges. See section
// 14.1 of the HTTP specification [RFC 2616] for a complete explanation.
//
//   http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1
//
// A port to JavaScript of Joe Gregorio's MIME-Type Parser:
//
//   http://code.google.com/p/mimeparse/
//
// Ported by J. Chris Anderson <jchris@apache.org>, targeting the Spidermonkey runtime.
//
// To run the tests, open mimeparse-js-test.html in a browser.
// Ported from version 0.1.2
// Comments are mostly excerpted from the original.

// Cut out everything except parseMimeType() and dependencies. - AV 10/2/2012

var Mimeparse = (function() {
  // private helpers
  function strip(string) {
    return string.replace(/^\s+/, '').replace(/\s+$/, '')
  };
  
  var publicMethods = {
    // Carves up a mime-type and returns an Array of the
    //  [type, subtype, params] where "params" is a Hash of all
    //  the parameters for the media range.
    //
    // For example, the media range "application/xhtml;q=0.5" would
    //  get parsed into:
    //
    // ["application", "xhtml", { "q" : "0.5" }]
    parseMimeType : function(mimeType) {
      var fullType, typeParts, params = {}, parts = mimeType.split(';');
      for (var i=0; i < parts.length; i++) {
        var p = parts[i].split('=');
        if (p.length == 2) {
          params[strip(p[0])] = strip(p[1]);
        }
      };
      fullType = parts[0].replace(/^\s+/, '').replace(/\s+$/, '');
      if (fullType == '*') fullType = '*/*';
      typeParts = fullType.split('/');
      return [typeParts[0], typeParts[1], params];
    }
  }
  return publicMethods;
})();
