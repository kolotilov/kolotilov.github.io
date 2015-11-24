function zatemnenie(){
   var docHeight = $(document).height();
   $("body").append("<div id='overlay'></div>");
   $("#overlay")
      .height(docHeight)
      .css({
         'opacity' : 0.8,
         'position': 'absolute',
         'top': 0,
         'left': 0,
         'background-color': 'black',
         'width': '100%',
         'height': '10500px',		 
         'z-index': 999		 
      });	
}

function unglass(){
   var docHeight = $(document).height();
   $("body").append("<div id='overlay'></div>");
   $("#overlay")
      .height(docHeight)
      .css({
         'opacity' : 0.4,
         'position': 'absolute',
         'top': 0,
         'left': 0,
         'background-color': 'black',
         'width': '0%',
         'z-index': 999
      });	
};