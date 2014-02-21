/* jshint unused:true, browser:true,  strict:true */
/* global JS:false, autolink:false */

JS.Test.describe('emojify on DOM nodes', function() {
    'use strict';

    this.before(function() {
        this.el = document.createElement("DIV");
        document.body.appendChild(this.el);
    });

    this.describe('should do what it says on the tin', function() {
        this.it('the basic test', function() {
            this.el.innerHTML = 'hello https://gitter.im world';
            autolink(this.el);
            var a = this.el.querySelectorAll('A');
            this.assertEqual(1, a.length);
            this.assertEqual('https://gitter.im', a[0].innerText);
        });

        this.it('the no http test', function() {
            this.el.innerHTML = 'hello www.gitter.im world';
            autolink(this.el);
            var a = this.el.querySelectorAll('A');
            this.assertEqual(1, a.length);
            this.assertEqual('www.gitter.im', a[0].innerText);
            this.assertEqual('http://www.gitter.im', a[0].getAttribute('href'));
        });

    });


    this.describe('xss tests', function() {
        this.it('test xss', function() {
            this.el.innerText = '\'">><marquee><img src=x onerror=confirm(1)></marquee>"></plaintext\></|\><plaintext/onmouseover=prompt(1)>"><script>alert(document.domain)</script>@gmail.com<isindex formaction=javascript:alert(/XSS/) type=submit>\'-->"></script><script>alert(1)</script>"><img/id="confirm&lpar;1&#x29;"/alt="/"src="/"onerror=eval(id&#x29;>\'"><img src="http://bryanhallsawakening.files.wordpress.com/2013/09/anonymousbigbrotherclone.jpg"/ onmousover=alert(1)><script/&Tab; src=\'https://dl.dropbox.com/u/13018058/js.js\' /&Tab;></script>  \'">><marquee><img src=x onerror=confirm(1)></marquee>"></plaintext\></|\><plaintext/onmouseover=prompt(1)>"><script>alert(document.domain)</script>@gmail.com<isindex formaction=javascript:alert(/XSS/) type=submit>\'-->"></script><script>alert(1)</script>"><img/id="confirm&lpar;1&#x29;"/alt="/"src="/"onerror=eval(id&#x29;>\'"><img src="http://xssplayground.net23.net/xssimagefile2.svg"/onmousover=alert(1)><script/&Tab; src=\'https://dl.dropbox.com/u/13018058/js.js\' /&Tab;></script>    ">><marquee><img src=x onerror=confirm(1)></marquee>"></plaintext\></|\><plaintext/onmouseover=prompt(1)>"><script>alert(document.domain)</script>@gmail.com<isindex formaction=javascript:alert(/XSS/) type=submit>\'-->"></script><script>alert(1)</script>"><img/id="confirm&lpar;1&#x29;"/alt="/"src="/"onerror=eval(id&#x29;>\'"><img src="http://xssplayground.net23.net/xssimagefile2.svg"/onmousover=alert(1)><embed/&Tab; src=\'https://xssplayground.net23.net/xss.swf\'>';
            autolink(this.el);
            var a = this.el.querySelectorAll('A');
            this.assertEqual(6, a.length);
            this.assertEqual('http://bryanhallsawakening.files.wordpress.com/2013/09/anonymousbigbrotherclone.jpg', a[0].innerText);
            this.assertEqual('https://dl.dropbox.com/u/13018058/js.js', a[1].innerText);
            this.assertEqual('http://xssplayground.net23.net/xssimagefile2.svg', a[2].innerText);
            this.assertEqual('https://dl.dropbox.com/u/13018058/js.js', a[3].innerText);
            this.assertEqual('http://xssplayground.net23.net/xssimagefile2.svg', a[4].innerText);
            this.assertEqual('https://xssplayground.net23.net/xss.swf', a[5].innerText);
        });

    });

});
