import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import Sortable from 'sortablejs';


modalActive = false;
bizName = '';

PATHNAME = new ReactiveVar(location.pathname);
PLACES_SEARCH = new ReactiveVar("");
OVERFLOW_SET = new ReactiveVar(false);
MARKERS = new ReactiveVar();
PROFILE = new ReactiveVar('');
KEYWORD = new ReactiveVar();
ACTIVE_KEYWORDS = new ReactiveVar([]);
CHANGED_KW = new ReactiveVar('');
KEYWORD_ASSOC = new ReactiveVar([]);


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

initSortable = function (sortableClass){
  let sortableList = $( sortableClass );
  sortableList.sortable( 'destroy' );
  sortableList.sortable();
  sortableList.sortable().off( 'sortupdate' );
  sortableList.sortable().on( 'sortupdate', function() {
    updateIndexes( '.sortable' );
  });
};

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
  var mcOptions = {averageCenter: true, imagePath: "https://betterbetterbetter.org/wp-content/uploads/2017/04/light_",
    ignoreHidden: true};
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
  
  filterMapByKW();

}

function filterMapByKW(){
  var markers = MARKERS.get();

  markers.forEach(function(marker){
    marker.setVisible(false);
    var actKWs = ACTIVE_KEYWORDS.get();
    actKWs.forEach(function(actKW){
      if(marker.keywords.includes(actKW)){
        marker.setVisible(true);
      }
    });
  });
  setTimeout(function(){
      mc.repaint();
  },111);
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
}



function kwManagerLines(){

  $('.line').remove();
  $('.preceding.item').each(function(i){
    var rect1 = $(this)[0].getBoundingClientRect();
    var xOffset1 = rect1.width/2;
    var yOffset1 = rect1.height/2;
    var x1 = rect1.left + xOffset1;
    var y1 = rect1.top + yOffset1;

    $('#currentKeyword').each(function(i){
      var rect2 = $(this)[0].getBoundingClientRect();
      var xOffset2 = rect2.width/2;
      var yOffset2 = rect2.height/2;
      var x2 = rect2.left + xOffset2;
      var y2 = rect2.top + yOffset2;
      createLine(x1,y1,x2,y2);

      $('.proceeding.item').each(function(i){
        var rect4 = $(this)[0].getBoundingClientRect();
        var xOffset4 = rect4.width/2;
        var yOffset4 = rect4.height/2;
        var x4 = rect4.left + xOffset4;
        var y4 = rect4.top + yOffset4;
        createLine(x2,y2,x4,y4);
      });

    }); 

  });
}









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
      contentString += "    <td colspan=\"20\" class=\"details\"><div> <a href=\"\/places/"+id+"\" class=\"readmore\">&#xbb;<\/a><\/div><\/td>";
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
      
      marker.placeId = id;
      marker.keywords = types;

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
          $('.details > div').dotdotdot({
           after: "a.readmore"
          });
          setTimeout(function(){
            $('.details > div').find('iframe').remove();
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
            $('.details > div').dotdotdot({
             after: "a.readmore"
            });
            setTimeout(function(){
              $('.details > div').find('iframe').remove();
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
     MARKERS.set(markers);

    mcOptions = {averageCenter: true, imagePath: "https://betterbetterbetter.org/wp-content/uploads/2017/04/light_",
    ignoreHidden: true};
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
  keywords: function(){
    return Keywords.find();
  },
  tier: function(tierNum){
    if(this.tier === tierNum){
      return true;
    }else{
      return false;
    }
  },
  inPathName: function(){

      ACTIVE_KEYWORDS.get();

      var isInPath = false;

      var activeKWs = $('#kw_tier1').val();

      if(!activeKWs){
        isInPath = true;
      }else{
        activeKWs.forEach(function(e){
          if(this===this.keyword){
            var isInPath = true;    
          }
        });
      }
//      ACTIVE_KEYWORDS.set(activeKWs);
//      debugger;
      return isInPath;
  },
  currentTemplate: function(){
    var path = Iron.Location.get().path;
    var pathClean = path.replace("/"," ");
    return pathClean;
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
        center: new google.maps.LatLng(36.53019945210711, -98.57413680000003),
        zoom: 4,
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

  /*
  if(mainOverflow&&mainDisplayed){
      return false;
    }else if(mainOverflow&&!mainDisplayed){
      return true;
    }else if(!mainOverflow&&mainDisplayed){
      return true;
    }else if(!mainOverflow&&!mainDisplayed){
      return true;
    }
  */

  return true;

  },
  showingInMain: function(){
    var mainOverflow = Template.instance().mainOverflow.get();
    var mainDisplayed = Template.instance().mainDisplayed.get();
    //console.log('mainOverflow: '+ mainOverflow);
    //console.log('mainDisplayed: '+ mainDisplayed);

/*
    if(!mainOverflow&&mainDisplayed){
      //console.log('showingInMain true');
      return true;
    }else{
      //console.log('showingInMain false');
      return false;
    }
*/

    if(mainDisplayed){
      return true;
    }else{
      return false;
    }


  }

});

Template.keywordsManager.helpers({

  keywords: function(){
    Template.instance().autorun(()=>{
      KEYWORD.get();
      Meteor.subscribe('keywords').stop();
      Meteor.subscribe('keywords');
      return Keywords.find();
    });
    return Keywords.find();
  },
  currentKeyword: function(){
    if(this._id){
      var id = this._id;
    }else if(this.params){
      var id = this.params._id
    }
    var currKW = Keywords.findOne({ _id: id });
    KEYWORD.set(currKW);
    return currKW;
  },
  currentKW: function(){
    KEYWORD.get();
    return this.keyword;
  },
  preceding: function(){
    KEYWORD.get();
    return this.preceding;
  },
  proceeding: function(){
    KEYWORD.get();
    return this.proceeding;
  },
  precedingKW: function(){
    var currPre = this.preceding;
    return Keywords.find({keyword: {"$in" : currPre} });
  },
  proceedingKW: function(){
    var currPro = this.proceeding;
    return Keywords.find({keyword: {"$in" : currPro} });
  },
  isActive: function(){
    if(KEYWORD.get()){
      var currKw = KEYWORD.get().keyword;;
    }else{
      var currKw = this.params.keyword;
    }
    if(this.keyword === currKw){
      return Spacebars.SafeString('active');
    }else{
      return '';
    }
  },
  ignore: function(){ 
    var currentKeyword = KEYWORD.get();
    var preAss = currentKeyword.preceding;
    var proAss = currentKeyword.proceeding;
    var currKW_assoc = preAss.concat(proAss);

    if(currKW_assoc.includes(this.keyword)){
      return Spacebars.SafeString('ignore');
    }else{
      if(currentKeyword.keyword===this.keyword){
        return Spacebars.SafeString('ignore');
      }else{
        return ''; 
      }
    }
  }
});

Template.urlFrame.helpers({

  urlId : function(){
    PROFILE.get();
    PATHNAME.get();

    var urlId = location.pathname.replace('/url/','');
    PROFILE.set(urlId)

    return urlId;
  }

});


Template.matchingList.helpers({

  placesSearchList: function(){
    
    PATHNAME.get();
    PLACES_SEARCH.get();
    var markers = MARKERS.get(); 

    if(markers){
      var names = [];
      var locLats = [];
      var locLngs = [];
      var printArr = [];

      $(markers).each(function(){
          names.push(this.getTitle());
          locLats.push(this.getPosition().lat());
          locLngs.push(this.getPosition().lng());

          printArr.push("<li class=\"placesLi\" data-lat=\""+this.getPosition().lat()+"\" data-lng=\""+this.getPosition().lng()+"\" data-profileName=\""+this.bizNameUrl+"\" data-placeId=\""+this.placeId+"\">"+this.getTitle()+"</li>");



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
    return Listings.findOne({ _id: currentList });
  },
  profileId: function(){
    PATHNAME.get();
    PLACES_SEARCH.get();
    PROFILE.get();

    var id = this._id;
    PROFILE.set(id);

    return id;
  } 
});

 




Template.place.helpers({

  placeDetails: function(){    

    const placeTemplate = Template.instance();

    PATHNAME.get();
    PROFILE.get();

    if(GoogleMaps.maps.mapPage !== undefined){
      var map = GoogleMaps.maps.mapPage.instance;
      var service = new google.maps.places.PlacesService(map);
      var id = location.pathname.replace('/places/','');
      placeTemplate.placeId = id;
      var req = {placeId: id}


      service.getDetails(req, function(place, status){

        console.log(place);
        //console.log(status);
        if (status === google.maps.places.PlacesServiceStatus.OK) {

          var name = place.name;
          var addr = place.formatted_address;
          var types = place.types.join(', ').replace(/_/g, ' ');
          var website = place.website;
          var loc = place.geometry.location;

          if(place.photos !== undefined){
            var vh = $(window).height();
            var imgSize = Math.trunc(vh*.33);
            var photo = place.photos[0].getUrl({'maxWidth': imgSize, 'maxHeight': imgSize});
            placeTemplate.photo.set(photo);
          }


          placeTemplate.name.set(name); 
          placeTemplate.address.set(addr);
          placeTemplate.types.set(types);
          placeTemplate.loc.set(loc);
          placeTemplate.website.set(website);

          PATHNAME.set(location.pathname);
          PROFILE.set(placeTemplate.placeId);

        }else{
          //Router.go('/');

        }



      });
    }
  },

  name: function(){
        PROFILE.get();
    return Template.instance().name.get();
  },
  address: function(){
        PROFILE.get();
    return Template.instance().address.get();
  },
  types: function(){
        PROFILE.get();
    return Template.instance().types.get();
  },
  photo: function(){  
        PROFILE.get();
    return Template.instance().photo.get();
  },
  loc: function(){
        PROFILE.get();
    return Template.instance().loc.get();
  },
  website: function(){
      PROFILE.get();  
    return Template.instance().website.get();
  },
  websiteLocal: function(){
    PROFILE.get();

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




Template.urlFrame.onCreated(function(){

  var instance = this;
  if(instance.data){
    var urlProfile = location.pathname.replace('/url/','');
    PROFILE.set(urlProfile);
  }

  instance.autorun(function(){

    var id = PROFILE.get();
    var subscription = instance.subscribe('comments', id);

    if (subscription.ready()) {
      PROFILE.set(urlProfile);
    } else {

    }

  });

});


Template.keywordsManager.onCreated(function(){
    //this.subscribe('keywords');

  var instance = this;

  instance.autorun(function(){

    var currKw = KEYWORD.get();
    var subscription = instance.subscribe('keywords');

    if (subscription.ready()) {
      var domCurrKw = $('#currentKeyword').attr('data-kw');
      var domCurrAssoc = $('#currentKeyword').attr('data-assoc');
      var domCurrAssocArr = domCurrAssoc.split(',');
      //KEYWORD.set(instance.data);
      //KEYWORD_ASSOC.set(domCurrAssocArr);
    }
  });
});



Template.place.onCreated(function () {
  this.name = new ReactiveVar( null );
  this.address = new ReactiveVar( null );
  this.loc = new ReactiveVar( null );
  this.photo = new ReactiveVar( null );
  this.types = new ReactiveVar( null );
  this.website = new ReactiveVar( null );

  var instance = this;

  instance.autorun(function(){

    PATHNAME.get();
    PROFILE.get();

    if(GoogleMaps.maps.mapPage !== undefined){
      var map = GoogleMaps.maps.mapPage.instance;
      var service = new google.maps.places.PlacesService(map);
      var id = location.pathname.replace('/places/','');
      instance.placeId = id;
      var req = {placeId: id}


      service.getDetails(req, function(place, status){

        console.log(place);
        //console.log(status);
        if (status === google.maps.places.PlacesServiceStatus.OK) {

          var name = place.name;
          var addr = place.formatted_address;
          var types = place.types.join(', ').replace(/_/g, ' ');
          var website = place.website;
          var loc = place.geometry.location;

          if(place.photo !== undefined){
            var vh = $(window).height();
            var imgSize = Math.trunc(vh*.33);
            var photo = place.photos[0].getUrl({'maxWidth': imgSize, 'maxHeight': imgSize});
            instance.photo.set(photo);
          }


          instance.name.set(name); 
          instance.address.set(addr);
          instance.types.set(types);
          instance.loc.set(loc);
          instance.website.set(website);

          PATHNAME.set(location.pathname);
          PROFILE.set(instance.placeId);

        }else{
          //Router.go('/');

        }



      });
    }
  });
});



Template.place.onRendered(function(){
  PROFILE.set(location.pathname);
});
Template.urlFrame.onRendered(function(){
  PROFILE.set(location.pathname);
  PATHNAME.set(location.pathname);
});


Template.profile.onCreated(function(){

  var instance = this;
  if(instance.data){
    PROFILE.set(instance.data._id);
  }

  instance.autorun(function(){

    var id = PROFILE.get();
    var subscription = instance.subscribe('comments', id);

    if (subscription.ready()) {

    } else {

    }

  });

});

 


Template.layout.onCreated(function () {
    this.subscribe('listings');
    this.subscribe('savedSearches');
    this.subscribe('keywords');



    this.mainOverflow = new ReactiveVar( false );
    this.mainDisplayed = new ReactiveVar( true );

/*
  var instance = this;
  instance.autorun(function(){
    ACTIVE_KEYWORDS.get();
    
    var actKWs = $('#kw_tier1').val();
    if(!actKWs){
      var actKWs = [];
      return;
    }
    
    //debugger;
    ACTIVE_KEYWORDS.set(actKWs);
  });
*/





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
    contentString += listing.keywords;
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
    contentString += "    <td colspan=\"20\" class=\"details\"><div>"+listing.details+" <a href=\"\/profile\/"+listing.bizNameUrl+"\" class=\"readmore\">&#xbb;<\/a><\/div><\/td>";
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


   marker.bizNameUrl = listing.bizNameUrl;
   marker.keywords = listing.keywords;

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
        $('.details > div').dotdotdot({
         after: "a.readmore"
        });
        setTimeout(function(){
          $('.details > div').find('iframe').remove();
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
          $('.details > div').dotdotdot({
           after: "a.readmore"
          });
          setTimeout(function(){
            $('.details > div').find('iframe').remove();
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
   MARKERS.set(markers);

  });

  mcOptions = {
    averageCenter: true, 
    imagePath: "https://betterbetterbetter.org/wp-content/uploads/2017/04/light_",
    ignoreHidden: true};
   mc = new MarkerClusterer(map.instance, markers, mcOptions);



  var infoWindow = new google.maps.InfoWindow({map: map.instance});


  setTimeout(filterMapByKW,333);













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
    var keywordsStr = document.getElementById('types').innerHTML;
    var keywords = keywordsStr.split(',');
    var locRaw = document.getElementById('location').innerHTML.replace("(","").replace(")","").replace(" ","").split(',');
    var locationLat = locRaw[0];
    var locationLng = locRaw[1];
    var location = [locationLat, locationLng];
    var website = document.getElementById('website').innerHTML;
    var details = "";
    var userId = Meteor.userId();
    var createdAt = new Date();

    //add new keywords
    keywords.forEach(function(kw_candidate){
      var allKW_db = Keywords.find();
      var isInKWs = false;
      allKW_db.forEach(function(kw){
          if (kw===kw_candidate) {
              isInKWs = true;
          }
      });
      if(!isInKWs){
        var preceding = [];
        var proceeding = []; 
        var type = 'generic';
        var userId = Meteor.userId();
        var createdAt = new Date();
        Meteor.call("addKeyword", kw_candidate, preceding, proceeding, type, userId, createdAt);
      }

    });

    Meteor.call("insertInsecure", bizName, bizNameUrl, keywords, location, website, details, userId, createdAt);

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
      
      PROFILE.set(urlAppend);

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
      const layoutTemplate = Template.instance();


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
                  PATHNAME.set(location.pathname);
              }
            }

        if(!layoutTemplate.mainDisplayed.get()){
          $('#toggle_main #open_main').trigger('click');      
        }

        Router.go('places');

        PATHNAME.set(location.pathname);

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

    window.location.reload()
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
  'click #sysTray i': function(e){
    
    if(!$(e.target).parent().hasClass('active')){
      
      $('#sysTray').find('.active').each(function(){
        $(this).removeClass('active');
      });
      
      $('.middleInput').each(function(){
        if(!$(this).hasClass('secret')){
          $(this).addClass('secret');
        }
      });

    }

    $(e.target).parent().toggleClass('active');

    var idOfToggler = e.target.getAttribute('id').replace('_i','');

    $('.'+idOfToggler).toggleClass('secret');

    const layoutTemplate = Template.instance();

    if(!layoutTemplate.mainDisplayed.get()){
      if(idOfToggler!=='urlbar'&&idOfToggler!=='gmap_loc'&&idOfToggler!=='gmap_search_cont'){
        $('#toggle_main #open_main').trigger('click');
      }      
    }


  },
  'click #back_i': function(e){

    window.history.back();

  },
  'click #AND_i': function(e){
    $("#top_kw_cont i").each(function(){
      $(this).removeClass('active');
    });
    $(e.target).addClass('active');
  },
  'click #OR_i': function(e){
    $("#top_kw_cont i").each(function(){
      $(this).removeClass('active');
    });
    $(e.target).addClass('active');

  } 
  /*
  'click #urlbar_i': function(e){

    if(!$(e.target).parent().hasClass('active')){
      $('#sysTray').children('.active').each(function(){
        $(this).removeClass('active');
      });
    }

    $(e.target).parent().toggleClass('active');

    
  }
  */


});


Template.keywordsManager.events({
//
// Change KW
  'click .allKW':function(e, template){
 
    var id = e.target.getAttribute('data-id');
    var currKW_cursor = Keywords.findOne({_id: id});
    var currentKeyword = currKW_cursor.keyword;
    var preArr = currKW_cursor.preceding;
    var proArr = currKW_cursor.proceeding;
    var combinedAssocArr = preArr.concat(proArr); 

    KEYWORD.set(currKW_cursor);
    Router.go('keywordManager', {_id: id});

    $('#allKW_cont .allKW').each(function(e){
      $(this).removeClass('active');
    });
    $(e.target).addClass('active');

  },
//
// Change KW
  'click .selectKW':function(e, template){
    var id = $(e.target).parent('.item[data-id]').attr('data-id');
    var currKW_cursor = Keywords.findOne({_id: id});
    var currentKeyword = currKW_cursor.keyword;
    var preArr = currKW_cursor.preceding;
    var proArr = currKW_cursor.proceeding;
    var combinedAssocArr = preArr.concat(proArr); 
    KEYWORD.set(currKW_cursor);

    Router.go('keywordManager', {_id: id});

    $('#allKW_cont .allKW').each(function(e){
      $(this).removeClass('active');
    });
    $(".allKW[data-id="+id+"]").addClass('active');
  },

  'click #removeKW': function(e, template){
    if(confirm("\nDelete Keyword?\n\nThere's no way to restore it.\n\nIf you just want to remove it from a path, view its precedent and remove it from there.")){
      Meteor.call('removeKeyword', this._id);
    }
  },

  'click .remove_association': function(e, template){

    var id = $(e.target).parent('.item[data-id]').attr('data-id');
    var currKwId = $('#currentKeyword').attr('data-id');
    var currentKeyword = Keywords.findOne({_id: currKwId});
    var removedAssoc = Keywords.findOne({_id: id}).keyword;
    var PreOrPro = $(e.target).parents('td').attr('id').replace('KW_cont','');

    if(confirm("\nDelete association of "+currentKeyword.keyword+" and "+removedAssoc+"?\n\nThis does not remove the keyword, only its relationship. \n\nTo remove a keyword, select it first.")){

      if(PreOrPro === 'proceeding'){
        Meteor.call('rmKeywordProc', currKwId, removedAssoc);
        Meteor.call('rmKeywordPrec', id, currentKeyword.keyword);

        currentKeyword.proceeding = currentKeyword.proceeding.filter(e => e !== removedAssoc);

        KEYWORD.set(currentKeyword);
      
      }else if(PreOrPro === 'preceding') { 
        Meteor.call('rmKeywordPrec', currKwId, removedAssoc);
        Meteor.call('rmKeywordProc', id, currentKeyword.keyword);
        
        currentKeyword.preceding = currentKeyword.preceding.filter(e => e !== removedAssoc);
      }
    }    
  },
  'click #newKeyword': function(e){
    var kw = $('#newKW_input').val();
    var preceding = [];
    var proceeding = []; 
    var type = 'generic';
    var userId = Meteor.userId();
    var createdAt = new Date();
    Meteor.call("addKeyword", kw, preceding, proceeding, type, userId, createdAt);
  }

});



Template.matchingList.events({

  'mouseover .placesLi': function(e, template){

    var lat = e.target.getAttribute("data-lat");
    var lng = e.target.getAttribute("data-lng");
    var loc = getLatLngFromString(lat, lng);
    if(parseFloat(lat)&&parseFloat(lng)){
      GoogleMaps.maps.mapPage.instance.panTo(loc);
    }
    var markers = MARKERS.get();
    var profileName = e.target.getAttribute("data-profileName");
    $(markers).each(function(){
      if(this.bizNameUrl === profileName){
        new google.maps.event.trigger( this, 'click' );
      }
    });

  },
  'click .placesLi': function(e, template){

    var lat = e.target.getAttribute("data-lat");
    var lng = e.target.getAttribute("data-lng");
    var loc = getLatLngFromString(lat, lng);

    if(parseFloat(lat)&&parseFloat(lng)){
      GoogleMaps.maps.mapPage.instance.panTo(loc);
    }

    var bizNameUrl = e.target.getAttribute("data-profileName");
    var placeID = e.target.getAttribute("data-placeId");

    if(bizNameUrl === "undefined"){
      Router.go('place', { placeId: placeID });
    }else{
      Router.go('profile', { bizNameUrl: bizNameUrl });
    }
  }

});


Template.urlFrame.events({

  'click #saveURL': function(e, template){

    var name = $('#urlName').val();
    var url = $('#urlFrame').attr('src');
    var keywords = [];
    var userId = Meteor.userId();
    var createdAt = new Date();
debugger;
    Meteor.call('addUrl', name, url, keywords, userId, createdAt);
  }

});

















Template.keywordsManager.onRendered(function(){

  $(document).ready(function(){
    
    function kw_manager(){
      if($('.selectize-control.searchbar.multi.plugin-restore_on_backspace.plugin-remove_button').length){return;}else{
        if($('#all_kw').length){
          var selectize = $('#all_kw').selectize({
            maxItems: 200,
            onChange: kwChange,
            create: false
          });
          var selectize_all_KWs = selectize[0].selectize;
          var allKW_options = selectize_all_KWs.options;
          var allKWs = $.map(allKW_options, function(value, index) {
                return [value.value]; 
            });
          selectize_all_KWs.setValue(allKWs, false);
        }
      }

      var currentKW = $('#currentKeyword').attr('data-kw');
      //KEYWORD.set(currentKW);


      var allKW_cont = document.getElementById('allKW_cont');
      var allKW_sortable = Sortable.create(allKW_cont,{
        group: { name: "allKW", pull: true, put: false },
        animation: 333, 
        filter: ".ignore",
        preventOnFilter: true,
        draggable: ".item",
        ghostClass: "sortable-ghost",
        chosenClass: "sortable-chosen",  
        dragClass: "sortable-drag", 
        dataIdAttr: 'data-sortable-id'

      });
      var precedingKW_cont = document.getElementById('precedingKW_cont');
      var preSortable = Sortable.create(precedingKW_cont,{
        group: { name: "precedingKW", pull: false, put: ["allKW"] },
        animation: 333, 
        dataIdAttr: 'data-sortable-id',
        onAdd: function(e){

          var id = $(e.item).attr('data-id');
          var currentKeyword = KEYWORD.get();
          var currentKW_id = $('#currentKeyword').attr('data-id');
          var addedAssocKW = Keywords.findOne({_id: id}).keyword;

          if(confirm("\nAdd association?\n\nShould "+addedAssocKW+" precede "+currentKeyword.keyword+"?")){

            Meteor.call('addKeywordPrec', currentKW_id, addedAssocKW);
            Meteor.call('addKeywordProc', id, currentKeyword.keyword);

            $('#keywordsManagerTable .allKW').addClass('secret').delay(333).remove();

            currentKeyword.preceding = currentKeyword.preceding.concat([addedAssocKW]);

            KEYWORD.set(currentKeyword);

          } 
          
        }
      });
      var proceedingKW_cont = document.getElementById('proceedingKW_cont');
      var proSortable = Sortable.create(proceedingKW_cont,{
        group: { name: "proceedingKW", pull: false, put: ["allKW"] },
        animation: 333, 
        dataIdAttr: 'data-sortable-id',
        onAdd: function(e){

          var id = $(e.item).attr('data-id');
          var currentKeyword = KEYWORD.get();
          var currentKW_id = $('#currentKeyword').attr('data-id');
          var addedAssocKW = Keywords.findOne({_id: id}).keyword;

          if(confirm("\nAdd association?\n\nShould "+addedAssocKW+" follow "+currentKeyword.keyword+"?")){

            Meteor.call('addKeywordProc', currentKW_id, addedAssocKW);
            Meteor.call('addKeywordPrec', id, currentKeyword.keyword);

            $('#keywordsManagerTable .allKW').addClass('secret').delay(333).remove();
            
            currentKeyword.proceeding = currentKeyword.proceeding.concat([addedAssocKW]);
            KEYWORD.set(currentKeyword);
          }  
          
        }
      });

    }

    kw_manager();

    setTimeout(kw_manager, 333);
    setTimeout(kw_manager, 999);

  });
});










Template.layout.onRendered(function(){

  $(document).ready(function(){

    function SelectiveKW(){
      if($('.selectize-control.searchbar.multi.plugin-restore_on_backspace.plugin-remove_button').length){return;}else{
        if($('#kw_tier1').length){
          $('#kw_tier1').selectize({
            maxItems: 20,
            singleOverride: true,
            tagType: "TAG_SELECT",
            onChange: kwChange,
            onItemAdd: function(value, $item) {
              var option = $('#top_kw_cont i.active').html();
              var allKWs = Keywords.find();
              var $select = $('#kw_tier1').selectize();
              var selectize = $select[0].selectize;
              allKWs.forEach( function(kw, i) {
                selectize.addOption({
                  text: kw.keyword,
                  value: kw.keyword
                });
              }); 

              var prevActKWs = ACTIVE_KEYWORDS.get();
              if(!prevActKWs){
                prevActKWs = [];
              }
              var actKWs = prevActKWs.concat([value]);

              ACTIVE_KEYWORDS.set(actKWs);

              var actKwArr = ACTIVE_KEYWORDS.get();
              var addedKW = Keywords.findOne({keyword: value });
             CHANGED_KW.set(addedKW);
             if(option==="AND"){
              allKWs.forEach( function(kw, i) {

                if(!actKwArr.includes(kw.keyword)){

                  var addedKw = CHANGED_KW.get();
                  if(!addedKw){
                    var proceeding = [];
                  }else{
                    var proceeding = addedKw.proceeding;
                  }

                  if(!proceeding.includes(kw.keyword)){
                    
                    selectize.removeOption(kw.keyword);
                    selectize.refreshOptions();
                  }
                }

              });
             }
            },
            onItemRemove: function(value){

              var option = $('#top_kw_cont i.active').html();
              var $select = $('#kw_tier1').selectize();
              var selectize = $select[0].selectize;
              var allKWs = Keywords.find(); 
              
              if(option==="AND"){
                var actKwArr = ACTIVE_KEYWORDS.get();
                var upActArr = actKwArr.filter(function(e) { return e !== value });
                ACTIVE_KEYWORDS.set(upActArr);

                var rmKw = Keywords.findOne({keyword: value });
                CHANGED_KW.set(rmKw);

                if(!upActArr.length){ 
                  allKWs.forEach( function(kw, i) {
                    //add all Kw options
                    selectize.addOption({
                        text: kw.keyword,
                        value: kw.keyword
                      });
                  });                
                }else{

                  var lastActKw = upActArr[upActArr.length-1];
                  var lastActKwCursor = Keywords.findOne({keyword: lastActKw });
                  var lastPro = lastActKwCursor.proceeding;

                  allKWs.forEach( function(kw, i) { 
                    if(!upActArr.includes(kw.keyword)){
                      selectize.addOption({
                        text: kw.keyword,
                        value: kw.keyword
                      });

                      if(!lastPro.includes(kw.keyword)){
                        selectize.removeOption(kw.keyword);
                        selectize.refreshOptions() 
                      }
                    }

                  });
                }
              }else{
                allKWs.forEach( function(kw, i) {
                  selectize.addOption({
                    text: kw.keyword,
                    value: kw.keyword
                  });
                });
                selectize.refreshOptions(); 
              }

            },
            create: function(input) {
              var preceding = [];
              var proceeding = [];
              var type = 'generic';
              var userId = Meteor.userId();
              var createdAt = new Date();
              Meteor.call("addKeyword", input, preceding, proceeding, type, userId, createdAt);
              return {
                  value: input,
                  text: input
              };
            },
            plugins: ['restore_on_backspace', 'remove_button']});



          var selectizeDataSelector = $('#saved_gmap_search').selectize({
            maxItems: 1,
            valueField: 'title',
            labelField: 'title',
            searchField: 'title',
            dropdownDirection: 'auto',
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


  });//on Ready
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
    //$('#urlFrameContainer').height(VIEW_HEIGHT);
    //$('#urlFrame').height(VIEW_HEIGHT);
  },1);


  setTimeout(function(){
    $('.details > div').dotdotdot({
     after: "a.readmore"
    });
    setTimeout(function(){
      $('.details > div').find('iframe').remove();
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









