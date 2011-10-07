/*
 colonel_mustard by thomas mulloy
 turn body of text into specified number of columns.

 dependencies:
  jquery
*/

(function($){

 $.fn.ಠ_ಠ = function(options){

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
   cols: options.columns || 0
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
   lines = column.original.height / line_height;

  $p = $p.detach();

  // calculate adjusted dimensions
  column.adjusted = {
   'width': column.original.width / opts.cols,
   'heights': []
  };

  // get column dimensions
  var $column = $('<div/>', {'class':'column'});

   $column
    .width(column.adjusted.width)
    .append($p.clone())
    .appendTo($container);

  var new_lines = $column.height() / line_height;

  $column.detach();

  // get distribution
  var dist = dist(opts.cols, new_lines);
  var scroll_sum = [];

  // build out each new column
  $.each(dist, function(i, val){

   column.adjusted.heights[i] = val * line_height;

   scroll_sum[i] = (scroll_sum[i-1] || 0) + column.adjusted.heights[i];

   // scale the column
   var $col = $('<div/>', {'class':'column'});
   
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