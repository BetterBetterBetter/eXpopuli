import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';

modalActive = false;
bizName = '';


Meteor.startup(function() {
 GoogleMaps.load({key: 'AIzaSyCcr4NUiADBaDlvymOirI_pcdEzWIkLYbg', libraries: 'places'});

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
        setTimeout(function(){map.setZoom(cnt)}, 333); 
    }
}  

//helpers!

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


Template.updateListing.helpers({
 listings: function(){
  return Listings.find();
 },
 findListing: function(){
    var currentListing = this.bizName;
    return Listings.find()
  },
  socialMissionUpdate: function(){
   var html = this.socialMission;
   return html;
  }
});








//On Created
//template subscriptions!
Template.profile.onCreated(function () {
    this.subscribe('listings');
});
Template.createListing.onCreated(function () {
    this.subscribe('listings');
});
Template.layout.onCreated(function () {
    this.subscribe('listings');
});
Template.updateListing.onCreated(function () {
     this.subscribe('listings');
  this.autorun(function() {
    if (Template.instance().subscriptionsReady()) {
      var thisId = document.getElementsByClassName('_id')[0].innerHTML;
      var thisListing = Listings.findOne({_id: thisId});
      var socialMissionHtml = thisListing.socialMission;
      var industry = thisListing.industry;
      $('[name="socialMission"]').froalaEditor('html.set', socialMissionHtml);
      $('[name="industry"]').val(industry);
      
      $(window).trigger('resize');
      setTimeout(function(){
       $(window).trigger('resize');
      }, 2222)
    }
  });

});



//events!

Template.createListing.events({
	'submit': function(event){
		
		var bizName = event.target.bizName.value;
  var bizNameUrl = bizName.replace(/ /g,'-');
		var industry = event.target.industry.value;
  var locationLat = $(event.target).find('[data-schema-key="location"]').find('.js-lat').val();
  var locationLng = $(event.target).find('[data-schema-key="location"]').find('.js-lng').val();
  var location = [locationLat, locationLng];
		var website = event.target.website.value;
  var socialMission = event.target.socialMission.value;
		var userId = Meteor.userId();
		var createdAt = new Date();
  var captchaData = grecaptcha.getResponse();


		Meteor.call("insert", bizName, bizNameUrl, industry, location, website, socialMission, userId, createdAt, captchaData, function(error,result){
     grecaptcha.reset();
     if (error) {
         console.log('There was an error: ' + error.reason);
     } else {
       console.log('Success!');
       Router.go('profile', { bizNameUrl: bizNameUrl });
     }

     if(r != false){
       sitemaps.add('/sitemap.xml',function(){
         return {
             page: '/profile/' + bizNameUrl,
             lastmod: new Date(),
             changefreq: 'monthly'
         }
       });
     }
  });

	event.target.bizName.value = "";
  event.target.industry.value = "";
  event.target.socialMission.value = "";
  $(event.target).find('[data-schema-key="logo"]').parent().find('.js-af-remove-file').click();
     
    window.location.href = '../profile/'+bizNameUrl;

        event.preventDefault();
        event.stopPropagation();
   return false;


   setTimeout(function(bizNameUrl){
    window.location.href = '../profile/'+bizNameUrl;
   }, 777);

	}

});


Template.updateListing.onRendered(function () {

 setTimeout(function(){
   var loclatlng = document.getElementsByClassName('location')[0].innerHTML;
   $('.controls.af-map-search-box.js-search').val(loclatlng);
   $(window).trigger('resize');
 }, 2222);

 $('.js-map').click(function(){
   $('.location').attr('data','clicked');
 });


  setTimeout(function(){
   $(window).trigger('resize');
  }, 10000);
  setTimeout(function(){
   $(window).trigger('resize');
  }, 20000);

});


Template.updateListing.events({
 'submit': function(event){

        event.preventDefault();

  var thisId = document.getElementsByClassName('_id')[0].innerHTML;
  var thisListing = Listings.findOne({_id: thisId});
  var bizName = event.target.bizName.value;
  var bizNameUrl = bizName.replace(/ /g,'-');
  var industry = event.target.industry.value;
  if($('.location').attr('data', 'clicked')){
   var locationLat = $(event.target).find('[data-schema-key="location"]').find('.js-lat').val();
   var locationLng = $(event.target).find('[data-schema-key="location"]').find('.js-lng').val();
   var location = [locationLat, locationLng];
  }else{
   var location = document.getElementsByClassName('location')[0].innerHTML;
  }
  var website = event.target.website.value;
  var socialMission = event.target.socialMission.value;
  var userId = Meteor.userId();
  var createdAt = new Date();
  var _id = thisListing._id;


  Meteor.call("update", _id, bizName, bizNameUrl,industry, location, website, socialMission, userId, function(e,r){
    if (e) {
        throw new Meteor.Error();
    }
    if(r != false){
        sitemaps.add('/sitemap.xml',function(){
            return {
                page: '/profile/' + bizNameUrl,
                lastmod: new Date(),
                changefreq: 'monthly'
            }
        });
      }
  });

  Router.go('profile', { bizNameUrl: bizNameUrl });
  
        event.stopPropagation();
    return false;

 },


 'click #delete': function(){
  if(confirm("Delete Listing? There is no way to restore it.")){
   Meteor.call("deleter", this._id);
   window.location.href = '/';
  }
 }

});


Template.layout.events({

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
 }


});



Template.mapPage.events({

 'click #toggle_main .mainbutton': function(event){
    if(event.target.id === "close_main"){
      $('#toggle_main').removeClass('open');
      $('#toggle_main').addClass('closed');      
    }
    if(event.target.id === "open_main"){
      $('#toggle_main').removeClass('closed');
      $('#toggle_main').addClass('open');
    }
    $('.mainbutton').each(function(){
      $(this).toggleClass('hidden')
    });
    $('main').toggleClass('hidden');
 }
});











Template.updateListing.onRendered(function(){
 setTimeout(function(){
   $(window).trigger('resize');
 }, 555);
 setTimeout(function(){
   $(window).trigger('resize');
 }, 1111);
});


Template.createListing.onRendered(function(){
 setTimeout(function(){
   $(window).trigger('resize');
 }, 555);
 setTimeout(function(){
   $(window).trigger('resize');
 }, 1111);
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



$(window).resize(function(){


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





