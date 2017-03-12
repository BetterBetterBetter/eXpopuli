

Template.layout.onCreated(function () {




 GoogleMaps.ready('mapPage', function(map) {

  var markers = [];
  var isAnyinfoWindowOpen = false;
  var isAnyinfoWindowOpenWindow = {};
  var openInfoWindowMarker = {};
  var isInfoWindowHovered = "notHovered";

    $("#gmap_search").geocomplete({
      map: map.instance
    });


  Listings.find().forEach(function(listing){
  
   var locLat = listing.location[0];
   var locLng = listing.location[1];
   var markerPosition = getLatLngFromString(locLat, locLng);

    var contentString = "<table class=\"listing"+" ";
    contentString += listing.industry;
    contentString += "\">";
    contentString += "  <colgroup>";
    contentString += "    <col width=\"5%\"><col width=\"5%\">";
    contentString += "    <col width=\"5%\"><col width=\"5%\">";
    contentString += "    <col width=\"5%\"><col width=\"5%\">";
    contentString += "    <col width=\"5%\"><col width=\"5%\">";
    contentString += "    <col width=\"5%\"><col width=\"5%\">";
    contentString += "    <col width=\"5%\"><col width=\"5%\">";
    contentString += "    <col width=\"5%\"><col width=\"5%\">";
    contentString += "    <col width=\"5%\"><col width=\"5%\">";
    contentString += "    <col width=\"5%\"><col width=\"5%\">";
    contentString += "    <col width=\"5%\"><col width=\"5%\">";
    contentString += "  <\/colgroup>";
    contentString += "  <tr>";
    contentString += "    <th colspan=\"20\" class=\"bizName\"><a class=\"bizName\" href=\"\/profile\/"+listing.bizNameUrl+"\">"+listing.bizName+"<\/a>";
    contentString += "    <\/th>";
    contentString += "  <\/tr>";
    contentString += "  <tr>";
    contentString += "    <td colspan=\"20\" class=\"socialMission\"><div>"+listing.socialMission+" <a href=\"\/profile\/"+listing.bizNameUrl+"\" class=\"readmore\">&#xbb;<\/a><\/div><\/td>";
    contentString += "  <\/tr>";
    contentString += "<\/table>";

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

   function isInfoWindowOpen(infoWindow){
    var map = infoWindow.getMap();
    return (map !== null && typeof map !== "undefined");
   }

   var marker = new google.maps.Marker({
     position: markerPosition,
     map: map.instance,
     title: listing.bizName,
     animation: google.maps.Animation.DROP
   });



   function toggleBounce(marker) {
     if (marker.getAnimation() !== null) {
       marker.setAnimation(null);
     } else {
       marker.setAnimation(google.maps.Animation.BOUNCE);
     }
   }







   map.instance.addListener('zoom_changed', function() {
     $('.gm-style-iw').siblings().css("display", "none");
     setTimeout(function(){
      $('.gm-style-iw').siblings().css("display", "none");
     }, 1111)
    });

   ['click','touchstart'].forEach(function(e){
     marker.addListener(e,function(){


     toggleBounce(marker);

    if(isInfoWindowOpen(infowindow) && isInfoWindowHovered !== "hovered"){
     infowindow.close(); 
     isAnyinfoWindowOpen = false;
     isInfoWindowHovered = "unclicked";
     setTimeout(function(){
      isInfoWindowHovered = "notHovered";
     },2222);

    }else{

     if(isAnyinfoWindowOpen && !isInfoWindowOpen(infowindow)){
      isAnyinfoWindowOpenWindow.close();
      isAnyinfoWindowOpen = false;
      toggleBounce(openInfoWindowMarker);
     }

      infowindow.open(map, marker);
      isAnyinfoWindowOpen = true;
      isInfoWindowHovered = "clicked";
      isAnyinfoWindowOpenWindow = infowindow;
      openInfoWindowMarker = marker;


      $('.gm-style-iw').siblings().css("display", "none");

      setTimeout(function(){
        $('.socialMission > div').dotdotdot({
         after: "a.readmore"
        });
        setTimeout(function(){
          $('.socialMission > div').find('iframe').remove();
         }, 111);
       }, 111);

      }

     },false);

    });

  marker.addListener('mouseover',function(){

    if(isInfoWindowOpen(infowindow)){

    }else if(isInfoWindowHovered === "notHovered" || isInfoWindowHovered === "hovered"){

    if(isAnyinfoWindowOpen){
     isAnyinfoWindowOpenWindow.close();
     isAnyinfoWindowOpen = false;
    }


     infowindow.open(map, marker);
     isAnyinfoWindowOpen = true;
     isInfoWindowHovered = "hovered";
     isAnyinfoWindowOpenWindow = infowindow;
     openInfoWindowMarker = marker;


     $('.gm-style-iw').siblings().css("display", "none");

      setTimeout(function(){
        $('.socialMission > div').dotdotdot({
         after: "a.readmore"
        });
        setTimeout(function(){
          $('.socialMission > div').find('iframe').remove();
         }, 111);
       }, 111);
      
    }
  });
 


  marker.addListener('mouseout',function(){

    if(isInfoWindowOpen(infowindow) && isInfoWindowHovered === "hovered"){

     setTimeout(function(){
     if(isAnyinfoWindowOpen && isInfoWindowHovered === "hovered"){
      $(isAnyinfoWindowOpenWindow).addClass('o0');
     }
     }, 3000);

    setTimeout(function(){
     if(isAnyinfoWindowOpen && isInfoWindowHovered === "hovered"){
      isAnyinfoWindowOpenWindow.close();
      isAnyinfoWindowOpen = false;
      isInfoWindowHovered = "notHovered";
     }
     },3333);

    }else{

    }
  });
  


   markers.push(marker);

   GoogleMaps.maps.mapPage.markers = markers;

  });

  mcOptions = {averageCenter: true, imagePath: "http://betterbetterbetter.org/wp-content/uploads/2016/06/pinkCircle"};
   mc = new MarkerClusterer(map.instance, markers, mcOptions);



  var infoWindow = new google.maps.InfoWindow({map: map.instance});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };


      setTimeout(function(){
        var map = GoogleMaps.maps.mapPage.instance 
        map.panTo(pos);
        smoothZoom(map, 14, map.getZoom());
      }, 1111);

    });
  }








 });


});

Template.mapPage.rendered = function (){

      $('.gm-style-iw').siblings().css("display", "none");

      $(window).trigger('resize');


}


Template.mapPage.helpers({
  mapPageMapOptions: function() {

    if (GoogleMaps.loaded()) {

      return {
       backgroundColor: '#1E001E',
        center: new google.maps.LatLng(40.0202397, -105.0844522),
        zoom: 2,
        styles: mapStyle
      };
    }
  }
});







