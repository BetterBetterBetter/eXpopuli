








Listings = new Mongo.Collection("listings"); 
Listings.permit(['insert', 'update', 'deleter']).ifLoggedIn();




ClientOnlyListings = new Mongo.Collection("clientOnlyListings"); 



Keywords = new Mongo.Collection("keywords");




SavedSearches = new Mongo.Collection("savedSearches");
SavedSearches.permit(['addSavedSearches']).ifLoggedIn();



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
       

mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];






















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
    label: "Industry"
 },
 socialMission: {
  type: String,
  label: 'Details',
  optional: true,
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



/*
Comments.config({

});
*/