/*
 colonel_mustard by thomas mulloy
 turn body of text into specified number of columns.

 dependencies:
  jquery
*/

(function($){

 $.fn.ಠ_ಠ = function(cols, css){

  function dist(x, y){
   var d=[];
   if(x){
    if(x>=y){
     for(var i=0;i<x;i++){d.push(i<y?1:0)}
    }else if(y%x){
     var i=0;
     for(var l=0;l<y;l++){
      d[i] = d[i] ? d[i]+1 : 1;
      ++i;
      if(i>=x) i=0;
     } 
    }else{
     for(var i=0; i<x; i++){d.push(y/x)}
    }
   }
   return d;
  }

  var opts = {
   cols: cols || 1
  };

  var
   $container = this,
   $p = $('p', $container),   
   line_height = parseInt( $p.eq(0).css('line-height').replace('px', ''), 10),
   column = {
    'original':{
     'width': $container.width(),
     'height': $container.height()
    }
   },
   lines = column.original.height / line_height,
   scroll_sum = [];

  $p = $p.detach();

  $p.css({
    'margin': 0,
    'padding': 0
  });

  // calculate adjusted dimensions
  column.adjusted = {
   'width': Math.floor(column.original.width / opts.cols),
   'heights': []
  };

  // get column dimensions
  var $column = $('<div/>', {'class':'column'})
      .width(column.adjusted.width)
      .append($p.clone())
      .appendTo($container),
    new_lines = $column.height() / line_height,
    dist = dist(opts.cols, new_lines);

  $column.detach();


  // build out each new column
  $.each(dist, function(i, val){
   var $col = $('<div/>', {'class':'column'});
   column.adjusted.heights[i] = val * line_height;
   scroll_sum[i] = (scroll_sum[i-1] || 0) + column.adjusted.heights[i];

   // scale the column
   $col
    .width(column.adjusted.width)
    .height(column.adjusted.heights[i])
    .css({
     'float': 'left',
     'overflow': 'hidden'
    })
    .append($p.clone())
    .appendTo($container);

   if(i) $col.scrollTop(scroll_sum[i-1]);

  });

 };
})(jQuery);