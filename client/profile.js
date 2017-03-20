
Template.profile.helpers({

 websitePretty: function(website){
  if(website !== undefined){
   var websitePretty = website.replace('http://','').replace('https://','').replace(/\/.*/g,'');
  }
  return websitePretty;
 }

});





Template.profile.onCreated(function() {
 var thisListing = Listings.findOne();


 GoogleMaps.ready('profileMap', function(map) {
  var thisId = document.getElementsByClassName('_id')[0].innerHTML;
  var thisListing = Listings.findOne({_id: thisId});

 });


});

Template.profile.rendered = function(){
        setTimeout(function(){
        $('main').trigger('overflow');
      }, 111)
      setTimeout(function(){
        $('main').trigger('overflow');
      }, 1111)
      setTimeout(function(){
        $('main').trigger('overflow');
      }, 2222)
  setTimeout(function(){
   $(window).trigger('resize');
  }, 3333);
  setTimeout(function(){
   $(window).trigger('resize');
  }, 10000);
  setTimeout(function(){
   $(window).trigger('resize');
  }, 20000);
}