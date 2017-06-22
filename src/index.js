'use strict';

var doc = document,
    iframe,
    isJump = false;

function emptyFunction() {};

function documentHidden() {
    var properties = ['hidden', 'webkitHidden', 'mozHidden'];
    for(var i=0, l=properties.length; i<l; i++) {
        if (properties[i] in doc) {
            return doc[properties[i]];
        }
    }
    return false;
}

function openURLScheme(scheme, failure, success) {
    if (!iframe) {
        iframe = doc.createElement('iframe');
        iframe.width = 0;
        iframe.height = 0
        iframe.style.position = 'fixed';
        iframe.style.top = '-10px';
        iframe.style.left = '-10px';
        window.addEventListener('blur', function() {
            isJump = true;
        });
    }

    if (iframe.parentNode) {
        return;
    }

    isJump = false;

    iframe.src = scheme;
    var body = doc.body;
    body.appendChild(iframe);

    setTimeout(function() {
        if (isJump || documentHidden()) {
            (success || emptyFunction)();
        }
        else {
            (failure || emptyFunction)();
        }
        body.removeChild(iframe);
    }, 1000);
};

window.openURLScheme = openURLScheme;

if (module) {
    module.exports = openURLScheme;
}