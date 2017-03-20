























//On Created
//template subscriptions!
Template.profile.onCreated(function () {
    this.subscribe('listings');
});
Template.createListing.onCreated(function () {
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










Template.createListing.onRendered(function(){
 setTimeout(function(){
   $(window).trigger('resize');
 }, 555);
 setTimeout(function(){
   $(window).trigger('resize');
 }, 1111);
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

















