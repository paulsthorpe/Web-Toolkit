(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

function initializeCharts() {
  var circle = document.getElementsByClassName('graph');

  console.log(circle);

  Array.prototype.forEach.call(circle, function(el){
    var radius = el.getAttribute('r');
    var color = el.getAttribute('data-color');
    var percentage = 100 - el.getAttribute('data-percentage');
    var totalLength = 2 * Math.PI * radius;
    var offset = totalLength * ('.' + percentage);
    $(el).css({'stroke-dasharray': totalLength, 'stroke-dashoffset': offset, 'stroke': color});
  });
}


$(document).ready(function(){
  setTimeout(function(){
    initializeCharts();
  }, 3000);
});

},{}]},{},[1])