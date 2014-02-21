(function (global) {

  /**
   * Autolink
   */
  function autolink(target) {
    var nodeIterator = document.createNodeIterator(target,
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
      function(node) {
          if(node.nodeType !== 1) { return NodeFilter.FILTER_ACCEPT; }

          if(node.tagName === 'A') {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_SKIP;
      }, false);

    var node;
    var nodes = [];
    while((node = nodeIterator.nextNode()) !== null) {
      /* Thank you John Gruber for the regular expression */

      var r = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>“”‘’'"]+|\(([^\s()<>“”‘’'"]+|(\([^\s()<>“”‘’'"]+\)))*\))+(?:\(([^\s()<>“”‘’'"]+|(\([^\s()<>“”‘’'"]+\)))*\)|[^\s`!()\[\]{};:.,<>?«»“”‘’'"]))/i;
      var match = r.exec(node.data);
      if(match) {
        var link = match[0];
        var a = document.createElement('a');
        a.setAttribute('target', '_new');
        a.setAttribute('rel', 'nofollow');
        a.innerText = link;

        if(/\^https?:\/\//i.test(link)) {
          a.setAttribute('href', link);
        } else {
          a.setAttribute('href', 'http://' + link);
        }

        var newNode = node.splitText(match.index);
        newNode.nodeValue = newNode.nodeValue.substr(link.length);

        node.parentNode.insertBefore(a, newNode);
        nodeIterator.nextNode();
      }
    }

  }

  global.autolink = autolink;

  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return autolink;
    });
  }

  return autolink;
})(window);





