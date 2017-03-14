

Template.layout.onCreated(function () {




 GoogleMaps.ready('mapPage', function(map) {

  var markers = [];
  var isAnyinfoWindowOpen = false;
  var isAnyinfoWindowOpenWindow = {};
  var openInfoWindowMarker = {};
  var isInfoWindowHovered = "notHovered";



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

/*
  var initAutoCompleteEstab = function() {
      var map = GoogleMaps.maps.mapPage.instance;
        var autocomplete = new google.maps.places.Autocomplete(
          (document.getElementById('gmap_search')),{types: []}
        ); //address, geocode, establisment
        autocomplete.bindTo('bounds', map);
        //autocomplete.setOptions({strictBounds: true});

        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function() {
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            return;
          }

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.panTo(place.geometry.location);
            //map.setZoom(17);  
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

        });



  };

    window.onload = function() { 
      initAutoCompleteEstab();
    }
*/








/*
  GoogleMaps.ready('mapPage', function(map) {



      var map = GoogleMaps.maps.mapPage.instance;

      function initMap() {
        var pyrmont = {lat: -33.866, lng: 151.196};

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pyrmont,
          radius: 500,
          type: ['store']
        }, processResults);
      }

      function processResults(results, status, pagination) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return;
        } else {
          createMarkers(results);

          if (pagination.hasNextPage) {
            var moreButton = document.getElementById('more');

            moreButton.disabled = false;

            moreButton.addEventListener('click', function() {
              moreButton.disabled = true;
              pagination.nextPage();
            });
          }
        }
      }

      function createMarkers(places) {
        var bounds = new google.maps.LatLngBounds();
        var placesList = document.getElementById('places');

        for (var i = 0, place; place = places[i]; i++) {
          var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });

          placesList.innerHTML += '<li>' + place.name + '</li>';

          bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
      }






});


*/




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























Template.mapPage.events({

 'click #gmapbutton': function(event){

    GoogleMaps.ready('mapPage', function(map) {

      var marker;
      var currentLocation = map.instance.getCenter();
      var query = document.getElementById('gmap_search').value;
      var request = {
          location: currentLocation,
          radius: '50000',
          keyword: query
      };

        service = new google.maps.places.PlacesService(map.instance);
        service.nearbySearch(request, callback);


      function callback(results, status) {
        console.log(results);
        console.log(status);
          if (status == google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                  var place = results[i];
                  if(!place.types[0].length){
                    place.types = 0;
                  }   
                  placesAddMarker(place.geometry.location, place.name, place.types, map.instance);
              }
          }
      }

    });
  }
});











function placesAddMarker(location, name, types, map) {




  var markers = [];
  var isAnyinfoWindowOpen = false;
  var isAnyinfoWindowOpenWindow = {};
  var openInfoWindowMarker = {};
  var isInfoWindowHovered = "notHovered";









  if(types){
    var typesProcessed = types.join(" ");
  }
    var contentString = "<table class=\"listing"+" ";
    contentString += typesProcessed;
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
    contentString += "    <th colspan=\"20\" class=\"bizName\"><a class=\"bizName\" href=\"\/profile\/\">";
    contentString += name;
    contentString += "<\/a>";
    contentString += "    <\/th>";
    contentString += "  <\/tr>";
    contentString += "  <tr>";
    contentString += "    <td colspan=\"20\" class=\"socialMission\"><div> <a href=\"\/profile\/\" class=\"readmore\">&#xbb;<\/a><\/div><\/td>";
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
    position: location,
    map: map,
    title: name,
    animation: google.maps.Animation.DROP
  });



   function toggleBounce(marker) {
     if (marker.getAnimation() !== null) {
       marker.setAnimation(null);
     } else {
       marker.setAnimation(google.maps.Animation.BOUNCE);
     }
   }







   map.addListener('zoom_changed', function() {
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



  mcOptions = {averageCenter: true, imagePath: "http://betterbetterbetter.org/wp-content/uploads/2016/06/pinkCircle"};
   mc = new MarkerClusterer(map.instance, markers, mcOptions);



  var infoWindow = new google.maps.InfoWindow({map: map});






}