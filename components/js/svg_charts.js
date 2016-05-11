
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
