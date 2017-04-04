import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';

modalActive = false;
bizName = '';

PATHNAME = new ReactiveVar(location.pathname);
PLACES_SEARCH = new ReactiveVar("");
OVERFLOW_SET = new ReactiveVar(false);


VIEW_HEIGHT = $(window).height();


Meteor.setInterval(function(){
  $('main').trigger('overflow');
}, 4444);




Meteor.startup(function() {
 GoogleMaps.load({
  key: 'AIzaSyCcr4NUiADBaDlvymOirI_pcdEzWIkLYbg', 
  language: 'en',
  libraries: 'places'});

 reCAPTCHA.config({
     publickey: '6LeLvyITAAAAAMM578S1JsBUM_aXsTJRBUJBDVrf',
     hl: 'en' 
 });

});














//global functions
getLatLngFromString = function (lat,lng){
 return new google.maps.LatLng(parseFloat(lat), parseFloat(lng)); 
}

smoothZoom = function (map, max, cnt) {
    if (cnt >= max) {
        return;
    }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, 111); 
    }
}  


function MCSet(){
  var map = GoogleMaps.maps.mapPage.instance;
  var mcOptions = {averageCenter: true, imagePath: "http://betterbetterbetter.org/wp-content/uploads/2016/06/pinkCircle"};
  mc = new MarkerClusterer(map, markers, mcOptions);
}
function toggleBounce(marker) {
 if (marker.getAnimation() !== null) {
   marker.setAnimation(null);
 } else {
   marker.setAnimation(google.maps.Animation.BOUNCE);
 }
}



function kwChange(){
  var container = this.$wrapper;
  var items = this.items;
  var id = this.$input.attr('id');
  var idNum = parseInt(id.match(/\d+$/)[0]);
  var twoHidden = $('.kw2').hasClass('secret');
  var threeHidden = $('.kw3').hasClass('secret');

  if(this.items.length){

    if(idNum === 1){       
      if( twoHidden ){
        $('.kw2').toggleClass('secret');
      }
    }else if(idNum === 2){
     if( threeHidden ){
        $('.kw3').toggleClass('secret');
      }
    }else if(idNum === 3){

    }

  }else{
    
    if(idNum === 1){
      this.clear();       
      if( !twoHidden ){
        $('.kw2').toggleClass('secret');
      }
      if( !threeHidden ){
        $('.kw3').toggleClass('secret');
      }
    }else if(idNum === 2){
     if( !threeHidden ){
        $('.kw3').toggleClass('secret');
      }
    }else if(idNum === 3){

    }

  }
  setTimeout(kwLines, 1111);
}







function gmap_saved_search(){
  var container = this.$wrapper;
  var items = this.items;
  var id = this.$input.attr('id');
  var searchbar = $('#gmap_search');

  var eReturn = jQuery.Event("keypress");
  eReturn.which = 13; 

  if(items.length){
    searchbar.val(items[0]).trigger(eReturn);

    $('#gmapbutton').addClass('fallAndShrink');
    setTimeout(function(){
      $('#gmapbutton').removeClass('fallAndShrink');
    },667);

  }

}










function createLine(x1,y1, x2,y2){
  var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  var transform = 'rotate('+angle+'deg)';

  var line = $('<div>')
        .appendTo('body')
        .addClass('line')
        .css({
          'position': 'absolute',
          'transform': transform
        })
        .width(length)
        .offset({left: x1, top: y1});

    return line;
}




function kwLines(){

  $('.line').remove();
  $('.kw1 .item').each(function(i){
    var rect1 = $(this)[0].getBoundingClientRect();
    var xOffset1 = rect1.width/2;
    var yOffset1 = rect1.height/2;
    var x1 = rect1.left + xOffset1;
    var y1 = rect1.top + yOffset1;

    $('.kw2 .item').each(function(i){
      var rect2 = $(this)[0].getBoundingClientRect();
      var xOffset2 = rect2.width/2;
      var yOffset2 = rect2.height/2;
      var x2 = rect2.left + xOffset2;
      var y2 = rect2.top + yOffset2;
      createLine(x1,y1,x2,y2);

      $('.kw3 .item').each(function(i){
        var rect4 = $(this)[0].getBoundingClientRect();
        var xOffset4 = rect4.width/2;
        var yOffset4 = rect4.height/2;
        var x4 = rect4.left + xOffset4;
        var y4 = rect4.top + yOffset4;
        createLine(x2,y2,x4,y4);
      });

    }); 

  });

/*
  $('.kw2 .item').each(function(i){
    var rect3 = $(this)[0].getBoundingClientRect();
    var xOffset3 = rect3.width/2;
    var yOffset3 = rect3.height/2;
    var x3 = rect3.left + xOffset3;
    var y3 = rect3.top + yOffset3;

    $('.kw3 .item').each(function(i){
      var rect4 = $(this)[0].getBoundingClientRect();
      var xOffset4 = rect4.width/2;
      var yOffset4 = rect4.height/2;
      var x4 = rect4.left + xOffset4;
      var y4 = rect4.top + yOffset4;
      createLine(x3,y3,x4,y4);
    });

  });
*/
}





function placesAddMarker(location, name, id, types, icon, map) {


   var existingPoint = false;
    for(var i = 0; i < markers.length; i++) {
        if (markers[i].position.equals(location)) {
            existingPoint = true;
            break;
        }
    }

    if(!existingPoint){

    if(types){
      var typesProcessed = types.join(" ");
    }
    var placeURL = name.replace(/ /g,'-');

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
      contentString += "    <th colspan=\"20\" class=\"bizName\"><a class=\"bizName\" href=\"\/places/"+id+"\">";
      contentString += name;
      contentString += "<\/a>";
      contentString += "    <\/th>";
      contentString += "  <\/tr>";
      contentString += "  <tr>";
      contentString += "    <td colspan=\"20\" class=\"socialMission\"><div> <a href=\"\/places/"+id+"\" class=\"readmore\">&#xbb;<\/a><\/div><\/td>";
      contentString += "  <\/tr>";
      contentString += "<\/table>";




     var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

     function isInfoWindowOpen(infoWindow){
      var map = infoWindow.getMap();
      return (map !== null && typeof map !== "undefined");
     }


      var image = {
        url: icon,
        //size: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 16),
        scaledSize: new google.maps.Size(48, 48)
      };


      //create marker
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: name,
        icon: image,
        animation: google.maps.Animation.DROP
      });
      //add click listener
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

     //mouseover listener
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
     

      //mouseout listerner
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
     mc = new MarkerClusterer(map, markers, mcOptions);



    var infoWindow = new google.maps.InfoWindow({map: map});




  }//end not existing

}



















































//helpers!





Template.layout.helpers({

  listings: function(){
    return Listings.find();
  },
  savedSearches: function(){
    return SavedSearches.find();
  },

  currentURLiFramed: function(){
    if(location.pathname.includes('/url/')){
      var urlIframe = location.pathname.replace('/url/','');
      return urlIframe;
    }else{return "";}
  },
  mainOverflow: function(){
    return Template.instance().mainOverflow.get();
  },
  mapPageMapOptions: function() {

    if (GoogleMaps.loaded()) {

      return {
       backgroundColor: '#333',
        center: new google.maps.LatLng(40.0202397, -105.0844522),
        zoom: 2,
        styles: mapStyle,
        mapTypeId: 'hybrid'
      };
    }
  },
  mainDisplayed: function(){
    return Template.instance().mainDisplayed.get();
  },
  showMap: function(){
    var mainOverflow = Template.instance().mainOverflow.get();
    var mainDisplayed = Template.instance().mainDisplayed.get();

  if(mainOverflow&&mainDisplayed){
      return false;
    }else if(mainOverflow&&!mainDisplayed){
      return true;
    }else if(!mainOverflow&&mainDisplayed){
      return true;
    }else if(!mainOverflow&&!mainDisplayed){
      return true;
    }
  },
  showingInMain: function(){
    var mainOverflow = Template.instance().mainOverflow.get();
    var mainDisplayed = Template.instance().mainDisplayed.get();
    //console.log('mainOverflow: '+ mainOverflow);
    //console.log('mainDisplayed: '+ mainDisplayed);

    if(!mainOverflow&&mainDisplayed){
      //console.log('showingInMain true');
      return true;
    }else{
      //console.log('showingInMain false');
      return false;}
  }

});




Template.matchingList.helpers({

  placesSearchList: function(){
    
    PATHNAME.get();
    PLACES_SEARCH.get();

    if(GoogleMaps.maps.mapPage.markers.length){
      var names = [];
      var locLats = [];
      var locLngs = [];
      var printArr = [];

      $(GoogleMaps.maps.mapPage.markers).each(function(){
          names.push(this.getTitle());
          locLats.push(this.getPosition().lat());
          locLngs.push(this.getPosition().lng());
        
          printArr.push("<li class=\"placesLi\" data-lat=\""+this.getPosition().lat()+"\" data-lng=\""+this.getPosition().lng()+"\" >"+this.getTitle()+"</li>");



      });

      var printArrToStr = printArr.join('');

      return Spacebars.SafeString(printArrToStr);
    }else{
      return "";
    }

  }

});








Template.registerHelper('isCurrentUser', function(userId) {
  return userId === Meteor.userId();
});


Template.profile.helpers({
	listings: function(){

		return Listings.find();
	},
 findListing: function(){
    var currentList = this.params._id;
    return Listsings.findOne({ _id: currentList });
  }
});

 




Template.places.helpers({

  placeDetails: function(){    

    const placeTemplate = Template.instance();

    PATHNAME.get();


    if(GoogleMaps.maps.mapPage !== undefined){
      var map = GoogleMaps.maps.mapPage.instance;
      var service = new google.maps.places.PlacesService(map);
      var id = location.pathname.replace('/places/','');
      var req = {placeId: id}


      service.getDetails(req, function(place, status){

        console.log(place);
        //console.log(status);
        if (status === google.maps.places.PlacesServiceStatus.OK) {

          var name = place.name;
          var addr = place.formatted_address;
          var types = place.types.join(', ').replace(/_/g, ' ');
          var website = place.website;
          var location = place.geometry.location;

          if(place.photo !== undefined){
            var vh = $(window).height();
            var imgSize = Math.trunc(vh*.33);
            var photo = place.photos[0].getUrl({'maxWidth': imgSize, 'maxHeight': imgSize});
            placeTemplate.photo.set(photo);
          }


          placeTemplate.name.set(name); 
          placeTemplate.address.set(addr);
          placeTemplate.types.set(types);
          placeTemplate.location.set(location);
          placeTemplate.website.set(website);

          PATHNAME.set(location.pathname);

        }else{
          //Router.go('/');

        }



      });
    }
  },

  name: function(){
    return Template.instance().name.get();
  },
  address: function(){
    return Template.instance().address.get();
  },
  types: function(){
    return Template.instance().types.get();
  },
  photo: function(){  
    return Template.instance().photo.get();
  },
  location: function(){
    return Template.instance().location.get();
  },
  website: function(){  
    return Template.instance().website.get();
  },
  websiteLocal: function(){
    var url1 = Template.instance().website.get(); 
     if(url1 !== undefined && url1.length){  
        if(url1.includes('https://')){
            var url2 = url1.replace('https://','');
          }else if(url1.includes('http://')){
            var url2 = url1.replace('http://','');
          }else{
            var url2 = url1;
          }
          var urlAppended = "//"+location.hostname + "/url/" + url2;
          if(location.port !== 443 || location.port !== 80){
            var urlAppended = "//"+location.hostname +":"+ location.port + "/url/" + url2;
          }
        return urlAppended;
    }else{
      return "";
    }
  }

});



Template.places.onCreated(function () {
  this.name = new ReactiveVar( null );
  this.address = new ReactiveVar( null );
  this.location = new ReactiveVar( null );
  this.photo = new ReactiveVar( null );
  this.types = new ReactiveVar( null );
  this.website = new ReactiveVar( null );
});



Template.places.onRendered(function(){

/*
    const placeTemplate = Template.instance();

    placeTemplate.name.get();
    placeTemplate.address.get();
    placeTemplate.types.get();
    placeTemplate.photo.get();


    if(GoogleMaps.maps.mapPage !== undefined){
      var map = GoogleMaps.maps.mapPage.instance;
      var service = new google.maps.places.PlacesService(map);
      var id = location.pathname.replace('/places/','');
      var req = {placeId: id}


      service.getDetails(req, function(place, status){

        console.log(place);
        console.log(status);
        if (status === google.maps.places.PlacesServiceStatus.OK) {

          var name = place.name;
          var addr = place.formatted_address;
          var types = place.types.join(', ').replace(/_/g, ' ');
          var website = place.website;

          if(place.photos[0] !== undefined){
            var vh = $(window).height();
            var imgSize = Math.trunc(vh*.33);
            var photo = place.photos[0].getUrl({'maxWidth': imgSize, 'maxHeight': imgSize});
            placeTemplate.photo.set(photo);
          }


          placeTemplate.name.set(name);
          placeTemplate.address.set(addr);
          placeTemplate.types.set(types);
          
          setTimeout(function(){
            $('main').trigger('overflow');
          },1);


        }else{
          //Router.go('/');

          setTimeout(function(){
            $('main').trigger('overflow');
          },1);
        }



      });
    }
  */

});








Template.layout.onCreated(function () {
    this.subscribe('listings');
    this.subscribe('savedSearches');



    this.mainOverflow = new ReactiveVar( false );
    this.mainDisplayed = new ReactiveVar( true );




 GoogleMaps.ready('mapPage', function(map) {

   markers = [];
   isAnyinfoWindowOpen = false;
   isAnyinfoWindowOpenWindow = {};
   openInfoWindowMarker = {};
   isInfoWindowHovered = "notHovered";



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
        var map = GoogleMaps.maps.mapPage.instance;
        map.panTo(pos);
        smoothZoom(map, 14, map.getZoom());
      }, 1111);



      ///fill address bar
    geocoder = new google.maps.Geocoder();

    geocoder.geocode({'latLng': pos}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      //console.log(results)
        if (results[1]) {
            for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                    //this is the object you are looking for
                    city= results[0].address_components[i];
                    break;
                }
            }
        }

  var locationInput = document.getElementById('gmap_loc'); 
  locationInput.value =results[0].formatted_address;


        } 
      }
    });












    });
  }


 });


});













































Template.layout.events({


  'click #saveListingFromPlace': function(e, template){
        e.preventDefault();
        e.stopPropagation();
  

    var bizName = document.getElementById('name').innerHTML;
  var bizNameUrl = bizName.replace(/ /g,'-');
    var industry = document.getElementById('types').innerHTML;
    var locRaw = document.getElementById('location').innerHTML.replace("(","").replace(")","").replace(" ","").split(',');
  var locationLat = locRaw[0];
  var locationLng = locRaw[1];
  var location = [locationLat, locationLng];
    var website = document.getElementById('website').innerHTML;
  var socialMission = "";
    var userId = Meteor.userId();
    var createdAt = new Date();


    Meteor.call("insertInsecure", bizName, bizNameUrl, industry, location, website, socialMission, userId, createdAt);

    Router.go('profile', { bizNameUrl: bizNameUrl });

  },


  'click #gmapSaveButton': function(e, template){
    var searchQ = $('#gmap_search').val();
    var userId = Meteor.userId();
    var createdAt = new Date();
 
    Meteor.call("addSavedSearches", searchQ, userId, createdAt);

    //$('#saved_gmap_search').selectize().data('selectize').clearOptions();
    $('#saved_gmap_search').selectize().data('selectize').addOption([{title: searchQ}]);

    $('#gmapSaveButton').addClass('fallAndShrink');
    setTimeout(function(){
      $('#gmapSaveButton').removeClass('fallAndShrink');
    },667);

  },

  'click #urlbar_i, keypress #urlbar': function(e, template){

    if (e.which === 13) {

      var url1 = document.getElementById('urlbar').value;
      if(url1.includes('https://')){
        var url2 = url1.replace('https://','');
      }else if(url1.includes('http://')){
        var url2 = url1.replace('http://','');
      }else{
        var url2 = url1;
      }
      var urlAppend = url2;
      Router.go('/url/'+urlAppend);
      
      setTimeout(function(){
        $('main').trigger('overflow');
        OVERFLOW_SET.set('false');
      }, 111);
      setTimeout(function(){
        $('main').trigger('overflow');
        if( !$('#toggle_main').hasClass('displayed') ){

          $('#toggle_main #close_main').trigger('click');      
        }
      }, 1111);
      setTimeout(function(){
        $('main').trigger('overflow');
      }, 2222);


    }
  },


  'click #gmapbutton, keypress #gmap_search': function(e, template){

    if (e.which === 13 || e.which === 1) {

      //   prep display
      //if(Template.instance().mainDisplayed.get()){
      //  $('#toggle_main #close_main').trigger('click');      
      //}
      var map = GoogleMaps.maps.mapPage;
      var mapBounds = map.instance.getBounds();
      var marker;
      var currentLocation = map.instance.getCenter();
      var query = document.getElementById('gmap_search').value;
      var request = {
          keyword: query,
          bounds: mapBounds
      };

      PLACES_SEARCH.set(query);

      service = new google.maps.places.PlacesService(map.instance);
      service.nearbySearch(request, callback);


      function callback(results, status) {
        console.log(results);
        //console.log(status);
          if (status == google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                  var place = results[i];
                  if(!place.types[0].length){
                    place.types = 0;
                  }   
                  placesAddMarker(place.geometry.location, place.name, place.place_id, place.types, place.icon, map.instance);
              }
            }
      }
    }

    $('.gm-style-cc').remove();


  },


 'click #login-sign-in-link, click #login-name-link': function(event){
 if(!modalActive){
   modalActive = true;
   $('nav').siblings('div').css('z-index','-9999').find('*').css('z-index','-9999')  
  } else {
   modalActive = false;
   $('nav').siblings('div').css('z-index','').find('*').css('z-index','')
  }
 },

 'click .login-close-text': function(event){
 if(modalActive){
   modalActive = false;
   $('nav').siblings('div').css('z-index','').find('*').css('z-index','');
   if(window.location.href.indexOf("/map") > -1){
    window.location.reload()
   }
  }
 },


 'click a': function(e){
    var href = e.target.getAttribute('href');
    if(href.length){
      if( href.includes('profile') || href.includes('places') ){
        PATHNAME.set(location.pathname);
        if(!Template.instance().mainDisplayed.get()){
          $('#toggle_main #open_main').trigger('click');      
        }
      }
    }
    setTimeout(function(){
      $('main').trigger('overflow');
      OVERFLOW_SET.set('false');
    },1);
  },



  'overflow main': function(e){
    if(!OVERFLOW_SET.get()){
      var mainH = $('main').height();
      var articleH = $('article').height();
      var mapH = $('.map-canvas').height();
      var topOfMain = parseInt($('main').css('top').replace('px',''));
      var mainTotal = topOfMain+mainH;
      var articleTotal = topOfMain+articleH;
      var mainOverflow = ( (mainTotal>VIEW_HEIGHT)||(articleTotal>VIEW_HEIGHT) );
      if(mainOverflow){
        Template.instance().mainOverflow.set(true);
      }else{
        Template.instance().mainOverflow.set(false);
      }
      OVERFLOW_SET.set('true');
    }




  },


  'click #toggle_main .mainbutton': function(event){
    if(event.target.id === "close_main"){
      $('#toggle_main').removeClass('open');
      $('#toggle_main').addClass('closed');
      Template.instance().mainDisplayed.set(false);      
    }
    if(event.target.id === "open_main"){
      $('#toggle_main').removeClass('closed');
      $('#toggle_main').addClass('open');
      Template.instance().mainDisplayed.set(true);
    }
    $('.mainbutton').each(function(){
      $(this).toggleClass('secret')
    });

    setTimeout(function(){
      $('main').trigger('overflow');
    },1);
        setTimeout(function(){
      $('main').trigger('overflow');
      OVERFLOW_SET.set(false);
    },111);
            setTimeout(function(){
      $('main').trigger('overflow');
    },1111);

 },

 ///// Pullout toggles
  'click #gmap_loc_i': function(e){
    $(e.target).parent().toggleClass('active');
  },
  'click #urlbar_i': function(e){
    $(e.target).parent().toggleClass('active');
  }



});



Template.matchingList.events({

  'click .placesLi, mouseover .placesLi': function(e, template){

    var lat = e.target.getAttribute("data-lat");
    var lng = e.target.getAttribute("data-lng");
    var loc = getLatLngFromString(lat, lng);
    GoogleMaps.maps.mapPage.instance.panTo(loc);

  }

});












Template.layout.onRendered(function(){


  $(document).ready(function(){

    function SelectiveKW(){
      if($('.selectize-control.searchbar.multi.plugin-restore_on_backspace.plugin-remove_button').length){return;}else{
        if($('#kw_tier1').length){
          $('#kw_tier1').selectize({
            maxItems: 2,
            onChange: kwChange,
            plugins: ['restore_on_backspace', 'remove_button']});
          $('#kw_tier2').selectize({
            maxItems: 2,
            onChange: kwChange,
            plugins: ['restore_on_backspace', 'remove_button']}); 
          $('#kw_tier3').selectize({
            maxItems: 2,
            onChange: kwChange,
            plugins: ['restore_on_backspace', 'remove_button']});



          var selectizeDataSelector = $('#saved_gmap_search').selectize({
            maxItems: 1,
            valueField: 'title',
            labelField: 'title',
            searchField: 'title',
            create: false,
            onChange: gmap_saved_search,
            plugins: ['remove_button']}).data('selectize'); 

          selectizeDataSelector.clearOptions();
          SavedSearches.find().forEach(function(search){
            selectizeDataSelector.addOption([{title: search.searchQ}]);
          });


        }else{
          setTimeout(SelectiveKW,333); 
        }
        setTimeout(SelectiveKW,333); 
        }
      } 
      setTimeout(SelectiveKW,333); 
  });


});



Template.register.onRendered(function(){
 setTimeout(function(){
  $('#login-sign-in-link').click();
 }, 555);
});



Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        });
    }
});


////// Resize Time!
$(window).resize(function(){


  setTimeout(function(){
    $('main').trigger('overflow');
  },1);

  setTimeout(function(){
    $('#urlFrameContainer').height(VIEW_HEIGHT);
    $('#urlFrame').height(VIEW_HEIGHT);
  },1);


  setTimeout(function(){
    $('.socialMission > div').dotdotdot({
     after: "a.readmore"
    });
    setTimeout(function(){
      $('.socialMission > div').find('iframe').remove();
     }, 111);
   }, 111);


	if (window.location.href.indexOf("/listings") > -1){

		//Adjust for screen size
		var width = $(window).width();
		if(width>600){
			var remainderHalf = ((width%485)/2);
			var numberOfCards = ~~(width / 485);
			var margin = remainderHalf - (numberOfCards*3);
			$('#allList').css('margin-left', margin);
		} else {
			$('#allList').css('margin-left', 0);
		}


		setTimeout(function(){
			if(typeof $listingsGrid !== 'undefined'){
				$listingsGrid.isotope('layout');
			}
		}, 333);

	}

if (window.location.href.indexOf("/profile") > -1){ 
  var elements = document.getElementsByClassName('colField');
  var elementHeights = Array.prototype.map.call(elements, function(el)  {
    return el.clientHeight;
  });
  var maxHeight = Math.max.apply(null, elementHeights);
  Array.prototype.forEach.call(elements, function(el) {
    el.style.height = maxHeight + "px";
  });

  $('[href="https://froala.com/wysiwyg-editor"]').parent().remove()

	
  if (window.location.href.indexOf("edit") > -1){
    $('[href="https://froala.com/wysiwyg-editor"]').parent().remove()
  }
 }
if (window.location.href.indexOf("new") > -1){ 
 $('[href="https://froala.com/wysiwyg-editor"]').parent().remove()
  }



});











Template.layout.rendered = function (){

  GoogleMaps.ready('mapPage', function(map) {

    $('.gm-style-iw').siblings().css("display", "none");

    $(window).trigger('resize');


    //Marker Cluster check
    map.instance.addListener('zoom_changed', function(){
        MCSet();
      setTimeout(function(){

      },222);
  });

  });
}






/*

Template.urlFrame.onCreated(function(){
    var uploadStarted = false;

    function OnUploadComplete(state,message){       

       if(state == 1)
        alert("Success: "+message);     
       else
         if(state == 0 && uploadStarted)
            alert("Error:"+( message ? message : "unknow" ));
    }   
});

Template.urlFrame.onRendered(function(){

    $("#urlFrame").error(function(e){
      alert("connection error!");
    });

});

*/















