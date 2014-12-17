colordiff.js
============

[![Build Status](https://travis-ci.org/markni/colordiff.js.svg?branch=master)](https://travis-ci.org/markni/colordiff.js)
[![Coverage Status](https://coveralls.io/repos/markni/colordiff.js/badge.png)](https://coveralls.io/r/markni/colordiff.js)

JavaScript implementation of CIEDE2000 of Delta E which measures the distance between two L*a*b* or rgb colors

Read more on : http://en.wikipedia.org/wiki/Color_difference

##Test

    npm test
    
##Usage

    Colordiff.compare({r:255,g:255,b:255},{r:255,g:255,b:255},'rgb'); // return 0;


    Colordiff.compare({L: 50, a: -1.1848, b: -84.8006}, {L: 50, a: 0, b: -82.7485});
    
    
##Licence
    
MIT
