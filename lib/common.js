

Listings = new Mongo.Collection("listings"); 

Listings.permit(['insert', 'update', 'deleter']).ifLoggedIn();

/*
     mapStyle = [
         {
           "featureType": "water",
           "stylers": [
             { "hue": "#8800ff" },
             { "saturation": 19 },
             { "lightness": -80 }
           ]
         },{
           "featureType": "landscape.natural",
           "stylers": [
             { "hue": "#ff00aa" },
             { "saturation": 50 },
             { "lightness": -15 }
           ]
         },{
           "featureType": "landscape.man_made",
           "stylers": [
             { "hue": "#ff00ee" },
             { "saturation": 100 },
             { "lightness": -15 },
             { "gamma": 0.76 }
           ]
         }
       ];
*/
       

mapStyle = [{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"},{"saturation":"-100"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":21}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#7f8d89"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#2b3638"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2b3638"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.icon","stylers":[{"visibility":"off"}]}]






















Listings.attachSchema(new SimpleSchema({
 bizName: {
  type: String,
  label: 'Link Name',
  max: 200
 },
 bizNameUrl: {
  type: String,
  label: 'Business Name, URL Friendly',
  max: 200,
  index: 1
 },
 firstName: {
  type: String,
  label: 'Owner\'s First Name',
  optional: true
 },
 lastName: {
  type: String,
  label: 'Owner\'s Last Name',
  optional: true
 },
 ownerPicture: {
    type: String,
  label: 'Headshot of the Owner',
  optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        label: 'Upload a file'
      }
    }
  },
  facebookPersonal: {
   type: String,
   label: 'Facebook',
   regEx: SimpleSchema.RegEx.Url,
   optional: true
  },
  twitterPersonal: {
   type: String,
   label: 'Twitter',
   regEx: SimpleSchema.RegEx.Url,
   optional: true
  },
  linkedInPersonal: {
   type: String,
   label: 'LinkedIn',
   regEx: SimpleSchema.RegEx.Url,
   optional: true
  },
  instagramPersonal: {
   type: String,
   label: 'Instagram',
   regEx: SimpleSchema.RegEx.Url,
   optional: true
  },
  pinterestPersonal: {
   type: String,
   label: 'Pinterest',
   regEx: SimpleSchema.RegEx.Url,
   optional: true
  },
  facebookBusiness: {
   type: String,
   label: 'Facebook',
   regEx: SimpleSchema.RegEx.Url,
   optional: true
  },
  twitterBusiness: {
   type: String,
   label: 'Twitter',
   regEx: SimpleSchema.RegEx.Url,
   optional: true
  },
  linkedInBusiness: {
   type: String,
   label: 'LinkedIn',
   regEx: SimpleSchema.RegEx.Url,
   optional: true
  },
  instagramBusiness: {
   type: String,
   label: 'Instagram',
   regEx: SimpleSchema.RegEx.Url,
   optional: true
  },
  pinterestBusiness: {
   type: String,
   label: 'Pinterest',
   regEx: SimpleSchema.RegEx.Url,
   optional: true
  },
 email: {
  type: String,
  label: 'Customer-facing Email',
  regEx: SimpleSchema.RegEx.Email,
  optional: true
 },
 phone: {
  type: Number,
  label: 'Customer-facing Phone',
  optional: true
 },
 website: {
   type: String,
   regEx: SimpleSchema.RegEx.Url,
   optional: true
  },
 industry: {
    type: String,
    label: "Industry",
    allowedValues: ['Art', 'Entrepreneur', 'Finance', 'Hospitality', 'Health', 'Communications', 'Earth Stewardship', 'Social Reform', 'Transportation'],
    autoform: {
      options: [
        {label: "Art / Fashion / Expression", value: "Art"},
        {label: "Entrepreneurship / Empowerment", value: "Entrepreneur"},
        {label: "Finance / Lending", value: "Finance"},
        {label: "Food / Hospitality", value: "Hospitality"},
        {label: "Health / Beauty / Fitness", value: "Health"},
        {label: "Information Technology / Communications", value: "Communications"},
        {label: "Outdoor Stewardship / Agriculture / Landscaping", value: "Earth Stewardship"},
        {label: "Political Activism / Reform", value: "Social Reform"},
        {label: "Transportation", value: "Transportation"}
      ]
    }
 },
 socialMission: {
  type: String,
  label: 'Details',
  optional: false,
   autoform: {
      type: "froalaEditor",
      afFieldInput:{
        froalaOptions:{
          theme: 'red',
          inlineMode: true,
          buttons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertLink', 'insertVideo', 'insertTable', '|', 'quote', 'insertHR', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
          height: '400'
         },
       },
     },
 },
 location: {
    type: [Number],
    decimal: true,
    autoform:{
      type: 'map',
      afFieldInput:{
        zoom: 8,
        geolocation: true,
        searchBox: true,
        autolocate: true,
        mapType: 'satellite',
        googleMap: {
         height: '450px',
         width: "66%",
         backgroundColor: '#800080',
         mapTypeId: 'hybrid',
         styles: mapStyle,
         streetViewControl: true,
         zoom: 8
        }
      },
     },
  },
 logo: {
  type: String,
  label: 'Logo',
  optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        label: 'Upload a file'
      }
    }
  },
 userId: {
  type: String,
  label: 'User Id'
 },
 createdAt: {
  type: Date,
  label: 'Created At:'
 }

}));


Meteor.methods({


 deleter: function (id){
  Listings.remove(id);
 },

 update: function(_id, bizName, bizNameUrl, industry, location, website, socialMission, userId){


  Listings.update({_id: _id},{$set:{
   bizName: bizName,
   bizNameUrl: bizNameUrl,
   website: website,
   industry: industry,
   location: location,
   socialMission: socialMission,
   userId: userId
  }});
 }


});


var imageStore = new FS.Store.GridFS("images", {
 //this for options

});

Images = new FS.Collection("images", {
    stores: [imageStore]
});




